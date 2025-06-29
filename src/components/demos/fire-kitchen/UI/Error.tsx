import type React from "react";

const Error: React.FC<{ title: string, message: string }> = ({ title, message }) => {
  return (
    <div className="flex justify-center items-center mb-4">
      <div className="bg-rose-200 bg-opacity-80 rounded px-4 py-2 flex items-center gap-4">
        <div className="text-3xl w-12 h-12 text-[#fafafa] bg-[#ff3333] rounded-full flex justify-center items-center">
          !
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold text-black">{title}</h2>
          <p className="font-semibold text-black">{message}</p>
        </div >
      </div>
    </div>
  );
}

export default Error
