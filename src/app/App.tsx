import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from "../global/components/navigation/nav-bar";
import GlobalSpinningLoader from "../global/components/loading/global-spinning-loader";
import AppContainer from "../global/components/container/app-container";
import Footer from "../global/components/footer/footer";
import { AuthProfile, signIn, setUserDatabaseId, signInAsGuest } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import LandingPage from "../pages/landing-page/landing-page";
import { checkUser, checkUserExists, createNewUser } from "./api/app.api";
import { DbUserResponse } from "./models/app.models";
import { User } from "@supabase/supabase-js";
import { errorHandler } from "../global/functions/error-handler/error-handler";

const Home = lazy(() => import('../pages/home/home'));
const BillTracking = lazy(() => import("../pages/bill-tracking/bill-tracking"));
const PageNotFound = lazy(() => import("../pages/error-page/page-not-found"))
const About = lazy(() => import("../pages/about/about-page"));

const App = () => {
  const signedIn = useSelector((state: RootState) => state.auth.signedIn);
  const googleId = useSelector((state: RootState) => state.auth.googleId);
  const profileName = useSelector((state: RootState) => state.auth.profileName);
  const isGuest = useSelector((state: RootState) => state.auth.isGuest)
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  useEffect(() => {
    const guestId = localStorage.getItem('guestLoginId');
    const guestName = localStorage.getItem('guestLoginName');

    if (guestId && guestName) {
      dispatch(signInAsGuest({ name: guestName }));
      dispatch(setUserDatabaseId(+guestId));
      setPageLoading(false);
    } else {
      checkUser().then((response: { user: User | null }) => {
        if (response.user === null) return;
        
        const { full_name, picture } = response.user.user_metadata;
        const googleId: string = response.user.id;
        const profileData: AuthProfile = { name: full_name, image: picture, googleId: googleId };
        dispatch(signIn(profileData));
      }).finally(() => setPageLoading(false));
    }
  }, []);

  useEffect(() => {
    if (!signedIn || isGuest) return;

    const setUserStateId = (response: DbUserResponse[] | null) => {
      if (response === null) return;
      const userDatabaseData: DbUserResponse = response[0];
      dispatch(setUserDatabaseId(userDatabaseData.id));
    }

    checkUserExists(googleId).then((response: DbUserResponse[]) => {
      if (response.length === 0) {
        createNewUser(profileName, googleId).then((response: DbUserResponse[] | null) => {
          setUserStateId(response)
        }).catch(error => errorHandler(error))
      } else {
        setUserStateId(response);
      }
    }).catch(error => errorHandler(error))

  }, [signedIn])


  return (
    <BrowserRouter>
      <NavBar/>
      <AppContainer>
        {pageLoading && <GlobalSpinningLoader/>}
        {!pageLoading && (
          <Suspense fallback={<GlobalSpinningLoader/>}>
            <Routes>
              <Route path="*" element={<PageNotFound/>}/>
              <Route path="/about" element={<About/>}/>
              {signedIn ? (
                <>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/bill-tracker" element={<BillTracking/>}/>
                </>
              ) : (
                <>
                  <Route path="/" element={<LandingPage/>}/>
                </>
              )}
            </Routes>
          </Suspense>
        )}
      </AppContainer>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
