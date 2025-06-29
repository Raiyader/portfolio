import React, { useEffect, useState } from "react";
import ModalWrapper from "../../../../util/ModalWrapper";

const DemoNoticeModal: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const email = localStorage.getItem("abyssalshopping");

    useEffect(() => {
        if (!email) return;

        const userData = localStorage.getItem(`abyssalshopping/${email}`);
        if (!userData) return;

        try {
            const parsed = JSON.parse(userData);
            if (parsed.demoNotice !== false) {
                setShowModal(true);
            }
        } catch (err) {
            console.error("Error parsing user data", err);
        }
    }, []);

    const handleClose = () => {
        const email = localStorage.getItem("abyssalshopping");
        if (!email) return;

        const raw = localStorage.getItem(`abyssalshopping/${email}`);
        if (!raw) return;

        const parsed = JSON.parse(raw);
        const updated = {
            ...parsed,
            demoNotice: false,
        };
        localStorage.setItem(`abyssalshopping/${email}`, JSON.stringify(updated));
        setShowModal(false);
    };

    return (
        <ModalWrapper onClose={handleClose} isOpen={showModal}>
            <h2 className="text-xl font-bold text-abyssalternative mb-4">Demo Notice</h2>
            <p className="text-neutral-700 text-sm mb-4">
                This demo cart includes two preloaded products — one of them, “Chocolate Chip Cookies”, is currently out of stock. This lets you experience real checkout behavior with stock limitations.
            </p>
            <p className="text-xs text-neutral-400 mb-6">You can remove these products or add more from the catalog.</p>
            <button
                onClick={handleClose}
                className="bg-abyssalternative hover:bg-purple-600 text-white px-6 py-2 rounded transition"
            >
                Got it
            </button>
        </ModalWrapper>
    );
};

export default DemoNoticeModal;
