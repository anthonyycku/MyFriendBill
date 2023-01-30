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
import NoteInput from "./components/note-input";
import DueDateInput from "./components/due-date-input";
import FrequencySelector from "./components/frequency-selector";
import Divider from "../../../global/components/divider/divider";
import { CreateEntry } from "../models/bill-tracking.model";
import { createNewDebt } from "../api/bill-tracking.api";

export interface UserData {
  id: number | null;
  name: string;
}

const CreateEditDebtDialog = ({
                                animationClass, modalRef, setOpenDialog = () => {
  }
                              }: DialogProps) => {
  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const [debtDirection, setDebtDirection] = useState<string>(DebtDirection.TO);
  const [otherUser, setOtherUser] = useState<UserData>({ name: '', id: null });
  const [senderId, setSenderId] = useState<number | null>(null);
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [frequency, setFrequency] = useState<string | null>(null);
  const [note, setNote] = useState<string>('');

  const [showUsers, setShowUsers] = useState<boolean>(false);

  const [noUserError, setNoUserError] = useState<boolean>(false);
  const [amountError, setAmountError] = useState<boolean>(false);
  const [unknownError, setUnknownError] = useState<boolean>(false);

  useEffect(() => {
    setSenderId(debtDirection === DebtDirection.TO ? userId : otherUser.id);
    setReceiverId(debtDirection === DebtDirection.TO ? otherUser.id : userId);
  }, [debtDirection]);

  useEffect(() => {
    if (otherUser.id === null) return;

    if (debtDirection === DebtDirection.TO) setReceiverId(otherUser.id);
    if (debtDirection === DebtDirection.FROM) setSenderId(otherUser.id);
  }, [otherUser])

  const isError = (): boolean => {
    let errorCounts = 0;

    if (otherUser.id === null) {
      setNoUserError(true);
      errorCounts += 1;
    } else {
      setNoUserError(false);
    }

    if (amount <= 0) {
      setAmountError(true);
      errorCounts += 1;
    } else {
      setAmountError(false);
    }

    return Boolean(errorCounts);
  }

  const handleSubmit = () => {
    if (isError()) return;

    const data: CreateEntry = {
      sender_id: senderId!,
      receiver_id: receiverId!,
      amount: +Number(amount).toFixed(2),
      description: description,
      next_recurrence_date: dueDate,
      frequency_interval: frequency,
      note: note
    }

    createNewDebt(data).then(response => {
      setOpenDialog(false);
    }).catch(error => {
      setUnknownError(true);
      console.error(error)
    })
  }

  return (
    <DialogContainer title="Create new debt" animationClass={animationClass} modalRef={modalRef}>
      <div className="flex flex-col">

        <div className="flex">
          <DirectionToggle debtDirection={debtDirection} setDebtDirection={setDebtDirection}/>
          <SelectedUser user={otherUser} showUsers={showUsers} setShowUsers={setShowUsers}/>
        </div>
        {showUsers && <UsersList otherUser={otherUser} setShowUsers={setShowUsers} setOtherUser={setOtherUser}/>}

        <span className="my-4">
        <DialogInputBox
          value={amount}
          setValue={setAmount}
          heading="Amount ($)"
          type="number"
          placeholder="Amount ($)"
        />
          </span>

        <DialogInputBox
          value={description}
          setValue={setDescription}
          heading="Description"
          type="string"
          placeholder="Description"
        />

        <DueDateInput dueDate={dueDate} setDueDate={setDueDate}/>

        {dueDate && <FrequencySelector setFrequency={setFrequency}/>}

        <NoteInput note={note} setNote={setNote}/>

        <Divider/>

        <div className="flex justify-between">
          <div>
            {noUserError && <p className="text-red-500">You must select a user</p>}
            {amountError && <p className="text-red-500">Amount cannot be 0 or less</p>}
            {unknownError && <p className="text-red-500">Unknown error occurred</p>}
          </div>
          <button className="max-h-[40px] bg-green-500 hover:bg-green-700 text-white p-2 rounded-lg"
                  onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </DialogContainer>
  )
};

export default CreateEditDebtDialog;