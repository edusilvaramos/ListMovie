// Seleciona os elementos DOM necessários
const modalOverlayInfo = document.getElementById("modalOverlayInfo"); // Sobreposição do modal
const modalContainerInfo = document.getElementById("modalContainerInfo"); // Container do conteúdo do modal
const modalBackgroundInfo = document.getElementById("modalBackgroundInfo"); // Plano de fundo do modal
const movieListInfoImg = document.getElementById("movieListInfoImg"); // Imagem da lista de filmes

// Adiciona um listener de evento para o clique no plano de fundo do modal
modalBackgroundInfo.addEventListener(
  "click",
  function modalBackgroundInfoClick() {
    // Remove a classe 'openInfo' para fechar o modal
    modalOverlayInfo.classList.remove("openInfo");
  }
);

// Adiciona um listener de evento para todos os elementos de imagem
document.querySelectorAll("img").forEach(function (img) {
  img.addEventListener("click", function () {
    // Captura o ID do elemento <article> pai da imagem clicada
    const articleId = img.closest("article").id; // Obtém o ID do elemento <article> pai
    const id = articleId.replace("Post-", ""); // Remove o prefixo "Post-" do ID para obter o ID do filme
    // Busca o filme na lista de filmes usando o ID
    const movie = movieListAdd.find((movie) => movie.imdbID === id); // Encontra o filme correspondente

    // Define a imagem de fundo do modal com o pôster do filme
    modalBackgroundInfo.style.backgroundImage = `url(${movie.Poster})`;
    modalBackgroundInfo.style.backgroundSize = "cover"; // Ajusta a imagem para cobrir todo o fundo
    modalBackgroundInfo.style.backgroundPosition = "center"; // Centraliza a imagem de fundo
    // Cria o conteúdo do modal usando as informações do filme
    createModalInfo(movie);
    // Adiciona a classe 'openInfo' para exibir o modal
    modalOverlayInfo.classList.add("openInfo");
  });
});

// Função para criar o conteúdo do modal com base nos dados do filme
function createModalInfo(data) {
  modalContainerInfo.innerHTML = `
  <h2 id="movieTitleInfo">${data.Title} - ${data.Year}</h2> <!-- Título e ano do filme -->

        <section id="modalBodyInfo">
          <div id="moviePlotInfo">
            <h3>Intrigue :</h3>
            <h4>${data.Plot}</h4> <!-- Sinopse do filme -->
          </div>

          <div id="movieCastInfo">
            <h4>Distribution :</h4>
            <h5>${data.Actors}</h5> <!-- Elenco do filme -->
          </div>

          <div id="movieGenreInfo">
            <h4>Genre :</h4>
            <h5>${data.Genre}</h5> <!-- Gênero do filme -->
          </div>
        </section>`;
}
