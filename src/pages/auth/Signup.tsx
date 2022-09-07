import React, { useState } from "react";
import "./auth.scss";
import * as yup from "yup";
import { useFormik } from "formik";
import { URLPath } from "../../share/constant";
import { useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword } from "../../share/firebaseConfig";
import { authActions } from "../../share/redux/slice/authSlice";
import { useDispatch } from "react-redux";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [localLoading, setLocalLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Email is required"),
      password: yup.string().min(6).required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      setLocalLoading(true);
      const data: any = await registerWithEmailAndPassword(
        values.email,
        values.password
      );
      if (data) {
        dispatch(authActions.setLogin(true));
        localStorage.setItem("authToken", data?.accessToken);
        navigate(URLPath.DASHBOARD);
      }
      setLocalLoading(false);
    },
  });

  return (
    <div className="auth_page">
      <div className="auth_container">
        <h2 className="auth_page_title">Register</h2>
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
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
            <div className="error">{formik.errors.confirmPassword}</div>
          ) : null}
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />

          <button type="submit" className="register_btn">
            {localLoading ? "Registering..." : " Register"}
          </button>
        </form>
        <p className="auth_page_text">
          {" "}
          Already have an account?{" "}
          <span
            className="link_change"
            onClick={() => {
              navigate(URLPath.login);
            }}
          >
            Login now.
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
