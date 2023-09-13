import React from "react";
import { Link } from "react-router-dom";

export default function PokemonCard({ pokemon }) {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 xxs:grid-cols-2 grid-cols-1 lg:gap-5 gap-3 text-white">
      {pokemon.map((p) => (
        <Link
          key={p.id}
          to={`/pokemon/${p.id}`}
          className={`flex flex-col gap-2 sm:px-6 px-3 sm:py-4 py-2 rounded-lg ${p.types[0].toLowerCase()}`}
        >
          <h2 className="text-right font-bold text-white/40 lg:text-xl md:text-lg xs:text-base text-sm">
            ID: {p.formatId}
          </h2>
          <div className="flex items-start justify-between">
            <div className="flex flex-col h-full gap-2">
              <h2 className="lg:text-xl md:text-lg xs:text-base text-sm">
                {p.name}
              </h2>
              <div className="flex flex-col gap-[6px]">
                {p.types.map((t, index) => (
                  <p
                    key={index}
                    className="px-3 rounded-xl bg-white/30 w-fit sm:text-[13px] xs:text-xs text-[10px]"
                  >
                    {t}
                  </p>
                ))}
              </div>
            </div>
            <img
              src={p.imageUrl}
              alt={p.name}
              className="sm:w-[100px] xs:w-[75px] w-[60px] h-fit"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
