import React from "react";
import CustomModal from "./CustomModal";

export default function CreateToDoModal({ isOpen, setIsOpen }: any) {
  return (
    <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="create_todo_modal">
        <h1 className="create_todo_modal_title">New todo</h1>
        <input
          type="text"
          placeholder="Title"
          className="create_todo_modal_input"
        />
        <input
          type="calender"
          placeholder="Remind at"
          className="create_todo_modal_input"
        />
        <button>Create</button>
      </div>
    </CustomModal>
  );
}
