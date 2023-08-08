// VARIABLES GLOBALES:

const screen = document.querySelector('#screen'); //contenedor del la imagen y nombre del pokemon
const ctx = document.getElementById('screenGraph'); // canvas donde se renderiza el grafico
const pokeCardsContainer = document.querySelector('#pokeCards'); // contenedor del div para nombres de pokemones en el dashboard

let instanciaChart; // !instancia para el grafico. MUY IMPORTANTE

let queryPokemon = ''; // varibale vacia que recibira el nombre del pokemon para la petición fetch

// función asincrona que realiza la petición a la API
const peticionApi = async(pokemon) => {
    
    // asignación del 'valor' a la constante proveniente del div creado para los pokemones
    queryPokemon = pokemon
    
    // End point de la API a consumir utilizando 'fetch'
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    const dataPoke = await response.json();

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
};

// Creación de grafico tipo radar
const graphPoke = (pokemon) => {
    const labels = [
        `Hp`,
        'Ataque',
        'Defensa,',
        'Ataque especial',
        'Defensa Especial',
        'Velocidad'
    ];

    const data = {
        labels: labels,
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
    };

    /*
    Esta condición evalua si es que exite la instacia o no para actualizar el grafico
    */
    if (instanciaChart) {
        instanciaChart.data = data;
        instanciaChart.update(); // metodo de chartJS para actualizar la información
    } else {
        instanciaChart = new Chart(ctx, {
            type: 'radar',
            data: data
        });
    }

};

// función asincrona para hacer la petición a la API
const getPokeList = async () => {

    try {
        // traemos la información desde la pokeAPI usando un fetch
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
        const data = await response.json();
        // llamada a la función que crea los contenedores para la información recibida
        createPokeContainers(data.results); //! data.results será "pokeList"
    } catch (error){
        console.log('Ha ocurrido el siguiente error:', error);
    }
};

// función para crear los contenedores de la información obtenida de la petición
const createPokeContainers = (pokeList) => {

    // recorremos la lista para crear un contenedor por cada elemento
    pokeList.forEach(poke => {
        const pokeDiv = document.createElement('div');
        pokeDiv.classList.add('pokemon');
        pokeDiv.textContent = poke.name;
        
        // listener para ejecutar una la funcion de peticiónAPI al presionar el div
        pokeDiv.addEventListener('click', (e) => {
            e.preventDefault();
            
            // se ejecuta la función pasando como argumento el nombre del pokemon
            // proveniente de la lista
            peticionApi(poke.name);
            console.log(poke.name);
        });

        // se agrega el div creado al contenedor principal
        pokeCardsContainer.appendChild(pokeDiv);
    });
};

getPokeList();