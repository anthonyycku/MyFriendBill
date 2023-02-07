import React from 'react';
import Divider from "../../../../global/components/divider/divider";

const Page1 = () => {
  return (
    <div className="flex flex-col space-y-4">
      <p className="font-medium text-lg">What is MyFriendBill?</p>
      <p>
        MyFriendBill is an application that allows users to keep track of the money they are owed/owe to other users or
        institutions.
      </p>
      <p>
        By signing in through Google, only your name and profile image are saved to the database. This is to allow other
        users to send/request debts from you.
      </p>

      <Divider/>

      <p className="font-medium text-lg">Getting started</p>

    </div>
  )
};

export default Page1;