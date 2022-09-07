import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/dashboard/Dashboard";
import Home from "../pages/Home/Home";
import { URLPath } from "../share/constant";
import { selectAuth } from "../share/redux/slice/authSlice";

export default function AllRoutes() {
  const auth = useSelector(selectAuth);
  return (
    <Routes>
      <Route
        path={URLPath.home}
        element={
          auth?.isAuthenticated ? <Navigate to={URLPath.DASHBOARD} /> : <Home />
        }
      />
      <Route path={URLPath.login} element={<SignIn />} />
      <Route path={URLPath.register} element={<Signup />} />
      <Route path={URLPath.DASHBOARD} element={<Dashboard />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}
