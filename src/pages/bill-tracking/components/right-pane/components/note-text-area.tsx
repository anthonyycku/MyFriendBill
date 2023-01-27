import React, { useEffect, useState } from 'react';
import { updateNote } from "../../../api/bill-tracking.api";
import BasicLoader from "../../../../../global/components/loading/basic-loader";

const NoteTextArea = ({ note, setNote, debtId }: { note: string, setNote: (note: string) => void, debtId: number }) => {
  const [updating, setUpdating] = useState<boolean>(false);
  const [newNote, setNewNote] = useState<string>(note);

  useEffect(() => {
    setNewNote(note);
  }, [note])

  const handleTextAreaChange = (value: string) => {
    setNewNote(value);
  };

  const handleResetNote = () => {
    setNewNote(note);
  }

  const handleNoteUpdate = () => {
    setUpdating(true);
    updateNote(debtId, newNote).then(() => {
      setNote(newNote);
      setUpdating(false);
    }).catch(error => console.error(error));
  }

  return (
    <span className="relative">
          <textarea
            className="w-full rounded bg-gray-600 text-white outline-0 p-2 max-h-[200px] mt-4"
            rows={4}
            value={newNote}
            onChange={e => handleTextAreaChange(e.target.value)}
          />
      {updating ? (
        <div className="absolute bottom-2 right-4">
          <BasicLoader/>
        </div>
      ) : (
        <>
          {newNote !== note && (
            <>
              <i
                className="fa fa-repeat absolute bottom-2 right-12 hover:text-red-500 cursor-pointer"
                style={{ fontSize: '1.5rem' }}

              />
              <i
                className="fa fa-check-square absolute bottom-2 right-4 hover:text-emerald-300 cursor-pointer"
                style={{ fontSize: '1.5rem' }}
                onClick={handleNoteUpdate}
              />
            </>
          )}
        </>
      )}
          </span>
  )
};

export default NoteTextArea;