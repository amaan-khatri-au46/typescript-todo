import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Todo } from "../store/todoSlice";

export const TotalCompletedItem: React.FC = () => {
  const completedItem: Todo[] = useSelector((state: RootState) =>
    state.todos.filter((todo) => todo.completed === true)
  );

  return (
    <div>
      <h1>Completed Task: {completedItem.length}</h1>
    </div>
  );
};
