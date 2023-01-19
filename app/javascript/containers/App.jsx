import React, { Component } from "react";
import NotFound from "../components/shared/NotFound";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import ProductList from "./ProductsContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetailContainer from "../components/ProductDetailContainer";
import NewProductForm from "../components/products/NewProductForm";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<ProductList />} />
            <Route
              exact
              path="/products/:id/*"
              element={<ProductDetailContainer />}
            />
            <Route exact path="/newProduct" element={<NewProductForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
