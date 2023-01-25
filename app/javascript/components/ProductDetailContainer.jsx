import React, { Component } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
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

  handleDelete = (event) => {
    event.preventDefault();
    this.handleProductDelete(this.props.params.id);
  };

  handleProductDelete = (id) => {
    axios
      .delete(`/api/v1/products/${id}.json`)
      .then((response) => {
        this.props.navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getProduct = () => {
    const id = this.props.params && this.props.params.id;

    axios
      .get(`/api/v1/products/${id}.json`)
      .then((response) => {
        this.setState({ product: response.data.product });
      })
      .catch((error) => {
        this.props.navigate("/", {
          state: { error: error.response.data.errors },
        });
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
    const { product } = this.state;

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

            {this.isOwner(this.props.currentUser, product) &&
            !this.state.edited ? (
              <>
                <div className="float-right btn-edit-del">
                  <a
                    href={`/products/${id}/edit`}
                    className="btn btn-outline-danger btn-lg"
                    onClick={this.handleDelete}
                  >
                    Delete
                  </a>
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
          {this.isOwner(this.props.currentUser, product) ? (
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
          ) : null}
        </div>
      </div>
    );
  }
}

ProductDetailContainer.propTypes = {
  currentUser: PropTypes.object,
};

export default (props) => {
  let navigate = useNavigate();
  return (
    <ProductDetailContainer
      {...props}
      params={useParams()}
      navigate={navigate}
    />
  );
};
