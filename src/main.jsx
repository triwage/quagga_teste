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
import Quaggar1Page from "./routes/quagga1";
import QuaggarPage from "./routes/quagga";
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />    
  },
  {
    path: "i2of5_reader",
    element: <QuaggarPage />,
  },
  {
    path: "2of5_reader",
    element: <Quaggar1Page />,
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
