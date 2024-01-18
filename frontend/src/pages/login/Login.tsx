import { useState } from "react";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log("aejkhfa");
  const handleLogin = () => {
    // Handle login logic here
    console.log("Login clicked!");
  };

  return (
    <div className="wrapper">
      <div className="card">
        <h2 className="title">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginBTN" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
