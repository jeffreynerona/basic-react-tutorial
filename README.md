# Basic React Tutorial
[![status|inprogress](http://jeffreynerona.com/badges/status-inprogress.svg)](http://jeffreynerona.com/projects) [![type|practice-project](http://jeffreynerona.com/badges/type-practiceproject.svg)](http://jeffreynerona.com/projects/) [![language|ruby](http://jeffreynerona.com/badges/language-javascript.svg)](http://jeffreynerona.com/projects/javascript)

A basic react tutorial bootstraped with create-react app

## Setup
Install node<br>
Install create-react-app<br>
Generate your starting files
```
create-react-app my-app
```
After creation, your project should look like this:
```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```
In the project directory, you can run:
### `npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### Try editing some files
To get started, open app.js with your favorite editor<br>
We're building our own app so delete everything inside return()<br>
Then add a div with className .my-app
```
class App extends Component {
  render() {
    return (
      <div className='my-app' >
        
      </div>
    );
  }
}
```

Let's change some styling...<br>
Open App.css and delete everything inside.<br>
Add the class .my-app

```
.my-app {
  font-size: large;
  display: block;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
```

## Creating new Components
Create a new component Item
```
...
class App extends Component {
  render() {
    return (
      <div className='my-app' >
        
      </div>
    );
  }
}

class Item extends Component {
  render() {
    return (
      <div>
          <h4>Laptop</h4>
          <p>Core i7 - 8gb ram - 256gb SSD</p>
          <button>Buy</button>
          <span> $500</span>
      </div>
      );
  }
}

export default Apps
```

Then render it inside the component app
```
...
class App extends Component {
  render() {
    return (
      <div className='my-app' >
        <Item/>
      </div>
    );
  }
}
...
```
## Functions and Events
For the button to work, let's create a new function buy inside the Item component.

```
...
class Item extends Component {
  buy() {
    alert('The button works!');
  }

  render() {
    return (
...
...
```

Then update the button buy to call the function:

```
<div>
          <h4>Laptop</h4>
          <p>Core i7 - 8gb ram - 256gb SSD</p>
          <button onClick={this.buy}>Buy</button>
          <span> $500</span>
</div>
```

Go ahead and test the button if it works.

## States
To initialize a state, we need a constructor.<br> 
Make one above the function buy.

```
...
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {amount:0};
  }

  buy() {
  ...
```

Display it in the Item render:
```
...
<div>
  <h4>Laptop</h4>
  <p>Core i7 - 8gb ram - 256gb SSD</p>
  <button onClick={this.buy}>Buy</button>
  <span> $500</span>
  <span> (Cart: {this.state.amount} items.)</span>
  <hr/>
</div>
...
```

Then update the buy function to update the state on each click:

```
buy() {
    this.setState({amount: this.state.amount + 1});
  }
```

Save... Run..
And... you should get this error: 
`TypeError: Cannot read property 'setState' of null`

To fix this, bind the function you made to the component.
```
...
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {amount:0};
    this.buy = this.buy.bind(this);
  }

  buy() {
...
```
Save... and it should work now.

## Reusing Components
The best thing about components is that they're reusable. <br>
Lets create a new component named ItemsList with three items inside.
```
...
class ItemsList extends Component {
  render() {
    return(
      <div>
        <Item/>
        <Item/>
        <Item/>
      </div>
      );
  }
}
...
```
Update your App component to render ItemsList

```
...
class App extends Component {
  render() {
    return (
      <div className='my-app' >
        <ItemsList/>
      </div>
    );
  }
}
...
```


## Props - Passing Data to Child Components
When creating the Item component inside the ItemsList, we can pass in options that can later be used by the component.
#### Data
Update your ItemsList:
```
...
class ItemsList extends Component {
  render() {
    return(
      <div>
        <Item name="Lenovo" 
        description="Core i5 - 4gb ram - 256gb SSD" 
        price={540}/>
        <Item name="Dell" 
        description="Core i7 - 8gb ram - 1tb HDD" 
        price={700}/>
        <Item name="Asus" 
        description="Core i3 - 4gb ram - 512gb HDD" 
        price={429}/>
      </div>
      );
  }
}
...
```
Have your Item Component render these items based on the passed properties:
```
...
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {amount:0};
    this.buy = this.buy.bind(this);
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
...
```

#### Function
Aside from data, you can also pass functions with props.<br>
Inside ItemsList, create the function showDetails.
```
...
class ItemsList extends Component {
  showDetails(name) {
    alert("This item "+name+" is available for free shipping");
  }

  render() {
...
```
Pass it in a prop called handleShow on each of your Items
```
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
```
Inside the item component, let's add a new button show with an onClick function.
```
<div>
    <h4>{this.props.name}</h4>

    <p>{this.props.description}</p>
    <button onClick={this.buy}>Buy</button>
    <button onClick={this.show}>Show</button>
    <span> ${this.props.price}</span>
    <span> (Cart: {this.state.amount} items.)</span>
    <hr/>
</div>
```

Then create the function show in the Item component to catch the function we passed on the props. Dont forget to bind the show function.
```
...
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
...
```

# Up Next:
## Passing Data between child components
The next thing we would want to do is calculate the total worth of the items in the cart.<br>
To do this, we need to create a new component Total with a value from props total.
```
...
class Total extends Component {
  render() {
    return (
      <div>
        <h3>Total: ${this.props.total}</h3>
      </div>
    )
  }
}
...
```
We will be getting this value from the ItemList component, so let's create a constructor in it with a total : 0
```
...
class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {total:0}
  }
...
```
Let's also create a function calculate that takes in a price to recalculate the new total
```
...
class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {total:0}
  }

  calculate(price) {
    this.setState({total: this.state.total+price});
  }
...
```
Now, render the total in the ItemList while passing in the state total as props, and pass the function calculate to each of the Items
```
...
<div>
        <Item name="Lenovo" 
        description="Core i5 - 4gb ram - 256gb SSD" 
        price={540}
        handleShow={this.showDetails}
        handleTotal={this.calculate}
        />
        <Item name="Dell" 
        description="Core i7 - 8gb ram - 1tb HDD" 
        price={700}
        handleShow={this.showDetails}
        handleTotal={this.calculate}
        />
        <Item name="Asus" 
        description="Core i3 - 4gb ram - 512gb HDD" 
        price={429}
        handleShow={this.showDetails}
        handleTotal={this.calculate}
        />
        <Total total={this.state.total}/>
      </div>
...
```
Don't forget to bind the calculate function to the ItemList
```
...
class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {total:0};
    this.calculate = this.calculate.bind(this);
  }
...

```

Update your buy function in the item to use the props handleTotal
```
...

buy() {
    this.setState({amount: this.state.amount + 1});
    this.props.handleTotal(this.props.price);
  }
...
```

Try buying some items...


## Handling Arrays
...

## Handling Forms
...