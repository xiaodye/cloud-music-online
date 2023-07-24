import Scroll from "@/components/Scroll";
import React, { useState } from "react";
import { listContainer, listItem, horizen } from "./styles.css";
import classNames from "classnames";

type areaType = {
  key: string;
  name: string;
};

type IProps = {
  list: areaType[];
  title: string;
  style?: React.CSSProperties;
  onClick: (value: string) => void;
};

const Horizen: React.FC<IProps> = ({ list, title, style, onClick }) => {
  const [currentKey, setCurrentKey] = useState(list[0].key);

  const clickHandle = (key: string) => {
    setCurrentKey(key);
    onClick(key);
  };

  return (
    <div className={horizen} style={style}>
      <Scroll direction="horizontal">
        <div className={listContainer}>
          <span className={listItem}>{title}</span>
          {list.map((item) => (
            <span
              key={item.key}
              className={classNames(listItem, currentKey === item.key ? "selected" : "")}
              onClick={() => clickHandle(item.key)}
            >
              {item.name}
            </span>
          ))}
        </div>
      </Scroll>
    </div>
  );
};

export default Horizen;
