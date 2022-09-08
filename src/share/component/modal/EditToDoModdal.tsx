//@ts-nocheck
import React, { useEffect } from "react";
import { todoActions } from "../../redux/slice/todoSlice";
import CustomModal from "./CustomModal";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { TODO_KEY } from "../../constant";

export default function EditToDoModal({
  isOpen,
  setIsOpen,
  title,
  remindAt,
  id,
  completed,
}: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    formik.setFieldValue("title", title);
    formik.setFieldValue("remindAt", remindAt);
    formik.setFieldValue("checked", completed);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed]);

  const formik = useFormik({
    initialValues: {
      title: title,
      remindAt: remindAt,
      checked: completed,
    },
    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
    }),
    onSubmit: (values) => {
      const data: any = localStorage.getItem(TODO_KEY);
      let todoList = JSON.parse(data);
      todoList.map((item: any) => {
        if (item.id === id) {
          item.title = values.title;
          item.remindAt = values.remindAt
            ? values.remindAt
            : new Date().toISOString();
          item.completed = values.checked;
        }
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
        <h1 className="create_todo_modal_title">Edit todo</h1>
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

          <input
            type="checkbox"
            className="check_box"
            onChange={formik.handleChange}
            checked={formik.values.checked}
            name="checked"
          />
          <button className="todo_btn" type="submit">
            Update
          </button>
        </form>
      </div>
    </CustomModal>
  );
}
