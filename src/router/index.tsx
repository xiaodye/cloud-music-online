import { Suspense, lazy } from "react";
import Home from "@/routes/home";
import Rank from "@/routes/home/routes/rank";
import Recommend from "@/routes/home/routes/recommend";
import Singers from "@/routes/home/routes/singers";
import NotFound from "@/routes/notFound";
import User from "@/routes/user";
import { Navigate, createHashRouter } from "react-router-dom";
import App from "@/App";
import Loading from "@/baseUI/Loading";
// import { KeepAlive, AliveScope, withKeepAlive } from "@/baseUI/KeepAlive";

const Login = lazy(() => import("@/routes/login"));
const SingerDetail = lazy(() => import("@/routes/singerDetail"));
const Album = lazy(() => import("@/routes/album"));

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
        path: "/login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },

      {
        path: "user",
        element: <User />,
      },
      {
        path: "album/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <Album />
          </Suspense>
        ),
      },
      {
        path: "singer-detail/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <SingerDetail />
          </Suspense>
        ),
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
