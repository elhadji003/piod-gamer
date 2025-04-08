import React, { useEffect, useState } from "react";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "../../features/auth/authAPI";

const UpdateProfileUser = () => {
  const { data: user, isLoading, error, refetch } = useGetMeQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    pseudo: user?.pseudo || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    gender: user?.gender || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user?.full_name || "",
        pseudo: user?.pseudo || "",
        email: user?.email || "",
        phone: user?.phone || "",
        bio: user?.bio || "",
        gender: user?.gender || "",
      });
    }
  }, [user]);

  console.log("FormData: ", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ userId: user?.id, formData });
      refetch();
      // Optionnel : rediriger ou afficher un message de succès
    } catch (err) {
      console.log("Erreur lors de la mise à jour du profil", err);
    }
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur de chargement des données</div>;

  return (
    <div>
      <h1>Mon profil</h1>

      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col max-w-4xl shadow-md p-4">
          <span className="w-20 h-20 rounded-full object-cover">
            <img src={`http://127.0.0.1:8000${user?.avatar}`} alt="Avatar" />
          </span>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Prenom:</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="p-2"
              />
            </div>
            <div>
              <label>Pseudo:</label>
              <input
                type="text"
                name="pseudo"
                value={formData.pseudo}
                onChange={handleChange}
                className="p-2"
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-2"
              />
            </div>
            <div>
              <label>Téléphone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-2"
              />
            </div>
            <div>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="p-2"
              />
            </div>
            <div>
              <label>Genre:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="p-2"
              >
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-300 p-2 text-white rounded-md"
            >
              Modifier
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileUser;
