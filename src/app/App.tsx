import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from "../global/components/navigation/nav-bar";
import GlobalSpinningLoader from "../global/components/loading/global-spinning-loader";
import AppContainer from "../global/components/container/app-container";
import Footer from "../global/components/footer/footer";
import { AuthProfile, signIn, setUserDatabaseId } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import LandingPage from "../pages/landing-page/landing-page";
import { checkUser, checkUserExists, createNewUser } from "./api/app.api";
import { DbUserResponse } from "./models/app.models";
import { User } from "@supabase/supabase-js";

const Home = lazy(() => import('../pages/home/home'));
const Users = lazy(() => import('../pages/users/users'));
const BillTrackingMain = lazy(() => import("../pages/bill-tracking/bill-tracking-main"));
const PageNotFound = lazy(() => import("../pages/error-page/page-not-found"))

const App = () => {
  const signedIn = useSelector((state: RootState) => state.auth.signedIn);
  const googleId = useSelector((state: RootState) => state.auth.googleId)
  const profileName = useSelector((state: RootState) => state.auth.profileName)
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  useEffect(() => {
    checkUser().then((response: { user: User | null }) => {
      if (response.user === null) {
        return;
      }

      const { full_name, picture } = response.user.user_metadata
      const googleId: string = response.user.id;
      const profileData: AuthProfile = { name: full_name, image: picture, googleId: googleId }
      dispatch(signIn(profileData));
    }).finally(() => setPageLoading(false));
  }, [])

  useEffect(() => {
    if (!signedIn) return;

    const setUserState = (response: DbUserResponse[] | null) => {
      if (response === null) return;
      const userDatabaseData: DbUserResponse = response[0];
      dispatch(setUserDatabaseId(userDatabaseData.id));
    }

    checkUserExists(googleId).then((response: DbUserResponse[]) => {
      if (response.length === 0) {
        createNewUser(profileName, googleId).then((response: DbUserResponse[] | null) => {
          setUserState(response)
        }).catch(error => console.error(error))
      } else {
        setUserState(response);
      }
    }).catch(error => console.error(error))
  }, [signedIn])


  return (
    <BrowserRouter>
      <NavBar/>
      <AppContainer>
        {pageLoading ? (
          <GlobalSpinningLoader/>
        ) : (
          <>
            {signedIn ? (
              <Suspense fallback={<GlobalSpinningLoader/>}>
                <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="users" element={<Users/>}/>
                  <Route path="about" element={<div>about</div>}/>
                  <Route path="/bill-tracker" element={<BillTrackingMain/>}/>
                  <Route path="*" element={<PageNotFound/>}/>
                </Routes>
              </Suspense>
            ) : (
              <LandingPage/>
            )}
          </>
        )}
      </AppContainer>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
