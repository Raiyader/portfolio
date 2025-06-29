import { Link } from "react-router-dom";
import footerLogo from "../../../assets/demos/fire-kitchen/footer-logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-black py-10 shadow-lg text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div className="flex flex-col items-center md:items-start">
            <img src={footerLogo} alt="Footer Logo" className="w-full h-auto" />
            <p className="text-neutral-400 mt-4 text-sm text-center md:text-left">
              © 2024 Raiyader
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h5 className="text-lg font-semibold mb-2">Fire Kitchen</h5>
            <ul className="flex flex-col items-center space-y-2">
              <li>
                <Link
                  to="https://github.com/Raiyader"
                  target="_blank"
                  className="text-firekitchenprimary hover:text-white transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link to="#" className="text-firekitchenprimary hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
