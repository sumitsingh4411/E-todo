import React from "react";
import "./ToDoList.scss";
//@ts-ignore
import deleteIcon from "./../../../assets/delete.png";
//@ts-ignore
import editIcon from "../../../assets/edit.webp";
import EditToDoModal from "../modal/EditToDoModdal";

interface IProps {
  title: string;
  simple_todo: boolean;
}
export default function ToDoList({ title, simple_todo }: IProps) {
  const [editTodoModal, setEditTodoModal] = React.useState<boolean>(false);
  return (
    <div className="todo_item">
      <div className="todo_item_left">
        <p>{title}</p>
      </div>
      <div className="todo_item_right">
        <div className="todo_item_right_right">
          <p>Completed</p>
          <input type="checkbox" className="check_box" />
          <img src={editIcon} alt="edit" className="edit_icon" />
          <img src={deleteIcon} alt="delete" className="delete_icon" />
        </div>
      </div>
      <EditToDoModal isOpen={editTodoModal} setIsOpen={setEditTodoModal} />
    </div>
  );
}
