import React, { useState } from 'react';
import { AppView } from './types';
import Hero from './components/Hero';
import StoryTime from './components/StoryTime';
import QuizSection from './components/QuizSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return (
          <div className="animate-fade-in">
            <Hero onChangeView={setCurrentView} />
            
            {/* Additional "Feature Cards" for the home page */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
               <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-sky-300 hover:-translate-y-2 transition-transform">
                 <div className="text-4xl mb-4">🎨</div>
                 <h3 className="text-xl font-bold text-gray-800 mb-2">Colorido e Divertido</h3>
                 <p className="text-gray-600">Um visual feito especialmente para crianças, com cores alegres e fácil de usar.</p>
               </div>
               <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-yellow-300 hover:-translate-y-2 transition-transform">
                 <div className="text-4xl mb-4">🤖</div>
                 <h3 className="text-xl font-bold text-gray-800 mb-2">Inteligência Artificial</h3>
                 <p className="text-gray-600">Usamos tecnologia para criar histórias novas e perguntas diferentes a cada acesso.</p>
               </div>
               <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-green-300 hover:-translate-y-2 transition-transform">
                 <div className="text-4xl mb-4">✝️</div>
                 <h3 className="text-xl font-bold text-gray-800 mb-2">Ensino Bíblico</h3>
                 <p className="text-gray-600">Conteúdo seguro, focado nos valores cristãos e no amor de Deus.</p>
               </div>
            </div>
          </div>
        );
      case AppView.STORY:
        return <div className="animate-fade-in"><StoryTime onBack={() => setCurrentView(AppView.HOME)} /></div>;
      case AppView.QUIZ:
        return <div className="animate-fade-in"><QuizSection onBack={() => setCurrentView(AppView.HOME)} /></div>;
      default:
        return <Hero onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#fdfbf7]">
      <nav className="bg-white shadow-sm border-b border-indigo-50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
             <div 
               className="flex items-center gap-2 cursor-pointer"
               onClick={() => setCurrentView(AppView.HOME)}
             >
                <div className="bg-sunny-yellow p-1 rounded-lg">
                  <span className="text-2xl">✝️</span>
                </div>
                <div className="font-extrabold text-xl tracking-tight flex items-center">
                  <span className="text-red-500 mr-1">Ministério</span> 
                  <span className="text-blue-600 mr-1">Bíblico</span> 
                  <span className="text-sunny-yellow mr-2" style={{ textShadow: '1px 1px 0px #d97706' }}>Kids</span>
                  <span className="text-2xl">🧔‍♂️</span>
                </div>
             </div>
             
             {currentView !== AppView.HOME && (
                <button 
                  onClick={() => setCurrentView(AppView.HOME)}
                  className="text-sm font-bold text-gray-500 hover:text-primary transition-colors"
                >
                  Início
                </button>
             )}
          </div>
        </div>
      </nav>

      <main className="flex-grow w-full">
        {renderView()}
      </main>

      <Footer />
    </div>
  );
};

export default App;