import React, { useEffect, useState } from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from "react-google-login";
import type { RootState } from '../../../../app/store';
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut, setUserInfo } from "../../../../features/auth/authSlice";
import LoadingPulse from "../../loading/loading-pulse";
import { gapi } from "gapi-script";

const GoogleAuthButton = () => {
  const clientId = '260492928179-bfugkb95ptjvit0hg8ooul8quppar8i5.apps.googleusercontent.com';

  const { name, imageUrl } = useSelector((state: RootState) => state.auth.userInfo);
  const signedIn = useSelector((state: RootState) => state.auth.signedIn);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
      setTimeout(() => setIsLoading(false), 500);
    };
    gapi.load('client:auth2', initClient);
  }, []);

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
      {!signedIn && isLoading && <LoadingPulse/>}

      {signedIn ? (
        <>
          <div className="flex flex-col mr-4 h-12">
            <p className="text-white">Signed in as:</p>
            <div className="flex">
              <img width={20} height={20} src={imageUrl} alt="" referrerPolicy="no-referrer"/>
              <p className="text-white ml-2">{name}</p>
            </div>
          </div>
          <GoogleLogout
            clientId={clientId}
            buttonText="Log out"
            onLogoutSuccess={logOut}
          />
        </>
      ) : (
        <div className="h-12" style={{ display: `${!signedIn && isLoading ? 'none' : 'inline'}` }}>
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy='single_host_origin'
            isSignedIn={true}
          />
        </div>
      )}
    </div>
  )
};

export default GoogleAuthButton;