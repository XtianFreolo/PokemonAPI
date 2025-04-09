alert("Its working sire");

const pokeUrl = "https://pokeapi.co/api/v2";

fetchData();

async function fetchData(){

    try{
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu"); 
        
        if(!response.ok){
            throw new Error('Invalid Pokemon data');
        }
        const data = await response.json()
        console.log(data);

    }
    catch(error){
        console.log(error);
    }
}

