import React from "react";
import { AddTodoForm } from "./components/AddTodoForm";
import { TodoList } from "./components/TodoList";
import { TotalCompletedItem } from "./components/TotalCompletedItem";

const App: React.FC = () => {
  return (
    <div>
      <h1>Taskify</h1>
      <AddTodoForm />
      <TodoList />
      <TotalCompletedItem/>
    </div>
  );
};

export default App;