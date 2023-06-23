import Scroll from "@/components/Scroll";
import React, { useState } from "react";
import { content, listContainer, listItem, horizen } from "./styles.css";
import classNames from "classnames";

type category = {
  key: string;
  name: string;
};

type IProps = {
  list: category[];
  title: string;
  style?: React.CSSProperties;
};

const Horizen: React.FC<IProps> = ({ list, title, style }) => {
  const [currentIndex, setCurrentIndex] = useState(list[0].key);

  const clickHandle = (key: string) => {
    setCurrentIndex(key);
  };

  return (
    <div className={horizen} style={style}>
      <Scroll direction="horizental">
        <div className={content}>
          <div className={listContainer}>
            <span className={listItem}>{title}</span>
            {list.map((item) => (
              <span
                key={item.key}
                className={classNames(listItem, currentIndex === item.key ? "selected" : "")}
                onClick={() => clickHandle(item.key)}
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </Scroll>
    </div>
  );
};

export default Horizen;
