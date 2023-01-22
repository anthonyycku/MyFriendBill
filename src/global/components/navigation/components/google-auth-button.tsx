import React, { useEffect } from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from "react-google-login";
import type { RootState } from '../../../../app/store';
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut, setSignedInStatus } from "../../../../features/auth/authSlice";
import { gapi } from "gapi-script";
import AccountInfo from "./account-info";
import GoogleSignInCustomButton from "./google-sign-in-custom-button";

const GoogleAuthButton = () => {
  const clientId = '260492928179-bfugkb95ptjvit0hg8ooul8quppar8i5.apps.googleusercontent.com';

  const { name, imageUrl } = useSelector((state: RootState) => state.auth.userInfo);
  const signedIn = useSelector((state: RootState) => state.auth.signedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  }, []);

  useEffect(() => {
    if (name && imageUrl) dispatch(setSignedInStatus(true));
    if (!name && !imageUrl) dispatch(setSignedInStatus(false));
  }, [name, imageUrl]);

  const onSuccess = (res: (GoogleLoginResponse | GoogleLoginResponseOffline)): void => {
    const validResponse = res as GoogleLoginResponse;
    const { name, imageUrl } = validResponse.profileObj;
    dispatch(signIn({ name, imageUrl }));
  };

  const onFailure = (err: GoogleLoginResponse): void => {
    console.log('failed', err);
  };

  const logOut = () => {
    dispatch(signOut());
  }

  return (
    <div className="flex ml-0.5 h-12">
      {signedIn ? (
        <GoogleLogout
          clientId={clientId}
          onLogoutSuccess={logOut}
          render={renderProps => <AccountInfo onClick={renderProps.onClick} name={name} imageUrl={imageUrl}/>}
        />
      ) : (
        <GoogleLogin
          clientId={clientId}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy='single_host_origin'
          isSignedIn={true}
          render={renderProps => <GoogleSignInCustomButton onClick={renderProps.onClick}/>}
        />
      )}
    </div>
  )
};

export default GoogleAuthButton;