// Passo a passo

//1) Criar card vaga
//2) Adicionar vagas no container
//3) Criar card resumido da vaga 
//4) Adicionar o card resumido na área de vagas selecionadas

const section = document.querySelector("section");

//1) Criar card vaga
function cardVagas(vaga) {
  const containerCard = document.createElement("div");
  containerCard.classList.add("cards-vagas", "color-grey-6");

  const tituloVaga = document.createElement("h2");
  tituloVaga.classList.add("title-4", "color-grey-1");
  tituloVaga.innerText = vaga.nome;

  const empresa = document.createElement("span");
  empresa.classList.add("text-3", "color-grey-2","card");
  empresa.innerText = vaga.empresa

  const localEmpresa = document.createElement("span");
  localEmpresa.classList.add("text-3", "color-grey-2", "card");
  localEmpresa.innerText = vaga.localEmpresa;

  const descricao = document.createElement("p");
  descricao.classList.add("text-2", "color-grey-2");
  descricao.innerText = vaga.descricao;

  const boxCandidatar = document.createElement("div");
  boxCandidatar.classList.add("box-candidatar");

  const tipo = document.createElement("span");
  tipo.classList.add("text-3", "color-grey-2");
  tipo.innerText = vaga.tipo;

  const buttonCandidatar = document.createElement("button");
  buttonCandidatar.classList.add("mini-btn", "bg-color-brand-1", "color-grey-6");
  buttonCandidatar.id = vaga.id;
  buttonCandidatar.innerText = "Candidatar";

  boxCandidatar.append(tipo, buttonCandidatar);
  containerCard.append(tituloVaga, empresa, localEmpresa, descricao, boxCandidatar);

  return containerCard
}

//2) Adicionar vagas no container
function listarVagas(){
  for(let i = 0; i < vagas.length; i++) {
    let card = cardVagas(vagas[i]);
    section.appendChild(card);
  }
}

listarVagas();

let vagasSelecionadas = [];
const containerVagasSelecionadas = document.querySelector("#container-vagas-selecionadas");

//3) Criar card resumido da vaga
function cardVagasSelecionadas(vaga){
  const card = document.createElement("li");
  card.classList.add("vagas-selecionada-card");

  card.innerHTML = `
    <div class="flex-row">
      <h3>${vaga.nome}</h3>

      <button class="trash-button bg-color-grey-5" id=_${vaga.id}>
        <img src= "./assets/img/trash.svg" alt="Ícone da lixeira" />
      </button>
    </div>

    <div class="flex-span">
      <span class="color-grey-2 text-3">${vaga.empresa}</span>
      <span class="color-grey-2 text-3">${vaga.localEmpresa}</span>
    </div>
  `
  return card
}
//4) Adicionar o card resumido na área de vagas selecionadas

section.addEventListener("click", function(event) {
  const botao = event.target;

  if(botao.tagName == "BUTTON") {
    const idVaga = botao.id;
    const vagaFiltrada = vagas.find((vaga) => vaga.id == idVaga);

    vagasSelecionadas.push(vagaFiltrada);
    listarVagasSelecionadas();
  }
});

function listarVagasSelecionadas() {
  containerVagasSelecionadas.innerHTML = ""
  for (let i = 0; i < vagasSelecionadas.length; i++) {
    const card = cardVagasSelecionadas(vagasSelecionadas[i]);
    containerVagasSelecionadas.appendChild(card)
  }
}

//5) Remover o card da área de vagas selecionadas

function removerVaga(event) {
  let botaoLixeira = event.target;
  if(botaoLixeira.tagName == "BUTTON" || botaoLixeira.tagName == "IMG") {

    if (botaoLixeira.tagName == "IMG") {
      botaoLixeira = botaoLixeira.closest("BUTTON")
    }

    let idVaga = botaoLixeira.id.replace("_", "")

    botaoLixeira.closest("li").remove()

    vagasSelecionadas = vagasSelecionadas.reduce((acc, vaga) => {

      if (idVaga != vaga.id) {
        acc.push(vaga)
      }
      return acc;

    }, [])

  }
}
containerVagasSelecionadas.addEventListener("click", removerVaga);
