// brother-portfolio/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // <-- not '/brother_portfolio/' (that’s only for GitHub Pages)
});
