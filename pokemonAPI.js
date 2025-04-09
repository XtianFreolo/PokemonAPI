alert("Its working sire");

const pokeUrl = "https://pokeapi.co/api/v2";

// Able to see data about pikachu
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));