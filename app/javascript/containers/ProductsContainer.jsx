import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import ErrorMessagesHOC from "../components/shared/ErrorMessagesHOC";
import Product from "../components/products/Product";
import Jumbotron from "../components/products/Jumbotron";
import NewProductForm from "../components/products/NewProductForm";

class ProductList extends React.Component {
  state = {
    products: [],
    serverErrors: [],
    saved: false,
    isFormVisible: false,
  };

  componentDidMount = () => {
    this.loadProductsFromServer();
  };

  componentDidUpdate = () => {
    if (!this.state.flash && this.props.location.state) {
      const flashMsg = this.props.location.state.error;
      this.setState({ flash: flashMsg });
    }
  };

  loadProductsFromServer = () => {
    axios
      .get("/api/v1/products.json")
      .then((response) => {
        const { products } = response.data;
        this.setState({ products });
      })
      .catch((error) => console.log(error.response.data));
  };

  handleProductSubmit = (data) => {
    const newProduct = {
      product: {
        ...data,
      },
    };

    axios
      .post("/api/v1/products.json", newProduct)
      .then((response) => {
        const newProducts = [...this.state.products, response.data.product];
        this.setState({ products: newProducts, serverErrors: [], saved: true });
      })
      .catch((error) => {
        const msjs = [...error.response.data];
        let currentErrors = [...this.state.serverErrors];
        msjs.forEach((msj) => {
          if (!currentErrors.includes(msj)) {
            currentErrors = [...currentErrors, msj];
          }
        });
        this.setState({ serverErrors: currentErrors });
      });
  };

  handleButtonClick = () => {
    this.setState({
      isFormVisible: !this.isFormVisible,
    });
  };

  resetSaved = () => {
    this.setState({
      saved: false,
      serverErrors: [],
    });
  };

  render() {
    const products = this.state.products;
    const productList = products.map((product) => {
      return <Product key={product.id} product={product} />;
    });

    return (
      <>
        <Jumbotron />
        {this.state.flash && (
          <div className="row">
            <ErrorMessagesHOC
              errors={[this.state.flash]}
              flash={true}
              colWidth="col-md-12 offset-md-1"
            />
          </div>
        )}

        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-2">
              <button
                className="btn btn-outline-purple btn-sm"
                onClick={this.handleButtonClick}
              >
                + New Product
              </button>
            </div>
          </div>
        </div>

        {this.state.isFormVisible && (
          <NewProductForm
            onSubmit={this.handleProductSubmit}
            serverErrors={this.state.serverErrors}
            saved={this.state.saved}
            onResetSaved={this.resetSaved}
          />
        )}

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

export default () => {
  const location = useLocation();
  return <ProductList location={location} />;
};
