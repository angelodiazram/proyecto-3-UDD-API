// VARIABLES GLOBALES:

const inputPoke = document.querySelector('#inputPoke');
const btn = document.querySelector('#btnPoke');
const screen = document.querySelector('#screen');
const ctx = document.getElementById('screenGraph');

let queryPokemon = '';

// función asincrona que realiza la petición a la API
const peticionApi = async() => {
    
    // asignación del 'valor' a la constante proveniente del input
    queryPokemon = inputPoke.value;
    
    // End point de la API a consumir utilizando 'fetch'
    const url = `https://pokeapi.co/api/v2/pokemon/${queryPokemon}`;
    const response = await fetch(url);
    const dataPoke = await response.json()

    // variables traidas desde el objeto de la API
    let pokeName = dataPoke.name;
    let pokeImg = dataPoke.sprites.front_default 
    
    // 'Impresión' de HTML en el DOM con información de la API
    screen.innerHTML = `
        <h2 id='pokeName'>${pokeName}</h2>
        <img id='pokeImg' src=${pokeImg} alt=${pokeName}>
    `;
    
    console.log(dataPoke);

    graphPoke(dataPoke);
}

// Creación de grafico tipo radar
const graphPoke = (pokemon) => {
    new Chart(ctx,{
    type: 'radar',
        data: {
            labels: [
                `Hp`,
                'Ataque',
                'Defensa,',
                'Ataque especial',
                'Defensa Especial',
                'Velocidad'
            ],
            datasets: [{
                label: pokemon.name,
                data: pokemon.stats.map((element) => element.base_stat),
                backgroundColor: [
                    'rgb(255, 0, 0)',
                    'rgb(15, 0, 255)',
                    'rgb(128, 128, 128)',
                    'rgb(130, 255, 13)',
                    'rgb(3, 5, 2)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        }
    });
}

btn.addEventListener('click', async(e) => {
    
    e.preventDefault()
    
    peticionApi()

})
