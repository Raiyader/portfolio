import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("abyssalshopping");
        navigate("/demo/abyssal-shopping");
    });
    return <></>;
}

export default Logout
