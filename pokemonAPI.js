alert("Its working sire");

const pokeUrl = "https://pokeapi.co/api/v2";

fetch(pokeUrl)
    .then(response => {
        if (!response.ok) {
            throw new error('There is no network response');
        }
        return response.json();
    })
    .then(data =>{
        console.log(data);
    })
    .catch(error => {
        console.error('There is an Error', error);
    });