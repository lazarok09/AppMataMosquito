/* ------- função criada para recuperar os pontos salvos no backend.js ----*/

function recupera_pontos() {
  var pontos_recuperados = window.location.search;
  pontos_recuperados = pontos_recuperados.replace("?", "");
  return pontos_recuperados;
}
document.getElementById("pontos").innerHTML = recupera_pontos();
