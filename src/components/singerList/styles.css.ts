import globalVars from "@/styles/vars.css";
import { style, styleVariants } from "@vanilla-extract/css";

const list = style({
  display: "flex",
  flexDirection: "column",
});

const listItem = style({
  height: 70,
  padding: 10,
  display: "flex",
  columnGap: 10,
  borderBottom: "1px solid " + globalVars.border_color,
});

const listItemContent = styleVariants({
  cover: {
    height: "100%",
    aspectRatio: "1",
    objectFit: "cover",
    borderRadius: 4,
  },
  name: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: globalVars.font_size_m,
    color: globalVars.font_color_desc,
    fontWeight: 500,
  },
});

export default { list, listItem, listItemContent };
