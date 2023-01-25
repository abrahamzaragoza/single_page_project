import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import NotFound from "../components/shared/NotFound";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import ProductList from "./ProductsContainer";
import ProductDetailContainer from "../components/ProductDetailContainer";
import Signup from "./SignupFormContainer";
import Signin from "./SigninFormContainer";

class App extends Component {
  state = {
    currentUser: null,
  };

  componentDidMount = () => {
    this.fetchCurrentUser();
  };

  fetchCurrentUser = () => {
    axios
      .get("/api/v1/users/get_current_user.json")
      .then((response) => {
        let currentUser = response.data.currentUser || null;
        this.setCurrentUser(currentUser);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  setCurrentUser = (currentUser) => {
    this.setState({ currentUser });
  };

  handleSignout = (event, location, navigate) => {
    event.preventDefault();
    axios
      .delete("/api/v1/signout.json")
      .then((response) => {
        this.setState({
          currentUser: null,
        });
        if (location.pathname !== "/") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header
            currentUser={this.state.currentUser}
            onSignout={this.handleSignout}
          />
          <Routes>
            <Route exact path="/" element={<ProductList />} />
            <Route
              exact
              path="/products/:id/*"
              element={<ProductDetailContainer />}
            />
            <Route
              path="/register"
              element={
                <Signup
                  onFetchCurrentUser={this.fetchCurrentUser}
                  currentUser={this.state.currentUser}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Signin
                  onFetchCurrentUser={this.fetchCurrentUser}
                  currentUser={this.state.currentUser}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
