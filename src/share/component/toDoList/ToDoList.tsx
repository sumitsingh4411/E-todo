import React from "react";
import "./ToDoList.scss";
//@ts-ignore
import deleteIcon from "./../../../assets/delete.png";
//@ts-ignore
import editIcon from "../../../assets/edit.webp";
import EditToDoModal from "../modal/EditToDoModdal";
import { useDispatch } from "react-redux";
import { todoActions } from "../../redux/slice/todoSlice";
import { TODO_KEY } from "../../constant";

interface IProps {
  title: string;
  simple_todo: boolean;
  completed?: boolean;
  createdAt?: string;
  remindAt?: string;
  id?: number;
  todoData?: any;
  setlocalTodoList?: any;
}
export default function ToDoList({
  title,
  simple_todo,
  completed,
  createdAt,
  remindAt,
  id = 0,
  todoData,
  setlocalTodoList,
}: IProps) {
  const dispatch = useDispatch();
  const [editTodoModal, setEditTodoModal] = React.useState<boolean>(false);

  const setChangeTOdoStatus = (value: any) => {
    let data: any = localStorage.getItem(TODO_KEY);
    let todoList = JSON.parse(data);
    todoList.map((item: any) => {
      if (item.id === id) {
        item.completed = value;
      }
    });
    dispatch(todoActions.setTodoList(todoList));
    localStorage.setItem(TODO_KEY, JSON.stringify(todoList));
    setlocalTodoList(todoList);
  };

  const deltedTodo = () => {
    const data = localStorage.getItem(TODO_KEY);
    if (data) {
      let todoList = JSON.parse(data);
      todoList = todoList.filter((item: any) => {
        return id !== item?.id;
      });
      localStorage.setItem(TODO_KEY, JSON.stringify(todoList));
      dispatch(todoActions.setTodoList(todoList));
      setlocalTodoList(todoList);
    }
  };
  return (
    <div className={completed ? "todo_item todo_complete" : "todo_item"}>
      <div className="todo_item_left">
        <p
          style={{
            textDecoration: completed ? "line-through" : "none",
            textDecorationColor: "red",
          }}
        >
          {title}
        </p>
      </div>
      <div className="todo_item_right">
        <div className="todo_item_right_right">
          <p>Completed</p>
          <input
            type="checkbox"
            className="check_box"
            checked={completed}
            onChange={(e: any) => {
              setChangeTOdoStatus(e.target.checked);
            }}
          />
          <img
            src={editIcon}
            alt="edit"
            className="edit_icon"
            onClick={() => {
              setEditTodoModal(true);
            }}
          />
          <img
            src={deleteIcon}
            alt="delete"
            className="delete_icon"
            onClick={() => {
              deltedTodo();
            }}
          />
        </div>
      </div>
      <EditToDoModal
        isOpen={editTodoModal}
        setIsOpen={setEditTodoModal}
        title={title}
        remindAt={remindAt}
        id={id}
        completed={completed}
      />
    </div>
  );
}
