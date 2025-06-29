import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { i18n, t } = useTranslation();

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && window.location.hash === "#contact") {
      const section = document.getElementById("contact");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const handleContactClick = () => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      const section = document.getElementById("contact");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { direction: "left", scrollTo: "contact" } });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
    if (location.pathname === "/projects") {
      navigate("/", { state: { direction: "left" } });
    } else {
      navigate("/", { state: { direction: "none" } });
    }
  };

  const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (location.pathname === "/") {
      navigate("/projects", { state: { direction: "right" } });
    } else {
      navigate("/projects", { state: { direction: "none" } });
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "tr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="bg-headerbg shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-6xl font-outfit mx-auto px-4 py-4 flex justify-between items-center">
        <button
          onClick={scrollToTop}
          className="text-xl font-outfit font-bold text-[#808080] cursor-pointer"
        >
          {"<"}<span className="text-primary">MertEvirgen</span>{" />"}
        </button>

        <button
          className="md:hidden p-2 text-[#808080] focus:outline-none z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                menuOpen
                  ? "M6 18 18 6M6 6l12 12"
                  : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              }
            />
          </svg>
        </button>

        <nav
          className={`${menuOpen ? "flex" : "hidden"
            } absolute top-16 left-0 w-full bg-[#1e1e1e] flex-col items-center gap-4 py-4 md:flex md:static md:w-auto md:flex-row md:gap-6 md:py-0 text-base font-medium text-neutral-400`}
        >
          <NavLink
            to="/projects"
            onClick={clickHandler}
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold"
                : "hover:text-primary/90 transition-colors"
            }
          >
            {t("header.projects")}
          </NavLink>

          <button
            onClick={handleContactClick}
            className="px-4 py-2 hover:text-primary transition cursor-pointer"
          >
            {t("header.contact")}
          </button>

          <button
            onClick={toggleLanguage}
            className="px-4 py-2 border border-neutral-600 rounded hover:bg-neutral-700 transition"
            title={t("header.changeLanguage") || "Change Language"}
          >
            {i18n.language === "en" ? "TR" : "EN"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
