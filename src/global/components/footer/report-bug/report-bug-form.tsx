import React, { useState } from 'react';

import DialogContainer from "../../dialog/dialog-container";
import { DialogProps } from "../../dialog/models/dialog-props";

const ReportBugForm = ({ animationClass, modalRef }: DialogProps) => {
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<string>('');

  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const onSubmit = () => {
    console.log(`Description: ${description}`)
    console.log(`File: ${file}`)
    setFile('');
    setDescription('');
    setSubmitSuccess(true);
  }

  return (
    <DialogContainer animationClass={animationClass} modalRef={modalRef}>
      <>
        <h2 className="text-lg font-medium mb-4">Report a bug</h2>
        <div className="mb-4">
          <label className="block text-gray-400 font-medium mb-2">Description</label>
          <textarea
            className="border border-gray-400 p-2 rounded-lg w-full text-black bg-gray-300"
            rows={4}
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 font-medium mb-2">Screenshot</label>
          <input
            value={file}
            onChange={e => setFile(e.target.value)}
            type="file"
            className="border border-gray-500 p-2 rounded-lg w-full"
          />
        </div>

        <div className="flex justify-between items-center">
          <div>
            {submitSuccess && <p className="text-green-400">Thank you for your feedback</p>}
          </div>

          <button className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-lg" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </>
    </DialogContainer>
  )
};

export default ReportBugForm;