import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import mainframelogo from "../assets/Mainframe-logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.endsWith("@lgindiabot.com")) {
      setError("Only LG company emails are allowed");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid login");
        return;
      }

      if (data.role === "admin") {
        setError("Admins cannot login here");
        return;
      }

      // ✅ Save login info
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", data.email);

      navigate("/home");

    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img src={mainframelogo} alt="Logo" style={styles.logo} />

        <h2>LG CIC Training Portal</h2>
        <p style={styles.subtitle}>User Login</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="LG Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <p style={styles.forgot}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

const styles: any = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#f7f7f7,#e6e6e6)",
  },
  card: {
    width: "380px",
    padding: "40px",
    borderRadius: "15px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  logo: {
    width: "120px",
    marginBottom: "20px",
  },
  subtitle: {
    marginBottom: "20px",
    fontSize: "14px",
    color: "#555",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    background: "#e60023",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  forgot: {
    marginTop: "15px",
    fontSize: "14px",
  },
  error: {
    color: "red",
    fontSize: "13px",
  },
};

export default Login;
