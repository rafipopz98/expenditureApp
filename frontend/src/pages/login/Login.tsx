import { useState } from "react";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("aejkhfa");
  const handleLogin = () => {

    console.log("Login clicked!");
  };

  return (
    <div className="wrapper">
      <div className="card">
        <h2 className="title">Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
