import React, {Component} from 'react';
import './App.css';
import Products from './components/Products';
import Filter from "./components/Filter";
import Basket from "./components/Basket";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { size: "", sort: "", products:[], filteredProducts: [], cartItems: []};
  }

  componentWillMount() {
    fetch("http://localhost:8000/products").then(res => res.json())
    .then(data => this.setState({ products: data, filteredProducts: data }));
    
    if (localStorage.getItem("cartItems")) {
      this.setState({ cartItems: JSON.parse(localStorage.getItem("cartItems"))
      });
    }
  }

    listProducts = () => {
      this.setState(state => {
        if (state.sort !== "") {
          state.products.sort((a, b) => state.sort === "lowestprice"
              ? a.price > b.price ? 1 : -1 : a.price < b.price ? 1: -1
          );
        } else {
          state.products.sort((a, b) => (a.id > b.id ? 1 : -1));
        }
        if (state.size !== "") {
          return {
            filteredProducts: state.products.filter(
              a => a.availableSizes.indexOf(state.size.toUpperCase()) >= 0
            )
          };
        }
        return { filteredProducts: state.products };
      });
    };

    handleSortChange = e => {
      this.setState({ sort: e.target.value });
      this.listProducts();
    };

    handleSizeChange = e => {
      this.setState({ size: e.target.value });
      this.listProducts();
    };

    handleAddToCart = (e, product) => {
      this.setState(state => {
        const cartItems = state.cartItems;
        let productAlreadyInCart = false;
  
        cartItems.forEach(item => {
          if (item.id === product.id) {
            item.count += 1;
            productAlreadyInCart = true;
          }
        });
  
        if (!productAlreadyInCart) {
          cartItems.push({ ...product, count: 1 });
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        return { cartItems: cartItems };
      });
    };  

    handleRemoveFromCart = (e, product) => {
      this.setState(state => {
        let cartItems = state.cartItems
        let index;
        let item = state.cartItems.find((a, i) => {
          index = i
          return a.id === product.id}
          );
        if (item.count > 1) {        
          cartItems[index].count = cartItems[index].count - 1
        } else {
          cartItems = cartItems.filter(a => a.id !== product.id)
        }
 
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        return { cartItems: cartItems };
      });
    };
  
  
      render() {
        return (
    <div className="container">
      <h1 class="text-primary">E-Commerce Shopping Store Application</h1>
      <hr/>
      
      <div className="row">
        
        <Filter
              count={this.state.filteredProducts.length}
              handleSortChange={this.handleSortChange}
              handleSizeChange={this.handleSizeChange}
            />
            </div>

            <hr />

        <div className="row">

          <div className="column col-md-8"> 
          <Products 
          products={this.state.filteredProducts} 
          handleAddToCart={this.handleAddToCart}/>
        </div>

        <div className="column col-md-4">
        
            <Basket
              cartItems={this.state.cartItems}
              handleRemoveFromCart={this.handleRemoveFromCart}
            />
        </div>
      </div>
    </div>
    
  );
}
}

export default App;
