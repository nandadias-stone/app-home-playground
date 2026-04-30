import { Card } from '@/jade';
import consultorImg from '@/assets/images/consultor.png';
import styles from './v2.module.css';

type CardMeuAgenteV2Props = {
  nomeCliente?: string;
  nomeAgente?: string;
  cargo?: string;
  descricao?: string;
  cta?: string;
  onClick?: () => void;
};

export function CardMeuAgenteV2({
  nomeCliente = 'Joaquina',
  nomeAgente = 'Mateus Silva',
  cargo = 'Sou seu consultor na Stone',
  descricao = 'Olá {Cliente}, sou seu novo Consultor Stone. A partir de hoje estarei disponível para te ajudar no que precisar.',
  cta = 'Tenho um recado pra você!',
  onClick,
}: CardMeuAgenteV2Props) {
  const descricaoFinal = descricao.replace('{Cliente}', nomeCliente);

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <img
          src={consultorImg}
          alt={nomeAgente}
          className={styles.avatar}
          width={40}
          height={40}
        />
        <div className={styles.identidade}>
          <span className={`${styles.nome} jade-text-medium-semibold`}>{nomeAgente}</span>
          <span className={`${styles.cargo} jade-text-small-regular`}>{cargo}</span>
        </div>
      </div>
      <p className={`${styles.descricao} jade-text-small-regular`}>{descricaoFinal}</p>
      <button type="button" className={`${styles.cta} jade-text-medium-semibold`} onClick={onClick}>
        {cta}
      </button>
    </Card>
  );
}
