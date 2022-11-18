
//instanciacion de axios

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  headers:{
    'Content-type': 'application/json;charset=utf-8'
  },
})

//funcion para obtener nombres y url de los pokemones
async function getNamePokemon(){
  const { data } = await api('pokemon?limit=200&offset=0');
  const pokemones = data.results;
  const namesPokemon = pokemones.map(pokemon => {
    return {
      name: pokemon.name, 
      id : pokemon.url.split('/')[6],
      }
    });
  return namesPokemon;
}

//funcion para obtener el tipo de pokemon
async function getListTypePokemon(){

  const { data } = await api('type');
  const types = data.results
    .filter(typePokemon => typePokemon.name!='unknown')
    .map(typePokemon=>{
      return{
        type: typePokemon.name,
        id: typePokemon.url.split('/')[6],
      }
    });
  return types;
}



//funcion para añadir una imagen aleator ia a nuestra pantalla principal
async function getRadomPokemon(name){
  const idRandom = name || Math.floor(Math.random() * 649).toString();
  const { data } = await api('pokemon/'+idRandom);
  const imgPokemon = data.sprites.other.dream_world.front_default;
  const pokemonName = data.name;
  const pokemonType = data.types[0].type.name;
  // console.log(pokemonType);
  imgHeader.setAttribute('src', imgPokemon);
  imgHeader.setAttribute('alt', headerPokemonName);
  headerPokemonName.innerText = pokemonName;
  headerContainer.style.backgroundColor = `var(--${pokemonType})`;
  pokemonContainer.style.backgroundColor = `var(--${pokemonType})`;
  sectionSpecies.style.backgroundColor = `var(--${pokemonType})`;
}

async function setListType(){
  const types =await getListTypePokemon();
  speciesContainer.innerHTML = '';
  // console.log(types)
  types.map(item =>{
    const titleType = document.createElement('h3');
    titleType.innerText = item.type;
    titleType.addEventListener('click',()=>{
      location.hash = '#type=' + item.type+'-'+item.id;
    });
    speciesContainer.appendChild(titleType);
  })
}

async function createPokemonCard(list, container){
  console.log(list)
  container.innerHTML = '';

  list.forEach(async (pokemon) => {
    const { data } =await api('pokemon/' + pokemon.name);
    const name = data.name;
    const imgUrl = data.sprites.other.dream_world.front_default;
    const types = data.types.map(item=>{
      return {
        type: item.type.name,
        id: item.type.url.split('/')[6]
      }
    });
    // console.log({types});
    const article = document.createElement('article');
    article.classList.add('card');
    const cardLeft = document.createElement('div');
    cardLeft.classList.add('card__left');
    cardLeft.style.backgroundColor=`var(--${types[0].type})`
    const buttonLeftSpecie = document.createElement('div');
    buttonLeftSpecie.classList.add('card-left__button-specie');
    types.map(item =>{
      const buttonType = document.createElement('button');
      buttonType.classList.add('button');
      buttonType.setAttribute('type', 'button');
      buttonType.innerText = item.type;
      buttonType.addEventListener('click',()=>{
        location.hash = '#type=' + item.type + '-' + item.id;
      })
      buttonLeftSpecie.appendChild(buttonType);
    })

    const cardImgContainer = document.createElement('picture');
    cardImgContainer.classList.add('card-img-container');
    const imgPokemon = document.createElement('img');
    imgPokemon.setAttribute('src', imgUrl);
    imgPokemon.setAttribute('alt', name);
    imgPokemon.classList.add('img-pokemon');
    imgPokemon.addEventListener('click',()=>{
      location.hash = '#detail=' + name;
    })
    const leftName = document.createElement('h3');
    leftName.classList.add('left__name');
    leftName.innerText = name;
    const cardRight = document.createElement('div');
    cardRight.classList.add('card__right');
    const buttonRight = document.createElement('button');
    buttonRight.setAttribute('type', 'button');
    buttonRight.classList.add('card-right__button');
    buttonRight.innerText='See more';
    buttonRight.addEventListener('click',()=>{
      location.hash = '#detail=' + name;
    })

    cardImgContainer.appendChild(imgPokemon);
    cardLeft.appendChild(buttonLeftSpecie);
    cardLeft.appendChild(cardImgContainer);
    cardLeft.appendChild(leftName);
    cardRight.appendChild(buttonRight);

    article.appendChild(cardLeft);
    article.appendChild(cardRight);
    container.appendChild(article);
  });
}

async function setCardPokemon(){
  const pokemonList = await getNamePokemon();
  
  createPokemonCard(pokemonList, cardScrollContainer);
}


