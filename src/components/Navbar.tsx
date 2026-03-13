import { Link, useNavigate } from "react-router-dom";
import lgLogo from "../assets/lg-logo.png";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated") === "true";
    const user = localStorage.getItem("username");

    setIsAuthenticated(auth);
    setUsername(user || "");

    const update = localStorage.getItem("lastUpdate");

    if (update) {
      setLastUpdate(update);
    } else {
      const now = new Date().toLocaleString();
      setLastUpdate(now);
      localStorage.setItem("lastUpdate", now);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/home" className="navbar-logo">
          <img src={lgLogo} alt="LG Logo" className="lg-logo" />
        </Link>

        {/* Right Section */}
        <div className="navbar-auth">

          {isAuthenticated && (
            <>
              <span className="user-name">
                Welcome {username}
              </span>

              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}

          <span className="last-update">
            Last Update: {lastUpdate}
          </span>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;