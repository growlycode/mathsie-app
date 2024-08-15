
import './App.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WorkbookPage } from './views/components/workbook/workbook';

const queryClient = new QueryClient();


function App() {
  return (<QueryClientProvider client={queryClient}>
    <WorkbookPage />
  </QueryClientProvider>
  );
}




export default App;
