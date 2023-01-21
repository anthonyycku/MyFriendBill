import React from 'react';
import Marquee from "react-fast-marquee";

const NavBarMarquee = () => {
  return (
    <Marquee gradient={false} speed={40}>
      <h1>Site is under development</h1>
    </Marquee>
  )
};

export default NavBarMarquee;