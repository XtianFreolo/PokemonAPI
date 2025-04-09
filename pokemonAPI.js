alert("Its working sire");

const pokeUrl = "https://pokeapi.co/api/v2";

//fetchData();

async function fetchData(){

    try{

        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`); 
        
        if(!response.ok){
            throw new Error('Invalid Pokemon data');
        }
        const data = await response.json()
        const pokemonImage = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonImage");

        imgElement.src = pokemonImage;
        imgElement.style.display = "block";

    }
    catch(error){
        console.log(error);
    }
}

