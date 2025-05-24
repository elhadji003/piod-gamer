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
  faEye,
  faEyeSlash,
  faHeart,
  faSadTear,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Blog = ({ searchBlog }) => {
  const { data, isLoading, error } = useGetBlogPostsQuery();
  const [deleteMyPost] = useDeleteMyPostMutation();
  const [like] = useLikePostMutation();
  const user = useSelector((state) => state.auth.user);

  // console.log("User :", user);

  const [showDescript, setShowDescript] = useState(false);

  // Initialiser l'état des likes pour chaque post
  const [likesCount, setLikesCount] = useState({});

  const handleFollow = () => {
    toast.warning("Cette fonctionnalité n'est pas encore disponible !");
  };

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

  const toggleDescription = (postId) => {
    setShowDescript((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const formatPrix = (prix) => {
    return new Intl.NumberFormat("fr-FR").format(prix) + " FCFA";
  };

  return (
    <div>
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((post, k) => (
          <div className="bg-gray-800 m-4 rounded-md p-4 relative" key={k}>
            <div className="flex justify-between mb-3">
              <div className="left">
                <div className="text-white">
                  <div className="flex items-center gap-3">
                    <span className="">{post.author_name}</span>
                    {user.is_online ? (
                      <span className="relative flex size-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
                      </span>
                    ) : (
                      <span className="relative flex size-3">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
                      </span>
                    )}
                    {user.full_name === post.author_name ? (
                      ""
                    ) : (
                      <button
                        onClick={handleFollow}
                        className="bg-gray-900 p-1 rounded-md max-sm:hidden"
                      >
                        Suivre
                      </button>
                    )}
                  </div>
                  <span className="text-gray-400">
                    <p>
                      Posté le:{" "}
                      {new Date(post?.created_at).toLocaleDateString("fr-FR")}
                    </p>
                  </span>
                </div>
              </div>

              {user?.full_name === post.author_name ? (
                <div className="space-x-4">
                  <Link
                    to={`/update-post/${post.id}/`}
                    className="hover:text-sky-500 transition transform hover:scale-110"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <button
                    className="hover:text-sky-500 transition transform hover:scale-110"
                    onClick={() => toggleDescription(post.id)}
                  >
                    {showDescript[post.id] ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </button>
                  <button
                    className="hover:text-red-500 transition transform hover:scale-110"
                    onClick={() => deleteMyPost(post.id)} // ✅ Supprime directement
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ) : (
                <button
                  className="hover:text-sky-500 transition transform hover:scale-110"
                  onClick={() => toggleDescription(post.id)}
                >
                  {showDescript[post.id] ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </button>
              )}
            </div>

            <div className="relative">
              <img
                src={post.image}
                alt="Post"
                className="rounded-md mb-3 w-full"
              />

              <div className="">
                <div className="text-center flex flex-col">
                  <span>
                    {showDescript[post.id] && (
                      <div className="absolute bg-black bg-opacity-70 inset-0 text-white p-4 flex flex-col gap-4 items-center justify-center rounded-md animate__animated animate__backInDown">
                        <span>
                          Titre :{" "}
                          <span className="font-bold">{post.title}</span>
                        </span>
                        <span>
                          Description :{" "}
                          <span className="font-bold">{post.description}</span>
                        </span>
                        <span>
                          Prix :{" "}
                          <span className="font-bold">
                            {formatPrix(post.price)}
                          </span>
                        </span>
                        <span>
                          <Link
                            to={"/message-me"}
                            className="bg-gray-800 w-fit m-auto rounded-md p-2 mt-5"
                          >
                            Contactez-moi
                          </Link>
                        </span>
                      </div>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="max-sm:flex">
              <span
                className="text-red-500 bg-gray-900 mt-2 px-4 py-2 rounded-md cursor-pointer hover:scale-110 transition"
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
