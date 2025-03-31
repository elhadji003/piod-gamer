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
    const storageColor = localStorage.getItem("isColorChanged");
    if (storageColor) {
      setIsColorChanged(JSON.parse(storageColor));
    }
  }, []);

  const handleChangeColor = () => {
    const newColor = !isColorChanged;
    setIsColorChanged(newColor);
    localStorage.setItem("isColorChanged", JSON.stringify(newColor));
  };

  return (
    <div className="flex flex-col h-screen">
      <div
        className={`fixed w-full top-0 left-0 z-10 h-16 transition ${
          isScrolled ? "bg-gray-800" : ""
        }`}
      >
        <Navbar onClick={handleChangeColor} isChangeColor={isColorChanged} />
      </div>

      <div className="flex flex-1 bg-black pt-16">
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          isChangeColor={isColorChanged}
        />
        <main
          className={`p-4 text-white overflow-y-auto transition-all duration-300 w-full ${
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
