import { Html5QrcodeScanner } from "html5-qrcode";
import React from "react";

const qrcodeRegionId = "html5qr-code-full-region";
let camera = undefined;

class Html5QrcodePlugin extends React.Component {
  render() {
    return <div id={qrcodeRegionId} style={{display: 'flex', flexDirection: 'column'}}/>;
  }

  componentWillUnmount() {
    // TODO(mebjas): See if there is a better way to handle
    //  promise in `componentWillUnmount`.
    if (camera !== undefined) {
      try{
        camera.clear();
      }catch(error){
        console.error("Failed to clear html5QrcodeScanner. ", error);
      }  
    }
  }

  componentDidMount() {
    if (camera === undefined) {
      function createConfig(props) {
        var config = {};
        if (props.fps) {
          config.fps = props.fps;
        }
        if (props.qrbox) {
          config.qrbox = props.qrbox;
        }
        if (props.aspectRatio) {
          config.aspectRatio = props.aspectRatio;
        }
        if (props.disableFlip !== undefined) {
          config.disableFlip = props.disableFlip;
        }
        return config;
      }

      // var config = createConfig(this.props);
      const config = {
        fps: 100,
        // qrbox: {width: 400, height: 100},
        aspectRatio: 1.66667,
        formatsToSupport: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15, 16,
        ],
      };
      var verbose = this.props.verbose === true;

      // Suceess callback is required.
      if (!this.props.qrCodeSuccessCallback) {
        throw "qrCodeSuccessCallback is required callback.";
      }

      camera = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);

      // setTimeout(function () {
      //   if (camera.getState() === 2) {
      //     let media = camera.getRunningTrackSettings();
      //     console.log('media', JSON.stringify(media));
      //     alert(JSON.stringify(media));

      //     camera.applyVideoConstraints({
      //       focusMode: "continuous",
      //       advanced: [{ zoom: 7.0 }],
      //     });
      //   }
      // }, 2000);
    }
    camera.render(
      this.props.qrCodeSuccessCallback,
      this.props.qrCodeErrorCallback
    );
  }
}

export default Html5QrcodePlugin;


// {"aspectRatio":1.6666666666666667,"brightness":0,"colorTemperature":4600,"contrast":50,"deviceId":"9d6b22f87a7300cc3d2fd851b48bcc9746322c26d46691de7a4c159ef055ec53","exposureMode":"continuous","exposureTime":156.25,"facingMode":"user","frameRate":30,"groupId":"c13f2b94e978d05f09571eb4735b3f3227df50f94776658539259e627c98578a","height":384,"resizeMode":"crop-and-scale","saturation":50,"sharpness":50,"whiteBalanceMode":"continuous","width":640}