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
const left = document.getElementById("left");
const right = document.getElementById("right");
const moveName = document.querySelectorAll(".move");
const body = document.getElementsByTagName("body");
let pokeId;

btn.addEventListener("click", onclick);
left.addEventListener("click", onclickleft);
right.addEventListener("click", onclickright);

body[0].addEventListener("keydown", enter);
function enter(e) {
  console.log(isNaN(input.value));

  var key_code = e.which || e.keyCode;
  switch (key_code) {
    case 13:
      getPokemon(input.value);
      break;
    case 39:
      if (!isNaN(input.value)) {
        getPokemon(pokeId + 1);
      }

      break;
    case 37:
      if (!isNaN(input.value)) {
        getPokemon(pokeId - 1);
      }
      break;
  }
}
function onclick() {
  getPokemon(input.value);
}
function onclickleft() {
  getPokemon(pokeId - 1);
}
function onclickright() {
  getPokemon(pokeId + 1);
}
function getPokemon(something) {
  axios
    .get(
      `https://pokeapi.co/api/v2/pokemon/${something}
  `
    )
    .then(function(response) {
      let pokemonDetail = response.data;
      //name
      name.innerText = pokemonDetail.name;

      //weight
      //number from API is hectogram
      //1 hectogram = 0.1kg;
      pokemonWeight.innerText = pokemonDetail.weight / 10 + "kg";

      //height
      pokemonHeight.innerText = pokemonDetail.height * 10 + "cm";

      //show 4 moves
      for (let i = 0; i < 4; i++) {
        moveName[i].innerText =
          i + 1 + " . " + pokemonDetail.moves[i].move.name;
        moveName[i].style.borderBottom = "1px solid black";
      }

      //types
      types.innerText = pokemonDetail.types[0].type.name;

      //images
      imgURL = pokemonDetail.sprites.front_default;
      img.src = imgURL;

      //id
      pokeId = pokemonDetail.id;
      idNumber.innerText = pokeId;
      input.value = pokeId;

      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}/`)
        .then(function(speciesAPI) {
          //color
          color.innerText = speciesAPI.data.color.name;

          //habitat
          habitat.innerText = speciesAPI.data.habitat.name;

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
        })
        .catch(function(error) {
          console.log("error2");
          evolvesFrom.src = "error-message.png";
          evolution.innerText = "Something is Wrong!";
        });
    })

    .catch(function(error) {
      console.log(error);
    });
}
