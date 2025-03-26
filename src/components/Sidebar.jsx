import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCog,
  faBars,
  faGamepad,
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "./LogoutButton";
import { useGetMeQuery } from "../features/auth/authAPI";

const Sidebar = ({ isOpen, setIsOpen, isChangeColor }) => {
  const { data: user, isLoading, error } = useGetMeQuery();
  const isAdmin = user?.role === "admin";

  return (
    <div
      className={`fixed left-0 h-full text-white transition-all duration-300 shadow-lg ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header avec pseudo */}
      <div className="relative w-full p-4 border-b border-gray-700 flex items-baseline justify-between">
        {isOpen && (
          <div>
            <span className="flex text-xl font-extrabold drop-shadow-neonWhite max-sm:text-sm tracking-wide uppercase">
              {user?.pseudo || "Pseudo"}
            </span>
            <span className="flex items-center gap-3 text-gray-500 text-[12px]">
              {user?.is_online ? "en ligne" : "déconnecté"}
              <span className="text-gray-500 text-[12px] text-nowrap">
                {user ? (
                  user.is_online ? (
                    <span className="relative flex size-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
                    </span>
                  ) : (
                    <span className="relative flex size-3">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
                    </span>
                  )
                ) : (
                  <span>Chargement...</span> // Afficher un message ou un autre indicateur en attendant les données utilisateur
                )}
              </span>
            </span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${isOpen ? "" : "m-auto"}`}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {[
            {
              to: isAdmin ? "/dashboard-admin" : "/dashboard-user",
              icon: isAdmin ? faHome : faDashboard,
              label: isAdmin ? "Dashboard" : "Dashboard",
            },
            { to: "/blog-gaming", icon: faGamepad, label: "Gamers Posts" },
            { to: "/profil-user", icon: faUser, label: "Profil" },
            { to: "/parametre", icon: faCog, label: "Paramètres" },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center ${
                    isOpen ? "" : "justify-center"
                  } p-3 rounded-md font-semibold transition-all duration-200 ${
                    isActive
                      ? `text-white shadow-lg ${
                          isChangeColor ? "bg-pink-500" : "bg-green-500"
                        }`
                      : `${
                          isChangeColor
                            ? "hover:text-pink-500"
                            : "hover:text-green-500"
                        }`
                  }`
                }
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  size="lg"
                  className={`transition-transform hover:scale-110 ${
                    isChangeColor ? "drop-shadow-neon" : "drop-shadow-neonGreen"
                  }`}
                />
                <span
                  className={`ml-3 transition-all duration-200 ${
                    isOpen ? "opacity-100" : "opacity-0 hidden"
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <LogoutButton
          className={`transition-all duration-200 ${
            isOpen ? "opacity-100" : "opacity-0 hidden"
          } ${
            isChangeColor
              ? "text-pink-500 hover:text-pink-500"
              : "text-green-500 hover:text-green-500"
          }`}
        />
      </div>
    </div>
  );
};

export default Sidebar;
