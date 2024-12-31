import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  'process.env.VITE_GITHUB_ACCESS_TOKEN': JSON.stringify(process.env.VITE_GITHUB_ACCESS_TOKEN)
})
