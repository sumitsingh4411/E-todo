import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateToDoModal from "../../share/component/modal/CreateToDoModal";
import ToDoList from "../../share/component/toDoList/ToDoList";
import { selectAuth } from "../../share/redux/slice/authSlice";
import "./Dashboard.scss";

export default function Dashboard() {
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();
  const [crateTodoListModal, setCrateTodoListModal] = useState<boolean>(false);

  useEffect(() => {
    if (!auth?.isAuthenticated) {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  
  const createNewTodo = () => {
    setCrateTodoListModal(true);
  };
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
