import React, { useState } from 'react';
import { AppView, UserProfile } from './types';
import Hero from './components/Hero';
import StoryTime from './components/StoryTime';
import QuizSection from './components/QuizSection';
import GamesHub from './components/GamesHub';
import BibleJourney from './components/BibleJourney';
import MemoryGame from './components/MemoryGame';
import Profile from './components/Profile';
import Footer from './components/Footer';
import { Menu, Home, Gamepad2, Map, BookOpen, User, LogIn, X } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mock User Data (Simulating a logged-in child)
  const [user, setUser] = useState<UserProfile>({
    name: "Pequeno Discípulo",
    avatar: "🦁",
    points: 150,
    level: 2,
    badges: ["Primeira Leitura", "Explorador"],
    completedStories: 5
  });

  const addPoints = (amount: number) => {
    setUser(prev => ({
      ...prev,
      points: prev.points + amount
    }));
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return (
          <Hero 
            onChangeView={setCurrentView} 
            user={user}
            onAcceptChallenge={() => addPoints(50)}
          />
        );
      case AppView.STORY:
        return <StoryTime onBack={() => setCurrentView(AppView.HOME)} />;
      case AppView.QUIZ:
        return <QuizSection onBack={() => setCurrentView(AppView.GAMES_HUB)} />;
      case AppView.GAMES_HUB:
        return <GamesHub onChangeView={setCurrentView} />;
      case AppView.MEMORY_GAME:
        return (
          <MemoryGame 
            onBack={() => setCurrentView(AppView.GAMES_HUB)} 
            onComplete={(score) => addPoints(score)}
          />
        );
      case AppView.JOURNEY:
        return <BibleJourney onBack={() => setCurrentView(AppView.HOME)} />;
      case AppView.PROFILE:
        return <Profile user={user} onBack={() => setCurrentView(AppView.HOME)} />;
      case AppView.ACTIVITIES:
        return (
          <div className="max-w-4xl mx-auto p-8 text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">🎨 Atividades Criativas</h2>
            <p className="text-gray-600 text-lg">Em breve: Desenhos para colorir e imprimir!</p>
            <button onClick={() => setCurrentView(AppView.HOME)} className="mt-6 text-primary font-bold underline">Voltar</button>
          </div>
        );
      default:
        return <Hero onChangeView={setCurrentView} user={user} onAcceptChallenge={() => addPoints(0)} />;
    }
  };

  const NavItem = ({ view, icon: Icon, label }: { view: AppView; icon: any; label: string }) => (
    <button 
      onClick={() => {
        setCurrentView(view);
        setIsMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${
        currentView === view 
          ? 'bg-primary text-white shadow-md' 
          : 'text-gray-600 hover:bg-indigo-50 hover:text-primary'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#fdfbf7]">
      {/* Top Navigation */}
      <nav className="bg-white shadow-lg border-b-4 border-sky-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
             
             {/* Logo Area */}
             <div 
               className="flex items-center gap-3 cursor-pointer transform hover:scale-105 transition-transform"
               onClick={() => setCurrentView(AppView.HOME)}
             >
                <div className="bg-sunny-yellow/20 p-2 rounded-full border-4 border-sunny-yellow flex items-center justify-center h-14 w-14 shadow-sm">
                  <span className="text-3xl leading-none select-none" role="img" aria-label="Jesus">🧔🏻‍♂️</span>
                </div>
                <div className="flex flex-col">
                  <div className="font-extrabold text-xl leading-tight tracking-tight">
                    <span className="text-red-500">Ministério</span> <span className="text-blue-600">Bíblico</span>
                  </div>
                  <span className="text-sunny-yellow text-2xl font-black leading-none" style={{ textShadow: '1px 1px 0px #d97706' }}>Kids</span>
                </div>
             </div>

             {/* Desktop Menu */}
             <div className="hidden lg:flex items-center gap-2">
                <NavItem view={AppView.HOME} icon={Home} label="Início" />
                <NavItem view={AppView.JOURNEY} icon={Map} label="Jornadas" />
                <NavItem view={AppView.GAMES_HUB} icon={Gamepad2} label="Jogos" />
                <NavItem view={AppView.STORY} icon={BookOpen} label="Histórias" />
                
                <div className="h-8 w-0.5 bg-gray-200 mx-2"></div>
                
                <button 
                  onClick={() => setCurrentView(AppView.PROFILE)}
                  className="flex items-center gap-3 bg-sky-50 pl-2 pr-4 py-1.5 rounded-full border-2 border-sky-200 hover:bg-sky-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg shadow-sm">
                    {user.avatar}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-bold text-sky-800 uppercase tracking-wide">Nível {user.level}</span>
                    <span className="text-sm font-bold text-primary flex items-center gap-1">
                      🪙 {user.points}
                    </span>
                  </div>
                </button>
             </div>

             {/* Mobile Menu Toggle */}
             <div className="lg:hidden">
               <button 
                 onClick={() => setIsMenuOpen(!isMenuOpen)}
                 className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
               >
                 {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
               </button>
             </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 flex flex-col gap-2 shadow-xl">
            <NavItem view={AppView.HOME} icon={Home} label="Início" />
            <NavItem view={AppView.JOURNEY} icon={Map} label="Jornadas" />
            <NavItem view={AppView.GAMES_HUB} icon={Gamepad2} label="Jogos" />
            <NavItem view={AppView.STORY} icon={BookOpen} label="Histórias" />
            <NavItem view={AppView.PROFILE} icon={User} label="Meu Perfil" />
            <div className="border-t border-gray-100 pt-2 mt-2">
               <button className="flex items-center gap-2 px-4 py-2 text-gray-500 font-bold w-full">
                 <LogIn className="w-5 h-5" /> Sair
               </button>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow w-full">
        {renderView()}
      </main>

      <Footer />
    </div>
  );
};

export default App;