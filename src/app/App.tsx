import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from "../global/components/navigation/nav-bar";
import GlobalSpinningLoader from "../global/components/loading/global-spinning-loader";
import PageContainer from "../global/components/pages/page-container";
import Footer from "../global/components/footer/footer";
import { Profile, signIn } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { supabase } from "../supabase-config";
import LandingPage from "../pages/landing-page/landing-page";
import { checkUser, checkUserExists, createNewUser } from "./api/app.api";
import { DB_User } from "./models/app.models";

const Home = lazy(() => import('../pages/home/home'));
const Users = lazy(() => import('../pages/users/users'));
const PageNotFound = lazy(() => import("../pages/error-page/page-not-found"))

const App = () => {
  const signedIn = useSelector((state: RootState) => state.auth.signedIn);
  const googleId = useSelector((state: RootState) => state.auth.googleId)
  const profileName = useSelector((state: RootState) => state.auth.profileName)
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  useEffect(() => {
    checkUser().then(response => {
      if (response.data.user === null) {
        setPageLoading(false);
        return;
      }

      const { full_name, picture } = response.data.user?.user_metadata
      const googleId: string = response.data.user.id;
      const profileData: Profile = { name: full_name, image: picture, googleId: googleId }
      dispatch(signIn(profileData));
      setPageLoading(false);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    if (signedIn) {
      checkUserExists(googleId).then((response: any) => {
        if (!response) return;
        if (response.length === 0) createNewUser(profileName, googleId).then(() => {
        })
      });
    }
  }, [signedIn])


  return (
    <BrowserRouter>
      <NavBar/>
      <PageContainer>
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
                  <Route path="/bill-tracker" element={<div>Bill Tracker</div>}/>
                  <Route path="*" element={<PageNotFound/>}/>
                </Routes>
              </Suspense>
            ) : (
              <LandingPage/>
            )}
          </>
        )}
      </PageContainer>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
