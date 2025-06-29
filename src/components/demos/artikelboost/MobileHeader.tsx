import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Dropdown from "./Dropdown";

interface MobileHeaderProps {
    isOpen: boolean;
    onClick: () => void;
}

const MobileHeader = ({ isOpen, onClick }: MobileHeaderProps) => {
    const menuItems: string[] = ["tips", "cases", "collection"];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.nav
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="py-2 bg-artikelboostbg"
                >
                    <div className="flex justify-center items-center flex-wrap font-nanum">
                        {menuItems.map((path) => (
                            <NavLink
                                key={path}
                                to={path}
                                onClick={onClick}
                                className={({ isActive }) =>
                                    `px-4 py-2 text-4xl font-semibold hover:bg-neutral-300 rounded-3xl transition-colors duration-200 whitespace-nowrap ${isActive
                                        ? "bg-neutral-800 text-neutral-50 hover:bg-neutral-700"
                                        : "text-neutral-800"
                                    }`
                                }
                            >
                                {path.charAt(0).toUpperCase() + path.slice(1)}
                            </NavLink>
                        ))}
                        <Dropdown />
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default MobileHeader;
