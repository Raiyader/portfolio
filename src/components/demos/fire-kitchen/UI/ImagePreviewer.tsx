import React, { useEffect, useState } from "react";

const ImagePreviewer: React.FC<{ imageData: any }> = ({ imageData }) => {
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!imageData) {
      setPickedImage(null);
      return;
    }
    setPickedImage(imageData);
  }, [imageData]);

  return (
    <div
      className={`${!imageData ? "border-red-600" : ""
        } w-40 h-40 border-2 border-[#eaeaea] mt-1.5 flex justify-center items-center`}
    >
      {!pickedImage && (
        <p className="text-neutral-500 m-0">No Image</p>
      )}
      {pickedImage && (
        <img
          src={pickedImage}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default ImagePreviewer;
