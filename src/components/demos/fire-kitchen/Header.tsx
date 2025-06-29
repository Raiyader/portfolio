import ExitDemoButton from "../../../util/ExitDemoButton";
import MobileHeader from "./UI/MobileHeader";
import DesktopHeader from "./UI/DesktopHeader";
import { useEffect, useState } from "react";

const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (


    <header className="w-full bg-firekitchenprimary shadow-md fixed top-0 z-90">
      <ExitDemoButton color="black" />
      {width >= 768 ? <DesktopHeader /> : <MobileHeader />}
    </header>
  );
};

export default Header;
