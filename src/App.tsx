import React, { useState } from 'react';

export default function App() {
  const [choice, setChoice] = useState<'red' | 'blue' | null>(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none flex items-center justify-center">
      {/* Imagem de fundo preenchendo a tela */}
      <img
        src="/kessya.png"
        alt="Kessya - Faça sua escolha"
        className="absolute inset-0 w-full h-full object-contain object-center pointer-events-none"
      />

      {/* Gradiente sutil para legibilidade dos textos no topo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/60 pointer-events-none" />

      {/* Áreas de clique interativas nas pílulas */}
      <div className="absolute inset-0 flex z-10">
        {/* Pílula Vermelha (Lado Esquerdo) */}
        <button
          onClick={() => setChoice('red')}
          className="w-1/2 h-full cursor-pointer group focus:outline-none"
          title="Pílula Vermelha"
          aria-label="Escolher pílula vermelha"
        >
          <div className="w-full h-full transition-colors duration-500 group-hover:bg-red-950/15" />
        </button>

        {/* Pílula Azul (Lado Direito) */}
        <button
          onClick={() => setChoice('blue')}
          className="w-1/2 h-full cursor-pointer group focus:outline-none"
          title="Pílula Azul"
          aria-label="Escolher pílula azul"
        >
          <div className="w-full h-full transition-colors duration-500 group-hover:bg-blue-950/15" />
        </button>
      </div>

      {/* Barra de Topo */}
      <header className="absolute top-0 left-0 right-0 z-20 px-8 py-5 flex items-center justify-between pointer-events-none">
        <div className="text-[#00ff41] font-bold tracking-[0.25em] text-sm md:text-base glow-green">
          KESSYA
        </div>

        <div className="flex items-center gap-2.5 text-[#00ff41] text-xs md:text-sm font-semibold tracking-widest glow-green">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00ff41] glow-box-green animate-pulse" />
          <span>SISTEMA ONLINE</span>
        </div>
      </header>

      {/* Título Centralizado */}
      <div className="absolute top-14 md:top-16 left-0 right-0 z-20 flex flex-col items-center pointer-events-none">
        <h1 className="text-red-600 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] uppercase glow-red flex items-center">
          FAÇA SUA ESCOLHA
          <span className="inline-block ml-1 w-0.5 md:w-1 h-7 md:h-10 bg-red-500 animate-pulse" />
        </h1>

        {/* Feedback visual ao clicar */}
        {choice && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setChoice(null);
            }}
            className={`mt-4 px-6 py-2 rounded border pointer-events-auto cursor-pointer transition-all duration-300 backdrop-blur-md text-xs md:text-sm tracking-widest uppercase font-bold shadow-lg ${
              choice === 'red'
                ? 'bg-red-950/80 border-red-500 text-red-300 shadow-red-500/30'
                : 'bg-blue-950/80 border-blue-500 text-blue-300 shadow-blue-500/30'
            }`}
          >
            {choice === 'red'
              ? 'Pílula Vermelha Selecionada • Você escolheu a verdade'
              : 'Pílula Azul Selecionada • A história termina aqui'}
            <span className="ml-3 text-xs opacity-60">(clique para reiniciar)</span>
          </div>
        )}
      </div>
    </div>
  );
}