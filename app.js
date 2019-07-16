const img = document.getElementById("pokemonImg");
const input = document.getElementById("pokemonName");
const idNumber = document.getElementById("id");
const evolutionName = document.getElementById("evolution");
const pokemonHeight = document.getElementById("height");
const pokemonWeight = document.getElementById("weight");
const pokemonSpecies = document.getElementById("species");
const evolvesFrom = document.getElementById("evolvesFrom");
const btn = document.getElementById("btn");
const name = document.getElementById("name");
const types = document.getElementById("types");
const color = document.getElementById("color");
const habitat = document.getElementById("habitat");
const moveName = document.querySelectorAll(".move");

btn.addEventListener("click", getPokemon);

async function getPokemon() {
  const nameorid = input.value;

  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${nameorid}
  `
  );
  let pokemonDetail = await response.data;
  console.log(pokemonDetail);
  //name
  name.innerText = pokemonDetail.name;

  //types
  types.innerText = pokemonDetail.types[0].type.name;

  //height

  imgURL = response.data.sprites.front_default;
  id = pokemonDetail.id;

  const speciesAPI = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${id}/`
  );
  //color
  color.innerText = speciesAPI.data.color.name;

  //habitat
  habitat.innerText = speciesAPI.data.habitat.name;
  //show img
  img.src = imgURL;

  //show id
  idNumber.innerText = id;

  //weight
  //number from API is hectogram
  //1 hectogram = 0.1kg;
  pokemonWeight.innerText = pokemonDetail.weight / 10 + "kg";

  //height
  pokemonHeight.innerText = pokemonDetail.height * 10 + "cm";
  //species
  pokemonSpecies.innerText = speciesAPI.data.genera[2].genus;

  //evolution
  const evolveFromName = speciesAPI.data.evolves_from_species.name;

  axios
    .get(`https://pokeapi.co/api/v2/pokemon-species/${evolveFromName}/`)
    .then(function(response) {
      axios
        .get(
          `https://pokeapi.co/api/v2/pokemon/${
            response.data.evolves_from_species.name
          }
      `
        )
        .then(function(response) {
          evolvesFrom.src = response.data.sprites.front_default;
        });

      //    console.log(newImgAPI);

      evolutionName.innerText = response.data.evolves_from_species.name;
    })
    .catch(function(error) {
      evolutionName.innerText = "No previous evolution!";
      evolvesFrom.src = "ball.png";
    });

  //show 4 moves

  for (let i = 0; i < 4; i++) {
    moveName[i].innerText = i + 1 + "." + pokemonDetail.moves[i].move.name;
    moveName[i].style.borderBottom = "1px solid black";
  }
}
