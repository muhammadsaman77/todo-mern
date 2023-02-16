import React from "react";
import LogoSvgComponent from "assets/svg/logo";

const Header: React.FC = () => {
  return (
    <nav className="flex justify-center items-center w-full box-border shadow-xl bg-darkPurple mb-10">
      <LogoSvgComponent height="80px" />
    </nav>
  );
};
export default Header;
