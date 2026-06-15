import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        strictPort: true,
        proxy: {
            "/api": {
                target: "https://travelapi-187a98b738af.herokuapp.com",
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
//# sourceMappingURL=vite.config.js.map