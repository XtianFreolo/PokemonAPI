alert("Its working sire");

const pokeUrl = "https://pokeapi.co/api/v2";


async function fetchRandomPokemon(){

    try{
        // This shoukd get a random number from pokedex. +1 is bulbasaur
        const randomId = Math.floor(Math.random() * 898) + 1;
        // Should get randomId in pokeUrl
        const response = await fetch(`${pokeUrl}/pokemon/${randomId}`); 
        
        if(!response.ok){
            throw new Error('Invalid Pokemon data');
        }

        const data = await response.json();

        const pokemonImage = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonImage");

        imgElement.src = pokemonImage;
        imgElement.style.display = "block";

    }
    catch(error) {
        console.log(error);
    }
}
// event listener for interactive button 
document.getElementById("randomPokemonButton").addEventListener("click", fetchRandomPokemon);
