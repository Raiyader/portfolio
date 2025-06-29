import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const ArtikelBoostLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.className = "bg-artikelboostbg";
    return () => {
      document.body.className = "";
    };
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default ArtikelBoostLayout;
