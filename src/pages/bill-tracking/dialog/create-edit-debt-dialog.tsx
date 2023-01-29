import React, { useEffect, useState } from 'react';
import DialogContainer from "../../../global/components/dialog/dialog-container";
import { DialogProps } from "../../../global/components/dialog/models/dialog-props";
import DialogInputBox from "../../../global/components/dialog/components/dialog-input-box";
import { DebtDirection } from "../constants/bill-tracking.constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import DirectionToggle from "./components/direction-toggle";
import SelectedUser from "./components/selected-user";
import UsersList from "./components/users-list";

export interface UserData {
  id: number | null;
  name: string;
}

const CreateEditDebtDialog = ({ animationClass, modalRef }: DialogProps) => {
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const [debtDirection, setDebtDirection] = useState<string>(DebtDirection.TO);
  const [otherUser, setOtherUser] = useState<UserData>({ name: '', id: null });
  const [senderId, setSenderId] = useState<number | null>(null);
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [frequency, setFrequency] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');

  const [showUsers, setShowUsers] = useState<boolean>(false);

  const [noUserError, setNoUserError] = useState<boolean>(false);
  const [amountError, setAmountError] = useState<boolean>(false);
  const [unknownError, setUnknownError] = useState<boolean>(false);

  useEffect(() => {
    if (debtDirection === null) return;

    setSenderId(debtDirection === DebtDirection.TO ? userId : otherUser.id);
    setReceiverId(debtDirection === DebtDirection.TO ? otherUser.id : userId);
  }, [debtDirection]);

  const handleSubmit = () => {

  }

  return (
    <DialogContainer title="Create new debt" animationClass={animationClass} modalRef={modalRef}>
      <div className="flex flex-col space-y-4">

        <div className="flex">
          <DirectionToggle debtDirection={debtDirection} setDebtDirection={setDebtDirection}/>
          <SelectedUser user={otherUser} showUsers={showUsers} setShowUsers={setShowUsers}/>
        </div>
        {showUsers && <UsersList setShowUsers={setShowUsers} setOtherUser={setOtherUser}/>}

        <DialogInputBox value={amount} setValue={setAmount} heading="Amount ($)" type="number"/>
        <DialogInputBox value={description} setValue={setDescription} heading="Description" type="string"/>

        <div className="flex justify-end">
          <button className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-lg" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </DialogContainer>
  )
};

export default CreateEditDebtDialog;