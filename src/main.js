
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
        type: typePokemon.name
      }
    });
  return types;
}


//funcion para añadir una imagen aleator ia a nuestra pantalla principal
async function getRadomPokemon(){
  const idRandom = Math.floor(Math.random() * 649).toString();
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
  // console.log(types)
  types.map(item =>{
    const titleType = document.createElement('h3');
    titleType.innerText = item.type;
    speciesContainer.appendChild(titleType);
  })
}

async function setCardPokemon(){
  const pokemonList = await getNamePokemon();

  pokemonList.forEach(async (pokemon) => {
    const { data } =await api('pokemon/' + pokemon.name);
    const name = data.name;
    const imgUrl = data.sprites.other.dream_world.front_default;
    const types = data.types.map(item=>item.type.name);
    console.log(types)
    const article = document.createElement('article');
    article.classList.add('card');
    const cardLeft = document.createElement('div');
    cardLeft.style.backgroundColor=`var(--${types[0]})`
    cardLeft.classList.add('card__left');
    const buttonLeftSpecie = document.createElement('div');
    buttonLeftSpecie.classList.add('card-left__button-specie');
    types.map(item =>{
      const buttonType = document.createElement('button');
      buttonType.classList.add('button');
      buttonType.setAttribute('type', 'button');
      buttonType.innerText = item;
      buttonLeftSpecie.appendChild(buttonType);
    })

    const cardImgContainer = document.createElement('picture');
    cardImgContainer.classList.add('card-img-container');
    const imgPokemon = document.createElement('img');
    imgPokemon.setAttribute('src', imgUrl);
    imgPokemon.setAttribute('alt', name);
    imgPokemon.classList.add('img-pokemon');
    const leftName = document.createElement('h3');
    leftName.classList.add('left__name');
    leftName.innerText = name;
    const cardRight = document.createElement('div');
    cardRight.classList.add('card__right');
    const buttonRight = document.createElement('button');
    buttonRight.setAttribute('type', 'button');
    buttonRight.classList.add('card-right__button');
    buttonRight.innerText='See more';

    cardImgContainer.appendChild(imgPokemon);
    cardLeft.appendChild(buttonLeftSpecie);
    cardLeft.appendChild(cardImgContainer);
    cardLeft.appendChild(leftName);
    cardRight.appendChild(buttonRight);

    article.appendChild(cardLeft);
    article.appendChild(cardRight);
    cardScrollContainer.appendChild(article);
  });
}


// getDeatilPokemon();
getRadomPokemon();
setListType();
setCardPokemon();