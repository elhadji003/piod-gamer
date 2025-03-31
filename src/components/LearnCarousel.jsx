import React, { useEffect, useState } from "react";

// d'abord on creer le tableau pour les images
const images = [
  {
    img: "https://cdn.flyonui.com/fy-assets/components/carousel/image-22.png",
    text_info: "lorem lorem lorem lorem",
    date: "Aujourd'hui",
  },
  {
    img: "https://cdn.flyonui.com/fy-assets/components/carousel/image-15.png",
    text_info: "lorem lorem lorem lorem",
    date: "Avant hier",
  },
  {
    img: "https://cdn.flyonui.com/fy-assets/components/carousel/image-16.png",
    text_info: "lorem lorem lorem lorem",
    date: "Hier",
  },
];

const LearnCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <div
        className="flex transition-transfrom duration-500 ease-in-out"
        style={{ transform: `translate-X(-${currentIndex * 100})` }}
      >
        {images.map((image, index) => {
          <div key={index}>
            <img src={image.img} alt="" />
            <p>{image.text_info}</p>
            <p>{image.date}</p>
          </div>;
        })}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
      >
        <FaChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
      >
        <FaChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default LearnCarousel;
