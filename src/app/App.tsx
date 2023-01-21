import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from "../global/components/navigation/nav-bar";
import GlobalSpinningLoader from "../global/components/loading/global-spinning-loader";
import PageContainer from "../global/components/pages/page-container";
import Footer from "../global/components/footer/footer";

const Home = lazy(() => import('../pages/home/home'));
const Users = lazy(() => import('../pages/users/users'));
const PageNotFound = lazy(() => import("../pages/error-page/page-not-found"))

const App = () => {

  return (
    <BrowserRouter>
      <NavBar/>
      <PageContainer>
        <Suspense fallback={<GlobalSpinningLoader/>}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="users" element={<Users/>}/>
            <Route path="about" element={<div>about</div>}/>
            <Route path="/bill-tracker" element={<div>Bill Tracker</div>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </Suspense>
      </PageContainer>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
