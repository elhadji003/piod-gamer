import React, { useState } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Blog from "../../components/Blog";
import Communaute from "../../components/Communaute";

const BlogGaming = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Gestion de la recherche
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex gap-1 max-sm:flex-col">
      {/* Contenu principal (ajusté à w-8/12) */}
      <div className="w-8/12 bg-gray-700 max-sm:w-full">
        <div className="flex justify-between items-center p-4 max-sm:gap-4">
          <div className="bg-gray-800 p-2 rounded-md">
            <Link
              to={"/create-post"}
              className="space-x-4 max-sm:space-x-0 uppercase"
            >
              <span className="max-sm:hidden">Créer</span>
              <FontAwesomeIcon icon={faPlusCircle} />
            </Link>
          </div>
          <div>
            <input
              type="text"
              className="border border-md rounded-md p-2 bg-gray-800 border-none outline-none max-sm:w-full"
              placeholder="Rechercher un post"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div>
          <Blog searchBlog={searchTerm} />
        </div>
      </div>

      {/* Sidebar fixe */}
      <div className="w-3/12 fixed right-0 bg-gray-900 text-white h-screen max-sm:hidden p-4 sidebar">
        <Communaute />
      </div>
    </div>
  );
};

export default BlogGaming;
