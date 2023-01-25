import React, { Component } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

import EditProductForm from "../containers/EditProductFormContainer";

class ProductDetailContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      edited: false,
      updated: false,
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  componentDidUpdate = () => {
    if (this.state.edited && this.state.updated) {
      this.getProduct();
    }
  };

  getProduct = () => {
    const id = this.props.params && this.props.params.id;

    axios
      .get(`/api/v1/products/${id}.json`)
      .then((response) => {
        this.setState({ product: response.data.product });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  setUpdated = (value) => {
    this.setState({ updated: value });
  };

  editingProduct = (value) => {
    if (value === undefined) {
      this.setState({ edited: true });
    } else if (value === "edited") {
      this.setState({ edited: false });
    }
  };

  isOwner = (user, product) => {
    if (Object.keys(product).length > 0) {
      return user && user.id === product.user_id;
    }
    return false;
  };

  render() {
    const id = this.props.params.id;
    const { product, currentUser } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <img
              className="img-fluid"
              src="https://via.placeholder.com/350x150"
              width="100%"
            />
          </div>

          <div className="col-md-10 offset-md-1">
            <div className="float-right">
              <h3>
                <span className="badge badge-pill badge-purple">
                  {product.price}
                </span>
              </h3>
            </div>
            <div>
              <h3>{product.name}</h3>
            </div>

            <div className="mb-4">{product.description}</div>

            {this.isOwner(this.props.currentUser, product) ? (
              <>
                <div className="float-right btn-edit-del">
                  <Link
                    to={`/products/${id}/edit`}
                    className="btn btn-outline-danger btn-lg"
                  >
                    Delete
                  </Link>
                </div>

                <div>
                  <Link
                    to={`/products/${id}/edit`}
                    className="btn btn-outline-purple btn-lg"
                  >
                    Edit
                  </Link>
                </div>
              </>
            ) : null}
          </div>
          <Routes>
            <Route
              path="edit"
              element={
                <EditProductForm
                  onEdit={this.editingProduct}
                  {...this.props}
                  onUpdate={this.setUpdated}
                />
              }
            />
          </Routes>
        </div>
      </div>
    );
  }
}

ProductDetailContainer.propTypes = {
  currentUser: PropTypes.object,
};

export default (props) => (
  <ProductDetailContainer {...props} params={useParams()} />
);
