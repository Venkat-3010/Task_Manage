import styles from "./TaskItems.module.css"

const TaskItem = ({ userId, task, onDelete, onComplete }) => {
//   console.log(task);

  if (userId !== task.userId) {
    return null;
  }

  return (
    <li className={styles.items}>
        <input type="checkbox" onClick={() => onComplete(task.id)} name="" id="" checked={task.completed}/>
        <span><b>Title:</b> {task.title}</span><br/><br/>
        <span><b>Description:</b> {task.description}</span><br/>
        <button className={styles.delete_btn} onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
