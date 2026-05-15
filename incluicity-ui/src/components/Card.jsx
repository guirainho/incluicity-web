import { MapPin, Star, Accessibility } from "lucide-react";
import { Link } from "react-router-dom";

export default function LocationCard({ location }) {
  const {
    id,
    name,
    address,
    category,
    accessibilityRating,
    accessibilityFeatures = [],
  } = location;

  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
      <Link
        to={`/locations/${id}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
        aria-label={`Ver detalhes de ${name}`}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700">
            {name}
          </h3>
          {category && (
            <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              {category}
            </span>
          )}
        </div>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{address}</span>
        </p>

        <div className="mt-3 flex items-center gap-4">
          <span
            className="flex items-center gap-1 text-sm font-medium text-slate-700"
            aria-label={`Nota de acessibilidade: ${
              accessibilityRating ?? "sem avaliação"
            }`}
          >
            <Star
              className="h-4 w-4 fill-amber-400 text-amber-400"
              aria-hidden="true"
            />
            {accessibilityRating ? accessibilityRating.toFixed(1) : "—"}
          </span>

          {accessibilityFeatures.length > 0 && (
            <span className="flex items-center gap-1 text-sm text-green-700">
              <Accessibility className="h-4 w-4" aria-hidden="true" />
              {accessibilityFeatures.length} recurso(s)
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}
