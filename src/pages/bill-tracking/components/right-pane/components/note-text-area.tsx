import React, { useContext, useEffect, useState } from 'react';
import { updateNote } from "../../../api/bill-tracking.api";
import BasicLoader from "../../../../../global/components/loading/basic-loader";
import { BillTrackingContext } from "../../../state/context/bill-tracking-context";

const NoteTextArea = () => {
  const {
    selectedRowData,
    updateTableData,
    displayedTableData,
    setSelectedRowData,
    isArchive
  } = useContext(BillTrackingContext);
  const { note, id } = selectedRowData!;

  const [updating, setUpdating] = useState<boolean>(false);
  const [newNote, setNewNote] = useState<string>(note);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    setNewNote(note);
  }, [selectedRowData]);

  useEffect(() => {
    if (isArchive) return;
    const newIndex = displayedTableData.findIndex(debt => id === debt.id);
    setSelectedRowData(displayedTableData[newIndex]);
  }, [displayedTableData])

  const handleTextAreaChange = (value: string) => {
    setNewNote(value);
  };

  const handleNoteUpdate = () => {
    if (note === newNote) {
      setIsEdit(false);
      return;
    }

    setUpdating(true);
    updateNote(id, newNote).then(() => {
      updateTableData(id, { note: newNote });
    }).catch(error => console.error(error))
      .finally(() => {
        setUpdating(false);
        setIsEdit(false);
      });
  }

  return (
    <span className="relative">

      <div className="flex items-center space-x-3 mt-5">
        <p className="font-medium">Notes:</p>

        {!isEdit && !isArchive && (
          <i
            id="edit-note"
            onClick={() => setIsEdit(true)}
            className="fa fa-pencil-square-o hover:text-orange-500 cursor-pointer"
          />
        )}

        {isEdit && !updating && (
          <i

            onClick={handleNoteUpdate}
            className="fa fa-check-square hover:text-emerald-500 cursor-pointer"
            style={{ fontSize: '1.2rem' }}
          />
        )}

        {updating && <BasicLoader size="small"/>}
       </div>

      <div className="mb-5">
      {isEdit ? (
        <textarea
          className="w-full rounded bg-gray-600 text-white outline-0 p-2 max-h-[200px] mt-4 whitespace-pre-line"
          rows={4}
          value={newNote}
          onChange={e => handleTextAreaChange(e.target.value)}
        />
      ) : (
        <div className="w-full whitespace-pre-line text-gray-300">
          {note}
        </div>
      )}
        </div>
    </span>
  )
};

export default NoteTextArea;


