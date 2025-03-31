import React, { useState } from "react";
import {
  useGetBlogPostsQuery,
  useDeleteMyPostMutation,
  useLikePostMutation,
} from "../features/blogsApp/blogsApi";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faHeart,
  faSadTear,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Blog = ({ searchBlog }) => {
  const { data, isLoading, error } = useGetBlogPostsQuery();
  const [deleteMyPost] = useDeleteMyPostMutation();
  const [like] = useLikePostMutation();
  const user = useSelector((state) => state.auth.user);

  const [showDescript, setShowDescript] = useState(false);

  // Initialiser l'état des likes pour chaque post
  const [likesCount, setLikesCount] = useState({});

  if (isLoading) return <p>Chargement ...</p>;
  if (error) return <p>Une erreur s'est produite oupss</p>;

  const blogsPosts = Array.isArray(data?.results) ? data?.results : [];

  const filteredBlogs = blogsPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchBlog.toLowerCase()) ||
      post.author_name.toLowerCase().includes(searchBlog.toLowerCase())
  );

  // Like

  const handleLikes = async (postId, currentLikes) => {
    try {
      await like(postId);
      setLikesCount((prevLikes) => ({
        ...prevLikes,
        [postId]:
          currentLikes === prevLikes[postId]
            ? currentLikes + 1
            : currentLikes - 1,
      }));
    } catch (error) {
      console.log("Erreur :", error);
    }
  };

  return (
    <div>
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((post, k) => (
          <div className="bg-gray-800 m-4 rounded-md p-4 relative" key={k}>
            <div className="flex justify-between mb-3">
              <div className="left">
                <h1 className="text-white">
                  {post.author_name}
                  <span className="bg-gray-900 p-2 rounded-md max-sm:hidden">
                    : 1k abonnés
                  </span>
                  <p className="text-gray-400">Posté : il y a 2h</p>
                </h1>
              </div>

              {/* ✅ Vérification si l'utilisateur connecté est l'auteur */}
              {user?.full_name === post.author_name && (
                <div className="space-x-4">
                  <button className="hover:text-sky-500 transition transform hover:scale-110">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="hover:text-red-500 transition transform hover:scale-110"
                    onClick={() => deleteMyPost(post.id)} // ✅ Supprime directement
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <img
                src={post.image}
                alt="Post"
                className="rounded-md mb-3 w-full"
              />

              <div className="absolute inset-0 bg-black bg-opacity-70 text-white p-4 flex items-center justify-center rounded-md">
                <p className="text-center flex flex-col">
                  {showDescript && (
                    <div>
                      {post.description}
                      <Link
                        to={"/message-me"}
                        className="bg-gray-800 w-fit m-auto rounded-md p-2 mt-5"
                      >
                        Contactez-moi
                      </Link>
                    </div>
                  )}
                </p>
              </div>
            </div>

            <div className="max-sm:flex">
              <button
                onClick={() => setShowDescript(!showDescript)}
                className="mt-2 bg-gray-900 text-white px-4 py-2 rounded-md"
              >
                {showDescript
                  ? "Masquer la description"
                  : "Voir la description"}
              </button>

              <span
                className="text-red-500 ml-4 bg-gray-900 mt-2 px-4 py-2 rounded-md cursor-pointer hover:scale-110 transition"
                onClick={() =>
                  handleLikes(post.id, likesCount[post.id] || post.likes_count)
                }
              >
                <FontAwesomeIcon icon={faHeart} />{" "}
                <span>{likesCount[post.id] || post.likes_count}</span>
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center text-gray-400">
          <FontAwesomeIcon icon={faSadTear} size="4x" className="mb-4" />
          <p className="text-lg">Aucun post disponible</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
