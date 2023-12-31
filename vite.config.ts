import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    visualizer({
      // 打包完成后自动打开浏览器，显示产物体积报告
      open: true,
    }),
  ],
  css: {
    modules: {
      localsConvention: "camelCaseOnly", // 修改生成的配置对象的key的展示形式(驼峰还是中划线形式)
    },
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: `@import "@/styles/theme.scss";`,
    //   },
    // },
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  build: {
    assetsInlineLimit: 20 * 1024,
  },
});
