import React from "react";

export default function EvolutionTab({ pokemon }) {
  return (
    <div className="pt-4 flex xs:flex-row flex-col xs:gap-16 gap-10">
      {pokemon.evolution.map((e, index) => (
        <div key={index} className="flex flex-col items-center">
          <img src={e.imageUrl} alt={e.name} className="w-[100px] h-fit" />
          <p>{e.name}</p>
        </div>
      ))}
    </div>
  );
}
