import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }: any) => {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (role !== "admin") {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedAdminRoute;