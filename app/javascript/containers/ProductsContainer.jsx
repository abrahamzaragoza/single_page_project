import React, { Component } from "react";
import Product from "../components/products/Product";
import axios from "axios";
import Jumbotron from "../components/products/Jumbotron";

class ProductList extends Component {
  state = {
    products: [],
  };

  componentDidMount = () => {
    this.loadProductsFromServer();
  }

  loadProductsFromServer = () => {
    axios
      .get("/api/v1/products.json")
      .then((response) => {
        const { products } = response.data;
        this.setState({ products });
      })
      .catch((err) => console.log(err.response.data));
  }

  render() {
    const { products } = this.state;
    const productList = products.map((product) => (
      <Product key={product.id} product={product} />
    ));

    console.log(this.state);

    return (
      <>
        <Jumbotron />
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-2">
              <div className="row">
                <div className="card-deck">{productList}</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ProductList;
