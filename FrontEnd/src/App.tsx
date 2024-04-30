import Router from '@/status/Router';
import '@/styles/Typography.css';
import { CookiesProvider } from 'react-cookie';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <>
      <RecoilRoot>
        <CookiesProvider>
          <Router />
        </CookiesProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
