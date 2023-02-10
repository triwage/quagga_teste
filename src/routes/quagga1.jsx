import React, { Component } from 'react';
import Quagga from 'quagga';
import { validarBoleto } from '@mrmgomes/boleto-utils';

class Scanner extends Component {
  componentDidMount = () => {
    if (!document.fullscreenElement) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        document.documentElement.requestFullscreen();
  
        void window.screen.orientation.lock("landscape");
      }
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: 640,
            height: 480,
            facing: 'environment', // or user
          },
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 2,
        decoder: {
          readers: ['2of5_reader'],
        },
        locate: true,
      },
      function (err) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(this._onDetected);
  };

  componentWillUnmount = () => {
    Quagga.offDetected(this._onDetected);
  };

  _onDetected = (result) => {
    this.props.onDetected(result);
  };

  render() {
    return <div id="interactive" className="viewport" />;
  }
}

class Result extends Component {
  render() {
    const result = this.props.result;

    if (!result) {
      return null;
    }
    return (
      <li>
        {result.linhaDigitavel}
      </li>
    );
  }
}

class Quaggar1Page extends Component {
  state = {
    scanning: false,
    results: [],
  };

  _scan = () => {
    this.setState({ scanning: !this.state.scanning });
  };

  _onDetected = (result) => {
    console.log(result);
    const boletoValido = validarBoleto(result.codeResult.code);
    if (boletoValido.sucesso) {
      console.log(result.codeResult.code);
      this.setState({ results: this.state.results.concat([boletoValido]) });
    }
  };

  render() {
    return (
      <div>
        <button onClick={this._scan}>
          {this.state.scanning ? 'Stop' : 'Start'}
        </button>
        <ul className="results">
          {this.state.results.map((result) => (
            <Result key={result.linhaDigitavel} result={result} />
          ))}
        </ul>
        {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}
      </div>
    );
  }
}

export default Quaggar1Page;
