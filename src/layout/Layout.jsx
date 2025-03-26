import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import useScroll from "../hooks/useScroll";

const Layout = () => {
  const isScrolled = useScroll();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isColorChanged, setIsColorChanged] = useState(false);

  useEffect(() => {
    // Vérifier si une couleur a déjà été enregistrée dans le localStorage
    const storageColor = localStorage.getItem("isColorChanged");
    if (storageColor) {
      setIsColorChanged(JSON.parse(storageColor));
    }
  }, []);

  const handleChangeColor = () => {
    const newColor = !isColorChanged;
    setIsColorChanged(newColor);
    // Sauvegarder la couleur dans le localStorage
    localStorage.setItem("isColorChanged", JSON.stringify(newColor));
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar fixée en haut */}
      <div
        className={`fixed w-full top-0 left-0 z-10 h-16 transition ${
          isScrolled ? "bg-gray-800" : ""
        }`}
      >
        <Navbar onClick={handleChangeColor} isChangeColor={isColorChanged} />
      </div>

      {/* Ajout d'un padding-top pour éviter la superposition avec la navbar */}
      <div className="flex flex-1 bg-black pt-16">
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          isChangeColor={isColorChanged}
        />
        <main
          className={`p-4 text-white overflow-y-auto transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-20"
          } ${isColorChanged ? "" : ""}`}
        >
          <Outlet context={{ isColorChanged }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;
