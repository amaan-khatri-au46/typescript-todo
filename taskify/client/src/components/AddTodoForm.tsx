import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/todoSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

export const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");

  // Here We Are bascially defining The Thunk Dispath Any Action
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addItem(title));
    setTitle("");
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="input-type"
          placeholder="Add Todo"
          value={title}
          onChange={onChange}
        />
        <button type="submit" className="btn">
          Add
        </button>
      </form>
    </div>
  );
};
