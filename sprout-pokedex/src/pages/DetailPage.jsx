import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AboutTab from "../components/AboutTab";
import BaseStatsTab from "../components/BaseStatsTab";
import EvolutionTab from "../components/EvolutionTab";
import MovesTab from "../components/MovesTab";

export default function DetailPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("About");

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then(async (res) => {
        const data = res.data;
        const evoRes = await axios.get(data.species.url);
        const evoUrl = evoRes.data.evolution_chain.url;

        // Menambahkan permintaan API untuk data evolusi
        const evolutionRes = await axios.get(evoUrl);
        const evolutionData = evolutionRes.data;

        // Mengambil nama-nama evolusi dari data evolusi
        const evolutionNames = getEvolutionNames(evolutionData).map((e) =>
          capitalizeFirstLetter(e)
        );

        // Mengambil nama dan imageUrl evolusi dari pokemon
        const evolutionInfo = await Promise.all(
          evolutionNames.map(async (name) => {
            const evoPokemonRes = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
            );
            const evoPokemonData = evoPokemonRes.data;
            return {
              name: capitalizeFirstLetter(name),
              imageUrl:
                evoPokemonData.sprites.other["official-artwork"][
                  "front_default"
                ],
            };
          })
        );

        setPokemon({
          id: data.id,
          formatId: formatPokemonId(data.id),
          name: capitalizeFirstLetter(data.name),
          types: data.types.map((t) => capitalizeFirstLetter(t.type.name)),
          imageUrl: data.sprites.other["official-artwork"]["front_default"],
          species: capitalizeFirstLetter(data.species.name),
          height: formatPokemonHeightWeight(data.height),
          weight: formatPokemonHeightWeight(data.weight),
          abilities: data.abilities.map((a) =>
            capitalizeFirstLetter(a.ability.name)
          ),
          stats: data.stats.map((s) => {
            return {
              baseStat: s.base_stat,
              stat: capitalizeFirstLetter(s.stat.name),
            };
          }),
          evolution: evolutionInfo,
          moves: data.moves.map((m) => capitalizeFirstLetter(m.move.name)),
        });

        setLoading(false);
      });

    return () => cancel();
  }, [id]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function formatPokemonId(id) {
    let newId = id.toString().padStart(3, "0");
    return `#${newId}`;
  }

  function formatPokemonHeightWeight(num) {
    return `${(num * 0.1).toFixed(2)}`;
  }

  function getEvolutionNames(evolutionData) {
    const evolutionNames = [];
    const processChain = (chain) => {
      const speciesName = chain.species.name;
      evolutionNames.push(speciesName);

      if (chain.evolves_to && chain.evolves_to.length > 0) {
        chain.evolves_to.forEach((nextChain) => {
          processChain(nextChain);
        });
      }
    };

    processChain(evolutionData.chain);
    return evolutionNames;
  }

  function handleActiveTab(tabName) {
    setActiveTab(tabName);
  }

  let content;
  switch (activeTab) {
    case "about":
      content = <AboutTab pokemon={pokemon} />;
      break;

    case "baseStats":
      content = <BaseStatsTab pokemon={pokemon} />;
      break;

    case "evolution":
      content = <EvolutionTab pokemon={pokemon} />;
      break;

    case "moves":
      content = <MovesTab pokemon={pokemon} />;
      break;

    default:
      content = <AboutTab pokemon={pokemon} />;
      break;
  }

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="loader-xbox"></div>
      </div>
    );
  }

  return (
    <section className={`${pokemon.types[0].toLowerCase()}`}>
      <div className="w-full pt-20 md:pt-24 lg:pt-28 text-[13px] xs:text-sm sm:text-base">
        <div className="flex flex-col w-full">
          {/* Top */}
          <div className="flex items-center justify-between w-full sm:px-10 px-5 text-white">
            <div className="flex flex-col gap-2">
              <h1>{pokemon.name}</h1>
              <div className="flex gap-2">
                {pokemon.types.map((t, index) => (
                  <p key={index} className="px-3 rounded-xl bg-white/30 w-fit text-[13px]">{t}</p>
                ))}
              </div>
            </div>
            <h1>{pokemon.formatId}</h1>
          </div>
          {/* Mid */}
          <div className="flex w-full h-fit items-center justify-center">
            <img
              src={pokemon.imageUrl}
              alt={pokemon.name}
              className="sm:w-[350px] w-[200px] h-fit"
            />
          </div>
          {/* Bottom */}
          <div className="flex flex-col gap-2 bg-white py-6 sm:px-10 px-5 rounded-t-3xl w-full min-h-[250px]">
            <div className="flex items-center xs:justify-evenly justify-between">
              <div className="font-semibold cursor-pointer" onClick={() => handleActiveTab("about")}>About</div>
              <div className="font-semibold cursor-pointer" onClick={() => handleActiveTab("baseStats")}>Base Stats</div>
              <div className="font-semibold cursor-pointer" onClick={() => handleActiveTab("evolution")}>Evolution</div>
              <div className="font-semibold cursor-pointer" onClick={() => handleActiveTab("moves")}>Moves</div>
            </div>
            <hr />
            {content}
          </div>
        </div>
      </div>
    </section>
  );
}
