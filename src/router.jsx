import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Default from "./layout/Default";
import NotFound from "./pages/NotFound";
import MainPage from "./pages/MainPage";
import TeamSelectPage from "./pages/TeamSelectPage";
import BoardPage from "./pages/BoardPage";
import { BoardPageLoader, detailPageLoader } from "./loaders/postLoaders";
import DetailPage from "./pages/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "/home", element: <MainPage /> },
      { path: "/team-selection", element: <TeamSelectPage /> },
      { path: "/board", element: <BoardPage />, loader: BoardPageLoader},
      {
        path: "board/:postId",
        element: <DetailPage />,
        loader: detailPageLoader,
      },
    ],
  },
]);

export default router;
