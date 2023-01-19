import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from "../global/components/navigation/nav-bar";
import GlobalSpinningLoader from "../global/components/loading/global-spinning-loader";
import PageContainer from "../global/components/pages/page-container";

const Home = lazy(() => import('../pages/home/home'));
const Users = lazy(() => import('../pages/users/users'));
const PageNotFound = lazy(() => import("../pages/error-page/page-not-found"))

const App = () => {

  return (
    <BrowserRouter>
      <NavBar/>
      <Suspense fallback={<GlobalSpinningLoader/>}>
        <PageContainer>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="users" element={<Users/>}/>
            <Route path="about" element={<div>about</div>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </PageContainer>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
