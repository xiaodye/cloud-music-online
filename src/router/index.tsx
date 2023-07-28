import Home from "@/routes/home";
import Rank from "@/routes/home/routes/rank";
import Recommend from "@/routes/home/routes/recommend";
import Singers from "@/routes/home/routes/singers";
import NotFound from "@/routes/notFound";
import Album from "@/routes/album";
import User from "@/routes/user";
import { Navigate, createHashRouter } from "react-router-dom";
import SingerDetail from "@/routes/singerDetail";
import App from "@/App";
// import { KeepAlive, AliveScope, withKeepAlive } from "@/baseUI/KeepAlive";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: "home",
        element: <Home />,
        children: [
          {
            index: true,
            element: <Navigate to={"/home/recommend"} />,
          },
          {
            path: "recommend",
            element: <Recommend />,
          },
          {
            path: "singers",
            element: <Singers />,
          },
          {
            path: "rank",
            element: <Rank />,
          },
        ],
      },

      {
        path: "user",
        element: <User />,
      },
      {
        path: "album/:id",
        element: <Album />,
      },
      {
        path: "singer-detail/:id",
        element: <SingerDetail />,
      },
    ],
  },

  // NotFound
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
