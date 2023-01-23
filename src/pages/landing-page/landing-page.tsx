import React from 'react';
import GoogleSignInButton from "../../global/components/login/google-sign-in-button";

const LandingPage = () => {
  return (
    <div className="flex justify-center items-center w-full pt-10">
      <div
        className="flex flex-col justify-center h-96 w-[500px] p-6 shadow-[1px_1px_3px_0] shadow-lime-800 bg-gray-800 hover:bg-gray-700 rounded">
        <div className="flex justify-center">
          <GoogleSignInButton/>
        </div>
        <div className="flex flex-col mt-6 px-10 space-y-2">
          <p>Please sign in using Google to access all features.</p>
          <p>Your Google information will<span className="font-medium">{` NOT `}</span> be collected.</p>
          <p>I'm just some guy making an app.</p>
        </div>
      </div>
    </div>
  )
};

export default LandingPage;