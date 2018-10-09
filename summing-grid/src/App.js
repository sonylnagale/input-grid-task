import React, { Component } from 'react';
import './App.css';

const numeral = require('numeral');

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid />
      </div>
    );
  }
}

class Grid extends Component {
  constructor() {
    super();
    this.cells = 3;
    this.list = new Array(this.cells);
    this.state = {sum: 0};
  }

  onValueChange = (val, index) => {
    this.list[index] = val;
    let sum = 0;
    this.list.forEach(function(value) {
      sum += Number(value);
    });
    this.sum = sum;

    this.setState({sum: sum});

    return sum;
  }

  createGrid = () => {
    let grid = [];

    for (let i = 0; i < this.cells; i++) {
      grid.push(<Cell key={i} index={i} onValueChange={this.onValueChange} />);
    }

    return grid;
  }

  render() {
    return (
      <div className="App-grid">
        {this.createGrid()}
        <Result sum={this.state.sum} />
      </div>
    )
  }
}

class Cell extends Component {
  constructor(props) {
    super(props);
    this.index = props.index;
    this.state = {sum: 0};
  }

  handleChange(event) {
    this.setState({sum: event.target.value});
    this.props.onValueChange(event.target.value,this.index);
  }

  render() {
    return <div className="App-cell">
      <input type="text" className="App-input" value={this.state.value}
  onChange={this.handleChange.bind(this)}/>
      </div>
  }
}

class Result extends Cell {
  constructor(props) {
    super(props);
    this.state = {sum: this.state.sum};
  }

  componentWillReceiveProps(props) {
    this.formatNumber(props.sum);
    this.setState({sum: props.sum});

  }

  formatNumber = (val) => {
    val = numeral(val).format('0.00a');
    let size = val.replace(/[0-9.]/g, '');
    let value = Number(val.replace(/[a-zA-Z]/g, ''));
    let num = Math.round(value*100) / 100;

    return num + size;

  }


  render() {

    return <div className="App-cell result">
            <input type="text" className="App-input" disabled value={this.formatNumber(this.state.sum)} />
          </div>
  }
}

export default App;
