import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const AuthWatcher = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        dispatch(logout());
        navigate("/login");
      }
    }
  }, [token, dispatch]);

  return null;
};

export default AuthWatcher;
