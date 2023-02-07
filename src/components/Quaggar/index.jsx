// @ts-nocheck
import { useState, useRef } from "react";

import Result from "./Result";
import Scanner from "./Scanner";

import DeviceOrientation, { Orientation } from "react-screen-orientation";

const Quaggar = () => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState([]);
  const scannerRef = useRef(null);

  function handleOpenScanning() {
    document.documentElement.requestFullscreen();

    void window.screen.orientation.lock("landscape");
    setScanning(!scanning);
  }

  return (
    // @ts-expect-error
    <DeviceOrientation lockOrientation={"landscape"}>
      <Orientation orientation={"landscape"} alwaysRender={false}>
        <div className="h-screen w-screen">
          <button onClick={handleOpenScanning}>
            {scanning ? "Stop" : "Start"}
          </button>
          <ul className="results">
            {results.map(
              (result) =>
                result.codeResult && (
                  <Result key={result.codeResult.code} result={result} />
                )
            )}
          </ul>
          <div
            id="interactive"
            className="viewport"
            ref={scannerRef}
            style={{ position: "relative" }}
          >
            {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
            <canvas
              className="drawingBuffer"
              style={{
                position: "absolute",
                top: "0px",
              }}
            />
            {scanning ? (
              <Scanner
                scannerRef={scannerRef}
                onDetected={(result) => setResults([...results, result])}
                facingMode="environment"
              />
            ) : null}
          </div>
        </div>
      </Orientation>
    </DeviceOrientation>
  );
};

export default Quaggar;
