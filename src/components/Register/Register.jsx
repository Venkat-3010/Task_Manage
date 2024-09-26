import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Register.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }
    const response = await register(email, password);
    if (response.success) {
      alert("Registered successfully!");
      navigate("/");
    } else {
      alert(response.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Register</h2>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.register_btn} onClick={handleRegister}>Register</button>
        <button className={styles.login_btn} onClick={() => navigate("/")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
