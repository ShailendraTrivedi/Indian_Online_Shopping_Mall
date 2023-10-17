import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = {
  1: "/IMG/1.webp",
  2: "/IMG/2.webp",
  3: "/IMG/3.webp",
};

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);

  // Function to go to the next image
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === Object.keys(images).length ? 1 : prevIndex + 1
    );
  };

  // Function to go to the previous image
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 1 ? Object.keys(images).length : prevIndex - 1
    );
  };

  useEffect(() => {
    // Auto change image every 3 seconds
    const interval = setInterval(goToNextImage, 3000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className=" h-[15rem] relative m-2">
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex}`}
          className="w-full h-full object-contain"
        />
        <button
          onClick={goToPreviousImage}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 focus:outline-none"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNextImage}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </>
  );
};

export default Carousel;
