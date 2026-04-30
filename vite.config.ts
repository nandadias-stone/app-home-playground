import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';

const projectRoot = path.resolve(__dirname);
const widgetsRoot = path.resolve(projectRoot, 'src/widgets');
const stateFilePath = path.resolve(projectRoot, 'playground-state.json');

function deleteVersionPlugin(): PluginOption {
  return {
    name: 'delete-widget-version',
    configureServer(server) {
      server.middlewares.use('/api/version/delete', async (req, res, next) => {
        if (req.method !== 'POST') return next();

        const send = (status: number, body: object | string) => {
          res.statusCode = status;
          res.setHeader('content-type', 'application/json');
          res.end(typeof body === 'string' ? JSON.stringify({ error: body }) : JSON.stringify(body));
        };

        try {
          let raw = '';
          for await (const chunk of req) raw += chunk;
          const { folderName, version } = JSON.parse(raw || '{}');

          if (typeof folderName !== 'string' || typeof version !== 'string') {
            return send(400, 'Missing folderName or version');
          }
          if (version === 'v1') {
            return send(403, 'A versão v1 não pode ser excluída');
          }
          if (!/^[A-Za-z0-9]+$/.test(folderName)) {
            return send(400, 'Invalid folderName');
          }
          if (!/^v\d+$/.test(version)) {
            return send(400, 'Invalid version');
          }

          const dir = path.resolve(widgetsRoot, folderName);
          if (!dir.startsWith(widgetsRoot + path.sep)) {
            return send(400, 'Invalid path');
          }
          if (!fs.existsSync(dir)) {
            return send(404, 'Widget folder not found');
          }

          const tsx = path.join(dir, `${version}.tsx`);
          const css = path.join(dir, `${version}.module.css`);
          const removed: string[] = [];
          for (const file of [tsx, css]) {
            if (fs.existsSync(file)) {
              fs.unlinkSync(file);
              removed.push(path.relative(projectRoot, file));
            }
          }

          return send(200, { ok: true, removed });
        } catch (e) {
          const message = e instanceof Error ? e.message : String(e);
          return send(500, message);
        }
      });
    },
  };
}

/**
 * Endpoint GET/PUT /api/state
 * Lê e escreve o arquivo `playground-state.json` na raiz do projeto.
 * Esse arquivo é commitado no git e reflete o estado compartilhado entre
 * agentes/máquinas (versões promovidas, labels custom, presets, config "ao vivo").
 */
function stateFilePlugin(): PluginOption {
  return {
    name: 'playground-state-file',
    configureServer(server) {
      server.middlewares.use('/api/state', async (req, res, next) => {
        const send = (status: number, body: object) => {
          res.statusCode = status;
          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify(body));
        };

        try {
          if (req.method === 'GET') {
            if (!fs.existsSync(stateFilePath)) {
              return send(200, {});
            }
            const raw = fs.readFileSync(stateFilePath, 'utf-8');
            try {
              const parsed = JSON.parse(raw);
              return send(200, parsed);
            } catch {
              return send(200, {});
            }
          }

          if (req.method === 'PUT') {
            let raw = '';
            for await (const chunk of req) raw += chunk;
            let parsed: unknown;
            try {
              parsed = JSON.parse(raw || '{}');
            } catch {
              return send(400, { error: 'Invalid JSON body' });
            }
            if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
              return send(400, { error: 'Body must be an object' });
            }
            // Pretty-printed pra facilitar diffs no git
            fs.writeFileSync(stateFilePath, JSON.stringify(parsed, null, 2) + '\n', 'utf-8');
            return send(200, { ok: true });
          }

          return next();
        } catch (e) {
          const message = e instanceof Error ? e.message : String(e);
          return send(500, { error: message });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), deleteVersionPlugin(), stateFilePlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
