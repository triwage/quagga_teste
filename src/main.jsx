import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import ErrorPage from "./error-page";
import "./index.css"
import Html5QrCodePluginPage from "./routes/html5qrcodeplugin";
import QuaggarPage from "./routes/quaggar";
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />    
  },
  {
    path: "quaggar",
    element: <QuaggarPage />,
  },
  {
    path: "html5qrcodeplugin",
    element: <Html5QrCodePluginPage />,
  },  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
