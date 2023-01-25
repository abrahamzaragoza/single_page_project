import React, { Component } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import EditProductForm from "../containers/EditProductFormContainer";
import CommentList from "../components/comments/CommentList";

class ProductDetailContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      edited: false,
      updated: false,
      comments: [],
      saved: false,
      serverErrors: [],
    };
  }

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

  componentDidMount() {
    this.getProductAndComment();
  }

  componentDidUpdate = () => {
    if (this.state.edited && this.state.updated) {
      this.getProductAndComment();
    }
  };

  getProductAndComment = () => {
    const id = this.props.params && this.props.params.id;

    if (id) {
      axios
        .all([
          axios.get(`/api/v1/products/${id}.json`),
          axios.get(`/api/v1/products/${id}/comments.json`),
        ])
        .then(
          axios.spread((productResponse, commentsResponse) => {
            this.setState({
              product: productResponse.data.product,
              comments: commentsResponse.data.comments,
            });
          })
        )
        .catch((error) => {
          this.props.navigate("/", {
            state: { error: error.response.data.errors },
          });
        });
    }
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

  resetSaved = () => {
    this.setState({
      saved: false,
      serverErrors: [],
    });
  };

  handleCommentSubmit = (data) => {
    const id = +this.props.params.id;
    axios
      .post(`/api/v1/products/${id}/comments.json`, data)
      .then((response) => {
        const comments = [response.data.comment, ...this.state.comments];
        this.setState({ comments });
      })
      .catch((error) => {
        this.setState({ serverErrors: error.response.data });
      });
  };

  render() {
    const id = this.props.params.id;
    const { product } = this.state;
    const { currentUser } = this.props;

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

        <hr />
        {!this.state.edited && (
          <CommentList
            comments={this.state.comments}
            onCommentSubmit={this.handleCommentSubmit}
            serverErrors={this.state.serverErrors}
            saved={this.state.saved}
            onresetSaved={this.resetSaved}
            currentUser={currentUser}
          />
        )}
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
