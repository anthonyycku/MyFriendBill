import React from 'react';

const NoteInput = ({ note, setNote }: { note: string, setNote: (note: string) => void }) => {
  return (
    <div className="flex mt-4">
      <label className="w-36 font-medium">Notes:</label>

      <span className="w-72">
      <textarea
        className="w-full rounded bg-gray-600 text-white outline-0 p-2 max-h-[200px] whitespace-pre-line focus:outline-none focus:border-purple-500 border border-1 border-gray-600"
        rows={2}
        value={note}
        onChange={e => setNote(e.target.value)}
      />
        </span>
    </div>
  )
};

export default NoteInput;