async function createPokemonTypeCard(list, container){
  container.innerHTML = '';

  list.forEach(async (pokemon) => {
    const { data } =await api('pokemon/' + pokemon.name);
    const name = data.name;
    const imgUrl = data.sprites.other.dream_world.front_default || data.sprites.front_default || data.sprites.back_default;
    console.log(imgUrl);
    const types = data.types.map(item=>{
      return {
        type: item.type.name,
        id: item.type.url.split('/')[6]
      }
    });
    // console.log({types});
    const article = document.createElement('article');
    article.classList.add('card');
    article.classList.add('card--specie')
    const cardLeft = document.createElement('div');
    cardLeft.classList.add('card__left');
    cardLeft.style.backgroundColor=`var(--${types[0].type})`
    const buttonLeftSpecie = document.createElement('div');
    buttonLeftSpecie.classList.add('card-left__button-specie');
    types.map(item =>{
      const buttonType = document.createElement('button');
      buttonType.classList.add('button');
      buttonType.setAttribute('type', 'button');
      buttonType.innerText = item.type;
      buttonType.addEventListener('click',()=>{
        location.hash = '#type=' + item.type + '-' + item.id;
      })
      buttonLeftSpecie.appendChild(buttonType);
    })

    const cardImgContainer = document.createElement('picture');
    cardImgContainer.classList.add('card-img-container');
    const imgPokemon = document.createElement('img');
    imgPokemon.setAttribute('src', imgUrl);
    imgPokemon.setAttribute('alt', name);
    imgPokemon.classList.add('img-pokemon');
    imgPokemon.addEventListener('click',()=>{
      location.hash = '#detail=' + name;
    })
    const leftName = document.createElement('h3');
    leftName.classList.add('left__name');
    leftName.innerText = name;

    cardImgContainer.appendChild(imgPokemon);
    cardLeft.appendChild(buttonLeftSpecie);
    cardLeft.appendChild(cardImgContainer);
    cardLeft.appendChild(leftName);
    article.appendChild(cardLeft);
    container.appendChild(article);
  });
}
//funcion para obtener las evoluciones de los pokemon
async function getEvolutionsByName(name){
  const { data } = await api('pokemon-species/'+ name);
  const id = data.evolution_chain.url.split('/')[6];

  const { data: evolutions } = await api('evolution-chain/'+id);
  const evolution = evolutions.chain;
  const evolutionList =[evolution.species];
  console.log(evolution.evolves_to);
  if(evolution.evolves_to[0]){
    evolutionList.push(evolution.evolves_to[0].species);
  }
  if(evolution.evolves_to[0].evolves_to[0]){
    evolutionList.push(evolution.evolves_to[0].evolves_to[0].species);
  }
  
  return evolutionList;
}


//funcion para obtener los detalles de un pokemon
async function getPokemonDetailByName(name){
  getRadomPokemon(name);
  const { data } =await api('pokemon/'+name);
  const typesPokemon = data.types;
  headerDesriptionSpecies.innerHTML = '';
  typesPokemon.map(pokemon =>{
    const buttonType = document.createElement('button');
    buttonType.setAttribute('type', 'button');
    buttonType.classList.add('button-species');
    buttonType.addEventListener('click',()=>{
      location.hash = '#type='+pokemon.type.name+'-'+pokemon.type.id;
    })
    buttonType.style.backgroundColor = `var(--${pokemon.type.name})`;
    buttonType.innerText = pokemon.type.name;
    headerDesriptionSpecies.appendChild(buttonType);
  });

  const pokemonHeight = data.height*1/10;
  const pokemonWeight = data.weight*1/10;
  // console.log(pokemonHeight, pokemonWeight)
  height.innerText= pokemonHeight + ' mts.';
  weight.innerHTML= pokemonWeight + ' kg.';

  statsList.innerHTML='';
  const stats = data.stats;
  stats.map(statI =>{
    const statItem= document.createElement('div');
    statItem.classList.add('stat__item');

    const title = document.createElement('span');
    switch (statI.stat.name){
      case 'hp':
        title.innerText = 'HP';
        break;
      case 'attack':
        title.innerText = 'AT';
        break;
      case 'defense':
        title.innerText = 'DF';
        break;
      case 'special-attack':
        title.innerText = 'SA';
        break;
      case 'special-defense':
        title.innerText = 'SD';
        break;
      case 'speed':
        title.innerText = 'SP';
    }

    const content = document.createElement('span');
    content.innerText = statI.base_stat;

    const progressContainer = document.createElement('div');
    const statLine = document.createElement('span');
    statLine.classList.add('stat-line');
    statLine.style.width = statI.base_stat/2+'%';

    progressContainer.appendChild(statLine);
    statItem.appendChild(title);
    statItem.appendChild(content);
    statItem.appendChild(progressContainer);
    statsList.appendChild(statItem)
  });
  console.log(stats);
  const evolutionsPokemon = await getEvolutionsByName(name);
  createPokemonCard(evolutionsPokemon, evolutionCardContainer);
}

//funcion para crear pokemones por tipo de pokemon
async function getPokemonsByType(typeId){
  const { data } = await api('type/'+ typeId);
  const nameType = data.name;
  const listPokemon = data.pokemon.map(item =>{
    return{
      name: item.pokemon.name,
      id : item.pokemon.url.split('/')[6],
    }
  })
  specieDetailTitle.innerText = nameType;
  createPokemonTypeCard(listPokemon, typeDetailArticle)
}

