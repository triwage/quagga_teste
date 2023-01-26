import { Outlet } from "react-router-dom";

export default function Root() {
    return (
      <>
        <div id="sidebar">
          <h1>Exemplos de camera</h1>
          <nav>
            <ul>
              <li>
                <a href={`/quaggar`}>Quaggar</a>
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