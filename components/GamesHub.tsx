import React from 'react';
import { AppView } from '../types';
import { ArrowLeft, BrainCircuit, Search, Puzzle, Palette, Lock, Sparkles } from 'lucide-react';

interface GamesHubProps {
  onChangeView: (view: AppView) => void;
}

const GamesHub: React.FC<GamesHubProps> = ({ onChangeView }) => {
  const games = [
    {
      id: 'quiz',
      title: 'Quiz Bíblico',
      icon: <BrainCircuit className="w-8 h-8 text-white" />,
      color: 'bg-indigo-500',
      borderColor: 'border-indigo-600',
      action: () => onChangeView(AppView.QUIZ),
      locked: false
    },
    {
      id: 'memory',
      title: 'Jogo da Memória',
      icon: <Puzzle className="w-8 h-8 text-white" />,
      color: 'bg-pink-500',
      borderColor: 'border-pink-600',
      action: () => onChangeView(AppView.MEMORY_GAME),
      locked: false,
      badge: "NOVO!"
    },
    {
      id: 'wordsearch',
      title: 'Caça-Palavras',
      icon: <Search className="w-8 h-8 text-white" />,
      color: 'bg-green-500',
      borderColor: 'border-green-600',
      action: () => {},
      locked: true
    },
    {
      id: 'coloring',
      title: 'Colorir',
      icon: <Palette className="w-8 h-8 text-white" />,
      color: 'bg-orange-500',
      borderColor: 'border-orange-600',
      action: () => {},
      locked: true
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button 
        onClick={() => onChangeView(AppView.HOME)}
        className="flex items-center text-gray-600 font-bold hover:text-primary mb-8 transition-colors bg-white px-4 py-2 rounded-full shadow-sm"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Voltar para o Início
      </button>

      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-gray-800 mb-2">Arcade Bíblico 🎮</h2>
        <p className="text-xl text-gray-500">Escolha um jogo para aprender e se divertir!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={game.action}
            disabled={game.locked}
            className={`relative h-64 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 shadow-xl border-b-8 transition-all transform hover:-translate-y-2 ${game.color} ${game.borderColor} ${game.locked ? 'opacity-80 cursor-not-allowed grayscale' : 'cursor-pointer'}`}
          >
            {game.badge && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full animate-bounce shadow-sm">
                {game.badge}
              </div>
            )}
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              {game.icon}
            </div>
            <h3 className="text-2xl font-extrabold text-white text-center drop-shadow-md">
              {game.title}
            </h3>
            
            {game.locked && (
              <div className="absolute inset-0 bg-black/20 rounded-3xl flex items-center justify-center">
                <div className="bg-white/90 px-4 py-2 rounded-full flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-bold text-gray-600">Em Breve</span>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Bottom banner */}
      <div className="mt-12 bg-yellow-100 rounded-3xl p-8 border-4 border-yellow-200 text-center relative overflow-hidden">
         <div className="relative z-10">
            <h3 className="text-2xl font-bold text-yellow-800 mb-2">Ganhe Medalhas! 🏆</h3>
            <p className="text-yellow-700">Jogue todos os dias para desbloquear conquistas especiais.</p>
         </div>
         <div className="absolute top-0 right-0 -mt-4 -mr-4 text-8xl opacity-20">🎲</div>
      </div>
    </div>
  );
};

export default GamesHub;