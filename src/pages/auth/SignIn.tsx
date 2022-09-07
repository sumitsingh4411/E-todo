import React from "react";
import "./auth.scss";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { URLPath } from "../../share/constant";

export default function Signin() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Email is required"),
      password: yup.string().min(6).required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="auth_page">
      <div className="auth_container">
        <h2 className="auth_page_title">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          {formik.errors.email && formik.touched.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <button type="submit" className="register_btn">
            Login
          </button>
        </form>
        <p className="auth_page_text">
          {" "}
          Don't have a account?{" "}
          <span
            className="link_change"
            onClick={() => {
              navigate(URLPath.register);
            }}
          >
            Register now.
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
