import React from 'react';
import { useDispatch } from "react-redux";
import { createNewUser } from "../../../app/api/app.api";
import { setUserDatabaseId, signInAsGuest } from "../../../features/auth/authSlice";
import { DbUserResponse } from "../../../app/models/app.models";
import { errorHandler } from "../../../global/functions/error-handler/error-handler";
import { useNavigate } from "react-router-dom";
import { FirstNames, LastNames } from "../constants/names.constants";

const GuestSignInButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    const guestId = localStorage.getItem('guestLoginId');
    const guestName = localStorage.getItem('guestLoginName');
    if (guestId && guestName) {
      dispatch(signInAsGuest({ name: guestName }));
      dispatch(setUserDatabaseId(+guestId));
    } else {
      const randomGuestName = `${FirstNames[Math.floor(Math.random() * FirstNames.length)] + " " + LastNames[Math.floor(Math.random() * LastNames.length)]}`;
      createNewUser(randomGuestName).then((response: DbUserResponse[] | null) => {
        dispatch(signInAsGuest({ name: randomGuestName }));
        dispatch(setUserDatabaseId(response![0].id));
        localStorage.setItem('guestLoginId', `${response![0].id}`);
        localStorage.setItem('guestLoginName', randomGuestName);
      }).catch(error => errorHandler(error));
    }
    navigate('/');
  }

  return (
    <button
      type="button"
      className="w-[234px] font-bold py-2.5 px-5 mr-2 mb-2 bg-gray-700 text-sm text-gray-400 focus:outline-none bg-white rounded-lg border border-gray-200 hover:text-white focus:z-10 hover:bg-blue-800 hover:bg-blue-700 focus:outline-none"
      onClick={handleSignIn}
    >

      Sign in as guest
    </button>
  )
};

export default GuestSignInButton;