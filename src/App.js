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
  constructor(props) {
    super(props);
    this.state = {total: 0,
      items: [
      {name:"Lenovo",description:"Core i5 - 4gb ram - 256gb SSD", price: 540},
      {name:"Dell",description:"Core i7 - 8gb ram - 1tb HDD",  price: 700},
      {name:"Asus",description:"Core i3 - 4gb ram - 512gb HDD",  price: 429}
      ]
    }
    this.calculate = this.calculate.bind(this);
    this.createItem = this.createItem.bind(this);
  }

  createItem(item) {
    this.setState({
      items: this.state.items.concat(item)
    });
  }

  calculate(price) {
    this.setState({total: this.state.total+price});
  }

  showDetails(name) {
    alert("The product "+name+" is available for free shipping");
  }

  render() {
    var theThis = this;
    var items = this.state.items.map(function(item) {
      return(
          <Item name={item.name} description={item.description} price={item.price}
         handleShow={theThis.showDetails}
        handleTotal={theThis.calculate}
         />
        );
    });
    return(
      <div>
        {items}
        <Total total={this.state.total}/>
        <ItemForm handleCreate={this.createItem}/>
      </div>
      );
  }
}

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    var item = {
      name: this.refs.name.value,
      description: this.refs.description.value,
      price: parseInt(this.refs.price.value) || 0
    }
    this.props.handleCreate(item);

    this.refs.name.value = "";
    this.refs.description.value = "";
    this.refs.price.value = "";
  }

  render() {
    return (
      <form onSubmit = {this.submit}>
        <input type="text" placeholder="Item Name" ref="name" />
        <input type="text" placeholder="Item Description" ref="description" />
        <input type="text" placeholder="Item Price" ref="price" />
        <br/>
        <button>Create</button>
        <hr/>
      </form>
      );
  }
}

class Total extends Component {
  render() {
    return (
      <div>
        <h3>Total: ${this.props.total}</h3>
      </div>
    )
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
    this.props.handleTotal(this.props.price);
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
