import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from "../global/components/navigation/nav-bar";

const Home = lazy(() => import('../pages/home/home'));
const Users = lazy(() => import('../pages/users/users'));

const App = () => {


  return (
    <BrowserRouter>
      <NavBar/>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="users" element={<Users/>}/>
          <Route path="about" element={<div>about</div>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
