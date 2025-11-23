import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RefreshCw, Trophy, Star, Clock, Play, Settings, Volume2, VolumeX, Home, Grid, Award, Zap, Heart, Smile } from 'lucide-react';

interface MemoryGameProps {
  onBack: () => void;
  onComplete: (score: number) => void;
}

// --- Types ---
type Screen = 'MENU' | 'THEME_SELECT' | 'LEVEL_SELECT' | 'PLAYING' | 'VICTORY' | 'TROPHIES';
type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
type ThemeId = 'HEROES' | 'ANIMALS' | 'FRUITS' | 'CREATION';

interface CardItem {
  id: number;
  pairId: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameTheme {
  id: ThemeId;
  name: string;
  icon: string;
  colors: string; // Tailwind class for background/border
  items: { id: number, content: string }[];
  cardBack: string; // Emoji or pattern for card back
}

interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

// --- Constants ---
const THEMES: GameTheme[] = [
  {
    id: 'HEROES',
    name: 'Heróis da Bíblia',
    icon: '👑',
    colors: 'bg-blue-100 border-blue-300 text-blue-800',
    cardBack: '🛡️',
    items: [
      { id: 1, content: '🧔🏻‍♂️' }, // Jesus
      { id: 2, content: '👑' },  // Davi
      { id: 3, content: '🦁' },  // Daniel
      { id: 4, content: '🌊' },  // Moisés
      { id: 5, content: '🐋' },  // Jonas
      { id: 6, content: '💪' },  // Sansão
      { id: 7, content: '👸' },  // Ester
      { id: 8, content: '🌈' },  // Noé
      { id: 9, content: '🍎' },  // Eva
      { id: 10, content: '👶' }, // Menino Jesus
      { id: 11, content: '🥖' }, // Multiplicação
      { id: 12, content: '🍷' }, // Santa Ceia
    ]
  },
  {
    id: 'ANIMALS',
    name: 'Arca de Noé',
    icon: '🦁',
    colors: 'bg-green-100 border-green-300 text-green-800',
    cardBack: '🌿',
    items: [
      { id: 1, content: '🦁' }, { id: 2, content: '🐘' },
      { id: 3, content: '🦒' }, { id: 4, content: '🦓' },
      { id: 5, content: '🐒' }, { id: 6, content: '🐼' },
      { id: 7, content: '🐸' }, { id: 8, content: '🐢' },
      { id: 9, content: '🐦' }, { id: 10, content: '🦉' },
      { id: 11, content: '🦋' }, { id: 12, content: '🐠' },
    ]
  },
  {
    id: 'FRUITS',
    name: 'Frutos do Espírito',
    icon: '🍇',
    colors: 'bg-pink-100 border-pink-300 text-pink-800',
    cardBack: '❤️',
    items: [
      { id: 1, content: '❤️' }, // Amor
      { id: 2, content: '😊' }, // Alegria
      { id: 3, content: '🕊️' }, // Paz
      { id: 4, content: '⏳' }, // Longanimidade
      { id: 5, content: '🤝' }, // Benignidade
      { id: 6, content: '🤲' }, // Bondade
      { id: 7, content: '💎' }, // Fidelidade
      { id: 8, content: '🤫' }, // Mansidão
      { id: 9, content: '🧘' }, // Domínio Próprio
      { id: 10, content: '🙏' }, // Fé
      { id: 11, content: '✝️' }, // Cruz
      { id: 12, content: '📖' }, // Palavra
    ]
  },
  {
    id: 'CREATION',
    name: 'A Criação',
    icon: '🌍',
    colors: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    cardBack: '✨',
    items: [
      { id: 1, content: '☀️' }, // Sol
      { id: 2, content: '🌙' }, // Lua
      { id: 3, content: '🌟' }, // Estrelas
      { id: 4, content: '☁️' }, // Nuvens
      { id: 5, content: '🌊' }, // Mar
      { id: 6, content: '🏔️' }, // Terra
      { id: 7, content: '🌳' }, // Árvores
      { id: 8, content: '🌺' }, // Flores
      { id: 9, content: '🐟' }, // Peixes
      { id: 10, content: '🦅' }, // Aves
      { id: 11, content: '🦖' }, // Animais
      { id: 12, content: '👫' }, // Homem e Mulher
    ]
  }
];

const LEVELS = {
  EASY: { label: 'Fácil', pairs: 6, grid: 'grid-cols-3', bonus: 10 },
  MEDIUM: { label: 'Médio', pairs: 8, grid: 'grid-cols-4', bonus: 25 },
  HARD: { label: 'Difícil', pairs: 12, grid: 'grid-cols-4 sm:grid-cols-6', bonus: 50 }
};

// --- Main Component ---
const MemoryGame: React.FC<MemoryGameProps> = ({ onBack, onComplete }) => {
  // Navigation State
  const [screen, setScreen] = useState<Screen>('MENU');
  
  // Game Config State
  const [difficulty, setDifficulty] = useState<Difficulty>('EASY');
  const [themeId, setThemeId] = useState<ThemeId>('HEROES');
  
  // Game Play State
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 'first_win', title: 'Primeira Vitória', desc: 'Completou o jogo uma vez', icon: <Trophy className="w-6 h-6 text-yellow-500" />, unlocked: false },
    { id: 'speedster', title: 'Veloz', desc: 'Ganhou em menos de 45s', icon: <Zap className="w-6 h-6 text-blue-500" />, unlocked: false },
    { id: 'sage', title: 'Sábio', desc: 'Venceu sem errar nenhum par', icon: <Award className="w-6 h-6 text-purple-500" />, unlocked: false },
  ]);

  // Refs
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // --- Game Logic Helpers ---

  const startGame = () => {
    const theme = THEMES.find(t => t.id === themeId)!;
    const level = LEVELS[difficulty];
    
    // Select & Shuffle Cards
    const selectedItems = theme.items.slice(0, level.pairs);
    const gameDeck = [...selectedItems, ...selectedItems]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        pairId: item.id,
        content: item.content,
        isFlipped: false,
        isMatched: false
      }));

    setCards(gameDeck);
    setFlippedIndices([]);
    setScore(0);
    setMoves(0);
    setTimer(0);
    setIsLocked(false);
    setScreen('PLAYING');
  };

  useEffect(() => {
    if (screen === 'PLAYING') {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [screen]);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

    // Play Sound (Simulated visual feedback in UI)
    // if (soundEnabled) playFlipSound(); 

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves(m => m + 1);
      checkForMatch(newFlipped[0], newFlipped[1]);
    }
  };

  const checkForMatch = (idx1: number, idx2: number) => {
    const isMatch = cards[idx1].pairId === cards[idx2].pairId;

    if (isMatch) {
      setTimeout(() => {
        const newCards = [...cards];
        newCards[idx1].isMatched = true;
        newCards[idx2].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);
        setIsLocked(false);
        setScore(s => s + 10); // +10 for match

        // Check Win Condition
        if (newCards.every(c => c.isMatched)) {
          finishGame(true);
        }
      }, 600);
    } else {
      setTimeout(() => {
        const newCards = [...cards];
        newCards[idx1].isFlipped = false;
        newCards[idx2].isFlipped = false;
        setCards(newCards);
        setFlippedIndices([]);
        setIsLocked(false);
        setScore(s => Math.max(0, s - 2)); // Penalty
      }, 1000);
    }
  };

  const finishGame = (won: boolean) => {
    if (!won) return; // Currently only winning ends the game

    let finalScore = score + LEVELS[difficulty].bonus;
    
    // Time bonus
    if (timer < 60) finalScore += 20;
    if (timer < 30) finalScore += 30;

    // Unlock Achievements
    const newAchievements = [...achievements];
    if (!achievements[0].unlocked) newAchievements[0].unlocked = true; // First Win
    if (timer < 45 && !achievements[1].unlocked) newAchievements[1].unlocked = true; // Speedster
    // Simple check for "Sage" (perfect game): if score matches max potential without penalties
    // (pairs * 10) == score before bonuses. Simplification: if moves == pairs.
    if (moves === LEVELS[difficulty].pairs && !achievements[2].unlocked) newAchievements[2].unlocked = true;

    setAchievements(newAchievements);
    setScore(finalScore);
    setScreen('VICTORY');
    onComplete(finalScore);
  };

  // --- Render Helpers ---

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const renderMenu = () => (
    <div className="flex flex-col items-center animate-pop max-w-md mx-auto text-center">
      <div className="bg-white p-6 rounded-full shadow-xl mb-6 animate-bounce-slow border-4 border-yellow-200">
         <span className="text-6xl">🦄</span>
      </div>
      <h1 className="text-4xl font-black text-gray-800 mb-2">Jogo da Memória</h1>
      <p className="text-gray-500 mb-8 text-lg">Treine sua mente e aprenda brincando!</p>
      
      <div className="w-full space-y-4">
        <button 
          onClick={() => setScreen('LEVEL_SELECT')}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-xl shadow-lg hover:bg-indigo-600 hover:scale-105 transition-all flex items-center justify-center gap-3"
        >
          <Play className="w-6 h-6 fill-current" /> JOGAR AGORA
        </button>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setScreen('THEME_SELECT')}
            className="bg-white text-primary border-2 border-primary/20 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all flex flex-col items-center"
          >
            <Grid className="w-6 h-6 mb-1" /> Temas
          </button>
          <button 
            onClick={() => setScreen('TROPHIES')}
            className="bg-white text-yellow-600 border-2 border-yellow-200 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-50 transition-all flex flex-col items-center"
          >
            <Trophy className="w-6 h-6 mb-1" /> Troféus
          </button>
        </div>
      </div>
    </div>
  );

  const renderThemeSelect = () => (
    <div className="animate-pop">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Escolha um Tema</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {THEMES.map(theme => (
          <button
            key={theme.id}
            onClick={() => { setThemeId(theme.id); setScreen('MENU'); }}
            className={`p-6 rounded-3xl border-4 text-left transition-all relative overflow-hidden group ${themeId === theme.id ? theme.colors + ' ring-4 ring-offset-2 ring-primary/30' : 'bg-white border-gray-100 hover:border-gray-200 text-gray-600'}`}
          >
            <div className="flex items-center justify-between relative z-10">
              <div>
                <span className="text-4xl mb-2 block">{theme.icon}</span>
                <span className="font-bold text-lg">{theme.name}</span>
              </div>
              {themeId === theme.id && <div className="bg-white/30 p-2 rounded-full"><Star className="w-6 h-6 fill-current" /></div>}
            </div>
            {/* Background decoration */}
            <div className="absolute -right-4 -bottom-4 text-6xl opacity-10 group-hover:scale-110 transition-transform">
              {theme.icon}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderLevelSelect = () => (
    <div className="animate-pop text-center">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Nível de Dificuldade</h2>
      <div className="space-y-4 max-w-sm mx-auto">
        {(['EASY', 'MEDIUM', 'HARD'] as Difficulty[]).map(lvl => (
          <button
            key={lvl}
            onClick={() => { setDifficulty(lvl); startGame(); }} // Start game after selection
            className={`w-full p-5 rounded-2xl font-bold text-xl border-b-4 transition-all active:scale-95 flex items-center justify-between
              ${lvl === 'EASY' ? 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200' : ''}
              ${lvl === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200' : ''}
              ${lvl === 'HARD' ? 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200' : ''}
            `}
          >
            <span>{LEVELS[lvl].label}</span>
            <span className="text-sm opacity-70">{LEVELS[lvl].pairs} Pares</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderTrophies = () => (
    <div className="animate-pop">
      <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Galeria de Troféus</h2>
      <p className="text-center text-gray-500 mb-8">Conquistas desbloqueadas</p>
      
      <div className="grid grid-cols-1 gap-4">
        {achievements.map(ach => (
          <div key={ach.id} className={`flex items-center p-4 rounded-2xl border-2 ${ach.unlocked ? 'bg-white border-yellow-200 shadow-sm' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
             <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 ${ach.unlocked ? 'bg-yellow-50' : 'bg-gray-200 grayscale'}`}>
               {ach.icon}
             </div>
             <div>
               <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                 {ach.title}
                 {ach.unlocked && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Desbloqueado</span>}
               </h3>
               <p className="text-sm text-gray-500">{ach.desc}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVictory = () => (
    <div className="animate-pop text-center py-8">
      <div className="relative inline-block mb-6">
        <div className="absolute inset-0 bg-yellow-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <Trophy className="w-32 h-32 text-yellow-400 relative z-10 drop-shadow-lg" />
        <div className="absolute -top-2 -right-2 animate-bounce delay-100 text-4xl">⭐</div>
        <div className="absolute -bottom-2 -left-2 animate-bounce text-4xl">🎉</div>
      </div>
      
      <h2 className="text-4xl font-black text-gray-800 mb-2">Parabéns!</h2>
      <p className="text-gray-500 text-lg mb-8">Você completou o desafio!</p>

      <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
        <div className="bg-white p-4 rounded-2xl shadow-sm border-b-4 border-gray-100">
          <div className="text-gray-400 text-xs font-bold uppercase mb-1">Tempo</div>
          <div className="text-2xl font-black text-primary">{formatTime(timer)}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border-b-4 border-gray-100">
          <div className="text-gray-400 text-xs font-bold uppercase mb-1">Erros</div>
          <div className="text-2xl font-black text-red-400">{Math.max(0, moves - LEVELS[difficulty].pairs)}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border-b-4 border-gray-100">
           <div className="text-gray-400 text-xs font-bold uppercase mb-1">Pontos</div>
           <div className="text-2xl font-black text-yellow-500">+{score}</div>
        </div>
      </div>

      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        <button 
          onClick={startGame} // Restart with same settings
          className="w-full py-3 bg-secondary text-white rounded-xl font-bold shadow-lg hover:bg-green-600 transition-all"
        >
          Jogar Novamente
        </button>
        <button 
          onClick={() => setScreen('MENU')}
          className="w-full py-3 bg-white text-gray-600 border-2 border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all"
        >
          Voltar ao Menu
        </button>
      </div>
    </div>
  );

  const renderGame = () => {
    const theme = THEMES.find(t => t.id === themeId)!;
    
    return (
      <div className="h-full flex flex-col">
        {/* HUD */}
        <div className="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm border-b-2 border-gray-100 mb-4">
          <div className="flex gap-2">
             <button onClick={() => setScreen('MENU')} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
               <Home className="w-5 h-5 text-gray-600" />
             </button>
             <button onClick={startGame} className="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors" title="Reiniciar">
               <RefreshCw className="w-5 h-5" />
             </button>
          </div>

          <div className="flex items-center gap-4 font-bold text-gray-700 bg-gray-50 px-4 py-2 rounded-full">
             <div className="flex items-center gap-1 min-w-[60px]">
                <Clock className="w-4 h-4 text-primary" />
                <span>{formatTime(timer)}</span>
             </div>
             <div className="w-px h-4 bg-gray-300"></div>
             <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{score}</span>
             </div>
          </div>

          <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 text-gray-400 hover:text-gray-600">
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* BOARD */}
        <div className={`grid ${LEVELS[difficulty].grid} gap-2 sm:gap-4 flex-grow content-center max-w-4xl mx-auto w-full`}>
          {cards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              onClick={() => handleCardClick(index)}
              className={`aspect-[3/4] cursor-pointer perspective-1000 group`}
            >
               <div className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${card.isFlipped ? 'rotate-y-180' : ''}`}>
                  
                  {/* FRONT (Hidden) */}
                  <div className={`absolute inset-0 backface-hidden rounded-xl sm:rounded-2xl shadow-md flex items-center justify-center text-3xl sm:text-5xl select-none border-b-4 transition-all
                    ${theme.colors.split(' ')[0]} ${theme.colors.split(' ')[1]} bg-opacity-80
                    group-hover:-translate-y-1
                  `}>
                    {theme.cardBack}
                  </div>

                  {/* BACK (Revealed) */}
                  <div className={`absolute inset-0 rotate-y-180 backface-hidden bg-white rounded-xl sm:rounded-2xl border-4 shadow-md flex items-center justify-center text-4xl sm:text-6xl select-none
                    ${card.isMatched ? 'border-green-400 ring-2 ring-green-200' : 'border-indigo-200'}
                  `}>
                    <span className={`transform transition-transform ${card.isMatched ? 'scale-110 animate-bounce' : ''}`}>
                      {card.content}
                    </span>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 min-h-[600px] flex flex-col">
      {/* Global Header for non-game screens */}
      {screen !== 'PLAYING' && (
        <button 
          onClick={screen === 'MENU' ? onBack : () => setScreen('MENU')}
          className="self-start mb-6 flex items-center text-gray-500 font-bold hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {screen === 'MENU' ? 'Sair do Jogo' : 'Voltar ao Menu'}
        </button>
      )}

      {/* Content Switcher */}
      <div className="flex-grow flex flex-col justify-center">
        {screen === 'MENU' && renderMenu()}
        {screen === 'THEME_SELECT' && renderThemeSelect()}
        {screen === 'LEVEL_SELECT' && renderLevelSelect()}
        {screen === 'TROPHIES' && renderTrophies()}
        {screen === 'PLAYING' && renderGame()}
        {screen === 'VICTORY' && renderVictory()}
      </div>
    </div>
  );
};

export default MemoryGame;