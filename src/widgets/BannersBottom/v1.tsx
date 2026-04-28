import { Card, Link } from '@/jade';
import styles from './v1.module.css';

type Banner = {
  id: string;
  title: string;
  description: string;
  linkLabel: string;
};

const DEFAULT_BANNERS: Banner[] = [
  {
    id: '1',
    title: 'Título com max de 30 caracteres',
    description:
      'Texto do banner com no máximo 90 caracteres, contando com espaços, ou até três linhas de conteúdo.',
    linkLabel: 'Link Text',
  },
  {
    id: '2',
    title: 'Título com max de 30 caracteres',
    description:
      'Texto do banner com no máximo 90 caracteres, contando com espaços, ou até três linhas de conteúdo.',
    linkLabel: 'Link Text',
  },
];

type BannersBottomProps = {
  banners?: Banner[];
};

export function BannersBottomV1({ banners = DEFAULT_BANNERS }: BannersBottomProps) {
  return (
    <div className={styles.scroller}>
      {banners.map((banner) => (
        <Card key={banner.id} padding="medium" className={styles.banner}>
          <p className={`${styles.title} jade-heading-xsmall`}>{banner.title}</p>
          <p className={`${styles.description} jade-text-medium-regular`}>{banner.description}</p>
          <Link variant="brand" trailingIcon="chevron-right">
            {banner.linkLabel}
          </Link>
        </Card>
      ))}
    </div>
  );
}
