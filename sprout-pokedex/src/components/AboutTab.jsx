import React from "react";

export default function AboutTab({ pokemon }) {
  return (
    <div className="flex sm:gap-20 gap-5 pt-4">
      <div className="flex flex-col gap-2 text-gray-500 font-medium">
        <p>Species</p>
        <p>Height</p>
        <p>Weight</p>
        <p>Abilities</p>
      </div>
      <div className="flex flex-col gap-2">
        <p>{pokemon.species}</p>
        <p>{pokemon.height} m</p>
        <p>{pokemon.weight} kg</p>
        <p>{pokemon.abilities.join(", ")}</p>
      </div>
    </div>
  );
}
