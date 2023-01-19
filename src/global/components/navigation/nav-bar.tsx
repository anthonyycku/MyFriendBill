import React from 'react';
import { Link } from "react-router-dom";
import GoogleAuthButton from "./components/google-auth-button";

interface LinkButtonProps {
  text: string;
  path: string;
}

const LinkButton = ({ text, path }: LinkButtonProps) => {
  return (
    <Link to={path} className="text-white hover:underline">
      {text}
    </Link>
  )
}
const NavBar = () => {

  return (
    <>
      <nav className="flex bg-gray-900 w-full text-white px-4 py-2 justify-between items-center max-h-14">
        <Link to="/" className="h-6 mr-3 sm:h-9 font-bold text-2xl">IOU Keeper</Link>
        <GoogleAuthButton/>
      </nav>
      <nav className="bg-gray-700 h-12">
        <ul className="flex flex-row mr-6 font-medium space-x-8 px-2 text-lg h-full items-center">
          <LinkButton text="Home" path="/"/>
          <LinkButton text="Users" path="users"/>
          <LinkButton text="About" path="about"/>
        </ul>
      </nav>
    </>
  )
};

export default NavBar;