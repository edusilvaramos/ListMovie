// Referências aos elementos HTML
const searchButton = document.getElementById("searchButton");
const overLay = document.getElementById("modalOverlay");
const movieName = document.getElementById("movieName");
const movieList = document.getElementById("movieList");

// Inicializa a lista de filmes a partir do localStorage ou cria uma lista vazia
let movieListAdd = JSON.parse(localStorage.getItem("movieList")) ?? [];

// Adiciona um ouvinte de evento ao botão de busca
searchButton.addEventListener("click", async function () {
  try {
    // Gera a URL para a requisição API com base no nome e ano do filme
    let url = `https://www.omdbapi.com/?apikey=${key}&t=${movieNameGenerator()}${movieYearGenerator()}`;
    const response = await fetch(url);
    const data = await response.json();

    // Abre o modal para mostrar o resultado da busca
    overLay.classList.add("open");
    console.log(data);

    // Verifica se houve um erro na resposta da API
    if (data.Error) {
      overLay.classList.remove("open");
      throw new Error("Le film na pas été trouvé");
    }

    // Cria o modal com as informações do filme
    createModal(data);
  } catch (error) {
    // Exibe um alerta de erro se algo der errado
    notie.alert({ text: error.message, type: "error" });
  }

  // Função para gerar o nome do filme formatado para a URL
  function movieNameGenerator() {
    if (movieName.value.trim() === "") {
      throw new Error("Le nom du film doit être informé");
    }
    return movieName.value.split(" ").join("+");
  }

  // Função para gerar o ano do filme formatado para a URL, se fornecido
  function movieYearGenerator() {
    if (movieYear.value.trim() === "") {
      return "";
    }
    if (
      movieYear.value.length !== 4 ||
      Number.isNaN(Number(movieYear.value))
    ) {
      console.log(movieYear.value);
      throw new Error("L'année du film invalide");
    }
    return `&y=${movieYear.value}`;
  }
});

// Função para adicionar um filme à lista
function addToList(movieObject) {
  movieListAdd.push(movieObject);
}

// Função para atualizar a exibição da lista de filmes
function upDate(movieObject) {
  movieList.innerHTML += `
    <article id="Post-${movieObject.imdbID}" onclick="('(${movieObject.imdbID})')"> 
    <img
    id="movieListInfoImg"
        src="${movieObject.Poster}"
        alt="Poster de ${movieObject.Title}"
      />
      <button onclick="removeMovie('${movieObject.imdbID}')">
        <i class="bi bi-trash"></i> Retirer le film de la liste
      </button>
    </article>
  `;
}

// Função para verificar se um filme está na lista
function isMovieOnList(id) {
  // Função auxiliar para encontrar um filme com base no ID
  function doesThisIdBelongToThisMovie(movieObject) {
    return movieObject.imdbID === id;
  }
  // Verifica se o ID está na lista de filmes
  return Boolean(movieListAdd.find(doesThisIdBelongToThisMovie));
}

// Função para remover um filme da lista após confirmação
function removeMovie(id) {
  notie.confirm({
    text: "Voulez-vous supprimer le film de la liste ?",
    submitText: "Oui",
    cancelText: "Non",
    position: "top",
    submitCallback: function removeMovieFromList() {
      // Filtra o filme a ser removido da lista
      movieListAdd = movieListAdd.filter((movie) => movie.imdbID !== id);
      // Remove o artigo HTML do filme
      document.getElementById(`Post-${id}`).remove();
      // Atualiza o localStorage
      upDateLocalStorage();
    },
  });
}

// Atualiza a exibição inicial com filmes armazenados
for (const movieInfo of movieListAdd) {
  upDate(movieInfo);
}

// Função para atualizar o localStorage com a lista de filmes atual
function upDateLocalStorage() {
  localStorage.setItem("movieList", JSON.stringify(movieListAdd));
}
