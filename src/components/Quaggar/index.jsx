import React, { useState, useRef, useEffect } from "react";
import Scanner from "./Scanner";
import Result from "./Result";

const Quaggar = () => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState([]);
  const scannerRef = useRef(null);
  return (
    <div>
      <button onClick={() => setScanning(!scanning)}>
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
        id="interactive" className="viewport"
        ref={scannerRef}
        style={{ position: "relative", border: "3px solid red" }}
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
  );
};

export default Quaggar;
