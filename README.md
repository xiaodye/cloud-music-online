# 云音乐在线网页版

![](https://img.shields.io/badge/React-%5E18.2.0-brightgreen)
![](https://img.shields.io/badge/TypeScript-%5E5.0.2-yellow)
![](https://img.shields.io/badge/React-%2Drouter-%2Ddom-%5E6.11.2-red)
![](https://img.shields.io/badge/Zustand-%5E4.3.8-red)
![](https://img.shields.io/badge/vite-%5E4.3.9-blue)

## 🙈项目介绍

一款在线的网页版云音乐。前端采用 `React18` 和 `Vite` 构建，后端使用开源项目  `NeteaseCloudMusicApi`  接口。可以获取网易云的推荐歌单、热门歌手、排行榜；可扫码登录网易云账号；实现播放器，可在线播放音乐，上一曲、下一曲、切换播放模式，可拖拽进度条，解析歌词，播放列表等等。

在线 `demo`：https://mini-cloud-music.vercel.app

建议配合**浏览器插件**：[Mobile simulator](https://chrome.google.com/webstore/detail/mobile-simulator-responsi/ckejmhbmlajgoklhgbapkiccekfoccmk)，使用效果更佳，不过插件有个别 bug。

![img](https://lh3.googleusercontent.com/DX9jh6HhBr8tEj0kTLnDCzWimvw9VHuayGKDkJtT8_1LFWQc0136FaXFiLZ32GnjriJWuZP4Eq-CnJOv1h7iGVzokg=w640-h400-e365-rj-sc0x00ffffff)

>  **项目**和**后端接口**均部署在`vercel`，因国内网络环境原因，可能无法访问。

## 🔑项目启动

#### 安装依赖

```shell
pnpm install
```

#### 项目运行

```shell
pnpm run dev
```

#### 项目打包

```shell
pnpm run build
```

## 🚄技术栈

#### 前端

- 开发框架：React 18
- 语言：TypeScript、Scss
- 脚手架：Vite 、Pnpm、SWC
- 图标库：Iconfont、@ant-design/icons
- 路由库：React-router-dom v6
- 状态库及中间件：Zustand、Immer、Persist
- 请求库：Axios
- 代码规范：Prettier、Eslint
- 其他：Better-Scroll、React-transition-group、React-lazy-load-image-component、@vanilla-extract/css、Swiper、classnames、use-immer

#### 后端

- 开源项目 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 接口集合

##  🍊功能亮点

- 🔥采用最新的 `React 18` 和 `TypeScript` 开发，使用 `Vite` 构建项目
- 💪使用 `React-router-dom v6` 配置式路由表，路由懒加载
- 🌳`Loading` 组件、音符条、侧边抽屉、弹框、进场动画等均手动实现，不使用第三方组件库
- ✨实扫码登录功能，使用网易云 `App` 扫码登录自己账号
- 🎨对滚动插件 `Better-Scroll` 二次封装，编写上拉刷新和下拉加载更多处理逻辑
- 🚀实现在线播放器，可在线播放音乐。自编写可拖拽进度条，切换播放模式，歌词解析，状态持久化等等。
- 🏃‍♂️对热门歌手页大量列表数据优化，包括数据缓存，数据懒加载，图片懒加载等。

## 💡未来计划（画饼）

- 完善现有项目，修复功能 Bug，样式优化
- 接入网易云账号体系，构建用户中心
- 搜索页等其他模块
