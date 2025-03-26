import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../features/auth/authAPI";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import gamingSetup from "../assets/images/manette3.png";
import Loader from "./Loader";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();

      console.log("Response: ", response);

      dispatch(
        setCredentials({
          user: response.user,
          access: response.access,
          refresh: response.refresh,
          role: response.user.role,
        })
      );

      toast.success("Vous êtes connecté avec succès");

      const isAdmin = response.user?.role === "admin";

      if (isAdmin) {
        navigate("/dashboard-admin");
      } else {
        navigate("/dashboard-user");
      }

      reset();
    } catch (err) {
      setErrorMessage("Identifiants incorrects, veuillez réessayer.");
      toast.error("Vérifiez vos identifiants");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 overflow-hidden">
      <div className="login-image w-1/2 hidden md:flex md:flex-col items-center justify-center">
        <img
          src={gamingSetup}
          alt="Setup Gaming 4K"
          className="object-contain animate-float shadow-neon-pink"
          style={{ maxHeight: "500px" }}
        />
      </div>

      <div className="w-full md:w-1/2 bg-gray-900 flex items-center justify-center p-8 relative max-sm:-top-20">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
            <span className="text-pink-500">Connexion</span>
          </h2>

          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-white font-semibold mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: true })}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-white font-semibold mb-1"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: true })}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded transition duration-200 ${
                isLoading
                  ? "bg-pink-300 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-600"
              } text-white`}
            >
              {isLoading ? <Loader /> : "Login"}
            </button>
          </form>

          <p className="text-gray-400 text-sm mt-4 text-center">
            Pas encore de compte ?{" "}
            <Link to={"/register"} className="text-pink-500 hover:underline">
              Inscris-toi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
