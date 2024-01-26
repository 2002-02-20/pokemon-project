import React, { useContext } from 'react'
import { CardPokemon } from './CardPokemon'
import { PokemonContext } from '../context/PokemonContext'

export const PokemonList = () => {

  const {allPokemons} = useContext(PokemonContext);
  
  return (
    <>
      <div className="card-list-pokemon container">
        {allPokemons.map(pokemon => <CardPokemon pokemon={pokemon} key={pokemon.id}/>)}
      </div>
    </>
  )
}
