import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/Pagination";

export default function HomePage() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then(async (res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);

        const pokemonList = await Promise.all(
          res.data.results.map(async (p) => {
            // Fetch detail dari tiap url pokemon
            const res = await axios.get(p.url);
            const data = res.data;

            // Get detail tiap pokemon
            return {
              id: data.id,
              formatId: formatPokemonId(data.id),
              name: capitalizeFirstLetter(data.name),
              types: data.types.map((t) => capitalizeFirstLetter(t.type.name)),
              imageUrl: data.sprites.other["official-artwork"]["front_default"],
            };
          })
        );
        setPokemon(pokemonList);
      });

    return () => cancel();
  }, [currentPageUrl]);
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function formatPokemonId(id) {
    let newId = id.toString().padStart(3, "0");
    return `#${newId}`;
  }

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="loader-xbox"></div>
      </div>
    );
  }

  return (
    <section className="w-full sm:px-10 px-3 mt-20 md:mt-24 lg:mt-28">
      <PokemonCard pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </section>
  );
}
