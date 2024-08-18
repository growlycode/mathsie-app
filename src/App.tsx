
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { WorkbookPage } from './views/components/workbook/workbook';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './views/routing/PrivateRoute';
import { useAuth } from './auth/hooks';
import { auth } from './api/firebase-init';
import { AppLoading } from './views/components/site/loading';
import DashboardPage from './views/pages';
import SignInPage from './views/pages/authentication/sign-in';
import { Env } from './infrastructure/env/env';

function App() {
  const { loading } = useAuth(auth);

  return (<>
    <BrowserRouter>
      {loading
        ? <AppLoading />
        : <Routes>
          <Route path="/login" element={<SignInPage />} />
          <Route path="/workbook" element={<PrivateRoute><WorkbookPage /></PrivateRoute>} />
          {Env.isDevelopment
            ? <Route path="/*" element={<DashboardPage />} />
            : <Route
              path='/*'
              element={<PrivateRoute><DashboardPage /></PrivateRoute>}
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
