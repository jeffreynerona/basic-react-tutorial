import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='my-app' >
        <ItemsList/>
      </div>
    );
  }
}

class ItemsList extends Component {
  showDetails(name) {
    alert("The product "+name+" is available for free shipping");
  }

  render() {
    return(
      <div>
        <Item name="Lenovo" 
        description="Core i5 - 4gb ram - 256gb SSD" 
        price={540}
        handleShow={this.showDetails}
        />
        <Item name="Dell" 
        description="Core i7 - 8gb ram - 1tb HDD" 
        price={700}
        handleShow={this.showDetails}
        />
        <Item name="Asus" 
        description="Core i3 - 4gb ram - 512gb HDD" 
        price={429}
        handleShow={this.showDetails}
        />
      </div>
      );
  }
}

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {amount:0};
    this.buy = this.buy.bind(this);
    this.show = this.show.bind(this);
  }

  show() {
    this.props.handleShow(this.props.name);
  }

  buy() {
    this.setState({amount: this.state.amount + 1});
  }

  render() {
    return (
      <div>
          <h4>{this.props.name}</h4>

          <p>{this.props.description}</p>
          <button onClick={this.buy}>Buy</button>
          <button onClick={this.show}>Show</button>
          <span> ${this.props.price}</span>
          <span> (Cart: {this.state.amount} items.)</span>
          <hr/>
      </div>
      );
  }
}

export default App;
