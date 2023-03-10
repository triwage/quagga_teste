import React, { useCallback, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import Quagga from "@ericblade/quagga2";
import { validarBoleto } from "@mrmgomes/boleto-utils";
import './forced.css';

function getMedian(arr) {
  arr.sort((a, b) => a - b);
  const half = Math.floor(arr.length / 2);
  if (arr.length % 2 === 1) {
    return arr[half];
  }
  return (arr[half - 1] + arr[half]) / 2;
}

function getMedianOfCodeErrors(decodedCodes) {
  const errors = decodedCodes
    .filter((x) => x.error !== undefined)
    .map((x) => x.error);
  const medianOfErrors = getMedian(errors);
  return medianOfErrors;
}

const defaultConstraints = {
          width: 640,
          height: 480,
          // width: {min: 800},
          // height: {min: 600},
          // facingMode: "environment",
          // aspectRatio: {min: 1, max: 2}
};

const defaultLocatorSettings = {
  halfSample: true,
  patchSize: "medium", // x-small, small, medium, large, x-large
  // debug: {
  //   showCanvas: false,
  //   showPatches: false,
  //   showFoundPatches: false,
  //   showSkeleton: false,
  //   showLabels: false,
  //   showPatchLabels: false,
  //   showRemainingPatchLabels: false,
  //   boxFromPatches: {
  //     showTransformed: false,
  //     showTransformedBox: false,
  //     showBB: false
  //   }
  // }  
};

// const defaultDecoders = ["i2of5_reader", "2of5_reader", "ean_reader","ean_8_reader","code_39_reader","code_39_vin_reader","codabar_reader","","upc_reader","upc_e_reader","code_93_reader"];
// const defaultDecoders = ["i2of5_reader", "2of5_reader"];
const defaultDecoders = [{
  format: "i2of5_reader",
  config: {
      supplements: [
          '2of5_reader'
      ]
  }
}]

const ScannerQuagga2 = ({
  onDetected,
  scannerRef,
  onScannerReady,
  cameraId,
  facingMode,
  constraints = defaultConstraints,
  locator = defaultLocatorSettings,
  numOfWorkers = navigator.hardwareConcurrency || 0,
  decoders = defaultDecoders,
  locate = true,
}) => {
  const errorCheck = useCallback(
    (result) => {
      if (!onDetected) {
        return;
      }
      const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
      // if Quagga is at least 75% certain that it read correctly, then accept the code.
      if (err < 0.25) {
      onDetected(result.codeResult.code);
      }
    },
    [onDetected]
  );

  const handleProcessed = (result) => {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;
    drawingCtx.font = "24px Arial";
    drawingCtx.fillStyle = "green";

    if (result) {
      // console.warn("* quagga onProcessed", result);
      const boletoValido = validarBoleto(result.codeResult.code);
      let elemento = document.getElementById("resultado");
      if (boletoValido.sucesso) {
        const data = new Date().toLocaleString();
        elemento.innerText =
          `??ltimo sucesso ${data} : => ` + boletoValido.mensagem;
        drawingCtx.font = "24px Arial";
        drawingCtx.fillText(result.codeResult.code, 10, 20);
        // } else {
        // elemento.innerText = "";
      }
      if (result.boxes) {
        drawingCtx.clearRect(
          0,
          0,
          parseInt(drawingCanvas.getAttribute("width")),
          parseInt(drawingCanvas.getAttribute("height"))
        );
        result.boxes
          .filter((box) => box !== result.box)
          .forEach((box) => {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
              color: "purple",
              lineWidth: 2,
            });
          });
      }
      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
          color: "blue",
          lineWidth: 2,
        });
      }
      if (result.codeResult && result.codeResult.code && boletoValido.sucesso) {
        drawingCtx.font = "24px Arial";
        drawingCtx.fillText(result.codeResult.code, 10, 20);
        // const validated = barcodeValidator(result.codeResult.code);
        // const validated = validateBarcode(result.codeResult.code);
        // Quagga.ImageDebug.drawPath(result.line, { x: "x", y: "y" }, drawingCtx, { color: validated ? "green" : "red", lineWidth: 3 });
        // drawingCtx.fillStyle = validated ? "green" : "red";
        // drawingCtx.fillText(`${result.codeResult.code} valid: ${validated}`, 10, 50);
        // if (validated) {
        //     onDetected(result);
        // }
      }
    }
  };
  useLayoutEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 480,
            facing: "environment" // or user
          },
          numOfWorkers: 2,
          target: scannerRef.current,
        },
        locator:{
          patchSize: 'medium',
          halfSample: true
        },
        numOfWorkers: 2,
        decoder: { readers: ["2of5_reader", "i2of5_reader"] },
        locate: true,
      },
      (err) => {
        Quagga.onProcessed(handleProcessed);

        if (err) {
          return console.log("Error starting Quagga:", err);
        }
        if (scannerRef && scannerRef.current) {
          Quagga.start();
          if (onScannerReady) {
            onScannerReady();
          }
        }
      }
    );
    Quagga.onDetected(errorCheck);
    return () => {
      Quagga.offDetected(errorCheck);
      Quagga.offProcessed(handleProcessed);
      Quagga.stop();
    };
  }, [
    cameraId,
    onDetected,
    onScannerReady,
    scannerRef,
    errorCheck,
    constraints,
    locator,
    decoders,
    locate,
  ]);
  return null;
};

ScannerQuagga2.propTypes = {
  onDetected: PropTypes.func.isRequired,
  scannerRef: PropTypes.object.isRequired,
  onScannerReady: PropTypes.func,
  cameraId: PropTypes.string,
  facingMode: PropTypes.string,
  constraints: PropTypes.object,
  locator: PropTypes.object,
  numOfWorkers: PropTypes.number,
  decoders: PropTypes.array,
  locate: PropTypes.bool,
};

export default ScannerQuagga2;
