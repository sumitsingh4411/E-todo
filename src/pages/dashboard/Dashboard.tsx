import React from "react";
import { useNavigate } from "react-router-dom";
import ToDoList from "../../share/component/toDoList/ToDoList";
import { URLPath } from "../../share/constant";
import "./Dashboard.scss";

export default function Dashboard() {
  const createNewTodo = () => {
  }
  return (
    <div className="dashboard">
      <div className="top_section_content">
        <h1>Todos</h1>
        <button onClick={createNewTodo}>New todo</button>
      </div>
      <div className="bottom_section_content">
        <div className="todo_item_reminder_list">
          <ToDoList title="lorem loadakd adfa" simple_todo={false} />
        </div>
        <div className="todo_item_specific_order"></div>
        <div className="todo_item_simple">
          <ToDoList title="lorem loadakd adfa" simple_todo={true} />
        </div>
      </div>
    </div>
  );
}
