import React, { Component } from "react";
import Product from "../components/products/Product";
import axios from "axios";
import Jumbotron from "../components/products/Jumbotron";
import NewProductForm from "../components/products/NewProductForm";

class ProductList extends Component {
  state = {
    products: [],
  };

  componentDidMount = () => {
    this.loadProductsFromServer();
  };

  loadProductsFromServer = () => {
    axios
      .get("/api/v1/products.json")
      .then((response) => {
        const { products } = response.data;
        this.setState({ products });
      })
      .catch((err) => console.log(err.response.data));
  };

  handleProductSubmit = (data) => {
    const newProduct = {
      product: { ...data }
    };

    axios
      .post("/api/v1/products.json", newProduct)
      .then((response) => {
        const newProducts = [ ...this.state.products, response.data.product ]
        this.setState({ products: newProducts });
      })
      .catch((err) => console.log(err));

    console.log(data);
  };

  render() {
    const { products } = this.state;
    const productList = products.map((product) => (
      <Product key={product.id} product={product} />
    ));

    console.log(this.state);

    return (
      <>
        <Jumbotron />
        <NewProductForm onSubmit={this.handleProductSubmit} />
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
