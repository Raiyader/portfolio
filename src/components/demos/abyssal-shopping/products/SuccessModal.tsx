import React from "react";
import ReactDOM from "react-dom";
import type { Product } from "../../../../models/demos/abyssal-shopping/product";
import ModalWrapper from "../../../../util/ModalWrapper";

interface ModalProps {
    formData: Omit<Product, "id">;
    onClose: () => void;
    isOpen: boolean;
}

const SuccessModal: React.FC<ModalProps> = ({ formData, onClose, isOpen }) => {
    if (!formData) return null;

    return ReactDOM.createPortal(
        <ModalWrapper
            isOpen={isOpen}
            onClose={onClose}
        >
            <h2 className="text-xl font-semibold mb-4 font-pacifico text-center text-abyssalternative">Thank You!</h2>
            <p className="mb-4 text-center">
                We received your product information successfully. <br />
                <span className="text-[#ff3333] font-semibold">
                    This is a demo, so your product has not been saved.
                </span>
            </p>

            <div className="mb-4 max-h-64 overflow-auto border border-neutral-300 rounded p-3 bg-neutral-50 text-sm space-y-2">
                <div>
                    <span className="font-semibold">Title:</span> {formData.title}
                </div>
                <div>
                    <span className="font-semibold">Category:</span> {formData.category.name} / {formData.category.subCategory.name}
                </div>
                <div>
                    <span className="font-semibold">Description:</span> {formData.description}
                </div>
                <div>
                    <span className="font-semibold">Price:</span> ${formData.price.toFixed(2)}
                </div>
                <div>
                    <span className="font-semibold">Stock:</span>{" "}
                    {typeof formData.stock === "number" ? (
                        formData.stock
                    ) : (
                        <ul className="list-disc list-inside mt-1">
                            {Object.entries(formData.stock).map(([size, qty]) => (
                                <li key={size}>
                                    {size}: {qty}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <span className="font-semibold">On Sale:</span> {formData.onSale ? "Yes" : "No"}
                </div>
                {formData.onSale && (
                    <div>
                        <span className="font-semibold">Discount Percent:</span> {formData.discountPercent ?? 0}%
                    </div>
                )}
                <div>
                    <span className="font-semibold">Added By:</span> {formData.addedBy}
                </div>
                {formData.imageUrl && (
                    <div>
                        <span className="font-semibold">Image:</span>
                        <img
                            src={formData.imageUrl}
                            alt={formData.title}
                            className="mt-2 max-h-40 rounded object-contain"
                        />
                    </div>
                )}
            </div>

            <div className="flex justify-center">
                <button
                    onClick={onClose}
                    className="bg-abyssalternative hover:bg-abyssalternative/80 text-white px-4 py-2 rounded font-semibold"
                >
                    OK
                </button>
            </div>
        </ModalWrapper>,
        document.body
    );
};

export default SuccessModal;
