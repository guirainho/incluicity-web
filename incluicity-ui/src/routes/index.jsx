import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Home from "../pages/Home";
import LocationDetails from "../pages/LocationDetails";
import AddLocation from "../pages/AddLocation";

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;
  if (isAuthenticated) return <Navigate to="/" replace />;

  return children;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/locations/:id"
          element={
            <PrivateRoute>
              <LocationDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-location"
          element={
            <PrivateRoute>
              <AddLocation />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}