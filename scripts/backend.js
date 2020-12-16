/* -------------------App mata mosquito ------------------------------  */
/* capiturando altura e largura método window.inner */
// trazendo altura e largura pra fora do escopo da função
var height = 0;
var width = 0;
// criando variaveis globais
var vidas = 1;
var pontos = 0;
var pontosdatados = 0;
// criando cronometro
var tempo = 10;
// padronizando tempo de aparição do mosquito
var criaMosquitoTempo = 1500;

/*-------------------Recuperando a URL para setar vida e tempo------------------------- */
/* window.location.search trás os valores ao lado direito de "?" */
var nivel = window.location.search;
nivel = nivel.replace("?", "");
// código responsável por saber a dificuldade perante os values passado no select da DOOM(index.html - linha 60)
if (nivel === "normal") {
  criaMosquitoTempo = 1500;

  // 1500
} else if (nivel === "dificil") {
  criaMosquitoTempo = 1000;
  tempo = 15;
  // 1000
} else if (nivel === "chuckNorris") {
  tempo = 20;
  criaMosquitoTempo = 750;
}

function ajustaTamanhoPalcoJogo() {
  // funcao que vai trazer altura e largura do dispositivo
  height = window.innerHeight;
  width = window.innerWidth;
  /* nota-se que o palco ficou dinâmico e agora trabalha a cada resize do body, evento onresize() */
}
// chamada da função
ajustaTamanhoPalcoJogo();

/*------ cronometro -----*/
var cronometro = setInterval(function () {
  /* innerHTML (Dentro do html, span) insere dentro da tag html que é o <span>(linha 29 - app.html)
    vamos incluir o valor de tempo */
  tempo -= 1;

  if (tempo < 0) {
    clearInterval(cronometro);
    clearInterval(criaMosquito);
    window.location.href = "vitoria.html" + "?" + pontosdatados;
    // enviando os pontos como parâmetro pra vitoria
  } else {
    {
      document.getElementById("cronometro").innerHTML = tempo;
    }
  }
}, 1000);

/* ------Posicionando o mosquito de forma aleatoria----- */
/* por padrão o método random retorna valores de 0 à 1 mas se multiplicar pelo x e y de largura
e altura temos números maiores. O método Math.floor(recebendo a multiplicação do random) arredonda
pra baixo os valores pra não ter casas decimais desnecessárias */

/* Criando coordenadas de forma dinâmica */
function posicaoRandomica() {
  /* atribuino condicional para remover mosquito já existente a partir do id */
  if (document.getElementById("mosquito")) {
    document.getElementById("mosquito").remove();
    /* ------ logica responsavel por descontar um coração --------*/
    if (vidas > 3) {
      // definir game over
      window.location.href = "fim_de_jogo.html" + "?" + pontosdatados;
      // enviamos pra URL seguinte os pontosdatados da função da linha 114 desse mesmo script
    } else {
      document.getElementById("v" + vidas).src = "imagens/coracao_vazio.png";
      /* o incremento(vidas++) de vidas é pra remover o próximo coração, temos 3 */
      vidas++;
    }
  }

  /* ---------- não deixar o mosquito junto da tela --------*/
  // solução = tirar 90 pixels de cada posiçaõ
  var positionX = Math.floor(Math.random() * width) - 90;
  var positionY = Math.floor(Math.random() * height) - 90;

  /* ---- criando operador ternário pra resolver bug com -90
    quando utilizamos o -90 se o valor aleatorio for menor que zero ele causaria um sumiço
    lá na pagina então vamos resolver*/
  positionX = positionX < 0 ? 0 : positionX;
  positionY = positionY < 0 ? 0 : positionY;

  /* ------ criando a imagem de forma dinâmica------ */

  var mosquito = document.createElement("img");
  mosquito.src = "imagens/AedesAegypti.png";
  mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio();
  mosquito.style.left = positionX + "px"; // concatenando px pra formar pixels
  mosquito.style.top = positionY + "px";
  mosquito.id = "mosquito";
  mosquito.onclick = function () {
    // antes de apagar o mosquito clicado vamos salvar o clique nele :)
    datar_pontos();
    this.remove();
  };

  /* o elemento imagem do mosquito precisa ser absoluto */
  mosquito.style.position = "absolute";

  /* ------- adiciona o mosquito no doom -------*/
  document.body.appendChild(mosquito);
  /* ----------- observação a respeito do appendChild --------------------------------
     na criação de um elemento acessado pelo body appendchild como o script é carregado depois
    da página teriamos um problema, pra resolver será criada uma função chamada posicaoRandomica()
    Assim, a posicaoRandomica() só é executad quando o body é criado */

  /*-------- criando função que vai salvar os pontos -------- */
  function datar_pontos() {
    pontos++;
    document.getElementById("pontos").innerHTML = pontos;
    pontosdatados = pontos;
    return pontosdatados;
  }
}
/* --------------criando tamanho aleatorio pro mosquito ---------------- */
/* esse tamanho aleatório é dado por uma classe 
a funcao vai criar um numero randomico de 1 a 3 por causa do math floor
e depndendo desse numero ele vai criar uma nova string da classe
essa string com nome da classe vai concidir com classes já criadas
e como ela ta sendo passada  como parametro para o mosquito.className
então vai sempre variar junto com a atribuição desse mosquisto na tela
*/
function tamanhoAleatorio() {
  var classe = Math.floor(Math.random() * 3);

  switch (classe) {
    case 0:
      return "firstMosquito";

    case 1:
      return "secondMosquito";
    case 2:
      return "thirdMosquito";
  }
}
/* ---------------------Lado A lado B---------------------------------- */
/* nessa parte o objetivo é que o mosquito ele vá indo mudando a direção do rostinho dele */

function ladoAleatorio() {
  var imgDirection = Math.floor(Math.random() * 2);

  switch (imgDirection) {
    case 0:
      return "ladoA";

    case 1:
      return "ladoB";
  }
}
