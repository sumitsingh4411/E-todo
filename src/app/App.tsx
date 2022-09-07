import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "../share/Header/Header";
import "./App.css";
import Routes from "./AllRoutes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
 