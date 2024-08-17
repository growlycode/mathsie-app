
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { WorkbookPage } from './views/components/workbook/workbook';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AppLoading from './views/components/site/loading';
import httpService from './infrastructure/http/httpService';
import { Env } from './infrastructure/env/env';
import { AuthenticationGuard } from './views/routing/AuthenticationGuard';

function App() {
  const { getAccessTokenSilently, loginWithRedirect, logout, isLoading } = useAuth0();
  const secure = !Env.isDevelopment;
  
  useEffect(() => {
    secure && httpService.addAccessTokenInterceptor(getAccessTokenSilently, loginWithRedirect);
  }, [getAccessTokenSilently, secure]);

  useEffect(() => {
      secure && httpService.add401LogoutInterceptor(logout);
  }, [logout, secure]);


  return (<>
    <BrowserRouter>
      {(secure && isLoading)
        ? <AppLoading />
        : <Routes>
          {Env.isDevelopment
            ? <Route path="/*" element={<WorkbookPage />} />
            : <Route
              path='/*'
              element={<AuthenticationGuard component={WorkbookPage} />}
            />
          }
        </Routes>}

    </BrowserRouter>
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      theme='colored'
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </>
  );
}




export default App;
