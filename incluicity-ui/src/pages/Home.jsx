import { useEffect, useState } from "react";
import { Search, MapPinned, AlertCircle } from "lucide-react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import LocationCard from "../components/Card";
import Input from "../components/Input";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadLocations() {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/locations");
        setLocations(response.data);
      } catch (err) {
        setError(
          "Não foi possível carregar os locais. Tente novamente em instantes."
        );
      } finally {
        setLoading(false);
      }
    }

    loadLocations();
  }, []);

  const filteredLocations = locations.filter((location) =>
    location.name?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Locais acessíveis
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Explore espaços urbanos avaliados pela comunidade.
          </p>
        </header>

        <div className="mb-6">
          <label htmlFor="search" className="sr-only">
            Buscar locais por nome
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar local por nome..."
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {loading && (
          <div
            className="flex flex-col items-center justify-center py-20 text-slate-500"
            role="status"
            aria-live="polite"
          >
            <span
              className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm">Carregando locais...</p>
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && filteredLocations.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-20 text-center">
            <MapPinned className="h-10 w-10 text-slate-300" aria-hidden="true" />
            <p className="mt-3 text-sm font-medium text-slate-600">
              Nenhum local encontrado
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Que tal adicionar o primeiro?
            </p>
          </div>
        )}

        {!loading && !error && filteredLocations.length > 0 && (
          <section
            aria-label="Lista de locais"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
