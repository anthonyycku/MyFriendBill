import React, { useEffect, useRef, useState } from 'react';
import '../css/dialog.css'

const UseDialogHook = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [animationClass, setAnimationClass] = useState<string>('report-bug-open');
  const modalRef = useRef<HTMLDivElement>(null);

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
  //     setAnimationClass('report-bug-close')
  //     setTimeout(() => setOpenDialog(false), 300)
  //   }
  // };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setAnimationClass('report-bug-close')
      setTimeout(() => setOpenDialog(false), 300)
    }
  };

  useEffect(() => {
    if (openDialog) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      setAnimationClass('report-bug-open');
    }
  }, [openDialog]);

  return { animationClass, modalRef, setOpenDialog, openDialog }
};

export default UseDialogHook;