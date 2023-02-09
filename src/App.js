import { Component } from 'react';
import Main from './components/Main';
import printIcon from './assets/print.svg';
import './App.css';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Main />
        <button
          className="print-button"
          onClick={() => window.print()}
          type="button"
        >
          <img src={printIcon} alt="print pages" />
        </button>
      </div>
    );
  }
}
