import NavLinks from "./NavLinks";

const DesktopHeader = () => {
    const hideMenu = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className="flex justify-center items-center fixed w-full h-[21vh] bg-firekitchenprimary z-50 shadow-md">
            <NavLinks hideMenu={hideMenu} />
        </div>
    );
};

export default DesktopHeader;
