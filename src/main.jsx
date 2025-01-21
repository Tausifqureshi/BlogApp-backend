import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./ReduxStore/store.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRouted, Login } from "./components/index.js";
import Home from "./Pages/Home.jsx";
import AddPost from "./pages/AddPost";
import Signup from "./pages/Signup";
import EditPost from "./pages/EditPost";
import Post from "./Pages/Post";
import AllPosts from "./pages/AllPosts";

import Text from '../Text.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <ProtectedRouted authentication={false}>
            <Login />
          </ProtectedRouted>
        ),
      },
      {
        path: "/signup",
        element: (
          <ProtectedRouted authentication={false}>
            <Signup />
          </ProtectedRouted>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <ProtectedRouted authentication>
            {" "}
            <AllPosts />
          </ProtectedRouted>
        ),
      },
      {
        path: "/add-post",
        element: (
          <ProtectedRouted authentication>
            {" "}
            <AddPost />
          </ProtectedRouted>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <ProtectedRouted authentication>
            {" "}
            <EditPost />
          </ProtectedRouted>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      }, 
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
     {/* <App />   */}
    {/* <Text /> */}
    <RouterProvider router={router} />
  </Provider>
);
    