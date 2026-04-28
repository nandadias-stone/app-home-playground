import { useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage';
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
  else page = <HomePage />;

  return <PromotionProvider>{page}</PromotionProvider>;
}
