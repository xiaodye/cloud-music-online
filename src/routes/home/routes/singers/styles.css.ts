import { style } from "@vanilla-extract/css";

const singers = style({
  flex: 1,
  width: "100%",
  display: "flex",
  overflow: "auto",
  flexDirection: "column",
});

const scrollContainer = style({
  flex: "1 1 0%",
  overflowY: "auto",
});

export { singers, scrollContainer };
