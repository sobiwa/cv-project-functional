import { Component } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main'
import './App.css';

export default class App extends Component {

  printPage = () => {
    window.print();
  }
  render() {
    return (
    <div id='section-to-print' className="App">
      <Main />
      {/* <button onClick={this.printPage}>Print</button> */}

    </div>
    );
  }
}
