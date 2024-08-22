
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './views/routing/PrivateRoute';
import { useAuth } from './auth/hooks';
import { auth } from './api/firebase-init';
import { AppLoading } from './views/components/site/loading';
import SignInPage from './views/pages/authentication/sign-in';
import NavbarSidebarLayout from './views/layouts/navbar-sidebar';
import WorkbookPage from './views/pages/workbook';
import { Suspense } from 'react';

function App() {
  const { loading } = useAuth(auth);

  return (<>
    <BrowserRouter>
      <Suspense fallback={<AppLoading />}>
        {loading
          ? <AppLoading />
          : <Routes>
            <Route path="/login" element={<SignInPage />} />
            <Route path="/workbook" element={<PrivateRoute><WorkbookPage /></PrivateRoute>} />
            <Route
              path='/*'
              element={<PrivateRoute><NavbarSidebarLayout /></PrivateRoute>}
            />
          </Routes>}
      </Suspense>

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
