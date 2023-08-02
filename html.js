function generateSmallCardHTML(i) {
  return /*html*/ `
            <div class="smallCard" id="smallCard${i}" onclick="renderLargeCard(${i})">
                <h1 class="pokemonName" id="pokemonName${i}"></h1>
  
                <div class="d-flex space-between align-center">
                    <div class="font-size-20">
                        <div class="category padding-10-20" id="category1${i}"></div>
                        <div class="category padding-10-20 m-t-10" id="category2${i}"></div>
                    </div>
                      
                    <img class="enlargeImg" id="pokemonImgSmall${i}">
                </div>
            </div>
        `;
}

function generateLargeCardHTML(i) {
  return /*html*/ `
        <div id="popUp${i}" class="popUp">

          <div class="background" onclick="closeCard(${i})"></div>

          <div id="largeCard${i}" class="largeCardHeader">
            
            <div class="z-index">

              <div class="d-flex align-center space-between">
                <h1 id="largeCardPokemonName${i}"></h1>
                <div onclick="closeCard(${i})" id="closeButton${i}" class="close" ><img src="./img/close.png"/></div>
              </div> 

              <div class="position-responsive d-flex space-between align-center">
                  <div class="category-container d-flex ml-3">
                    <div class="category padding-4-8" id="largeCardCategory1${i}"></div>
                    <div class="category padding-4-8" id="largeCardCategory2${i}"></div>
                  </div>
                  <img id="heartOutline${i}" onclick="addLike(${i})" class="heart" src="./img/like_outline.png">
                  <img id="heartFilled${i}" onclick="removeLike(${i})" class="heart d-none" src="./img/like_filled.png">
              </div>
              <div class="id"># ${i}</div>
            </div>

          </div>

          <div class="largeCardContents flex-column">
            
            <div class="arrow-container">
              <svg onclick="previousPokemon(${i})" id="leftArrow${i}" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="black" class="bi bi-chevron-double-left arrow-position" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg>
              <svg onclick="nextPokemon(${i})" id="rightArrow${i}" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="black" class="bi bi-chevron-double-right arrow-position" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
                  <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </div>

            <div class="img-button-container">
                <img class="" id="pokemonImg${i}">
  
                <div class="button-container d-flex align-start">
                    <button onclick="showPokemonInfoTabs ('remove', 'add', 'add', 'remove', 'add', 'remove', ${i})" id="btAbout${i}" class="bt-underline">About</button>
                    <button onclick="renderStats(${i})" id="btStats${i}" class="">Base Stats</button>
                    <button onclick="renderMoves(${i})" id="btMoves${i}" class="">Moves</button>
                </div>
            </div>
            
            <div id="about${i}" class="aboutContainer"></div>
  
            <div id="baseStats${i}" class="statsContainer"></div>
  
            <div id="moves${i}" class="movesContainer"></div>
        </div>
        `;
}

function generateAboutHTML(i) {
  return /*html*/ `
          <div>
            <table class="m-t-24">
              <tr>
                <td>Height:</td>
                <td id="height${i}"></td>
              </tr>
  
              <tr>
                <td>Weight:</td>
                <td id="weight${i}"></td>
              </tr>
  
              <tr>
                <td>Habitat:</td>
                <td id="habitat${i}"></td>
              </tr>
  
              <tr>
                <td>Abilities:</td>
                <td><span id="ability1${i}"></span><span id="abilityContainer${i}">, <span id="ability2${i}"></span></span></td>
              </tr>
            </table>
  
            <table>
              <th>Description<th>
              <tr>
                <td class="text-transform" id="description${i}" colspan="2"></td>
              </tr>
            </table>
  
            <table>
              <th>Breeding<th>
              <tr>
                <td>Egg Group:</td>
                <td id="eggGroup${i}" colspan="2"></td>
              </tr>
            </table>
          </div>
        `;
}

function generateMovesHTML(MoveName) {
  return /*html*/ `
      <div class="movesOutline">
        <span>${MoveName}</span>
      </div>
    `;
}

function generateStatsHTML(baseStats, statsName) {
  return /*html*/ `
      <div>
        <div class="progress height" role="progressbar" aria-label="Example with label" aria-valuenow="${baseStats}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar progress-bar-striped bg-danger" style="width: ${baseStats}%">${baseStats} %</div>
        </div>
        <span>${statsName}</span>
      </div>
    `;
}
