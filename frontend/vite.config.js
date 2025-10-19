import {defineConfig, loadEnv} from "vite"
import react from "@vitejs/plugin-react"

export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  return defineConfig({
    plugins: [react()],
    server: {
      watch: {
        usePolling: true
      },
      host: true,
      port: process.env.VITE_FRONTEND_PORT,
      proxy: {
        "/api": {
          target: () => process.env.VITE_BACKEND_API,
          changeOrigin: true,
          ws: true,
          rewrite: path => path.replace(/^\/api/, "")
        }
      }
    }
  })
}
