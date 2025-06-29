import { useState, useEffect } from "react";
import abyss from "/demos/abyssalshopping/abyss-banner.png";
import firekitchen from "/demos/abyssalshopping/firekitchen-banner.png";
import artikelboost from "/demos/abyssalshopping/artikelboost-banner.png";

const images = [abyss, firekitchen, artikelboost];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const length = images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, 3333);
    return () => clearInterval(timer);
  }, [length]);

  const goToSlide = (newIndex: number) => setIndex(newIndex);
  const prevSlide = () => setIndex(index === 0 ? length - 1 : index - 1);
  const nextSlide = () => setIndex((index + 1) % length);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <div className="w-full h-full relative aspect-[16/9]">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <img
              src={img}
              className="w-full h-full object-cover object-center pointer-events-none select-none"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 flex justify-center items-center z-20 bg-black/10 hover:bg-black/50 text-neutral-300 p-2 rounded-full"
        aria-label="Previous Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 flex justify-center items-center z-20 bg-black/10 hover:bg-black/50 text-neutral-300 p-2 rounded-full"
        aria-label="Next Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-abyssalternative" : "bg-white/50"} transition`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
