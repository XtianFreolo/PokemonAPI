alert("Its working sire");

const pokeUrl = "https://pokeapi.co/api/v2";

async function fetchAllPokemon() {

    const allPokemonUrl = [];
    // Should get all pokimans from pokeUrl
    let nextUrl = `${pokeUrl}/pokemon?limit=898`;


    try {
        while (nextUrl) {
            const response = await fetch(nextUrl);
            // Error handling for invalid response

            if (!response.ok) {
                throw new Error('Failed to fetch Pokemon data');
            }

            // if response is okay, convert to json file
            const data = await response.json();
            // push data into an array
            allPokemonUrl.push(...data.results);

            // check if theres another page of results
            nextUrl = data.next;
        }
        return allPokemonUrl;

    } catch(error) {
        console.error('Error fetching Pokemon List:', error);
    }
}


// function to get randompokemon
async function fetchRandomPokemon() {

    try {
        const allPokemon = await fetchAllPokemon();
        const randomPokemonIds = getRandomPokemonIds(3,allPokemon.length);


        // Fetch data for three random Pokémon
        const pokemonDataPromises = randomPokemonIds.map(id => fetch(allPokemon[id].url).then(res => res.json()));
        const pokemonData = await Promise.all(pokemonDataPromises);
        const pokemonContainer = document.getElementById("pokemonContainer");

        pokemonContainer.innerHTML = "<p> Loading Pokimans...</p>";
        pokemonContainer.innerHTML = "";


        // Once we have the data, log each Pokémon's basic info
        pokemonData.forEach(async (pokemon) => {
            console.log(`${pokemon.name}:`);



            // Get the species URL from the Pokémon data
            const speciesUrl = pokemon.species.url;
            const speciesResponse = await fetch(speciesUrl);
            const speciesData = await speciesResponse.json();

            // Find the flavor text entry in English
            const englishDescription = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');

            const pokemonInfo = document.createElement("div");
            pokemonInfo.setAttribute("class", "pokemon-info");

            const pokemonName = document.createElement("h2");
            pokemonName.setAttribute("class", "pokemon-name");
            pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

            const pokemonDescription = document.createElement("p");
            pokemonDescription.setAttribute("class", "pokemon-description");
            pokemonDescription.textContent = englishDescription ? englishDescription.flavor_text : "No English description found.";
            const pokemonImage = document.createElement("img");
            pokemonImage.src = pokemon.sprites.front_default;

            pokemonInfo.append(pokemonName, pokemonDescription, pokemonImage);
            pokemonContainer.appendChild(pokemonInfo);

            if (englishDescription) {
                console.log(`${pokemon.name}: ${englishDescription.flavor_text}`);
            } else {
                console.log(`${pokemon.name}: No English description found.`);
            }
            console.log('------------------------');
        });
    } catch (error) {
        console.error('Error fetching Pokémon details:', error);
    }
}

// Helper function to get 3 random Pokémon IDs
function getRandomPokemonIds(num, maxId) {
    const ids = [];
    while (ids.length < num) {
        const randomId = Math.floor(Math.random() * maxId);
        if (!ids.includes(randomId)) {
            ids.push(randomId);
        }
    }
    return ids;
}

document.getElementById("randomPokemonButton").addEventListener("click", () => {
    console.log("Button clicked!");
    fetchRandomPokemon();
});