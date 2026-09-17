// =====================================================
// Portfólio Kessya — a lógica das telas
// Fiz com javascript puro, sem framework, pra entender
// de verdade o que cada linha faz
// =====================================================

// Pegando as telas do HTML pelos IDs
var telaEscolha = document.getElementById("tela-escolha");
var telaTerminal = document.getElementById("tela-terminal");
var portfolio = document.getElementById("portfolio");
var mensagemModo = document.getElementById("mensagem-modo");

// Controla os timeouts para poder limpar se necessário
var timeoutsTerminal = [];

// Texto da mensagem principal da escolha
const textoTitulo = "FAÇA SUA ESCOLHA";
let indice = 0;
const velocidadeMs = 100;
let digitandoTimeout = null;

function digitarTitulo() {
  const tituloElemento = document.getElementById("titulo-digitar");
  if (!tituloElemento) return;

  if (indice < textoTitulo.length) {
    tituloElemento.textContent += textoTitulo.charAt(indice);
    indice++;
    digitandoTimeout = setTimeout(digitarTitulo, velocidadeMs);
  }
}

// Inicia a digitação ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
  // Re-busca os elementos caso ainda não estivessem prontos
  telaEscolha = document.getElementById("tela-escolha");
  telaTerminal = document.getElementById("tela-terminal");
  portfolio = document.getElementById("portfolio");
  mensagemModo = document.getElementById("mensagem-modo");

  digitarTitulo();
});

// Controla a animação da chuva Matrix em canvas
var animacaoChuva = null;

// ---------- PÍLULA AZUL: abre a versão "normal" (clara) ----------
function escolherAzul() {
  if (telaEscolha) telaEscolha.classList.add("escondido");
  if (telaTerminal) telaTerminal.classList.add("escondido");
  if (portfolio) portfolio.classList.remove("escondido");

  document.body.className = "modo-azul";

  mensagemModo = document.getElementById("mensagem-modo");
  if (mensagemModo) {
    mensagemModo.textContent = "// A realidade continua...";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------- PÍLULA VERMELHA: terminal + chuva primeiro ----------
function escolherVermelho() {
  if (telaEscolha) telaEscolha.classList.add("escondido");
  if (telaTerminal) telaTerminal.classList.remove("escondido");

  document.body.className = "modo-vermelho";

  // Inicia os efeitos do terminal e da chuva de códigos
  iniciarChuva();
  escreverTerminal();
}

// As frases do terminal aparecem uma por vez
function escreverTerminal() {
  limparTerminal();

  var linhas = [
    "> iniciando protocolo...",
    "> questionando o caminho óbvio...",
    "> carregando curiosidade...",
    "> acesso concedido."
  ];

  // setTimeout em sequência: cada linha espera a anterior
  for (var i = 0; i < linhas.length; i++) {
    mostrarLinha(i, linhas[i]);
  }

  // Depois da última linha, espera um instante e abre o portfólio no estilo Matrix
  var tempoTotal = linhas.length * 900 + 800;
  var timeoutFinal = setTimeout(abrirPortfolioMatrix, tempoTotal);
  timeoutsTerminal.push(timeoutFinal);
}

function mostrarLinha(numero, texto) {
  var t = setTimeout(function () {
    var p = document.getElementById("linha" + (numero + 1));
    if (p) {
      p.textContent = texto;
    }
  }, (numero + 1) * 900);
  timeoutsTerminal.push(t);
}

function abrirPortfolioMatrix() {
  pararChuva();
  if (telaTerminal) telaTerminal.classList.add("escondido");
  if (portfolio) portfolio.classList.remove("escondido");

  mensagemModo = document.getElementById("mensagem-modo");
  if (mensagemModo) {
    mensagemModo.textContent = "// Bem-vindo à realidade.";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Botão do menu que volta pra tela inicial de escolha
function voltarEscolha() {
  pararChuva();
  limparTimeoutsTerminal();

  if (portfolio) portfolio.classList.add("escondido");
  if (telaTerminal) telaTerminal.classList.add("escondido");
  if (telaEscolha) telaEscolha.classList.remove("escondido");

  document.body.className = "";

  limparTerminal();

  // Garante que o título continue preenchido
  const tituloElemento = document.getElementById("titulo-digitar");
  if (tituloElemento && tituloElemento.textContent === "") {
    indice = 0;
    digitarTitulo();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function limparTerminal() {
  for (var i = 1; i <= 4; i++) {
    var p = document.getElementById("linha" + i);
    if (p) p.textContent = "";
  }
}

function limparTimeoutsTerminal() {
  for (var i = 0; i < timeoutsTerminal.length; i++) {
    clearTimeout(timeoutsTerminal[i]);
  }
  timeoutsTerminal = [];
}

// ---------- CHUVA MATRIX (HTML5 Canvas) ----------
function iniciarChuva() {
  var canvas = document.getElementById("chuva");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");

  function redimensionarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  redimensionarCanvas();

  // Caracteres que caem (katakana misturado com números e operadores)
  var letras = "アイウエオカキクケコサシスセソタチツテト0123456789<>/{}*=";
  var tamanho = 16;
  var colunas = Math.floor(canvas.width / tamanho);

  // Posição inicial Y de cada coluna
  var posicoes = [];
  for (var i = 0; i < colunas; i++) {
    posicoes[i] = Math.random() * -50;
  }

  function desenhar() {
    // Fundo semitransparente cria o rastro gradual das letras
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff41";
    ctx.font = tamanho + "px monospace";

    for (var i = 0; i < colunas; i++) {
      var indiceLetra = Math.floor(Math.random() * letras.length);
      var letra = letras.charAt(indiceLetra);

      ctx.fillText(letra, i * tamanho, posicoes[i] * tamanho);

      // Quando passa do fim da tela, volta ao topo de forma aleatória
      if (posicoes[i] * tamanho > canvas.height && Math.random() > 0.975) {
        posicoes[i] = 0;
      }
      posicoes[i]++;
    }

    animacaoChuva = requestAnimationFrame(desenhar);
  }

  desenhar();

  window.addEventListener("resize", function () {
    if (animacaoChuva !== null) {
      redimensionarCanvas();
      colunas = Math.floor(canvas.width / tamanho);
      posicoes = [];
      for (var i = 0; i < colunas; i++) {
        posicoes[i] = Math.random() * -30;
      }
    }
  });
}

function pararChuva() {
  if (animacaoChuva !== null) {
    cancelAnimationFrame(animacaoChuva);
    animacaoChuva = null;
  }
}

// Torna as funções acessíveis globalmente
window.escolherAzul = escolherAzul;
window.escolherVermelho = escolherVermelho;
window.voltarEscolha = voltarEscolha;
