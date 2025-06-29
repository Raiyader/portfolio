import React from "react";
import { useNavigate } from "react-router-dom";
import ModalWrapper from "../../../../util/ModalWrapper";

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    type: "warning" | "success";
    children: React.ReactNode;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, title, type, children }) => {
    const navigate = useNavigate();

    const navigateHandler = (path: string) => {
        onClose()
        setTimeout(() => {
            navigate(path);
        }, 300);
    }

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-bold mb-4 text-center">{title}</h2>
            <div className="mb-6 text-center">{children}</div>

            {type === "warning" && (
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        OK
                    </button>
                </div>
            )}

            {type === "success" && (
                <div className="flex flex-col md:flex-row justify-center space-x-2 space-y-2">
                    <button
                        onClick={navigateHandler.bind(null, "/demo/abyssal-shopping/orders?page=1")}
                        className="bg-green-600 w-full h-full hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Go to Orders
                    </button>
                    <button
                        onClick={navigateHandler.bind(null, "/demo/abyssal-shopping/products?page=1")}
                        className="bg-purple-600 w-full h-full hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Back to Shopping
                    </button>
                </div>
            )}
        </ModalWrapper>
    );
};

export default CartModal;
