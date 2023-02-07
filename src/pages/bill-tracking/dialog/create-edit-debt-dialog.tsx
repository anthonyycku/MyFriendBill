import React, { FC, SyntheticEvent, useContext, useEffect, useState } from 'react';
import DialogContainer from "../../../global/components/dialog/dialog-container";
import { DialogProps } from "../../../global/components/dialog/models/dialog-props";
import DialogInputBox from "../../../global/components/dialog/components/dialog-input-box";
import { DebtDirection, FrequencyOptions } from "../constants/bill-tracking.constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import DirectionToggle from "./components/direction-toggle";
import SelectedUser from "./components/selected-user";
import UsersList from "./components/users-list";
import NoteInput from "./components/note-input";
import DueDateInput from "./components/due-date-input";
import FrequencySelector from "./components/frequency-selector";
import Divider from "../../../global/components/divider/divider";
import { DebtEntryFromDb, DebtEntryInput } from "../models/bill-tracking.model";
import { createNewDebt, updateDebt } from "../api/bill-tracking.api";
import { BillTrackingContext } from "../state/context/bill-tracking-context";
import { DateTime } from "luxon";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { errorHandler } from "../../../global/functions/error-handler/error-handler";
import BasicLoader from "../../../global/components/loading/basic-loader";
import { UserTableData } from "../../../models/user.model";

const CreateEditDebtDialog: FC<DialogProps> = ({
                                                 isEdit = false,
                                                 animationClass,
                                                 modalRef,
                                                 setOpenDialog = () => {
                                                 }
                                               }) => {
  const { selectedRowData, updateTableData, insertNewDebt, setSelectedRowData } = useContext(BillTrackingContext);

  const userId = useSelector((state: RootState) => state.auth.userDatabaseId);
  const [debtId, setDebtId] = useState<number | null>(null);
  const [debtDirection, setDebtDirection] = useState<string>(DebtDirection.TO);
  const [otherUser, setOtherUser] = useState<UserTableData>({ name: '', id: null });
  const [senderId, setSenderId] = useState<number | null>(null);
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [frequency, setFrequency] = useState<string | null>(FrequencyOptions.ONE_TIME);
  const [note, setNote] = useState<string>('');

  const [showUsers, setShowUsers] = useState<boolean>(false);

  const [noUserError, setNoUserError] = useState<boolean>(false);
  const [amountError, setAmountError] = useState<boolean>(false);
  const [unknownError, setUnknownError] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!isEdit || selectedRowData === null) return;

    const {
      sender_data,
      receiver_data,
      amount,
      next_recurrence_date,
      frequency_interval,
      description,
      note,
      id
    } = selectedRowData;

    const getDebtDirection = (): string => {
      if (userId === sender_data.id) {
        setSenderId(userId);
        setReceiverId(receiver_data.id);
        return DebtDirection.TO;
      } else {
        setSenderId(receiver_data.id);
        setReceiverId(userId);
        return DebtDirection.FROM
      }
    }

    const getOtherUser = (): UserTableData => {
      if (sender_data.id === userId) return receiver_data;
      else return sender_data;
    }

    setDebtDirection(getDebtDirection());
    setOtherUser(getOtherUser());
    setAmount(amount);
    setDescription(description);
    setDueDate(next_recurrence_date !== null ? DateTime.fromFormat(next_recurrence_date!, 'yyyy-MM-dd').toJSDate() : null);
    setFrequency(frequency_interval || FrequencyOptions.ONE_TIME);
    setNote(note);
    setDebtId(id);

  }, [isEdit]);

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

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isError()) return;
    setLoading(true);

    const debtData: DebtEntryInput = {
      sender_id: senderId!,
      receiver_id: receiverId!,
      amount: +Number(amount).toFixed(2),
      description: description,
      next_recurrence_date: dueDate,
      frequency_interval: dueDate === null ? null : frequency,
      note: note
    }

    const data = isEdit ? { id: debtId!, ...debtData } : debtData;
    const submitCallFn = isEdit ? updateDebt : createNewDebt;

    submitCallFn(data).then(response => {
      if (isEdit) {
        updateTableData(response.id, response);
      } else {
        insertNewDebt(response);
        setSelectedRowData(response);
      }
      toast(`Success: ${isEdit ? 'Edit' : 'Create New'} Entry`,
        { type: 'success' });
      setOpenDialog(false);
    }).catch(error => {
      setUnknownError(true);
      errorHandler(error, setLoading);
    })
  }

  return (
    <DialogContainer title={isEdit ? "Update bill" : "Create new bill"} animationClass={animationClass}
                     modalRef={modalRef}>
      <form onSubmit={e => handleSubmit(e)}>
        <div className="flex flex-col">

          <div className="flex flex-wrap 2xl:flex-row">
            <DirectionToggle debtDirection={debtDirection} setDebtDirection={setDebtDirection}/>
            <SelectedUser user={otherUser} showUsers={showUsers} setShowUsers={setShowUsers}/>
            <span className="flex flex-col w-full">
              {showUsers && <UsersList otherUser={otherUser} setShowUsers={setShowUsers} setOtherUser={setOtherUser}/>}
            </span>
          </div>

          <span className="my-4">
            <DialogInputBox
              value={isEdit ? amount : undefined}
              setValue={setAmount}
              heading="Amount ($)"
              type="number"
              placeholder="Amount ($)"
              required
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

          {dueDate && <FrequencySelector frequency={frequency!} setFrequency={setFrequency}/>}

          <NoteInput note={note} setNote={setNote}/>

          <Divider/>

          <div className="flex justify-between">
            <div>
              {noUserError && <p className="text-red-500">You must select a user</p>}
              {amountError && <p className="text-red-500">Amount cannot be 0 or less</p>}
              {unknownError && <p className="text-red-500">Unknown error occurred</p>}
            </div>

            <span className="space-x-4">
              <button
                className="w-[66px] max-h-[40px] bg-red-500 hover:bg-red-700 text-white p-2 rounded-lg"
                onClick={() => setOpenDialog(false)}>Close</button>
              <button
                className="w-[66px] max-h-[40px] bg-green-500 hover:bg-green-700 text-white p-2 rounded-lg"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <BasicLoader size="small"/>
                ) : (
                  <p>{isEdit ? 'Update' : 'Submit'}</p>
                )}
              </button>
            </span>
          </div>
        </div>
      </form>
    </DialogContainer>
  )
};

export default CreateEditDebtDialog;