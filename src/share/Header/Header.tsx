import React from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const history = useNavigate();
  const goToHomePage = () => {
    history("/");
  };
  return (
    <div className="custom_header">
      <div className="custom_header_left">
        <h2 className="custom_header_title" onClick={goToHomePage}>
          UPayment
        </h2>
      </div>
      <div className="custom_header_right">
        <button>Sign in</button>
        <button className="header_sign_up">Sign up</button>
      </div>
    </div>
  );
}
