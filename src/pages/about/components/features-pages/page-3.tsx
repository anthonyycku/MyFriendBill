import React from 'react';
import completeImage from "../../../../assets/features_images/complete-debt.png";
import activeBillImage from "../../../../assets/features_images/active-bill.png";
import archiveBillImage from "../../../../assets/features_images/archive-bill.png";
import updatedBillImage from "../../../../assets/features_images/updated-active-bill.png";
import rightArrowImage from "../../../../assets/features_images/arrow-right.png";
import downArrowImage from "../../../../assets/features_images/arrow-down.png";
import tableToolsImage from "../../../../assets/features_images/table-tools.png";
import archiveDeleteImage from "../../../../assets/features_images/archive-delete.png";
import Divider from "../../../../global/components/divider/divider";

const Page3 = () => {
  return (
    <div className="flex flex-col space-y-4">
      <p className="font-medium text-lg">Table tools</p>
      <p>There are two tabs for the table - Active and Archive. Active shows current bills not yet completed. Archive
        shows bills that have been paid.</p>
      <p>The search bar filters names, amounts, and descriptions.</p>
      <p>Dropdown menu can show all bills, only debts the user owes, or only debts owed to the user.</p>
      <img src={tableToolsImage} width={500} className="border border-2 border-emerald-800"/>

      <Divider/>

      <p className="font-medium text-lg">Completing a bill</p>

      <p>Users can complete bills by clicking either the check at the end of each row, or the the "Mark as complete"
        button in the secondary pane.</p>
      <img src={completeImage} width={800} className="border border-2 border-emerald-800"/>
      <p>Completing a bill sends a copy of the current bill to the archive for record-keeping.</p>
      <p>If the bill has a recurring frequency, a copy gets sent to the archive while the current bill's date will
        update to the date of its next recurrence (based on frequency).</p>
      <p>On the archived bill, the creation date and time are replaced with the date and time the bill was archived.</p>

      <p className="font-medium underline">For Example: </p>
      <div className="flex flex-col lg:flex-row">
        <img src={activeBillImage} width={400} className="border border-2 border-emerald-800"/>
        <picture className="self-center">
          <source media="(min-width:1024px)" srcSet={rightArrowImage}/>
          <source media="(min-width:100px)" srcSet={downArrowImage}/>
          <img src=""/>
        </picture>
        <img src={archiveBillImage} width={400} className="border border-2 border-emerald-800"/>
        <img src={updatedBillImage} width={400} className="border border-2 border-emerald-800"/>
      </div>
      <Divider/>
      <p className="font-medium text-lg">Archived bills</p>
      <p>Archived bills can be deleted permanently by clicking the delete icon at the end of each row or the delete
        button in the secondary pane.</p>
      <img src={archiveDeleteImage} width={600} className="border border-2 border-emerald-800"/>
    </div>
  )
};

export default Page3;