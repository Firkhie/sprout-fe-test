import React from "react";

export default function BaseStatsTab({ pokemon }) {
  return (
    <div className="flex sm:gap-20 gap-5 pt-4 items-center">
      {/* Name */}
      <div className="flex flex-col gap-2 text-gray-500 font-medium">
        {pokemon.stats.map((s) => (
          <p key={s.stat}>
            {s.stat === "Special-attack" ? "Sp. Atk" : s.stat === "Special-defense" ? "Sp. Def" : s.stat}
          </p>
        ))}
      </div>
      {/* Stat */}
      <div className="flex flex-col gap-2">
        {pokemon.stats.map((s) => (
          <p key={s.stat}>{s.baseStat}</p>
        ))}
      </div>
      {/* Bar */}
      <div className="flex flex-col sm:gap-6 gap-5 w-full">
        {pokemon.stats.map((s) => (
          <div
            key={s.stat}
            className="md:w-96 w-full h-2 bg-gray-300 rounded-full"
          >
            <div
              className={`h-full ${
                s.baseStat > 50 ? "bg-green-400" : "bg-red-400"
              } rounded-full`}
              style={{ width: `${s.baseStat >= 100 ? 100 : s.baseStat}%` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
