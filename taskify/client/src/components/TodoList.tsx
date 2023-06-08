import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TodoItem } from "./TodoItem";
import { Todo, fetchTodoItem } from "../store/todoSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
 

export const TodoList: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();
  useEffect(() => {
    dispatch(fetchTodoItem())
  },[dispatch])

  const todos: Todo[] = useSelector((state: RootState) => state.todos);
  console.log(todos)

  return (
    <div>
      <ul className="list-item">
        {todos.map((item) => (
          <TodoItem id={item._id} title={item.title} completed={item.completed} />
        ))}
      </ul>
    </div>
  );
};
