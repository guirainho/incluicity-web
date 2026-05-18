import { MapPin, Star, Accessibility } from "lucide-react";
import { Link } from "react-router-dom";

export default function LocationCard({ location }) {
  // Desestruturando usando os nomes que vêm do seu Backend (Postgres)
  const {
    id,
    nome,
    endereco,
    tipo,
    notaAcessibilidade,
    tipoAcessibilidade, // No seu Postman veio como null, trataremos abaixo
  } = location;

  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
      <Link
        to={`/locations/${id}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
        aria-label={`Ver detalhes de ${nome}`}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700">
            {nome}
          </h3>
          {tipo && (
            <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              {tipo}
            </span>
          )}
        </div>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{endereco}</span>
        </p>

        <div className="mt-3 flex items-center gap-4">
          <span
            className="flex items-center gap-1 text-sm font-medium text-slate-700"
            aria-label={`Nota de acessibilidade: ${
              notaAcessibilidade ?? "sem avaliação"
            }`}
          >
            <Star
              className="h-4 w-4 fill-amber-400 text-amber-400"
              aria-hidden="true"
            />
            {/* Verificamos se notaAcessibilidade existe antes de usar o toFixed */}
            {notaAcessibilidade ? notaAcessibilidade.toFixed(1) : "—"}
          </span>

          {/* Como tipoAcessibilidade pode vir nulo, verificamos se existe algo para mostrar */}
          {tipoAcessibilidade && (
            <span className="flex items-center gap-1 text-sm text-green-700">
              <Accessibility className="h-4 w-4" aria-hidden="true" />
              Recurso disponível
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}