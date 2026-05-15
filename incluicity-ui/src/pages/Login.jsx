import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Accessibility } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Não foi possível entrar. Verifique suas credenciais."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white">
            <Accessibility className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="text-2xl font-bold text-slate-900">
            Inclui<span className="text-green-600">City</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Mapeando a acessibilidade urbana, juntos.
          </p>
        </div>

        <section
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          aria-labelledby="login-title"
        >
          <h2
            id="login-title"
            className="mb-6 text-lg font-semibold text-slate-900"
          >
            Entrar na sua conta
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <Input
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@exemplo.com"
              autoComplete="email"
              required
            />

            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <Button type="submit" loading={loading} className="mt-2 w-full">
              Entrar
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Ainda não tem conta?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-700 hover:text-blue-800 hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
