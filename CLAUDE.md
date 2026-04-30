# Stone Home — Guia para o agente

Este arquivo é lido pelo Claude Code (e qualquer outro agente compatível) no início de cada sessão. **Siga estas regras à risca.**

## 🔒 Regra inviolável: a v1 nunca muda

A `v1` de cada widget representa a **versão atual em produção**. Ela é o baseline contra o qual todas as variações são comparadas.

**Você NUNCA deve, em hipótese alguma:**
- Editar `src/widgets/<Widget>/v1.tsx`
- Editar `src/widgets/<Widget>/v1.module.css`
- Renomear, mover, deletar ou substituir esses arquivos

Isso vale mesmo quando a usuária pedir "mude o Card Saldo pra ter X". Se a alteração for visual ou estrutural num widget, o caminho correto é:

1. **Criar uma nova versão** (`v2`, `v3`, ...) duplicando a v1 e aplicando a mudança lá
2. **Confirmar com a usuária** se ela quer essa nova versão promovida no `/playground`

Se a usuária pedir explicitamente para alterar a v1, **pare e pergunte**:
> "A v1 é a versão de referência (Atual) e por convenção não muda. Quer que eu crie uma nova versão (vN) com essa alteração e marque como `Atual` depois, ou tem certeza que prefere alterar a v1 mesmo?"

A única exceção válida é se a usuária mandar `card-saldo:v1` (ou outro ID `:v1`) usando o chip do Lab e disser explicitamente "altere a v1 mesmo".

## Convenção de IDs (use no chat)

Quando a usuária mencionar um widget, espere o formato:

- **`<widget-id>`** — o widget todo (ex: `card-saldo`, `alertas`)
- **`<widget-id>:vN`** — versão específica (ex: `card-saldo:v3`, `alertas:v4`)

Isso é o ID interno do `WIDGET_REGISTRY` em `src/playground/widget-registry.ts`. Mapa direto para o arquivo: `card-saldo:v3` → `src/widgets/CardSaldo/v3.tsx`.

Quando a usuária colar um ID copiado do chip do Lab, abra direto o arquivo correspondente sem perguntar qual widget é.

## Como criar uma nova versão (vN)

```bash
cd src/widgets/<Widget>
cp v1.tsx v<N>.tsx
cp v1.module.css v<N>.module.css
# Renomear a função interna em v<N>.tsx: <Widget>V1 → <Widget>V<N>
# Atualizar o import em v<N>.tsx: from './v1.module.css' → from './v<N>.module.css'
```

O `index.tsx` de cada widget detecta automaticamente via `import.meta.glob('./v*.tsx')` — não precisa atualizar nada.

## Como excluir uma versão (vN, N ≠ 1)

Use o **botão lixeira** no Lab (`/lab`) — ele dispara o endpoint `POST /api/version/delete` (plugin Vite em `vite.config.ts`) que apaga os arquivos do disco com salvaguardas. **Nunca** apague v1.

Se precisar fazer manualmente:

```bash
rm src/widgets/<Widget>/v<N>.tsx src/widgets/<Widget>/v<N>.module.css
```

## Estrutura geral do projeto

- `src/widgets/<Widget>/` — cada widget tem `v1.tsx`, `v1.module.css`, `index.tsx` (switcher) e versões adicionais `vN.*`
- `src/jade/` — primitivos do design system replicado (Button, Tag, Alert, Switch, etc.)
- `src/playground/` — sidebar, registry, presets, contexto do `/playground`
- `src/lab/` — UI do `/lab` (versões lado a lado, copy de ID, hard delete)
- `src/components/TopNav.tsx` — barra de navegação global (App / Playground / Lab)
- `src/pages/AppPage.tsx` — rota `/` com frame iPhone + dropdown de cenários
- `src/pages/PlaygroundPage.tsx` — rota `/playground` com sidebar configurável
- `src/lab/LabPage.tsx` — rota `/lab` com versões lado a lado

## Widgets que NÃO são versionados

Apenas `Header` e `TabBar` ficam fora do sistema de versões — são estruturais e fixos. Não criem `v2.tsx` para eles.

## Tokens, design system

Todos os tokens (cores, espaços, tipografia, shadows) estão em `src/styles/tokens.css` como CSS variables (`--jade-*`). Use sempre essas variáveis ao escrever CSS. Não introduza valores hardcoded a menos que a usuária peça explicitamente.
