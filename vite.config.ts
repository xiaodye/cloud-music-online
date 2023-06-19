import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCaseOnly", // 修改生成的配置对象的key的展示形式(驼峰还是中划线形式
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
});
