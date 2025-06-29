import { Navigate } from "react-router-dom";

const ProtectedAuth = ({ children }: { children: React.ReactNode }) => {
    const user = localStorage.getItem("firekitchen");
    if (user) {
        return <Navigate to="/demo/fire-kitchen" replace />;
    }
    return <>{children}</>;
};

export default ProtectedAuth;
