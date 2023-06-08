import { useDispatch } from "react-redux";
import { deleteTodoAsync, toggleComplete } from "../store/todoSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

interface Todo {
  title: string;
  id: string;
  completed?: boolean;
}


export const TodoItem: React.FC<Todo> = ({ id, title, completed }) => {
  console.log(id, title, completed)
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();


  function handlecompleted() {
    // const newCompleted = event.target.checked;
    dispatch(toggleComplete({ id: id, completed: !completed }));
  }

  function handleDeleteClick() {
    dispatch(deleteTodoAsync(id));
  }

  return (
    <li>
      <div>
        <span className={completed ? "completed" : ""}>
          <input
            type="checkbox"
            checked={completed}
            onClick={handlecompleted}
          />
          {title}
          <button onClick={handleDeleteClick}>Delete</button>
        </span>
      </div>
    </li>
  );
};
