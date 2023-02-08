import React from 'react';
import GoogleSignInButton from "./components/google-sign-in-button";
import GuestSignInButton from "./components/guest-sign-in-button";
import AboutButton from "./components/about-button";

const LandingPage = () => {
  return (
    <div className="flex justify-center items-center w-full pt-10">
      <div
        className="flex flex-col justify-center h-96 w-[500px] p-6 shadow-[1px_1px_3px_0] shadow-lime-800 bg-gray-800 hover:bg-gray-700 rounded">
        <div className="flex flex-col justify-center items-center space-y-2">
          <GoogleSignInButton/>
          <GuestSignInButton/>
        </div>
        <div className="flex flex-col my-6 px-10 space-y-2">
          <p>Your Google information will<span className="font-medium">{` NOT `}</span> be collected.</p>
          <p>Sign in with Google for a better experience.</p>
          <p>Guest sign-in creates a new guest user each time.</p>
        </div>
        <div className="flex justify-center">
          <AboutButton/>
        </div>
      </div>
    </div>
  )
};

export default LandingPage;