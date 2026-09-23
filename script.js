/**
 * Portfólio Kessya Wdanmylla
 * Lógica de controle de telas, transições de estado e efeito Matrix com Canvas.
 */

// Elementos de tela principais
const telaEscolha = document.getElementById("tela-escolha");
const telaTerminal = document.getElementById("tela-terminal");
const telaPortfolio = document.getElementById("tela-portfolio");
const tituloDigitar = document.getElementById("titulo-digitar");
const canvasChuva = document.getElementById("chuva-matrix");

// Estado do terminal e animação
let temporizadoresTerminal = [];
let idAnimacaoChuva = null;

// Efeito de digitação no título
const textoTitulo = "BEM VINDO AO MEU PORTFÓLIO";
let indiceCaractere = 0;

function animarTitulo() {
  if (!tituloDigitar) return;

  if (indiceCaractere < textoTitulo.length) {
    tituloDigitar.textContent += textoTitulo.charAt(indiceCaractere);
    indiceCaractere++;
    setTimeout(animarTitulo, 90);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (tituloDigitar) {
    tituloDigitar.textContent = "";
    indiceCaractere = 0;
    animarTitulo();
  }
});

// Pílula Azul: Versão clara direta
function escolherAzul() {
  telaEscolha.classList.add("escondido");
  telaTerminal.classList.add("escondido");
  telaPortfolio.classList.remove("escondido");

  document.body.className = "tema-azul";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Pílula Vermelha: Terminal com efeito chuva e posterior acesso ao portfólio
function escolherVermelho() {
  telaEscolha.classList.add("escondido");
  telaTerminal.classList.remove("escondido");

  document.body.className = "tema-vermelho";

  iniciarChuvaMatrix();
  executarTerminal();
}

function executarTerminal() {
  limparMensagensTerminal();

  const linhas = [
    "> inicianlizando sistema...",
    "> carregando perfil...",
    "> autenticando credenciais do desenvolvedor...",
    "> acesso concedido."
  ];

  linhas.forEach((texto, indice) => {
    const delay = (indice + 1) * 850;
    const timeout = setTimeout(() => {
      const paragrafo = document.getElementById(`terminal-linha-${indice + 1}`);
      if (paragrafo) paragrafo.textContent = texto;
    }, delay); 

    temporizadoresTerminal.push(timeout);
  });

  const tempoTotal = linhas.length * 850 + 600;
  const timeoutFinal = setTimeout(abrirPortfolioMatrix, tempoTotal);
  temporizadoresTerminal.push(timeoutFinal);
}

function abrirPortfolioMatrix() {
  pararChuvaMatrix();
  telaTerminal.classList.add("escondido");
  telaPortfolio.classList.remove("escondido");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Retorno à tela de escolha
function voltarParaEscolha() {
  pararChuvaMatrix();
  limparTemporizadores();

  telaPortfolio.classList.add("escondido");
  telaTerminal.classList.add("escondido");
  telaEscolha.classList.remove("escondido");

  document.body.className = "";
  limparMensagensTerminal();

  if (tituloDigitar) {
    tituloDigitar.textContent = "";
    indiceCaractere = 0;
    animarTitulo();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function limparMensagensTerminal() {
  for (let i = 1; i <= 4; i++) {
    const linha = document.getElementById(`terminal-linha-${i}`);
    if (linha) linha.textContent = "";
  }
}

function limparTemporizadores() {
  temporizadoresTerminal.forEach(clearTimeout);
  temporizadoresTerminal = [];
}

// Efeito Matrix no Canvas HTML5
function iniciarChuvaMatrix() {
  if (!canvasChuva) return;

  const contexto = canvasChuva.getContext("2d");

  function ajustarDimensoes() {
    canvasChuva.width = window.innerWidth;
    canvasChuva.height = window.innerHeight;
  }
  ajustarDimensoes();

  const caracteres = "アイウエオカキクケコサシスセソタチツテト0123456789<>/{}*=";
  const tamanhoFonte = 16;
  let colunas = Math.floor(canvasChuva.width / tamanhoFonte);
  let posicoesY = Array.from({ length: colunas }, () => Math.random() * -50);

  function desenharQuadro() {
    contexto.fillStyle = "rgba(0, 0, 0, 0.08)";
    contexto.fillRect(0, 0, canvasChuva.width, canvasChuva.height);

    contexto.fillStyle = "#00ff41";
    contexto.font = `${tamanhoFonte}px monospace`;

    for (let i = 0; i < posicoesY.length; i++) {
      const caractere = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      contexto.fillText(caractere, i * tamanhoFonte, posicoesY[i] * tamanhoFonte);

      if (posicoesY[i] * tamanhoFonte > canvasChuva.height && Math.random() > 0.975) {
        posicoesY[i] = 0;
      }
      posicoesY[i]++;
    }

    idAnimacaoChuva = requestAnimationFrame(desenharQuadro);
  }

  desenharQuadro();

  window.addEventListener("resize", () => {
    if (idAnimacaoChuva !== null) {
      ajustarDimensoes();
      colunas = Math.floor(canvasChuva.width / tamanhoFonte);
      posicoesY = Array.from({ length: colunas }, () => Math.random() * -30);
    }
  });
}

function pararChuvaMatrix() {
  if (idAnimacaoChuva !== null) {
    cancelAnimationFrame(idAnimacaoChuva);
    idAnimacaoChuva = null;
  }
}

// Exportações globais para eventos inline do HTML
window.escolherAzul = escolherAzul;
window.escolherVermelho = escolherVermelho;
window.voltarParaEscolha = voltarParaEscolha;