import React from "react";
import { useForm } from "react-hook-form";
import gamingSetup from "../../assets/images/manette3.png"; // Assure-toi que le chemin est correct
import { useRegisterMutation } from "../../features/auth/authAPI";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ onClick }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterMutation();
  const onSubmit = async (userData) => {
    try {
      const res = await registerUser(userData).unwrap(); // Si tu utilises RTK Query

      console.log("Register data:", res);
      reset();
      toast.success("Inscription réussie");
      navigate("/login");
    } catch (error) {
      console.log("Erreur:", error);

      // Affiche un toast personnalisé si le pseudo ou l'email existent déjà
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Une erreur s'est produite lors de l'inscription");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 overflow-hidden">
      {/* Partie image avec animation */}
      <div className="w-1/2  hidden md:flex items-center justify-center">
        <img
          src={gamingSetup}
          alt="Setup Gaming 4K"
          className="login-image object-contain rotate-45 animate-float shadow-neon-pink"
          style={{ maxHeight: "500px" }}
        />
      </div>

      {/* Partie formulaire */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
            <span className="text-pink-500">Inscription</span>
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-white font-semibold mb-1">
                  Pseudo
                </label>
                <input
                  type="text"
                  {...register("pseudo")}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out"
                  placeholder="Pseudo"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-white font-semibold mb-1">
                  Prenom(s) et Nom(s)
                </label>
                <input
                  type="text"
                  {...register("full_name")}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out"
                  placeholder="Prenom(s) et Nom(s)"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-white font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-1">
                Genre
              </label>
              <select
                {...register("gender")}
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out"
                required
              >
                <option value="" disabled>
                  Sélectionner le genre
                </option>
                <option value="man">Homme</option>
                <option value="woman">Femme</option>
              </select>
            </div>

            <div className="flex max-sm:flex-col gap-4 max-lg:flex-col">
              <div className="w-1/2 max-sm:w-full max-lg:w-full">
                <label className="block text-white font-semibold mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Mot de passe requis",
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                      message:
                        "Le mot de passe doit contenir au moins 6 caractères, une lettre et un chiffre",
                    },
                  })}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out"
                  placeholder="Mot de passe"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="w-1/2 max-sm:w-full max-lg:w-full">
                <label className="block text-white font-semibold mb-1">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  {...register("password2", {
                    required: "Confirmer le mot de passe est requis",
                    validate: (value) =>
                      value === watch("password") ||
                      "Les mots de passe ne correspondent pas",
                  })}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out"
                  placeholder="Confirmer le mot de passe"
                />
                {errors.password2 && (
                  <p className="text-red-500 text-sm">
                    {errors.password2.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition duration-200 transform hover:scale-105"
            >
              Créer le compte
            </button>
          </form>
          <p className="text-gray-400 text-sm mt-6">
            Déjà un compte ?{" "}
            <Link
              to={"/login"}
              onClick={onClick}
              className="text-pink-500 hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
