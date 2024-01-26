import React, { useEffect, useState } from "react";
import {useForm} from '../hook/useForm'; 
import { PokemonContext } from "./PokemonContext";

export const PokemonProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [globlaPokemons, setGlobalPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  //FORMULARIO DE BUSQUEDA customHook
  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: "",
  });

  //ESTADOS SIMPLES
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);

  // llamar 50 pokemones par API

  const getAllPokemons = async (limit = 50) => {
    const baseURL = "https://pokeapi.co/api/v2/";

    const res = await fetch(
      `${baseURL}pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await res.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);
    setAllPokemons([...allPokemons, ...results]);
    setLoading(false);
  };

  //GLOBAL POKEMONS ALL
  const getGoblaPokemons = async () => {
    const baseURL = "https://pokeapi.co/api/v2/";

    const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`);
    const data = await res.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });
    const results = await Promise.all(promises);
    setGlobalPokemons(results);
    setLoading(false);
  };

  //LAMAR POKEMON X ID
  const getPokemonByID = async (id) => {
    const baseURL = "https://pokeapi.co/api/v2/";

    const res = await fetch(`${baseURL}pokemon/${id}`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    getGoblaPokemons();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        globlaPokemons,
        getPokemonByID,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
