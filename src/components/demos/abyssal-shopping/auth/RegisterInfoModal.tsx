import { useNavigate } from "react-router-dom";
import ModalWrapper from "../../../../util/ModalWrapper";

type DemoInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RegisterInfoModal = ({ isOpen, onClose }: DemoInfoModalProps) => {
  const navigate = useNavigate();

  const loginHandler = () => {
    onClose();
    setTimeout(() => {
      navigate("/demo/abyssal-shopping/auth?mode=login");
    }, 300);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-semibold mb-4 text-center font-pacifico">Demo Mode</h2>
      <p className="text-center mb-4">
        No need to register. <br /> You can log in with any email and password from the login page.
      </p>
      <div className="flex justify-center">
        <button
          onClick={loginHandler}
          className="bg-abyssalternative hover:bg-abysssecondary text-white hover:text-black px-4 py-2 rounded font-semibold"
        >
          Login
        </button>
      </div>
    </ModalWrapper>
  );
};

export default RegisterInfoModal;
