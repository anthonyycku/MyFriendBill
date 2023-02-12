import React from 'react';
import Divider from "../../../../global/components/divider/divider";
import landingPageImage from '../../../../assets/features_images/landing-page.png'

const Page1 = () => {
  return (
    <div className="flex flex-col space-y-4">
      <p className="font-medium text-lg text-white">What is MyFriendBill?</p>
      <p>
        MyFriendBill is an application that allows users to keep track of the money they are owed/owe to other users or
        institutions.
      </p>
      <p>
        By signing in through Google, only your name and profile image are saved to the database. This is to allow other
        users to send/request bills to and from you.
      </p>

      <Divider/>

      <p className="font-medium text-lg text-white">Getting started</p>

      <img src={landingPageImage} width={500} className="border border-2 border-emerald-800"/>
      <span className="flex flex-col lg:flex-row lg:space-x-2">
        <p className="font-medium text-white">Sign in with Google:</p><p>Signing in with Google allows the user to share their name with other users. Other than profile image and name, no other data is saved.
        </p>
      </span>
      <span className="flex flex-col lg:flex-row lg:space-x-2">
        <p className="font-medium text-white">Sign in as guest:</p><p>Signing in as guest will provide the user with a randomly generated name. If the user logs out, the user will be assigned a new name and a clean profile.
        </p>
      </span>
    </div>
  )
};

export default Page1;