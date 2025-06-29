import React from "react";
import { createPortal } from "react-dom";
import ModalWrapper from "../../../../util/ModalWrapper";

interface Props {
    imageUrl: string;
    onClose: () => void;
}

const ImageModal: React.FC<Props> = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;
    return createPortal(
        <ModalWrapper isOpen={true} onClose={onClose} className="bg-transparent">
            <img
                src={`/demos/abyssalshopping/productImages/${imageUrl}.webp`}
                className="max-h-full max-w-full object-contain"
            />
            <button
                onClick={onClose}
                className="absolute top-5 right-4 text-rose-500 hover:text-rose-600 rounded-full px-2 py-1"
                aria-label="Close"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
            </button>
        </ModalWrapper>
        ,
        document.body
    );
};

export default ImageModal;
