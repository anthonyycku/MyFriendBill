import React from 'react';

const NoteInput = ({ note, setNote }: { note: string, setNote: (note: string) => void }) => {
  return (
    <div className="flex flex-col 2xl:flex-row">
      <label className="w-36 font-medium">Notes:</label>

      <span className="">
      <textarea
        className="w-full 2xl:w-72 rounded bg-gray-600 text-white outline-0 p-2 max-h-[200px] whitespace-pre-line focus:outline-none focus:border-purple-500 border border-1 border-gray-600"
        rows={2}
        value={note}
        onChange={e => setNote(e.target.value)}
      />
        </span>
    </div>
  )
};

export default NoteInput;