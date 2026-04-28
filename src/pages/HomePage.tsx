import { Header } from '@/widgets/Header';
import { Onboarding } from '@/widgets/Onboarding';
import { AlertaEquipe } from '@/widgets/AlertaEquipe';
import { AlertaDispositivo } from '@/widgets/AlertaDispositivo';
import { CardCopiloto } from '@/widgets/CardCopiloto';
import { CardSaldo } from '@/widgets/CardSaldo';
import { CarrosselTop } from '@/widgets/CarrosselTop';
import { BannerCapitalGiro } from '@/widgets/BannerCapitalGiro';
import { BannerAutocredenciamento } from '@/widgets/BannerAutocredenciamento';
import { CardRecebimentos } from '@/widgets/CardRecebimentos';
import { ToggleTonFast } from '@/widgets/ToggleTonFast';
import { CardVendas } from '@/widgets/CardVendas';
import { CardCartaoTracking } from '@/widgets/CardCartaoTracking';
import { CardCartaoFatura } from '@/widgets/CardCartaoFatura';
import { CardMetaVendas } from '@/widgets/CardMetaVendas';
import { CardMaquininhas } from '@/widgets/CardMaquininhas';
import { GridAtalhos } from '@/widgets/GridAtalhos';
import { BannersBottom } from '@/widgets/BannersBottom';
import { CardMeuAgente } from '@/widgets/CardMeuAgente';
import { TabBar } from '@/widgets/TabBar';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Onboarding />
        <AlertaEquipe />
        <AlertaDispositivo />
        <CardCopiloto />
        <CardSaldo />
        <CarrosselTop />
        <BannerCapitalGiro />
        <BannerAutocredenciamento />
        <CardRecebimentos />
        <ToggleTonFast />
        <CardVendas />
        <CardCartaoTracking />
        <CardCartaoFatura />
        <CardMetaVendas />
        <CardMaquininhas />
        <GridAtalhos />
        <BannersBottom />
        <CardMeuAgente />
      </main>
      <TabBar />
    </div>
  );
}
