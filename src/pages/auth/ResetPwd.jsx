import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPwdConfirmMutation } from "../../features/auth/authAPI";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../../components/Loader";

const ResetPwd = () => {
  const { uidb64, token } = useParams();
  const { register, handleSubmit } = useForm();
  const [resetPwdConfirm, { isLoading }] = useResetPwdConfirmMutation();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async ({ newPassword }) => {
    try {
      const response = await resetPwdConfirm({
        uidb64,
        token,
        new_password: newPassword,
      }).unwrap();
      toast.success(response.detail);
      navigate("/login");
    } catch (error) {
      toast.error(error.data?.detail || "Erreur de réinitialisation.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-white text-center mb-4">
          Réinitialiser le <span className="text-pink-500">mot de passe</span>
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Entrez votre nouveau mot de passe pour continuer.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nouveau mot de passe */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-white font-semibold"
            >
              Nouveau mot de passe
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("newPassword", { required: true })}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-400 hover:text-white"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded transition duration-200 text-white ${
              isLoading
                ? "bg-pink-300 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            {isLoading ? <Loader /> : "Réinitialiser"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPwd;
