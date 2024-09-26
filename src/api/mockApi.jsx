const mockAPI = {
  users: [],
  regUsers: JSON.parse(localStorage.getItem("regUser")) || [],
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],

  register(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userExists = this.regUsers.find((user) => user.email === email);
        if (userExists) {
          resolve({ success: false, message: "Email already exists" });
        } else {
          const newUser = { email, password };
          this.regUsers.push(newUser);
          localStorage.setItem("regUser", JSON.stringify(this.regUsers));
          resolve({ success: true, message: "Registration successful" });
        }
      });
    }, 500);
  },

  login(email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // console.log(this.users);
        const storedUsers = JSON.parse(localStorage.getItem("regUser") || []);
        const user = storedUsers.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          resolve({
            success: true,
            message: "User logged in successfully",
            user,
          });
        } else {
          resolve({ success: false, message: "Invalid email or password" });
        }
      }, 500);
    });
  },

  getTasksForUser(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = this.tasks.filter((task) => task.userId === userId);
        resolve(tasks);
      }, 500);
    });
  },

  addTask(userId, task) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const taskId = Date.now();
        const newTask = {
          id: taskId,
          userId,
          title: task.title,
          description: task.description,
          completed: task.completed || false,
        };
        this.tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        resolve(newTask);
      }, 500);
    });
  },

  deleteTask(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        resolve({ success: true, message: "Task deleted successfully" });
      }, 500);
    });
  },

  completeTask(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const task = this.tasks.find((task) => task.id === id);
        if (task) {
          task.completed = true;
          localStorage.setItem("tasks", JSON.stringify(this.tasks));
          resolve({
            success: true,
            message: "Task completed successfully",
            task,
          });
        } else {
          resolve({ success: false, message: "Task not found" });
        }
      }, 500);
    });
  },
};

export default mockAPI;
