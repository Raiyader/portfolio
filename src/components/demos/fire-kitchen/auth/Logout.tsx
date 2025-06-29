import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("firekitchen");
    navigate("/demo/fire-kitchen");
  });
  return <></>;
}

export default Logout
