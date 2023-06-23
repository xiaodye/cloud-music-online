import { createGlobalTheme } from "@vanilla-extract/css";

const globalVars = createGlobalTheme(":root", {
  font_size_ss: "10px",
  font_size_s: "12px",
  font_size_m: "14px",
  font_size_l: "16px",
  font_size_ll: "18px",

  font_color_light: "#f1f1f1",
  font_color_desc: "#2e3030",
  font_color_desc_v2: "#bba8a8", // 略淡

  theme_color: "#d44439",
  theme_color_shadow: "#d4443980",

  border_color: "#e4e4e4",
  background_color: "#f2f3f4",
  background_color_shadow: "#0000004d",
  highlight_background_color: "#fff",
});

export default globalVars;
