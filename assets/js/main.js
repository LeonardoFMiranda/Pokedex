const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const content = document.getElementById("content");
const limit = 16;
let offset = 0;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

const maxRecords = 151



  function convertPokemonToLi(pokemon) {
    return `<li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    <div class="pokemon__detail">
      <ol class="types">
          ${pokemon.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join("")}
      </ol>
      <img
      src="${pokemon.photo}"
      alt="${pokemon.name}"
    />
    </div>
  </li>
  `;
  };

function loadPokemonItens(offset, limit) {
  pokeApi
    .getPokemons(offset, limit)
    .then((pokemons = []) => {
      const newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon));

      const newHtml = newList.join("");

      pokemonList.innerHTML += newHtml;

    })
    .finally(function () {
      console.log("Requisição concluida");
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
   const qntRecordNextPage = offset + limit

  if(qntRecordNextPage >= maxRecords){
    const newlimit = maxRecords - offset
    loadPokemonItens(offset, newlimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  }else{
    loadPokemonItens(offset, limit);
  }
  
});

