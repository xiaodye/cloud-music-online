import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { LeftCircleTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const navigate = useNavigate();
  const [btnText, setBtnText] = useState("请扫描二维码登录");

  return (
    <div className={styles.login}>
      <header className={styles.header} onClick={() => navigate(-1)}>
        <LeftCircleTwoTone style={{ fontSize: 25 }} />
        <span>返回</span>
      </header>
      <main className={styles.main}>
        <div className={styles.imgBox}>
          <img src="https://s2.loli.net/2023/03/14/Wou5OES6YHn1JeM.jpg" alt="" />
        </div>
        <div className={styles.btn}>{btnText}</div>
      </main>
    </div>
  );
};

export default Login;
