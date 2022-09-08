import React from "react";
import "./Header.scss";
import { useNavigate, Navigate } from "react-router-dom";
import { URLPath } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { authActions, selectAuth } from "../redux/slice/authSlice";
import { logout } from "../firebaseConfig";

export default function Header() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const goToHomePage = () => {
    history("/");
  };
  const logOutUser = () => {
    dispatch(authActions.setLogout(false));
    logout();
    localStorage.removeItem("authToken");
    <Navigate to={URLPath.home} />;
  };

  return (
    <div className="custom_header">
      <div className="custom_header_left">
        <h2 className="custom_header_title" onClick={goToHomePage}>
          E-Todo
        </h2>
      </div>
      <div className="custom_header_right">
        {auth && auth?.isAuthenticated ? (
          <button className="header_sign_up" onClick={logOutUser}>
            Log out
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                history(URLPath.login);
              }}
            >
              Sign in
            </button>
            <button
              className="header_sign_up"
              onClick={() => {
                history(URLPath.register);
              }}
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </div>
  );
}
