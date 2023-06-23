import { style } from "@vanilla-extract/css";
import globalVars from "@/styles/theme.css";

const root = style({
  flex: 1,
  position: "relative",
  overflowY: "auto",
});

const backgroud = style({
  position: "absolute",
  width: "100%",
  height: "100px",
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
  backgroundColor: globalVars.theme_color,
});

const content = style({
  boxSizing: "border-box",
});

export { root, backgroud, content };
