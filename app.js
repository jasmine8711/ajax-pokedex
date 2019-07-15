const img = document.getElementById("pokemonImg");
const input = document.getElementById("pokemonName");
input.addEventListener("keyup", getPokemon);

async function getPokemon() {
  const name = input.value;
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${name}
  `
  );
  const evolutionData = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}
  `);
  let pokemonDetail = await response.data;
  imgURL = response.data.sprites.front_default;
  id = pokemonDetail.id;
  allMoves = pokemonDetail.moves;

  // const evolution = evolutionData.data.chain.species.name;
  img.src = imgURL;
}
