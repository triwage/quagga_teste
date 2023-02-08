import { Outlet } from "react-router-dom";

export default function Root() {
    return (
      <>
        <div id="sidebar">
          <h1>Exemplos de camera</h1>
          <nav>
            <ul>
            <li>
                <a href={`/i2of5_reader`}>i2of5_reader</a>
              </li>
              <li>
                <a href={`/2of5_reader`}>2of5_reader</a>
              </li>
              <li>
                <a href={`/quaggar2`}>Quaggar2</a>
              </li>
              <li>
                <a href={`/html5qrcodeplugin`}>HrmlQrCodePlugin</a>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail"><Outlet /></div>
      </>
    );
  }