import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
  font-family: sans-serif;
  text-align: center;
  padding: 20px;
`;

const PokedexHeading = styled.h1`
  border: 2px solid #333;
  padding: 10px 80px;
  margin-bottom: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`;

const PokemonListContainer = styled.div`
  width: 60%;
`;

const PokemonDetailsContainer = styled.div`
  width: 35%;
`;

const LoadMoreButton = styled.button`
  margin-top: 10px;
  padding: 2% 40%;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 7px;

  &:hover {
    background-color: #0056b3;
  }
`;

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (
    url = "https://pokeapi.co/api/v2/pokemon/?limit=10"
  ) => {
    try {
      const result = await axios(url);
      setPokemons((prevPokemons) => [...prevPokemons, ...result.data.results]);
      setNextUrl(result.data.next);
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
    }
  };

  const loadMore = () => {
    if (nextUrl) {
      fetchData(nextUrl);
    }
  };

  const selectPokemon = (pokemon) => {
    axios(`https://pokeapi.co/api/v2/pokemon/${pokemon.url.split("/")[6]}`)
      .then((result) => setSelectedPokemon(result.data))
      .catch((error) =>
        console.error("Error fetching Pokemon details:", error)
      );
  };

  return (
    <AppContainer>
      <PokedexHeading>Pokedex</PokedexHeading>
      <ContentWrapper>
        <PokemonListContainer>
          <PokemonList pokemons={pokemons} selectPokemon={selectPokemon} />
          <LoadMoreButton onClick={loadMore}>Load More</LoadMoreButton>
        </PokemonListContainer>
        {selectedPokemon && (
          <PokemonDetailsContainer>
            <PokemonDetails
              pokemon={selectedPokemon}
              setSelectedPokemon={setSelectedPokemon}
            />
          </PokemonDetailsContainer>
        )}
      </ContentWrapper>
    </AppContainer>
  );
};

export default App;
