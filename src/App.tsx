import { useEffect, useState } from 'react';
import { AppPage } from './pages/AppPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { LabPage, PromotionProvider } from './lab';

function getRoute(): string {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

export default function App() {
  const [route, setRoute] = useState<string>(getRoute());

  useEffect(() => {
    const onPopState = () => setRoute(getRoute());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  let page;
  if (route === '/lab') page = <LabPage />;
  else if (route === '/playground') page = <PlaygroundPage />;
  else page = <AppPage />;

  return <PromotionProvider>{page}</PromotionProvider>;
}
