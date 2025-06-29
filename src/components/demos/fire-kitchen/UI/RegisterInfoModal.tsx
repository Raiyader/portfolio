import React from "react";
import { useNavigate } from "react-router-dom";
import ModalWrapper from "../../../../util/ModalWrapper";

type DemoInfoModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const RegisterInfoModal: React.FC<DemoInfoModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const loginHandler = () => {
        onClose();
        setTimeout(() => {
            navigate("/demo/fire-kitchen/login");
        }, 300);
    };

    return (
        <ModalWrapper isOpen={isOpen}
            onClose={onClose}
        >
            <h2 className="text-xl font-bold mb-4 text-center font-merienda">Demo Mode</h2>
            <p className="text-center mb-4">
                No need to register. <br /> You can log in with any email and password from the login page.
            </p>
            <div className="flex justify-center">
                <button
                    onClick={loginHandler}
                    className="bg-firekitchenprimary hover:bg-[#ff3333] text-white px-4 py-2 rounded font-merienda font-semibold"
                >
                    Login
                </button>
            </div>
        </ModalWrapper>
    );
};

export default RegisterInfoModal;
