import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Star, Accessibility, ArrowLeft } from "lucide-react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function LocationDetails() {
  const { id } = useParams(); // Pega o ID da URL (ex: /locations/1)
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLocation() {
      try {
        const response = await api.get(`/locations/${id}`);
        setLocation(response.data);
      } catch (err) {
        console.error("Erro ao carregar detalhes", err);
      } finally {
        setLoading(false);
      }
    }
    loadLocation();
  }, [id]);

  if (loading) return <div className="p-10 text-center text-slate-500">Carregando detalhes...</div>;
  if (!location) return <div className="p-10 text-center text-red-500">Local não encontrado.</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Botão Voltar */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para a lista
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 uppercase">
                {location.tipo}
              </span>
              <h1 className="mt-2 text-4xl font-bold text-slate-900">{location.nome}</h1>
              <p className="mt-2 flex items-center gap-2 text-slate-500">
                <MapPin className="h-5 w-5 text-slate-400" /> {location.endereco}
              </p>
            </div>
            
            <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2 border border-amber-100">
              <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
              <span className="text-2xl font-bold text-amber-700">
                {location.notaAcessibilidade?.toFixed(1) || "—"}
              </span>
            </div>
          </div>

          <hr className="my-8 border-slate-100" />

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Sobre este local</h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              {location.descricao || "Nenhuma descrição detalhada disponível para este local."}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-slate-900">Recursos de Acessibilidade</h2>
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-800 border border-green-100">
              <Accessibility className="h-6 w-6" />
              <span className="font-medium">{location.tipoAcessibilidade || "Não informado"}</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}