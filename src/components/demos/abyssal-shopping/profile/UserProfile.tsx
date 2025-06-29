import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AccountInfo from "./AccountInfo";
import ResetPass from "./ResetPass";
import Inbox from "./Inbox";

const UserProfile = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.toString();

  const isAccountInfo = activeTab.includes("account-information");
  const isChangePass = activeTab.includes("change-password");
  const isInbox = activeTab.includes("messages");

  const activedTab = isAccountInfo && "Account Information" || isChangePass && "Change Password" || isInbox && "Inbox"

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);

      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
      setSidebarOpen(false)
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <>
      <div className="md:hidden bg-abyssalternative fixed w-full z-50 p-2 border-b border-neutral-200">
        <button
          className="py-2 bg-abyssalternative w-full flex justify-center items-center text-white font-semibold"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={`${sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}`} />
          </svg>
          Profile Menu<span className="mx-2">/</span>{activedTab}
        </button>
      </div>

      {/* Container */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <nav
          className={`
            fixed md:static top-0 ${isMobile ? "pt-[8rem]" : "pt-[4rem]"} left-0 h-full md:h-auto w-64 bg-white shadow-lg z-20
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            overflow-y-auto
          `}
        >
          <ul className="flex flex-col p-6 space-y-4 border-r border-neutral-200 h-full">
            <h1 className="text-abyssalternative text-3xl mx-auto font-pacifico mb-6">Abyss</h1>
            <li>
              <Link
                to="?account-information"
                onClick={() => { window.innerWidth < 768 && setSidebarOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                className={`block py-3 px-4 rounded-2xl text-[rgb(35,1,45)] ${isAccountInfo && "bg-neutral-200"} hover:bg-neutral-200 flex items-center gap-2`}
              >
                <i className="fa-solid fa-user fa-fw" />
                Account Details
              </Link>
            </li>
            <li>
              <Link
                to="?change-password"
                onClick={() => { window.innerWidth < 768 && setSidebarOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                className={`block py-3 px-4 rounded-2xl text-[rgb(35,1,45)] ${isChangePass && "bg-neutral-200"} hover:bg-neutral-200 flex items-center gap-2`}
              >
                <i className="fa-solid fa-pen-to-square fa-fw" />
                Change Password
              </Link>
            </li>
            <li>
              <Link
                to="?messages"
                onClick={() => { window.innerWidth < 768 && setSidebarOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                className={`block py-3 px-4 rounded-2xl text-[rgb(35,1,45)] ${isInbox && "bg-neutral-200"} hover:bg-neutral-200 flex items-center gap-2`}
              >
                <i className="fa-solid fa-envelope fa-fw" />
                Inbox
              </Link>
            </li>
          </ul>
        </nav>

        {/* Content */}
        <main className="flex-1 p-6 mt-10">
          {isAccountInfo && <AccountInfo />}
          {isChangePass && <ResetPass />}
          {isInbox && <Inbox />}
        </main>
      </div>
    </>
  );
};

export default UserProfile;
