import { useEffect, useState } from "react";

type CarouselProps = {
  source1: string;
  source2: string;
  source3: string;
};

const Carousel = ({ source1, source2, source3 }: CarouselProps) => {
  const images = [source1, source2, source3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`w-full md:w-1/2 overflow-hidden shadow-md`}>
      <div className="relative w-auto h-100  md:h-200 transition-all duration-700 ease-in-out">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
              } block`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
