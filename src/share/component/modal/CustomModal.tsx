import "./CustomModal.scss";
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
      className="custom_modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
      }}
    >
      {children}
    </ReactModal>
  );
}
