
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { WorkbookPage } from './views/components/workbook/workbook';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLoading from './views/components/site/loading';
import { PrivateRoute } from './views/routing/PrivateRoute';
import { Login } from './views/components/auth/login';
import { Env } from './infrastructure/env/env';
import { useAuth } from './auth/hooks';
``

function App() {
  const { loading } = useAuth(auth);

  return (<>
    <BrowserRouter>
      {loading
        ? <AppLoading />
        : <Routes>
          <Route path="/login" element={<Login />} />
          {Env.isDevelopment
            ? <Route path="/*" element={<WorkbookPage />} />
            : <Route
              path='/*'
              element={<PrivateRoute><WorkbookPage /></PrivateRoute>}
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
