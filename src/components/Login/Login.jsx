import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [error, setError] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await login(email, password);
    if (response.success) {
      navigate("/tasks");
    } else {
      alert(response.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Login</h2>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.login_btn} onClick={handleLogin}>
          Login
        </button>
        <button
          className={styles.register_btn}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
