window.addEventListener('DOMContentLoaded', rout, false);
window.addEventListener('hashchange', rout, false);
buttonForm.addEventListener('click',()=>{
  location.hash = '#search=';
});

arrowBack.addEventListener('click', ()=>{
  history.back();
})

function rout(){
  console.log({location});
  
  if(location.hash.startsWith('#detail=')){
    detail();
  }else if(location.hash.startsWith('#search=')){
    search();
  }else if(location.hash.startsWith('#type=')){
    type();
  }else{
    home();
  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop=0;
}


function home(){
  console.log('home');
  arrowBack.classList.add('inactive');
  navLogo.classList.remove('inactive');
  navLogo.classList.remove('nav__logo--descrition');
  navSearch.classList.remove('inactive');
  pokemonContainer.classList.remove('inactive');
  sectionPokemonesScroll.classList.remove('inactive');
  sectionDetail.classList.add('inactive');
  typeDetail.classList.add('inactive');
  sectionSpecies.classList.remove('inactive');
  getRadomPokemon();
  setListType();
  setCardPokemon();
}

function detail(){
  console.log('detail');
  arrowBack.classList.remove('inactive');
  navLogo.classList.remove('inactive');
  navSearch.classList.add('inactive');
  navLogo.classList.add('nav__logo--descrition');
  pokemonContainer.classList.remove('inactive');
  sectionPokemonesScroll.classList.add('inactive');
  sectionDetail.classList.remove('inactive');
  typeDetail.classList.add('inactive');
  sectionSpecies.classList.remove('inactive');
  const [_, name] = location.hash.split('=');
  console.log(name);
  getPokemonDetailByName(name)
}

function search(){
  console.log('search');
  arrowBack.classList.remove('inactive');
  navSearch.classList.remove('inactive');
  navLogo.classList.add('inactive');
  navLogo.classList.remove('nav__logo--descrition');
  pokemonContainer.classList.remove('inactive');
  sectionPokemonesScroll.classList.add('inactive');
  sectionDetail.classList.remove('inactive');
  typeDetail.classList.add('inactive');
  sectionSpecies.classList.add('inactive');
}

function type(){
  console.log('type')
  arrowBack.classList.remove('inactive');
  navSearch.classList.add('inactive');
  navLogo.classList.remove('inactive');
  navLogo.classList.remove('nav__logo--descrition');
  pokemonContainer.classList.add('inactive');
  sectionPokemonesScroll.classList.add('inactive');
  sectionDetail.classList.add('inactive');
  typeDetail.classList.remove('inactive');
  sectionSpecies.classList.remove('inactive');
}