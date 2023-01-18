import React, { useEffect } from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from "react-google-login";
import type { RootState } from '../../../../app/store';
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut, setUserInfo } from "../../../../features/auth/authSlice";

interface authProps {
  clientId: string;
}

const GoogleAuthButton = ({ clientId }: authProps) => {
  const { name, imageUrl } = useSelector((state: RootState) => state.auth.userInfo);
  const signedIn = useSelector((state: RootState) => state.auth.signedIn);
  const dispatch = useDispatch();

  const onSuccess = (res: (GoogleLoginResponse | GoogleLoginResponseOffline)) => {
    const validResponse = res as GoogleLoginResponse;
    const { name, imageUrl } = validResponse.profileObj;
    dispatch(signIn());
    dispatch(setUserInfo({ name, imageUrl }))
  };

  const onFailure = (err: GoogleLoginResponse) => {
    console.log('failed', err);
  };

  const logOut = () => {
    dispatch(signOut());
  }

  return (
    <div className="flex">

      {signedIn && (

        <div className="flex flex-col mr-4">
          <p className="text-white">Signed in as:</p>

          <div className="flex">
            <img width={20} height={20} src={imageUrl} alt="" referrerPolicy="no-referrer"/>
            <p className="text-white ml-2">{name}</p>
          </div>
        </div>
      )}

      {signedIn ? (
        <GoogleLogout
          clientId={clientId}
          buttonText="Log out"
          onLogoutSuccess={logOut}
        />
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy='single_host_origin'
          isSignedIn={true}
        />
      )}
    </div>
  )
};

export default GoogleAuthButton;