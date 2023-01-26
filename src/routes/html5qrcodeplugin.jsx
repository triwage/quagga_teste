import { string } from "prop-types";
import React, { Component } from "react";
import Html5QrcodePlugin from "../components/Html5QrCodePlugin";

class Html5QrCodePluginPage extends Component {
  state = {
    codigo: '',
  };

  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback.
    this.onNewScanResult = this.onNewScanResult.bind(this);
  }
  render() {
    const {codigo} = this.state;
    return (
      <div>
        <h1>{codigo !== '' ? codigo : <>Html5Qrcode React example!</>} </h1>
        <Html5QrcodePlugin
          fps={20}
          disableFlip={true}
          qrCodeSuccessCallback={this.onNewScanResult}
        />
      </div>
    );
  }
  onNewScanResult(decodedText, decodedResult) {
    this.setState({codigo: decodedText});
    console.log("decodedText", decodedText);
    console.log("decodedResult", decodedResult);
  }
}

export default Html5QrCodePluginPage;
