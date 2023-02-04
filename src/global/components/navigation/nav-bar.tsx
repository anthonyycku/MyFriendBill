import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../../../assets/images/logo.png';
import NavBarMarquee from "../marquee/nav-bar-marquee";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import ProfileLogoutButton from "../login/profile-logout-button";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
        className="min-h-[3rem] bg-gradient-to-r from-green-600 flex font-medium space-x-8 px-5 text-lg items-center shadow-inner shadow-emerald-700">
        {location.pathname !== '/' && (
          <button
            className="bg-transparent hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded w-fit flex items-center space-x-2"
            onClick={() => navigate(-1)}
            type="button"
          >
            <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>
            <p>Back</p>
          </button>
        )}
      </nav>
    </>
  )
};

export default NavBar;