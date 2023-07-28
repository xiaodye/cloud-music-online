import { FC, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { LeftCircleTwoTone, Loading3QuartersOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useMount from "@/hooks/useMount";
import { getLoginQRCheck, getLoginQRImgRequest, getLoginQRKeyRequest } from "@/api/request";
import useUnMount from "@/hooks/useUnmount";
import { useUserStore } from "@/store";

type LoadingStatusType = "loading" | "wait" | "expire";

const Login: FC = () => {
  const navigate = useNavigate();
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const [btnText, setBtnText] = useState("请扫描二维码登录");
  const [qrUrl, setQrUrl] = useState("https://s2.loli.net/2023/03/14/Wou5OES6YHn1JeM.jpg");
  const timer = useRef<any>(null);
  const qrKey = useRef<string>("");
  const [loginStatus, setLoginStatus] = useState<LoadingStatusType>("loading");

  useMount(() => {
    login();
  });

  useUnMount(() => {
    clearInterval(timer.current);
    timer.current = null;
  });

  const login = async () => {
    // 设置登录状态，加载中
    setLoginStatus("loading");

    // 1. 获取 key
    const { data: QRKey } = await getLoginQRKeyRequest();
    qrKey.current = QRKey.unikey;

    // 2. 根据 key 获取二维码
    const { data: QRImg } = await getLoginQRImgRequest(QRKey.unikey);
    setQrUrl(QRImg.qrimg);
    setLoginStatus("wait");

    // 3. 开始轮询，像后端查询登录状态
    timer.current = setInterval(async () => {
      const { code, message, nickname, avatarUrl } = await getLoginQRCheck(qrKey.current);

      if (code === 802) {
        setBtnText(message + "...");
      } else if (code === 803) {
        setBtnText("登录成功!，正在跳转...");
        setUserInfo({ nickname, avatarUrl });
        clearInterval(timer.current);
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else if (code === 800) {
        setBtnText("二维码已过期，请刷新");
        clearInterval(timer.current);
        setLoginStatus("expire");
      }
    }, 2000);
  };

  return (
    <div className={styles.login}>
      <header className={styles.header} onClick={() => navigate(-1)}>
        <LeftCircleTwoTone style={{ fontSize: 25 }} />
        <span>返回</span>
      </header>
      <main className={styles.main}>
        <div className={styles.imgBox}>
          {loginStatus === "loading" ? (
            <div className={styles.loading}>
              <LoadingOutlined style={{ fontSize: 30 }} />
              <span>获取中...</span>
            </div>
          ) : loginStatus === "wait" ? (
            <img src={qrUrl} alt="" />
          ) : (
            <div className={styles.expire} onClick={() => login()}>
              <Loading3QuartersOutlined />
              <span>重新获取</span>
            </div>
          )}
        </div>
        <div className={styles.btn}>{btnText}</div>
      </main>
    </div>
  );
};

export default Login;
