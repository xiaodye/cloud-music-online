import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

interface IProps {
  title?: string;
  onClick?: () => void;
}

const Banner: React.FC<IProps> = ({ title = "返回", onClick }) => {
  return (
    <div className={styles.banner}>
      <i className={classNames("iconfont", styles.back)} onClick={onClick}>
        &#xe655;
      </i>
      <h1>{title}</h1>
    </div>
  );
};

export default Banner;
