import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ProtectedRoute from "./routes/ProtectedRoutes";
import NotFound from "./pages/NotFound";
import AuthWatcher from "./utils/AuthWatcher ";
import { userRoutes } from "./routes/UserRoutes";
import { adminRoutes } from "./routes/AdminRoutes";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./layout/Layout";
// Import routes

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
