import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { TaskContext } from "../../context/TaskContext";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./Task.module.css";

const Task = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { tasks, addTask, deleteTask, completeTask, loadTasks } =
    useContext(TaskContext);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      loadTasks();
      console.log(tasks);
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() && newTaskDescription.trim()) {
      const newTask = {
        title: newTaskTitle,
        description: newTaskDescription,
        completed: false,
      };
      addTask(newTask);
      setNewTaskTitle("");
      setNewTaskDescription("");
    } else {
      alert("Please enter both title and description");
    }
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
  };

  const handleCompleteTask = (id) => {
    completeTask(id);
  };

  return (
    <div className={styles.container}>
      <nav>
        <h1>Task Page</h1>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className={styles.content}>
        <h2>Tasks</h2>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New Task"
        />
        <input
          type="text"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="task description"
        />
        <button className={styles.add_btn} onClick={handleAddTask}>Add Task</button>
        <ul className={styles.list}>
          {tasks &&
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                userId={user.email}
                onDelete={handleDeleteTask}
                onComplete={handleCompleteTask}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Task;
