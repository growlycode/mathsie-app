
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { WorkbookPage } from './views/components/workbook/workbook';
import { ToastContainer } from 'react-toastify';




function App() {
  return (<div>
    
    <WorkbookPage />
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
  </div>
  );
}




export default App;
