import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const CardContainer = styled.div`
  border: 1px solid #ccc;
  padding: 5px 5px;
  margin: 10px;
  cursor: pointer;
  text-align: center;

  img {
    width: 40%;
    max-height: 120px;
    object-fit: cover;
  }
`;

const TypesContainer = styled.p`
  border: 1px solid black;
  padding: 1%;
  margin: 10px 40px;
`;

const PokemonCard = ({ pokemon, selectPokemon }) => {
  const [poke, setPoke] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!poke) {
          setLoading(true);
          const result = await axios(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.url.split("/")[6]}`
          );
          setPoke(result.data);
        }
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pokemon, poke]);

  const imageUrl =
    poke?.sprites?.front_default ||
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    "placeholder_image_url";

  const types =
    poke?.types?.map((typeData) => typeData.type.name).join(" ") ||
    pokemon.types?.[0]?.type?.name ||
    "Unknown";

  return (
    <CardContainer onClick={() => selectPokemon(pokemon)}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <img src={imageUrl} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
          <TypesContainer>{types}</TypesContainer>
        </>
      )}
    </CardContainer>
  );
};

export default PokemonCard;
