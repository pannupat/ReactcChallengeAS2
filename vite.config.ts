import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve:{
    alias:{
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@function": path.resolve(__dirname, "src/function"),
      "@testreact":path.resolve(__dirname, "src/testreact"),
      "@pages":path.resolve(__dirname, "src/pages"),
      "@workshop_assignment":path.resolve(__dirname, "src/workshop_assignment")


    },
    extensions: ['.ts', '.tsx']
  },
  
  server:{
    open:true,
    port:7777,
    proxy:{
      '/api':{
        target: 'http://localhost.7777',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/api/, '')
      }
    }
  }
})


