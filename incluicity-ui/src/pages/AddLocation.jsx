import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { MapPin, Info, Save } from "lucide-react";

export default function AddLocation() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    tipo: "",
    tipoAcessibilidade: "",
    notaAcessibilidade: "",
    descricao: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        notaAcessibilidade: formData.notaAcessibilidade ? parseFloat(formData.notaAcessibilidade) : null,
      };

      await api.post("/locations", payload);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar o local. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Cadastrar Novo Local</h1>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Nome do Local *</label>
              <input
                required
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Ex: Parque Ibirapuera"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Endereço *</label>
              <input
                required
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Ex: Av. Pedro Álvares Cabral, s/n"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Categoria *</label>
                <input
                  required
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Ex: Lazer, Educação"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Nota (0 a 5)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  name="notaAcessibilidade"
                  value={formData.notaAcessibilidade}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Ex: 4.5"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Recursos de Acessibilidade</label>
              <input
                name="tipoAcessibilidade"
                value={formData.tipoAcessibilidade}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Ex: Rampa, Elevador, Banheiro adaptado"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Descrição Detalhada</label>
              <textarea
                rows="4"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 p-2.5 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Descreva a experiência de acessibilidade neste local..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Salvando..." : <><Save className="h-5 w-5" /> Salvar Local</>}
          </button>
        </form>
      </main>
    </div>
  );
}