import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

type TodoState = Todo[];

const initialState: TodoState = [];

// Get to Todo
export const fetchTodoItem = createAsyncThunk<
  Todo[],
  void,
  {
    rejectValue: string;
  }
>("todos/fetchTodoItems", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:8000/api/items");
    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch todo item");
  }
});

// Add Todo
// Creeate Async Thunk is A Middleware
export const addItem = createAsyncThunk<Todo, string>(
  "todos/addTodoAsync",
  async (title) => {
    try {
      const response = await axios.post<Todo>(
        "http://localhost:8000/api/item",
        { title }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (id: string) => {
    try {
      await axios.delete<Todo>(`http://localhost:8000/api/item/${id}`);
      return id; // Return the deleted ID as the fulfilled payload
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete todo");
    }
  }
);

const todoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      const newTodo = {
        _id: Date.now().toString(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleComplete: (
      state,
      action: PayloadAction<{ id: string; completed: boolean }>
    ) => {
      const index = state.findIndex((todo) => todo._id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((todo) => todo._id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoItem.pending, (state, action) => {
      console.log("Fetching Data");
    });
    builder.addCase(fetchTodoItem.fulfilled, (state, action) => {
      console.log("Fetched data Successfully");
      return action.payload;
    });
    builder.addCase(addItem.fulfilled, (state, action) => {
      const { title } = action.payload;
      // We Are Extracting from Here Only title we only need to post the title
      state.push({ _id: Date.now().toString(), title, completed: false });
    });
    builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
      const deletedId = action.payload;
      return state.filter((todo) => todo._id !== deletedId);
    });
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoReducer.actions;
export default todoReducer.reducer;

