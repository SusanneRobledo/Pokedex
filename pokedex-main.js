let pokedex;
let currentPokemon;
let allPokemon;
let pokeID;
offset = 0;
limit = 30;
let totalPokemonCount = 1281;
let AUDIO_THEMESONG = new Audio("audio/pokemon-song.mp3");
AUDIO_THEMESONG.volume = 0.15; // Audio leiser (15%)

likes = [];

function startLoadScreenAndAudio() {
  document.getElementById("start").classList.add("d-none");
  AUDIO_THEMESONG.play();
  setTimeout(function () {
    removeLoadingScreen();
  }, 4500);
}

async function loadPokedex() {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  let response = await fetch(url);
  pokedex = await response.json();
  allPokemon = pokedex["results"]; // an dieser Stelle ist das Array mit den Pokemon in der API
  renderPokedex();
  loadLike();
}

async function loadPokeID(i) {
  let correctedUrl = allPokemon[i]["url"].slice(0, -1);
  pokeID = correctedUrl.slice(34);
}

function removeLoadingScreen() {
  let loadingScreen = document.getElementById("loadingScreen");
  loadingScreen.classList.add("fadeOut");

  loadingScreen.addEventListener("transitionend", function () {
    loadingScreen.style.display = "none";
  });
}

async function renderPokedex() {
  let pokeInfo = document.getElementById("pokedex");
  for (let i = 0; i < allPokemon.length; i++) {
    loadPokeID(i);
    pokeInfo.innerHTML += generateSmallCardHTML(pokeID);

    renderSmallCard(pokeID);
  }
}

async function renderSmallCard(i) {
  currentPokemon = await loadPokemonInfo("pokemon", i);
  showName(`pokemonName${i}`);
  reduceFontSizeLongName(i);
  showImage(`pokemonImgSmall${i}`);
  showCategory(
    `category1${i}`,
    `category2${i}`,
    `category2${i}`,
    "types",
    "type"
  );
  changeCardColor(`smallCard${i}`);
}

async function loadPokemonInfo(linkSection, i) {
  let urlInfo = `https://pokeapi.co/api/v2/${linkSection}/${i}`;
  let response = await fetch(urlInfo);
  return await response.json();
}

async function showName(containerID) {
  let pokemonName = document.getElementById(containerID);
  pokemonName.innerHTML = currentPokemon["name"];
}

function reduceFontSizeLongName(i) {
  let name = document.getElementById(`pokemonName${i}`);
  if (name.textContent.length > 17) {
    name.style.setProperty("font-size", "32px", "important");
  }
  if (name.textContent.length > 21) {
    name.style.setProperty("font-size", "28px", "important");
  } else {
    name.style.removeProperty("font-size");
  }
}

function showImage(containerID) {
  let imgArray = currentPokemon["sprites"]["other"]["official-artwork"];
  let imgContainer = document.getElementById(containerID);

  if (imgArray && imgArray["front_default"] !== null) {
    imgContainer.src = imgArray["front_default"];
  } else if (
    imgArray["front_default"] == null &&
    imgArray["front_shiny"] !== null
  ) {
    imgContainer.src = imgArray["front_shiny"];
  } else {
    imgContainer.classList.add("visibility-hidden");
  }
}

function showCategory(elementId1, elementId2, elementId3, key1, key2) {
  let category1 = document.getElementById(elementId1);
  let category2 = document.getElementById(elementId2);
  let category3 = document.getElementById(elementId3);

  if (currentPokemon[key1].length >= 2) {
    category1.innerHTML = currentPokemon[key1][0][key2]["name"];
    category2.innerHTML = currentPokemon[key1][1][key2]["name"];
  } else {
    category1.innerHTML = currentPokemon[key1][0][key2]["name"];
    category3.style.display = "none";
  }
}

function changeCardColor(elementId) {
  let card = document.getElementById(elementId);
  let color = currentPokemon["types"][0]["type"]["name"];
  card.classList.add(color);
}

function filterPokemon(inputfieldID) {
  let search = document.getElementById(inputfieldID).value;
  search = search.toLowerCase();

  let searchResults = document.getElementById("pokedex");
  searchResults.innerHTML = "";

  for (let i = 0; i < allPokemon.length; i++) {
    let pokemonName = allPokemon[i]["name"].toLowerCase();

    if (
      pokemonName.includes(search) ||
      (search === "like" && likes.includes(i + 1))
    ) {
      searchResults.innerHTML += generateSmallCardHTML(i + 1);
      renderSmallCard(i + 1);
    }
  }
}

function clearSearchResults(inputfieldID) {
  let search = document.getElementById(inputfieldID);
  search.value = ""; //Löscht den Inhalt des Feldes

  let searchResults = document.getElementById("pokedex");
  searchResults.innerHTML = ""; // Leert die Suchergebnisse

  renderPokedex();
}

window.onscroll = async function () {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    offset = offset + 30;
    await loadPokedex();
  }
};

function stopAudio(ID1, ID2, ID3, ID4) {
  AUDIO_THEMESONG.pause();
  // optional: reset song to beginning
  //AUDIO_THEMESONG.currentTime = 0;
  document.getElementById(ID1).classList.add("d-none");
  document.getElementById(ID2).classList.remove("d-none");
  document.getElementById(ID3).classList.add("d-none");
  document.getElementById(ID4).classList.remove("d-none");
}

function playAudio(ID1, ID2, ID3, ID4) {
  AUDIO_THEMESONG.play();
  document.getElementById(ID1).classList.remove("d-none");
  document.getElementById(ID2).classList.add("d-none");
  document.getElementById(ID3).classList.remove("d-none");
  document.getElementById(ID4).classList.add("d-none");
}
