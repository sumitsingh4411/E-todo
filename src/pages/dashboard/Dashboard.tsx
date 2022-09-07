import { useState } from "react";
import CreateToDoModal from "../../share/component/modal/CreateToDoModal";
import ToDoList from "../../share/component/toDoList/ToDoList";
import "./Dashboard.scss";

export default function Dashboard() {
  const [crateTodoListModal, setCrateTodoListModal] = useState<boolean>(false);
  const createNewTodo = () => {};
  return (
    <div className="dashboard">
      <div className="top_section_content">
        <h1 className="top_header">Todos</h1>
        <button onClick={createNewTodo} className="create_todo">
          New todo
        </button>
      </div>
      <div className="bottom_section_content">
        <div className="todo_item_reminder_list">
          <ToDoList title="lorem loadakd adfa" simple_todo={false} />
        </div>
        <div className="todo_item_specific_order">
          <p>Sort by</p>
          <select
            className="todo_item_specific_order_select"
            defaultValue={"Sort by"}
          >
            <option value="Sort by">Sort by</option>
            <option value="2">Completed</option>
            <option value="3">Incompleted</option>
          </select>
        </div>
        <div className="todo_item_simple">
          <ToDoList title="lorem loadakd adfa" simple_todo={true} />
        </div>
      </div>
      <CreateToDoModal
        isOpen={crateTodoListModal}
        setIsOpen={setCrateTodoListModal}
      />
    </div>
  );
}
