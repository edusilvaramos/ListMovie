// Obtém os elementos do DOM necessários para manipulação do modal
const background = document.getElementById("modalBackground");
const modalContainer = document.getElementById("modalContainer");

// Variável global para armazenar o filme atual
let currentmovie = {};

// Adiciona um listener de evento ao fundo do modal para fechar o modal quando clicado
background.addEventListener("click", function () {
  overLay.classList.remove("open");
});

// Função para adicionar o filme atual à lista
function addCurrentMovieToList() {
  // Verifica se o filme já está na lista
  if (isMovieOnList(currentmovie.imdbID)) {
    notie.alert({ text: "Le film est déjà dans la liste!", type: "error" });
    overLay.classList.remove("open");
    return;
  }
  // Adiciona o filme à lista e atualiza o localStorage
  addToList(currentmovie);
  upDate(currentmovie);
  upDateLocalStorage();
  overLay.classList.remove("open");
  location.reload(); // Atualiza a página para refletir as mudanças
}

// Função para criar o conteúdo do modal com base nos dados do filme
function createModal(data) {
  currentmovie = data;
  modalContainer.innerHTML = `
  <h3 id="movieTitle">${data.Title} - ${data.Year}</h3>
          <section id="modalBody">
           <div id="movieSearch">
            <img
              id="moviePoster"
              src=${data.Poster}
              alt="Poster Movie"
            />
            <button id="addToList" onclick="addCurrentMovieToList()">Ajouter à la liste</button>
            </div>
            <div id="movieInfo">
              <div id="moviePlot">
                <h3>Intrigue :</h3>
                <h4>${data.Plot}</h4>
              </div>
              <div id="movieCast">
                <h4>Distribution :</h4>
                <h5>${data.Actors}</h5></div>
              <div id="movieGenre">
                <h4>Genre :</h4>
                <h5>${data.Genre}</h5></div>
            </div>
          </section>
          `;
}
