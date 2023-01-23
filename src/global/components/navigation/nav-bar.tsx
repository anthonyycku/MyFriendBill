import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../../assets/images/logo.png';
import NavBarMarquee from "../marquee/nav-bar-marquee";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import ProfileLogoutButton from "../login/profile-logout-button";

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
  const signedIn = useSelector((state: RootState) => state.auth.signedIn);

  return (
    <>
      <nav
        className="flex bg-gray-800 w-full text-white pr-2 py-2 items-center h-16">
        <div className="flex flex-grow">
          <Link to="/"><img className="h-16" src={logo} alt=""/></Link>
          <NavBarMarquee/>
        </div>
        {signedIn && <ProfileLogoutButton/>}
      </nav>
      <nav
        className="min-h-[3rem] bg-gradient-to-r from-green-600 flex font-medium space-x-8 px-2 text-lg items-center shadow-inner shadow-lime-700">
        <LinkButton text="Home" path="/"/>
        <LinkButton text="Users" path="users"/>
        <LinkButton text="About" path="about"/>
      </nav>
    </>
  )
};

export default NavBar;