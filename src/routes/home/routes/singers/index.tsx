import Horizen from "@/baseUI/horizen";
import React, { useState } from "react";
import { alphaTypes, categoryTypes } from "@/api/request";
import { root } from "./styles.css";

const Singers: React.FC = () => {
  return (
    <div className={root}>
      <Horizen list={categoryTypes} title={"分类 (默认热门):"} />
      <Horizen list={alphaTypes} title={"首字母:"} />
    </div>
  );
};

export default Singers;
