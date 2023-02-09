import React from 'react';
import createDebtImage from "../../../../assets/features_images/create-debt.png";
import usersListImage from "../../../../assets/features_images/create-debt-users-list.png";
import editDebtImage from "../../../../assets/features_images/edit-debt.png";
import updateDebtImage from "../../../../assets/features_images/update-debt.png";
import requestMoneyTableImage from "../../../../assets/features_images/request-money-table.png";
import requestMoneyImage from "../../../../assets/features_images/request-money.png";
import sendMoneyTableImage from "../../../../assets/features_images/send-money-table.png";
import sendMoneyImage from "../../../../assets/features_images/send-money.png";
import Divider from "../../../../global/components/divider/divider";

const Page2 = () => {
  return (
    <div className="flex flex-col space-y-4">
      <p className="font-medium text-lg text-white">The basics</p>
      <p>During debt creation, users can choose other users to send/request money to. Creating a bill to an existing
        user will show the bill on their side too.</p>

      <div>
        <p className="font-medium underline">For Example: </p>
        <p>I'm requesting 12$ from "pritam frog"</p>
      </div>
      <p>Table:</p>
      <img src={requestMoneyTableImage} width={600} className="border border-2 border-emerald-800"/>
      <p>Secondary pane:</p>
      <img src={requestMoneyImage} width={400} className="border border-2 border-emerald-800"/>
      <p>From "pritam frog"'s side, this debt entry will appear in their table:</p>
      <img src={sendMoneyTableImage} width={600} className="border border-2 border-emerald-800"/>
      <p>Secondary pane:</p>
      <img src={sendMoneyImage} width={400} className="border border-2 border-emerald-800"/>

      <Divider/>

      <p className="font-medium text-lg text-white">Creating a new debt</p>

      <p>Users can create a debt through the "Create new bill" button.</p>
      <div className="flex flex-col space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0">
        <img src={createDebtImage} width={400} className="border border-2 border-emerald-800"/>
        <img src={usersListImage} width={400} className="border border-2 border-emerald-800"/>
      </div>

      <span className="flex flex-col lg:flex-row lg:space-x-2">
        <p className="font-medium text-white">To/From Users:</p><p>Users can select whether to send (To) or receive (from) other users.
        Selecting an existing user will reciprocate the bill to the other user. Alternatively, if the existing user does not exist, it is possible to create "custom users".
        </p>
      </span>

      <span className="flex flex-col lg:flex-row lg:space-x-2">
        <p className="font-medium text-white">Amount:</p><p>Must be a number and rounds to 2 decimal places.</p>
      </span>

      <span className="flex flex-col lg:flex-row lg:space-x-2">
        <p className="font-medium text-white">Description:</p><p>Text. Optional.</p>
      </span>

      <span className="flex flex-col lg:flex-row lg:space-x-2">
        <p className="font-medium text-white">Due Date:</p><p>Deadline for the bill. If date isn't relevant, it can default to null if left empty or by clicking on "No Due Date" button.</p>
      </span>

      <span className="flex flex-col lg:flex-row lg:space-x-2">
        <p className="font-medium text-white">Frequency:</p><p>Time between each recurrence. Options are: One time, weekly, bi-weekly, monthly, every 2 months, every 3 months, every 6 months, annually.</p>
      </span>

      <span className="flex flex-col lg:flex-row lg:space-x-2 ">
        <p className="font-medium text-white">Notes:</p><p>Text. Optional. Not shown on table.</p>
      </span>

      <Divider/>

      <p className="font-medium text-lg text-white">Updating an existing debt</p>
      <p>Existing bills can be updated through the edit button in the secondary pane, after selecting a row from the
        table.</p>
      <img src={editDebtImage} width={400} className="border border-2 border-emerald-800"/>
      <p> The dialog will show up with the current values:</p>
      <img src={updateDebtImage} width={400} className="border border-2 border-emerald-800"/>
      <p>Note that both users (sender and receiver) will see the same changes to the updated bill.</p>
    </div>
  )
};

export default Page2;