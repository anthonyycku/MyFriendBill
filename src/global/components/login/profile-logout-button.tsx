import React, { useEffect, useState } from 'react';
import { supabase } from "../../../supabase-config";
import { signOut } from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const ProfileLogoutButton = () => {
  const profileName = useSelector((state: RootState) => state.auth.profileName)
  const profileImage = useSelector((state: RootState) => state.auth.profileImage)
  const dispatch = useDispatch();

  const signOutWithGoogle = async () => {
    await supabase.auth.signOut().then(() => {
      dispatch(signOut());
    })
  }

  return (
    <div className="flex ml-0.5 h-12 min-w-[100px]">
      <div
        className="flex font-medium mr-1 text-black bg-white rounded px-2 border-b-2 border-green-500 items-center">
        <img width={25} src={profileImage || ''} alt="" referrerPolicy="no-referrer"
             className="rounded-xl hidden md:inline-block"/>
        <p className="mx-2 hidden lg:inline-block">{profileName}</p>
        <button onClick={signOutWithGoogle} className="hover:text-amber-600">(Sign out)</button>
      </div>
    </div>
  )
};

export default ProfileLogoutButton;