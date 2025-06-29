import { useState } from 'react'
import { useCart } from '../../../../store/demos/abyssal-shopping/CartContext';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from "framer-motion"

const DesktopHeader = () => {
    const [openAuthDropdown, setOpenAuthDropdown] = useState(false);
    const [openUserDropdown, setOpenUserDropdown] = useState(false);
    const isAuth = localStorage.getItem("abyssalshopping");
    const { totalQuantity } = useCart();
    const location = useLocation();

    const navItems = [
        { to: "products?page=1", label: "Shop" },
        { to: "my-products?page=1", label: "My Shop" },
    ];

    if (isAuth) {
        navItems.push({
            to: "orders?page=1",
            label: "My Orders",
        });
    }

    return (
        <>
            <nav className="hidden lg:flex justify-around items-center font-medium text-white h-[8vh] px-12">
                <NavLink
                    to=""
                    className="text-[1.75rem] font-pacifico text-abysssecondary underline"
                >
                    Abyss
                </NavLink>

                <ul className="relative flex items-center gap-6">
                    {navItems.map(({ to, label }) => {
                        const isActive = location.pathname.includes(to.split("?")[0]);
                        return (
                            <li key={to} className="relative">
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        isActive ? "text-abysssecondary" : "hover:text-abysssecondary"
                                    }
                                >
                                    {label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute left-0 -bottom-1 h-[2px] w-full bg-teal-400"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>

                <ul className="flex items-center gap-6">
                    <li>
                        <NavLink
                            to="cart"
                            className={({ isActive }) =>
                                `relative text-white hover:text-abysssecondary ${isActive ? "text-abysssecondary" : ""}`
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                            </svg>
                            {isAuth && totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-3 w-5 h-5 rounded-full bg-abysssecondary text-abyssprimary text-xs font-semibold flex items-center justify-center">
                                    {totalQuantity}
                                </span>
                            )}
                        </NavLink>
                    </li>

                    <li
                        className="relative"
                        onMouseEnter={() =>
                            isAuth ? setOpenUserDropdown(true) : setOpenAuthDropdown(true)
                        }
                        onMouseLeave={() =>
                            isAuth ? setOpenUserDropdown(false) : setOpenAuthDropdown(false)
                        }
                    >
                        <Link
                            to={isAuth ? "profile?account-information" : "/demo/abyssal-shopping/auth?mode=login"}
                            className="flex items-center justify-center h-12 w-12 border-2 border-teal-400 rounded-full text-white hover:text-abysssecondary"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                        {!isAuth && openAuthDropdown && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 bg-abyssprimary text-white shadow-lg rounded w-30 py-2 z-10">
                                <Link to="/demo/abyssal-shopping/auth?mode=login" className="hover:text-abysssecondary cursor-pointer text-center w-full block py-1">
                                    Login
                                </Link>
                                <Link to="/demo/abyssal-shopping/auth?mode=register" className="hover:text-abysssecondary cursor-pointer text-center w-full block py-1">
                                    Register
                                </Link>
                            </div>
                        )}
                        {isAuth && openUserDropdown && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 bg-abyssprimary text-white shadow-lg rounded w-30 py-2 z-10">
                                <Link to="profile?account-information" className="hover:text-abysssecondary cursor-pointer text-center w-full block py-1">
                                    Profile
                                </Link>
                                <Link to="logout" className="hover:text-abysssecondary cursor-pointer text-center w-full block py-1">
                                    Logout
                                </Link>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default DesktopHeader