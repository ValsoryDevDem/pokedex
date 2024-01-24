import React from "react";
import styled from "styled-components";

const DetailsContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const TableCell = styled.td`
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
`;

const PokemonDetails = ({ pokemon, setSelectedPokemon }) => {
  const { name, sprites, types, stats, weight, moves } = pokemon;
  const totalMoves = moves.length;

  return (
    <DetailsContainer onClick={() => setSelectedPokemon(null)}>
      <img
        src={sprites?.front_default || "placeholder_image_url"}
        alt={pokemon.name}
      />
      <h2>{name}</h2>
      <Table>
        <tbody>
          <tr>
            <TableCell>Type:</TableCell>
            <TableCell>
              {types?.map((type) => type.type.name).join(", ")}
            </TableCell>
          </tr>
          <tr>
            <TableCell>Attack:</TableCell>
            <TableCell>{stats?.[1]?.base_stat || "N/A"}</TableCell>
          </tr>
          <tr>
            <TableCell>Defense:</TableCell>
            <TableCell>{stats?.[2]?.base_stat || "N/A"}</TableCell>
          </tr>
          <tr>
            <TableCell>HP:</TableCell>
            <TableCell>{stats?.[0]?.base_stat || "N/A"}</TableCell>
          </tr>
          <tr>
            <TableCell>SP Attack:</TableCell>
            <TableCell>{stats?.[3]?.base_stat || "N/A"}</TableCell>
          </tr>
          <tr>
            <TableCell>SP Defense:</TableCell>
            <TableCell>{stats?.[4]?.base_stat || "N/A"}</TableCell>
          </tr>
          <tr>
            <TableCell>Speed:</TableCell>
            <TableCell>{stats?.[5]?.base_stat || "N/A"}</TableCell>
          </tr>
          <tr>
            <TableCell>Weight:</TableCell>
            <TableCell>{weight || "N/A"}</TableCell>
          </tr>
          <tr>
            <TableCell>Total Moves:</TableCell>
            <TableCell>{totalMoves}</TableCell>
          </tr>
        </tbody>
      </Table>
    </DetailsContainer>
  );
};

export default PokemonDetails;
