import { useFormik } from "formik";
import React from "react";
import CustomModal from "./CustomModal";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { todoActions } from "../../redux/slice/todoSlice";
import { TODO_KEY } from "../../constant";

export default function CreateToDoModal({ isOpen, setIsOpen }: any) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      remindAt: "",
    },
    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
    }),
    onSubmit: (values) => {
      const data: any = localStorage.getItem(TODO_KEY);
      let todoList = JSON.parse(data);
      todoList.push({
        id: todoList.length + 1,
        title: values.title,
        remindAt: values.remindAt ? values.remindAt : new Date().toISOString(),
        completed: false,
        createdAt: new Date().toLocaleString(),
      });
      dispatch(todoActions.setTodoList(todoList));
      localStorage.setItem(TODO_KEY, JSON.stringify(todoList));
      formik.resetForm();
      setIsOpen(false);
    },
  });

  return (
    <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="create_todo_modal">
        <h1 className="create_todo_modal_title">New todo</h1>
        <form onSubmit={formik.handleSubmit}>
          {formik.errors.title && formik.touched.title ? (
            <div className="error">{formik.errors.title}</div>
          ) : null}
          <input
            type="text"
            placeholder="Title"
            className="create_todo_modal_input"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.errors.remindAt && formik.touched.remindAt ? (
            <div className="error">{formik.errors.remindAt}</div>
          ) : null}
          <input
            type="date"
            placeholder="Remind at"
            className="create_todo_modal_input"
            name="remindAt"
            value={formik.values.remindAt}
            onChange={formik.handleChange}
          />
          <button className="todo_btn" type="submit">
            Create
          </button>
        </form>
      </div>
    </CustomModal>
  );
}
