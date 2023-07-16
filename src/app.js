// VARIABLES GLOBALES:

const inputPoke = document.querySelector('#inputPoke');
const btn = document.querySelector('#btnPoke');
const screen = document.querySelector('#screen');

let queryPokemon = '';

const peticionApi = async() => {
    
    queryPokemon = inputPoke.value;
        
    const url = `https://pokeapi.co/api/v2/pokemon/${queryPokemon}`;
    const response = await fetch(url);
    const dataPoke = await response.json();
         
    console.log(dataPoke);

    // variables traidas desde el objeto de la API
    let pokeName = dataPoke.name;
    let pokeImg = dataPoke.sprites.front_default 
    
    console.log(pokeImg);

    screen.innerHTML = `
        <h2 id='pokeName'>${pokeName}</h2>
        <img src=${pokeImg} alt=${pokeName}>
    `
}



btn.addEventListener('click', async(e) => {
    e.preventDefault()
    
    peticionApi();


});