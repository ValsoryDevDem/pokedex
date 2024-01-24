import React from "react";
import styled from "styled-components";
import PokemonCard from "./PokemonCard";

const PokemonListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  flex: 1;
  padding: 20px;
`;

const PokemonList = ({ pokemons, selectPokemon }) => (
  <PokemonListContainer>
    {pokemons.map((pokemon) => (
      <PokemonCard
        key={pokemon.name}
        pokemon={pokemon}
        selectPokemon={selectPokemon}
      />
    ))}
  </PokemonListContainer>
);

export default PokemonList;
