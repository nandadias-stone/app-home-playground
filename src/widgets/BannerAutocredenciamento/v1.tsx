/**
 * 🔒 VERSÃO ATUAL — NÃO ALTERE ESTE ARQUIVO.
 * Esta é a v1 do widget: referência baseline (Atual) que reflete a Home em produção.
 * Para iterar visualmente, crie uma nova versão (v2, v3, ...) duplicando este arquivo.
 * Detalhes em CLAUDE.md (raiz do projeto).
 */
import { Link } from '@/jade';
import maquininhaImg from '@/assets/images/maquininha.png';
import styles from './v1.module.css';

type BannerAutocredenciamentoProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function BannerAutocredenciamentoV1({
  title = 'Quer uma maquininha?',
  description = 'Receba a sua com garantia vitalícia em 1 dia útil.',
  actionLabel = 'Contrate agora',
  onAction,
}: BannerAutocredenciamentoProps) {
  return (
    <button className={styles.banner} type="button" onClick={onAction}>
      <div className={styles.text}>
        <p className={`${styles.title} jade-heading-xsmall`}>{title}</p>
        <p className={`${styles.description} jade-text-medium-regular`}>{description}</p>
        <Link variant="brand" trailingIcon="chevron-right">{actionLabel}</Link>
      </div>
      <div className={styles.illustration} aria-hidden="true">
        <img src={maquininhaImg} alt="" className={styles.maquininha} />
      </div>
    </button>
  );
}
