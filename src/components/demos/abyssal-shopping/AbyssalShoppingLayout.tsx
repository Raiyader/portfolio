import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AbyssalShoppingLayout: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        document.body.className = "bg-abyssbg";
        return () => {
            document.body.className = "";
        };
    }, []);

    return (
        <>
            <Header />
            <main className="flex-grow mt-[10vh]">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default AbyssalShoppingLayout;
