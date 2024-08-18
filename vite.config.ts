import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  server: {
    port: 5000,
    proxy: {
        '/api': {
            target: 'https://localhost:7103',
            changeOrigin: true,
            secure: false,
            ws: true,
        }
    }
}
})
