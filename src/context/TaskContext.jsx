import { createContext, useReducer } from "react";
import mockAPI from "../api/mockApi";

const TaskContext = createContext();

const initialState = [];

const taskReducer = (state, action) => {
  if (action.type === "ADD_TASK") {
    return [...state, action.payload];
  } else if (action.type === "DELETE_TASK") {
    return state.filter((task) => task.id !== action.payload);
  } else if (action.type === "LOAD_TASKS") {
    return action.payload;
  } else if (action.type === "COMPLETE_TASK") {
    return state.map((task) =>
      task.id === action.payload
        ? { ...task, completed: !task.completed }
        : task
    );
  } else {
    return state;
  }
};

const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  const loadTasks = async () => {
    const userId = JSON.parse(localStorage.getItem("user"));
    const storedTasks = localStorage.getItem("tasks");
    // console.log(storedTasks)
    if (storedTasks) {
      dispatch({ type: "LOAD_TASKS", payload: JSON.parse(storedTasks) });
    } else {
      const apiTasks = await mockAPI.getTasksForUser(userId.email);
      dispatch({ type: "LOAD_TASKS", payload: apiTasks });
      localStorage.setItem("tasks", JSON.stringify(apiTasks));
    }
  };

  const addTask = async (task) => {
    const userId = JSON.parse(localStorage.getItem("user"));
    const newTask = await mockAPI.addTask(userId.email, task);
    dispatch({ type: "ADD_TASK", payload: newTask });
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = async (id) => {
    await mockAPI.deleteTask(id);
    dispatch({ type: "DELETE_TASK", payload: id });
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const completeTask = async (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      await mockAPI.completeTask(id);
      dispatch({ type: "COMPLETE_TASK", payload: id });
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        completeTask,
        loadTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
