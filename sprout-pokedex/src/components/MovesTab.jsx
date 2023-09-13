import React from "react";

export default function MovesTab({ pokemon }) {
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 xs:grid-cols-3 grid-cols-2 gap-2 pt-4">
      {pokemon.moves.map((m, index) => (
        <p key={index}>{m}</p>
      ))}
    </div>
  );
}
