import React, { useState } from "react";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "../../features/auth/authAPI";
import { useOutletContext } from "react-router-dom";
import imageDefaultUser from "../../assets/images/image-1.avif";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import ModalUpdate from "../../components/ModalUpdate";
import { toast } from "react-toastify";

const ProfileUser = () => {
  const { isColorChanged } = useOutletContext();
  const { data: user, isLoading, error, refetch } = useGetMeQuery();
  const [openModal, setOpenModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [updateProfile] = useUpdateProfileMutation();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await updateProfile({ userId: user?.id, formData }).unwrap();
      refetch();
      toast.success("Image mise à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
    }
  };

  const handleOpenModal = () => setOpenModal(!openModal);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div
        className={`p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl shadow-xl border transition-all duration-300 ${
          isColorChanged ? "border-pink-500" : "border-green-500"
        } text-white font-mono`}
      >
        {/* Profile Picture Section */}
        <div className="flex max-sm:flex-col max-sm:text-center items-center gap-6">
          <div className="relative group">
            <img
              src={
                selectedImage ||
                (user?.avatar
                  ? `http://127.0.0.1:8000${user?.avatar}`
                  : imageDefaultUser)
              }
              alt="Profile"
              className={`w-28 h-28 rounded-full object-cover border-4 transition-all ${
                isColorChanged
                  ? "border-pink-500 drop-shadow-neon"
                  : "border-green-500 drop-shadow-neonGreen"
              }`}
            />
            <input
              type="file"
              id="profileImageInput"
              className="hidden"
              onChange={handleImageChange}
            />

            <div
              className={`absolute bottom-0 right-0 ${
                isColorChanged ? "bg-pink-500" : "bg-green-500"
              } p-2 rounded-full cursor-pointer hover:scale-105 transition-transform`}
            >
              <label htmlFor="profileImageInput" className="cursor-pointer">
                <FaCamera color="white" />
              </label>
              <input type="file" id="profileImageInput" className="hidden" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-wide">
              {user?.full_name || "Nom d'utilisateur"}
            </h2>
            <p className="text-sm text-gray-400">
              {user?.email || "Email non défini"}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                    user?.is_online ? "bg-green-400" : "bg-red-400"
                  } opacity-75`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-3 w-3 ${
                    user?.is_online ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
              </span>
              <span className="text-xs">
                {user?.is_online ? "En ligne" : "Hors ligne"}
              </span>
            </div>
          </div>
        </div>

        {/* Informations Section */}
        <div className="mt-10">
          <div
            className={`flex justify-between items-center mb-6 border-b pb-2 ${
              isColorChanged
                ? "text-pink-500 border-pink-500"
                : "text-green-500 border-green-500"
            }`}
          >
            <h3 className="text-2xl font-semibold">Informations</h3>
            <button
              onClick={handleOpenModal}
              className="hover:scale-110 transition-transform"
              title="Modifier"
            >
              <FaPencilAlt />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoItem
              label="Nom d'utilisateur"
              value={user?.full_name}
              isColorChanged={isColorChanged}
            />
            <InfoItem
              label="Pseudo"
              value={user?.pseudo}
              isColorChanged={isColorChanged}
            />
            <InfoItem
              label="Genre"
              value={user?.gender}
              isColorChanged={isColorChanged}
            />
            <InfoItem
              label="Téléphone"
              value={user?.phone}
              isColorChanged={isColorChanged}
            />
            <InfoItem
              label="Pays"
              value={user?.pays}
              isColorChanged={isColorChanged}
            />
            <InfoItem
              label="Bio"
              value={user?.bio}
              isColorChanged={isColorChanged}
            />
            <InfoItem
              label="Date de naissance"
              value={user?.birthday}
              isColorChanged={isColorChanged}
            />
            <InfoItem
              label="Role"
              value={user?.role}
              isColorChanged={isColorChanged}
            />
          </div>
        </div>
      </div>

      {/* Modal de modification */}
      {openModal && (
        <ModalUpdate isOpen={openModal} onClose={() => setOpenModal(false)} />
      )}
    </div>
  );
};

const InfoItem = ({ label, value, isColorChanged }) => (
  <div
    className={`bg-gray-800 p-4 rounded-lg border border-gray-700 transition-all ${
      isColorChanged ? "hover:border-pink-500" : "hover:border-green-500"
    }`}
  >
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <p className="text-base font-medium text-white">{value || "Non défini"}</p>
  </div>
);

export default ProfileUser;
