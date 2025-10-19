import {defineConfig, loadEnv} from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  return defineConfig({
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: process.env.VITE_USER_DASHBOARD_PORT,
      proxy: {
        "/graphql": {
          target: () => process.env.VITE_BACKEND_API,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/graphql/, "")
        }
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    }
  })
}
