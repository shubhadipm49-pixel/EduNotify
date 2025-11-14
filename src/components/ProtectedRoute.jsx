import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const useremail = localStorage.getItem("userEmail");

  if (!useremail) {
    return <Navigate to="/" replace />;
  }

  return children;
}
