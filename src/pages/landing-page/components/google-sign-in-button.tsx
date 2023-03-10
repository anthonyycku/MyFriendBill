import React from 'react';
import googleIcon from '../../../assets/images/google-transparent.png'
import { supabase } from "../../../supabase-config";

const GoogleSignInButton = () => {

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google'
    });
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="h-12 space-x-2 bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
    >
      <img src={googleIcon} alt="" width={30}/>
      <p>Sign in with Google</p>
    </button>
  )
};

export default GoogleSignInButton;