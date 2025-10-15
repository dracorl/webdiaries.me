import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    port: 5000,
    proxy: {
      "/api": {
        target: () => import.meta.env.VITE_BACKEND_API,
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  }
})
