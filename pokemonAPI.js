alert("Its working sire");

const pokeUrl = "https://pokeapi.co/api/v2";

// Able to see data about pikachu
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then(response => {
        // error handling 
        if(!response.ok){
            throw new Error('Could not find data');
        }
        return response.json()
    })
    .then(data => console.log(data.name))
    .catch(error => console.error(error));
