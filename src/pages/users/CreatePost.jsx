import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";
import { useCreateBlogPostMutation } from "../../features/blogsApp/blogsApi";

const CreatePost = () => {
  const { register, handleSubmit, reset } = useForm();
  const [selectImage, setSelectImage] = useState(null);
  const { isColorChanged } = useOutletContext();
  const [createPost, { isLoading, error }] = useCreateBlogPostMutation();


  // Gestion de l'aperçu d'image
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", parseFloat(data.price).toFixed(2));
      formData.append("image", data.file[0]);

      // Envoi du FormData à l'API
      await createPost(formData).unwrap();
      reset();
      setSelectImage(null); // Réinitialise l'aperçu d'image
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      {/* Bouton de retour */}
      <div className="w-full max-w-4xl mb-6">
        <Link
          to="/gaming-post"
          className="flex items-center gap-3 text-gray-300 hover:text-white transition duration-300"
        >
          <FaChevronLeft className="text-lg" />
          Retour au dashboard
        </Link>
      </div>

      {/* Formulaire */}
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1
          className={`text-2xl font-bold text-center mb-6 uppercase ${
            isColorChanged ? "text-pink-500" : "text-green-500"
          }`}
        >
          Créer un post
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Champ Titre */}
          <div>
            <label htmlFor="title" className="block text-gray-300 mb-1">
              Titre
            </label>
            <input
              id="title"
              type="text"
              {...register("title", { required: true })}
              className={`w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none ${
                isColorChanged
                  ? "focus:ring-2 focus:ring-pink-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
              placeholder="Entrez le titre du post"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-gray-300 mb-1">
              Prix{" "}
              <span className="text-sm text-gray-400">
                (entre 1 et 100000 FCFA)
              </span>
            </label>
            <div className="flex items-center gap-2">
              <input
                id="price"
                type="number"
                step="0.01"
                min="1"
                max="100000"
                {...register("price", { required: true })}
                className={`w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none ${
                  isColorChanged
                    ? "focus:ring-2 focus:ring-pink-500"
                    : "focus:ring-2 focus:ring-green-500"
                }`}
                placeholder="Entrez le prix du produit"
              />
              <span className="text-gray-300">FCFA</span>
            </div>
          </div>

          {/* Champ Description */}
          <div>
            <label htmlFor="description" className="block text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              {...register("description", { required: true })}
              className={`w-full p-3 h-32 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none ${
                isColorChanged
                  ? "focus:ring-2 focus:ring-pink-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
              placeholder="Écrivez votre description ici..."
            />
          </div>

          {/* Champ Fichier + Aperçu Image */}
          <div>
            <label htmlFor="file" className="block text-gray-300 mb-1">
              Image
            </label>
            <input
              type="file"
              id="file"
              className={`w-full p-3 bg-gray-700 text-gray-300 rounded-md cursor-pointer ${
                isColorChanged
                  ? "focus:ring-2 focus:ring-pink-500"
                  : "focus:ring-2 focus:ring-green-500"
              }`}
              {...register("file")}
              onChange={handleChangeFile}
            />

            {/* Aperçu de l'image sélectionnée */}
            {selectImage && (
              <div className="mt-4">
                <p className="text-gray-400 text-sm">Aperçu de l'image :</p>
                <img
                  src={selectImage}
                  alt="Aperçu"
                  className="w-40 h-40 object-cover rounded-lg mt-2"
                />
              </div>
            )}
          </div>

          {/* Affichage d'erreur si la requête échoue */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              Une erreur s'est produite. Veuillez réessayer.
            </p>
          )}

          {/* Bouton Publier */}
          <button
            type="submit"
            className={`w-full transition duration-300 text-white font-bold py-3 rounded-md shadow-md ${
              isColorChanged
                ? "bg-pink-500 hover:bg-pink-600"
                : "bg-green-500 hover:bg-green-600"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Publication..." : "Publier"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
