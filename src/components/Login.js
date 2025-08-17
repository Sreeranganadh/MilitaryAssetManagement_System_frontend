// import React, { useState } from "react";
// import "./Login.css";
// import axios from "axios";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     // try {
//     //   const res = await axios.post('http://localhost:5000/api/auth/login', {
//     //     username,
//     //     password,
//     //   });
//     // try {
//     //   const res = await axios.post(
//     //     "https://militaryassetmanagement-system-backend.onrender.com/api/auth/login",
//     //     {
//     //       username,
//     //       password,
//     //     }
//     //   );
//     try {
// -      const res = await api.post("/auth/login", {
// -        username,
// -        password,
// -      });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       // Navigate based on role
//       navigate("/dashboard");
//       window.location.reload();
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-card">
//         <h2>🎖️ Military Asset Login</h2>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="••••••••"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={handleLogin}>Login</button>
//         <h4>credentials</h4>
//         <span>admin1 / admin123</span>
//         <span>commander1 / cmd123</span>
//         <span>logistics1 / log123</span>
//       </div>
//     </div>
//   );
// };

// export default Login;

// ...existing code...
import React, { useState } from "react";
import "./Login.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Enter username and password");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { username, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      navigate("/dashboard");
      window.location.reload();
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError("Invalid username or password");
        } else {
          setError(err.response.data?.message || "Server error");
        }
      } else {
        setError("Network error - check backend URL / server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>🎖️ Military Asset Login</h2>

        {error && <div className="login-error">{error}</div>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <h4>credentials</h4>
        <span>admin1 / admin123</span>
        <span>commander1 / cmd123</span>
        <span>logistics1 / log123</span>
      </div>
    </div>
  );
};

export default Login;
//
