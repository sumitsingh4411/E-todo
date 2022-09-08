import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateToDoModal from "../../share/component/modal/CreateToDoModal";
import ToDoList from "../../share/component/toDoList/ToDoList";
import CustomLoader from "../../share/customLoader/CustomLoader";
import { getSortedBy } from "../../share/helper";
import { selectAuth } from "../../share/redux/slice/authSlice";
import { selecttodo, todoActions } from "../../share/redux/slice/todoSlice";
import "./Dashboard.scss";

export default function Dashboard() {
  const dispatch = useDispatch<any>();
  const { todoList, todoListStatus } = useSelector(selecttodo);
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);
  const [shortBy, setShortBy] = useState<string>("");
  const [crateTodoListModal, setCrateTodoListModal] = useState<boolean>(false);
  const [localTodoList, setLocalTodoList] = useState<any>(todoList || []);

  useEffect(() => {
    if (!auth?.isAuthenticated) {
      navigate("/");
    }
    dispatch(todoActions.getDemoTodoList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    if (todoList && todoList.length > 0) {
      setLocalTodoList(todoList);
    }
  }, [todoList]);

  useEffect(() => {
    if (shortBy === "Completion status") {
      setLocalTodoList(getSortedBy(localTodoList, "completed"));
    } else if (shortBy === "Created at") {
      setLocalTodoList(getSortedBy(localTodoList, "createdAt"));
    } else {
      setLocalTodoList(todoList);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortBy]);

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
          {/* <ToDoList title="lorem loadakd adfa" simple_todo={false} /> */}
        </div>
        <div className="todo_item_specific_order">
          <p>Sort by</p>
          <select
            className="todo_item_specific_order_select"
            defaultValue={"Sort by"}
            onChange={(e) => {
              setShortBy(e.target.value);
            }}
          >
            <option value="">Sort by</option>
            <option value="Created at">Created At</option>
            <option value="Completion status">Completion status</option>
          </select>
        </div>
        {todoListStatus === "loading" ? (
          <div className="loading" data-testid="dashboard-loader">
            <CustomLoader />
          </div>
        ) : (
          localTodoList?.map((todo: any) => (
            <div className="todo_item_simple" key={todo?.id}>
              <ToDoList
                title={todo?.title}
                simple_todo={true}
                completed={todo?.completed}
                createdAt={todo?.createdAt}
                remindAt={todo?.remindAt}
                id={todo?.id}
                todoData={localTodoList}
                setlocalTodoList={setLocalTodoList}
              />
            </div>
          ))
        )}
      </div>
      <CreateToDoModal
        isOpen={crateTodoListModal}
        setIsOpen={setCrateTodoListModal}
      />
    </div>
  );
}
