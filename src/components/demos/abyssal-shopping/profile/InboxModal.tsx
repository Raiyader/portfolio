import React from "react";
import ModalWrapper from "../../../../util/ModalWrapper";

interface NoticeModalProps {
    onClose: () => void;
    show?: boolean;
}

const InboxModal: React.FC<NoticeModalProps> = ({ onClose, show = true }) => {
    return (
        <ModalWrapper
            isOpen={show}
            onClose={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800"
                aria-label="Close"
            >
                ✕
            </button>

            <h2 className="text-lg md:text-2xl font-bold text-abyssalternative mb-4">
                Demo Instructions
            </h2>

            <div className="space-y-3 text-base text-neutral-700">
                <p>Welcome to the demo version of Abyssal Shopping!</p>

                <p>
                    This demo aims to provide a realistic e-commerce experience, including cart behavior, stock management, and order tracking — all running locally without a real database or payment processing.
                </p>

                <ul className="list-disc pl-5 space-y-1">
                    <li>
                        <strong>Preloaded Cart:</strong> Your cart starts with two items to demonstrate stock management:
                        <ul className="list-disc pl-5">
                            <li><em>Chocolate Chip Cookies</em> (currently out of stock)</li>
                            <li><em>Gel Ink Pen</em> (in stock)</li>
                        </ul>
                        <span className="block mt-1">
                            The out-of-stock item prevents checkout, allowing you to experience realistic stock behavior.
                        </span>
                    </li>
                    <li>
                        <strong>Order History:</strong> Your orders are saved locally and can be viewed anytime with invoice-style details.
                    </li>
                    <li>
                        <strong>Login & User Data:</strong> Login only requires an email—no real authentication is implemented.
                    </li>
                    <li>
                        <strong>Limited Functionality:</strong> Features like product addition, editing, or removal are disabled in the demo, though they exist in the original version.
                    </li>
                    <li>
                        <strong>Stock Persistence:</strong> In this demo, purchases don't update the stock, unlike in the original app.
                    </li>
                </ul>

                <p>Feel free to explore and test the app’s behavior!</p>
            </div>

        </ModalWrapper>
    );
};

export default InboxModal;
