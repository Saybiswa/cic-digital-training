import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

interface Assessment {
  id: number;
  username: string;
  score: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch assessments with token
  const fetchAssessments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get<Assessment[]>(
        "http://localhost:5000/api/assessments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAssessments(response.data);
    } catch (error) {
      console.error("Failed to fetch assessments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    navigate("/");
  };

  // ✅ Stats
  const totalUsers = new Set(assessments.map((a) => a.username)).size;

  const totalAssessments = assessments.length;

  const averageScore =
    assessments.length > 0
      ? (
          assessments.reduce((sum, a) => sum + a.score, 0) /
          assessments.length
        ).toFixed(2)
      : "0";

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* STATS */}
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="stats-container">

          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{totalUsers}</p>
          </div>

          <div className="stat-card">
            <h3>Total Assessments</h3>
            <p>{totalAssessments}</p>
          </div>

          <div className="stat-card">
            <h3>Average Score</h3>
            <p>{averageScore}</p>
          </div>

        </div>
      )}

      {/* TABLE */}
      <div className="assessment-table">
        <h2>Recent Assessments</h2>

        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>
            {assessments.slice(0, 10).map((a) => (
              <tr key={a.id}>
                <td>{a.username}</td>
                <td>{a.score}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;