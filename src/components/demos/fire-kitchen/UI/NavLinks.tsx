import { Link } from "react-router-dom";
import logo from "../../../../assets/demos/fire-kitchen/main-logo.png";

const NavLinks = ({ hideMenu }: { hideMenu: () => void }) => {
    const isLoggedIn = localStorage.getItem("firekitchen");

    return (
        <ul className="flex flex-col md:flex-row items-center gap-4 py-4 md:py-0 text-firekitchensecondary font-semibold text-xl">
            <li onClick={hideMenu}>
                <Link to="recipes" className="px-4 hover:text-black transition">Recipes</Link>
            </li>
            <li onClick={hideMenu}>
                <Link to="share" className="px-4 hover:text-black transition">Share</Link>
            </li>

            <li className="hidden md:block mx-6">
                <Link to="" onClick={hideMenu}>
                    <img src={logo} alt="Logo" className="w-full h-auto" />
                </Link>
            </li>

            {!isLoggedIn && (
                <>
                    <li onClick={hideMenu}>
                        <Link to="login" className="px-4 hover:text-black transition">Login</Link>
                    </li>
                    <li onClick={hideMenu}>
                        <Link to="register" className="px-4 hover:text-black transition">Register</Link>
                    </li>
                </>
            )}

            {isLoggedIn && (
                <>
                    <li onClick={hideMenu}>
                        <Link to="my-recipes" className="px-4 hover:text-black transition">My Recipes</Link>
                    </li>
                    <li onClick={hideMenu}>
                        <Link to="logout" className="px-4 hover:text-black transition">Logout</Link>
                    </li>
                </>
            )}
        </ul>
    );
};

export default NavLinks;
