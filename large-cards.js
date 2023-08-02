async function renderLargeCard(i) {
  let largeCard = document.getElementById("popup-container");
  document.body.style.overflow = "hidden";
  largeCard.innerHTML = generateLargeCardHTML(i);
  removeArrowFromFirstCard(i);

  currentPokemon = await loadPokemonInfo("pokemon", i);
  showName(`largeCardPokemonName${i}`);
  showImage(`pokemonImg${i}`);
  showCategory(
    `largeCardCategory1${i}`,
    `largeCardCategory2${i}`,
    `largeCardCategory2${i}`,
    "types",
    "type"
  );
  changeCardColor(`largeCard${i}`, i);
  renderAbout(i);
  checkLikeStatus(i);
}

async function renderAbout(i) {
  document.getElementById(`about${i}`).innerHTML = generateAboutHTML(i);
  loadAboutInfo(i);
  loadSpeciesInfo(i);
}

function loadAboutInfo(i) {
  let height = document.getElementById(`height${i}`);
  height.innerHTML = currentPokemon["height"] + "0" + " cm";

  let weight = document.getElementById(`weight${i}`);
  weight.innerHTML = (currentPokemon["weight"] / 10 + " kg").replace(".", ",");

  showCategory(
    `ability1${i}`,
    `ability2${i}`,
    `abilityContainer${i}`,
    "abilities",
    "ability"
  );
}

async function loadSpeciesInfo(i) {
  let currentSpecies = await loadPokemonInfo("pokemon-species", i);
  showHabitat(currentSpecies, i);

  document.getElementById(`description${i}`).innerHTML =
    currentSpecies["flavor_text_entries"][1]["flavor_text"];

  document.getElementById(`eggGroup${i}`).innerHTML =
    currentSpecies["egg_groups"][0]["name"];
}

function showHabitat(currentSpecies, i) {
  let habitatArray = currentSpecies["habitat"];

  if (habitatArray && habitatArray.hasOwnProperty("name")) {
    document.getElementById(`habitat${i}`).innerHTML =
      currentSpecies["habitat"]["name"];
  } else {
    document.getElementById(`habitat${i}`).innerHTML = "no info provided";
  }
}

async function renderStats(i) {
  showPokemonInfoTabs("add", "remove", "remove", "add", "add", "remove", i);

  let statsContainer = document.getElementById(`baseStats${i}`);
  statsContainer.innerHTML = "";
  let currentPokemon = await loadPokemonInfo("pokemon", i);
  let stats = currentPokemon["stats"]; // an dieser Stelle ist das Array mit den stats des currentPokemon

  for (let i = 0; i < stats.length; i++) {
    let currentStats = stats[i];
    let baseStats = currentStats["base_stat"];
    let statsName = currentStats["stat"]["name"];
    statsContainer.innerHTML += generateStatsHTML(baseStats, statsName);
  }
}

async function renderMoves(i) {
  showPokemonInfoTabs("add", "remove", "add", "remove", "remove", "add", i);

  let movesContainer = document.getElementById(`moves${i}`);
  movesContainer.innerHTML = "";
  let currentPokemon = await loadPokemonInfo("pokemon", i);
  let moves = currentPokemon["moves"]; // an dieser Stelle ist das Array mit den moves des currentPokemon

  for (let i = 0; i < 24; i++) {
    let currentMove = moves[i];
    let MoveName = currentMove["move"]["name"];
    movesContainer.innerHTML += generateMovesHTML(MoveName);
  }
}

function showPokemonInfoTabs(
  class1,
  class2,
  class3,
  class4,
  class5,
  class6,
  i
) {
  document.getElementById(`about${i}`).classList[class1]("d-none");
  document.getElementById(`btAbout${i}`).classList[class2]("bt-underline");
  document.getElementById(`baseStats${i}`).classList[class3]("d-none");
  document.getElementById(`btStats${i}`).classList[class4]("bt-underline");
  document.getElementById(`moves${i}`).classList[class5]("d-none");
  document.getElementById(`btMoves${i}`).classList[class6]("bt-underline");
}

function removeArrowFromFirstCard(i) {
  if (i === 1) {
    document.getElementById(`leftArrow${i}`).classList.add("visibility-hidden");
  }
}

function previousPokemon(i) {
  if (i > 1) {
    i--;
    renderLargeCard(i);
  }
}

function nextPokemon(i) {
  if (i < 1280) {
    i++;
    renderLargeCard(i);
  } else {
    i++;
    renderLargeCard(i);
    document
      .getElementById(`rightArrow${i}`)
      .classList.add("visibility-hidden");
  }
}

function closeCard(i) {
  document.getElementById(`popUp${i}`).classList.add("d-none");
  document.body.style.overflow = "scroll";
}

function addLike(i) {
  document.getElementById(`heartOutline${i}`).classList.add("d-none");
  document.getElementById(`heartFilled${i}`).classList.remove("d-none");
  pushLikeToArray(i);
  saveLike();
}

function removeLike(i) {
  document.getElementById(`heartOutline${i}`).classList.remove("d-none");
  document.getElementById(`heartFilled${i}`).classList.add("d-none");
  removeLikeFromArray(i);
  saveLike();
}

function pushLikeToArray(i) {
  likes.push(i);
}

function removeLikeFromArray(i) {
  const index = likes.indexOf(i);
  likes.splice(index, 1);
}

function saveLike() {
  let likesAsText = JSON.stringify(likes);
  localStorage.setItem("likes", likesAsText);
}

function loadLike() {
  let likesAsText = localStorage.getItem("likes");
  if (likesAsText) {
    likes = JSON.parse(likesAsText);
  }
}

function checkLikeStatus(i) {
  const heartOutline = document.getElementById(`heartOutline${i}`);
  const heartFilled = document.getElementById(`heartFilled${i}`);

  if (likes.includes(i)) {
    // checks if Pokemon is liked (by checking if Array includes the id of this pokemon) and displays the like (filled heart)
    heartOutline.classList.add("d-none");
    heartFilled.classList.remove("d-none");
  } else {
    //Pokemon is not liked, display outline heart
    heartOutline.classList.remove("d-none");
    heartFilled.classList.add("d-none");
  }
}
