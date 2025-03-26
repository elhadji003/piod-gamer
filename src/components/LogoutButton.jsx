import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const LogoutButton = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location;
    navigate("/", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className={`w-full flex items-center p-3 rounded-md hover:bg-white hover:text-black transition ${className}`}
    >
      <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
      <span className="ml-2">Déconnexion</span>
    </button>
  );
};

export default LogoutButton;
