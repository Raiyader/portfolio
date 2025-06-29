import { useEffect, useState } from "react";
import DesktopHeader from "./UI/DesktopHeader";
import MobileHeader from "./UI/MobileHeader";
import ExitDemoButton from "../../../util/ExitDemoButton";

const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <header className="w-full bg-abyssprimary shadow-md fixed top-0 z-90">
      <ExitDemoButton color="abysssecondary" />
      {width >= 1024 ? <DesktopHeader /> : <MobileHeader />}
    </header>
  );
};

export default Header;
