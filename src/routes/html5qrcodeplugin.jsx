import React, { Component } from "react";
import Html5QrcodePlugin from "../components/Html5QrCodePlugin";

class Html5QrCodePluginPage extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback.
    this.onNewScanResult = this.onNewScanResult.bind(this);
  }
  render() {
    return (
      <div>
        <h1>Html5Qrcode React example!</h1>
        <Html5QrcodePlugin
          fps={20}
          qrbox={300}
          disableFlip={false}
          qrCodeSuccessCallback={this.onNewScanResult}
        />
      </div>
    );
  }
  onNewScanResult(decodedText, decodedResult) {
    console.log("decodedText", decodedText);
    console.log("decodedResult", decodedResult);
  }
}

export default Html5QrCodePluginPage;
