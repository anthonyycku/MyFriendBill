import React, { useEffect, useState } from 'react';
import DialogContainer from "../../../global/components/dialog/dialog-container";
import { DialogProps } from "../../../global/components/dialog/models/dialog-props";
import DialogInputBox from "../../../global/components/dialog/components/dialog-input-box";
import { DebtDirection } from "../constants/bill-tracking.constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import DirectionToggle from "./components/direction-toggle";
import SelectedUser from "./components/selected-user";

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
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [frequency, setFrequency] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (debtDirection === null) return;

    setSenderId(debtDirection === DebtDirection.TO ? userId : otherUser.id);
    setReceiverId(debtDirection === DebtDirection.TO ? otherUser.id : userId);

  }, [debtDirection]);

  return (
    <DialogContainer title="Create new debt" animationClass={animationClass} modalRef={modalRef}>
      <div className="flex flex-col space-y-4">
        <div className="flex">
          <DirectionToggle debtDirection={debtDirection} setDebtDirection={setDebtDirection}/>
          <SelectedUser user={otherUser}/>
        </div>

        <DialogInputBox heading="Amount ($)" type="number"/>
        <DialogInputBox heading="lol"/>
      </div>
    </DialogContainer>
  )
};

export default CreateEditDebtDialog;