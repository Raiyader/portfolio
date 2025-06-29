import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../../../../store/demos/abyssal-shopping/CartContext';
import { motion, AnimatePresence } from "framer-motion";

const MobileHeader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isAuth = localStorage.getItem("abyssalshopping");
    const { totalQuantity } = useCart();

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev);
    };
    return (
        <>
            <nav className="lg:hidden flex items-center justify-around px-4 h-[8vh] bg-abyssprimary text-white">
                <button className="cursor-pointer" onClick={toggleMobileMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={`${mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}`} />
                    </svg>
                </button>

                <NavLink to="" className="text-2xl font-pacifico text-abysssecondary underline">
                    Abyss
                </NavLink>

                <NavLink to="cart" className="relative hover:text-abysssecondary">
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
            </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="fixed top-[10vh] left-0 w-full h-[60%] bg-abyssprimary font-medium text-white z-40"
                    >
                        <ul className="flex flex-col w-[75%] mx-auto items-start p-4 mt-4 space-y-8">
                            <li>
                                <NavLink to="products?page=1" onClick={() => setMobileMenuOpen(false)} className="hover:text-abysssecondary">
                                    Shop
                                </NavLink>
                            </li>
                            {isAuth && (
                                <>
                                    <li>
                                        <NavLink to="add-product" onClick={() => setMobileMenuOpen(false)} className="hover:text-abysssecondary">
                                            Add Product
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="my-products" onClick={() => setMobileMenuOpen(false)} className="hover:text-abysssecondary">
                                            My Products
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="orders?page=1" onClick={() => setMobileMenuOpen(false)} className="hover:text-abysssecondary">
                                            My Orders
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="profile?account-information" onClick={() => setMobileMenuOpen(false)} className="hover:text-abysssecondary">
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="logout" onClick={() => setMobileMenuOpen(false)} className="hover:text-abysssecondary">
                                            Logout
                                        </NavLink>
                                    </li>
                                </>
                            )}
                            {!isAuth && (
                                <>
                                    <li>
                                        <NavLink to="/demo/abyssal-shopping/auth?mode=login" onClick={() => setMobileMenuOpen(false)} className="hover:text-abysssecondary">
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/demo/abyssal-shopping/auth?mode=register" onClick={() => setMobileMenuOpen(false)} className="hover:text-abysssecondary">
                                            Register
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    )
}

export default MobileHeader