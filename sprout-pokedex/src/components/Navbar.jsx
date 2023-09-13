import React from "react";
import navbarLogo from "../assets/navbar-logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full h-16 md:h-20 z-30 md:mb-5 bg-white shadow-lg">
      <Link
        to={"/"}
        className="flex items-center gap-3 h-full w-full sm:px-10 px-5"
      >
        <img
          src={navbarLogo}
          alt="navbar-logo"
          className="sm:w-[30px] w-[25px] h-fit"
        />
        <h2>Pokedex</h2>
      </Link>
    </header>
  );
}
