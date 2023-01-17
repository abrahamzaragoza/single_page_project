import React from "react";
import Jumbotron from "../components/products/Jumbotron";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import ProductList from "./ProductsContainer";

const App = () => {
  return (
    <div>
      <Header />
      <Jumbotron />
      <ProductList />
      <Footer />
    </div>
  );
};

export default App;
