import React from "react";
import ModalWrapper from "../../../../util/ModalWrapper";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

type RegisterSuccessModalProps = {
    isOpen: boolean;
    onClose: () => void;
    formData: FormData | null;
};

const SuccessRegisterModal: React.FC<RegisterSuccessModalProps> = ({ isOpen, onClose, formData }) => {
    if (!formData) return null;

    return (
        <ModalWrapper isOpen={isOpen}
            onClose={onClose}
        >
            <h2 className="text-xl font-semibold mb-4 text-center font-merienda">Thank You!</h2>
            <p className="mb-2 text-center">
                Your registration was received. <br /> <span className="text-[#ff3333] font-semibold">This is a demo, so your data has not been saved.</span>
            </p>

            <div className="mb-4 max-h-40 overflow-auto border border-neutral-300 rounded p-3 bg-neutral-50 text-sm">
                <div><span className="font-semibold">First Name:</span> {formData.firstName}</div>
                <div><span className="font-semibold">Last Name:</span> {formData.lastName}</div>
                <div><span className="font-semibold">Email:</span> {formData.email}</div>
                <div><span className="font-semibold">Password:</span> {"•".repeat(formData.password.length)}</div>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={onClose}
                    className="bg-firekitchenprimary hover:bg-[#ff3333] text-white px-4 py-2 rounded font-merienda font-semibold"
                >
                    Login
                </button>
            </div>
        </ModalWrapper>
    );
};

export default SuccessRegisterModal;
