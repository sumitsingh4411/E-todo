import React from "react";
import ReactModal from "react-modal";

interface Iprops {
  isOpen: boolean;
  children: React.ReactNode;
  setIsOpen: Function;
}
export default function CustomModal({ isOpen, setIsOpen, children }: Iprops) {
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
    >
      {children}
    </ReactModal>
  );
}
