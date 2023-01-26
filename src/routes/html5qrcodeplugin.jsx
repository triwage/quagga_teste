import React, { Component } from "react";
import Html5QrcodePlugin from "../components/Html5QrCodePlugin";
import { validarBoleto } from "@mrmgomes/boleto-utils"

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
          fps={10}
          disableFlip={true}
          verbose={true}
          qrbox={600}
          aspectRatio={1.77776}
          qrCodeSuccessCallback={this.onNewScanResult}
        />
      </div>
    );
  }
  onNewScanResult(decodedText, decodedResult) {
    const boletoValido = validarBoleto(decodedText)
    if (boletoValido.sucesso) {
        const data = (new Date()).toLocaleString();
        this.setState({codigo: `Último sucesso ${data} : => ${boletoValido.mensagem}`});
    }
    console.log("decodedText", decodedText);
    console.log("decodedResult", decodedResult);
  }
}

export default Html5QrCodePluginPage;
