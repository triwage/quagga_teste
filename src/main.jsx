import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import ErrorPage from "./error-page";
import "./index.css"
import Html5QrCodePluginPage from "./routes/html5qrcodeplugin";
import Quaggar2Page from "./routes/quaggar2";
import QuaggarPage from "./routes/quagga";
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />    
  },
  {
    path: "teste",
    element: <QuaggarPage />,
  },
  {
    path: "quaggar2",
    element: <Quaggar2Page />,
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
