const img = document.getElementById("pokemonImg");
const input = document.getElementById("pokemonName");
const idNumber = document.getElementById("id");
const evolutionName = document.getElementById("evolution");
const moveName = document.querySelectorAll(".move");

input.addEventListener("keyup", getPokemon);

async function getPokemon() {
  const name = input.value;

  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${name}
  `
  );
  let pokemonDetail = await response.data;

  
  imgURL = response.data.sprites.front_default;
  id = pokemonDetail.id;

  const evolutionData = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}
  `);

  const evolution = evolutionData.data.chain.species.name;

  //show img
  img.src = imgURL;

  //show id
  idNumber.innerText = id;

  //previous evolution
  evolutionName.innerText = evolution;

  //show 4 moves

  for (let i = 0; i < 4; i++) {
    moveName[i].innerText = i + 1 + "." + pokemonDetail.moves[i].move.name;
    moveName[i].style.borderBottom = "1px solid black";
  }
}
