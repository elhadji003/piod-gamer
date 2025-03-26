import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "../features/auth/authAPI";

const ModalUpdate = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { data: user, error, refetch } = useGetMeQuery();
  const { register, handleSubmit, setValue } = useForm();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (user) {
      setValue("full_name", user?.full_name || "");
      setValue("pseudo", user?.pseudo || "");
      setValue("phone", user?.phone || "");
      setValue("pays", user?.pays || "");
      setValue("bio", user?.bio || "");
    }
  }, [user, setValue]);

  const onSubmit = async (formData) => {
    try {
      await updateProfile({ userId: user?.id, formData });
      refetch();
      toast.success("Modification réussie");
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur de chargement des données</div>;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-60 backdrop-blur-sm pointer-events-none"></div>

      <div className="relative bg-gray-900 rounded-xl p-8 max-w-4xl w-full mx-4 shadow-xl z-60 animate__animated animate__fadeInDown pointer-events-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Modifier mon profil
          </h2>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-full transition"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Prenom(s) & Nom(s)
              </label>
              <input
                {...register("full_name")}
                className="w-full bg-transparent border-b border-gray-500 text-white focus:border-green-500 outline-none p-1 transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Pseudo</label>
              <input
                {...register("pseudo")}
                className="w-full bg-transparent border-b border-gray-500 text-white focus:border-green-500 outline-none p-1 transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Téléphone
              </label>
              <input
                {...register("phone")}
                className="w-full bg-transparent border-b border-gray-500 text-white focus:border-green-500 outline-none p-1 transition"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Pays</label>
              <input
                {...register("pays")}
                className="w-full bg-transparent border-b border-gray-500 text-white focus:border-green-500 outline-none p-1 transition"
              />
            </div>
          </div>
          <div className="flex flex-col bg-gray-800 p-4 rounded-lg mb-6">
            <label className="text-sm text-gray-300 mb-1">Bio</label>
            <textarea
              {...register("bio")}
              className="w-full bg-transparent border-b border-gray-500 text-white focus:border-green-500 outline-none p-1 transition"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-500 p-2 rounded-md font-bold text-white hover:bg-green-600 transition"
          >
            {isLoading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;
