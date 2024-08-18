import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import theme from "./flowbite-theme";
import { Flowbite } from 'flowbite-react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Flowbite theme={{ theme }}>
      <App />
    </Flowbite>
  </StrictMode>
)
