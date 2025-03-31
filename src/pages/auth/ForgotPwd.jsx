import { useForm } from "react-hook-form";
import { useResetPwdMutation } from "../../features/auth/authAPI";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const ForgotPwd = () => {
  const { register, handleSubmit, reset } = useForm();
  const [resetPwd, { isLoading }] = useResetPwdMutation(); // Ajout de isLoading

  const onSubmit = async (data) => {
    try {
      const res = await resetPwd(data).unwrap();
      console.log("Response :", res);
      toast.success(res.detail);
      reset(); // Vider le champ après envoi réussi
    } catch (error) {
      console.log(error.data?.detail || "Erreur lors de la demande.");
      toast.error(error.data?.detail || "Erreur lors de la demande.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 overflow-hidden">
      <div className="w-full bg-gray-900 flex items-center justify-center p-8 relative max-sm:-top-20">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
            <span className="text-pink-500">Mot de passe oublié ?</span>
          </h2>
          <p className="text-gray-400 text-center mb-4">
            Entrez votre adresse e-mail et nous vous enverrons un lien pour
            réinitialiser votre mot de passe.
          </p>

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

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 rounded transition duration-200 ${
                isLoading
                  ? "bg-pink-300 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-600"
              } text-white`}
            >
              {isLoading ? <Loader /> : "Envoyer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPwd;
