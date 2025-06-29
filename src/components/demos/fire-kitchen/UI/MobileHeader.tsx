import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/demos/fire-kitchen/main-logo.png";
import NavLinks from "./NavLinks";
import { AnimatePresence, motion } from "framer-motion";

const MobileHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const hideMenu = () => {
        window.scrollTo(0, 0);
        setIsMenuOpen(false);
    };

    return (
        <div className="fixed w-full bg-firekitchenprimary z-50 shadow-md">
            <div className="flex items-center justify-between px-4 h-[15vh]">
                <Link to="" onClick={hideMenu} className="w-60">
                    <img src={logo} alt="Fire Kitchen" className="w-full h-auto" />
                </Link>

                <button
                    className="text-firekitchensecondary focus:outline-none"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full bg-firekitchenprimary"
                    >
                        <NavLinks hideMenu={hideMenu} />
                    </motion.nav>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileHeader;
