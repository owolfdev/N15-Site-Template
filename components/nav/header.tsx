import React from "react";
import AuthComponent from "./auth-component";
import NavComponent from "./nav-component";
function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background">
      <div className="sm:px-12 px-8 flex items-center h-20 space-x-0 justify-between sm:space-x-0">
        <NavComponent />
        <AuthComponent />
      </div>
    </header>
  );
}

export default Header;
