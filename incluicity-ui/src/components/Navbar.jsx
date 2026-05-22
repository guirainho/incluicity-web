import { Link, useNavigate } from "react-router-dom";
import { Accessibility, Plus, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3"
        aria-label="Navegação principal"
      >
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-white">
            <Accessibility className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold text-slate-900">
            Inclui<span className="text-green-600">City</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">

          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-slate-600 sm:inline">
              {user?.email}
            </span>
            <Button
              variant="outline"
              onClick={handleLogout}
              aria-label="Sair da conta"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
