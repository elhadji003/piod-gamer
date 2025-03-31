import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ProtectedRoute from "./routes/ProtectedRoutes";
import NotFound from "./pages/NotFound";
import AuthWatcher from "./utils/AuthWatcher ";
import { userRoutes } from "./routes/UserRoutes";
import { adminRoutes } from "./routes/AdminRoutes";

import Layout from "./layout/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPwd from "./pages/auth/ForgotPwd";
import ResetPwd from "./pages/auth/ResetPwd";
// Import routes

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-pwd" element={<ForgotPwd />} />
        <Route path="/reset/:uidb64/:token" element={<ResetPwd />} />
        <Route path="/unauthorized" element={<NotFound />} />

        {/* Routes USER */}
        <Route element={<Layout />}>
          {userRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute requiredRole={["user"]}>
                  <route.element /> {/* Make sure it's a component here */}
                </ProtectedRoute>
              }
            />
          ))}
        </Route>

        {/* Routes ADMIN */}
        <Route element={<Layout />}>
          {adminRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute requiredRole={["admin"]}>
                  <route.element />{" "}
                  {/* Similarly, ensure this is a component */}
                </ProtectedRoute>
              }
            />
          ))}
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AuthWatcher />
    </Router>
  );
};

export default App;
