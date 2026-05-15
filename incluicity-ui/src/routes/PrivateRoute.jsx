import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-slate-50"
        role="status"
        aria-live="polite"
      >
        <span
          className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"
          aria-hidden="true"
        />
        <span className="sr-only">Carregando...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
