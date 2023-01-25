import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/shared/Button";
import SignupForm from "../components/shared/Form";
import Input from "../components/shared/Input";
import axios from "axios";
import {
  EMAIL_REGEX,
  verifyAndSetFieldErrors,
} from "../shared/helpers";
import ErrorMessages from "../components/shared/ErrorMessages";
import { PropTypes } from "prop-types";

class Signup extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    errors: {},
    toHomePage: false,
    serverErrors: [],
    saved: false,
  };

  componentDidUpdate = () => {
    if (this.state.saved) {
      this.setState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        toHomePage: true,
      });
      this.resetSaved();
    }
  };

  componentWillUnmount = () => {
    if (this.state.serverErrors.length > 0) {
      this.resetSaved();
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.clearErrors(name, value);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fieldNames = ["firstname", "lastname", "email", "password"];

    verifyAndSetFieldErrors(this, fieldNames);

    if (Object.keys(this.state.errors).length === 0) {
      const { firstname, lastname, email, password } = this.state;
      const newUser = {
        user: {
          first_name: firstname,
          last_name: lastname,
          email,
          password,
        },
      };

      this.handleSignup(newUser);
    }
  };

  handleSignup = (user) => {
    axios
      .post("/api/v1/users.json", user)
      .then((response) => {
        this.setState({ serverErrors: [], saved: true }, () => {
          this.props.onFetchCurrentUser();
        });
      })
      .catch((error) => {
        this.setState({
          serverErrors: [...error.response.data],
        });
      });
  };

  handleBlur = (event) => {
    const { name } = event.target;
    const fieldError = this.checkErrors(this.state, name);
    const errors = Object.assign({}, this.state.errors, fieldError);
    this.setState({ errors });
  };

  checkErrors = (state, fieldName) => {
    const error = {};
    switch (fieldName) {
      case "firstname":
        if (!state.firstname) {
          error.firstname = "Please provide a firstname";
        }
        break;
      case "lastname":
        if (!state.lastname) {
          error.lastname = "Please provide a lastname";
        }
        break;
      case "password":
        if (!state.password) {
          error.password = "Please provide a password";
        }
        break;
      case "email":
        if (!state.email || !EMAIL_REGEX.test(this.state.email)) {
          error.email = "Please provide a valid email";
        }
        break;
    }
    return error;
  };

  clearErrors = (name, value) => {
    const errors = { ...this.state.errors };
    switch (name) {
      case "firstname":
        if (value.length > 0) {
          delete errors[name];
        }
        break;
      case "lastname":
        if (value.length > 0) {
          delete errors[name];
        }
        break;
      case "password":
        if (value.length > 0) {
          delete errors[name];
        }
        break;
      case "email":
        if (value.length > 0 && EMAIL_REGEX.test(this.state.email)) {
          delete errors[name];
        }
        break;
    }
    this.setState({ errors });
  };

  resetSaved = () => {
    this.setState({
      saved: false,
      serverErrors: [],
    });
  };

  render() {
    if (this.state.toHomePage || this.props.currentUser) {
      return <Navigate to="/" />;
    }

    return (
      <div className="container mt-4">
        <div className="row">
          {this.state.serverErrors.length > 0 && (
            <ErrorMessages errors={this.state.serverErrors} />
          )}

          <div className="col-md-8 offset-md-2">
            <h1 className="text-center form-header-style mt-5 pt-2 pb-3">
              Sign up
            </h1>
            <SignupForm onSubmit={this.handleSubmit}>
              <Input
                title="First name"
                type="text"
                name="firstname"
                value={this.state.firstname}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="Your first name"
                autoFocus={true}
                state={this.state}
              />

              <Input
                title="Last name"
                type="text"
                name="lastname"
                value={this.state.lastname}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="Your last name"
                autoFocus={false}
                state={this.state}
              />

              <Input
                title="Email"
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="Your email"
                autoFocus={false}
                state={this.state}
              />

              <Input
                title="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder="Your password"
                autoFocus={false}
                state={this.state}
              />

              <Button>Sign up</Button>
            </SignupForm>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  currentUser: PropTypes.object,
  onFetchCurrentUser: PropTypes.func.isRequired,
};

export default Signup;
