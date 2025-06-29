import React from "react";
import { createPortal } from "react-dom";
import type { Recipe } from "../../../../models/demos/fire-kitchen/recipe";
import ModalWrapper from "../../../../util/ModalWrapper";

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  formData: Recipe | null;
};

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, formData }) => {
  return createPortal(
    <ModalWrapper isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className="text-xl font-semibold mb-4 text-center font-merienda">Thank You!</h2>
      <p className="mb-2 text-center">
        We received your recipe information successfully. <br />
        <span className="text-[#ff3333] font-semibold">
          This is a demo, so your recipe has not been saved.
        </span>
      </p>

      <div className="mb-4 max-h-40 overflow-auto border border-neutral-300 rounded p-3 bg-neutral-50 text-sm">
        {formData ? (
          <>
            <div className="mb-1">
              <span className="font-semibold">Title:</span> {formData.title}
            </div>
            <div className="mb-1">
              <span className="font-semibold">Category:</span> {formData.category?.name}
            </div>
            <div className="mb-1">
              <span className="font-semibold">Ingredients:</span> {formData.ingredients}
            </div>
            <div className="mb-1">
              <span className="font-semibold">Instructions:</span> {formData.instructions}
            </div>
            <div className="mb-1">
              <span className="font-semibold">Author:</span> {formData.author}
            </div>
            <div className="mb-1">
              <span className="font-semibold">Image:</span>
              <img
                src={formData.imageUrl}
                alt="Recipe"
                className="mt-1 max-h-24 rounded"
              />
            </div>
          </>
        ) : (
          <p>No data to display</p>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onClose}
          className="bg-firekitchenprimary hover:bg-[#ff3333] text-white px-4 py-2 rounded font-merienda font-semibold"
        >
          OK
        </button>
      </div>
    </ModalWrapper>,
    document.body
  );
};

export default SuccessModal;
