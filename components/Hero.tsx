import React, { useState } from 'react';
import { AppView, UserProfile } from '../types';
import { BookOpen, Gamepad2, Map, Star, Heart, Music, Share2, Gift, CheckCircle } from 'lucide-react';

interface HeroProps {
  onChangeView: (view: AppView) => void;
  user: UserProfile;
  onAcceptChallenge: () => void;
}

const Hero: React.FC<HeroProps> = ({ onChangeView, user, onAcceptChallenge }) => {
  const [challengeDone, setChallengeDone] = useState(false);

  const handleChallenge = () => {
    if (!challengeDone) {
      setChallengeDone(true);
      onAcceptChallenge();
    }
  };

  return (
    <div className="pb-16 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Welcome Header with Mascots */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-3xl p-6 shadow-lg border-b-4 border-sky-200 relative overflow-hidden">
         <div className="z-10 text-center md:text-left">
           <h1 className="text-3xl md:text-5xl font-black text-gray-800 mb-2">
             Olá, <span className="text-primary">{user.name}!</span> 👋
           </h1>
           <p className="text-lg text-gray-600 font-bold">Pronto para sua aventura com Deus hoje?</p>
         </div>
         <div className="flex items-end gap-4 mt-4 md:mt-0 z-10">
            <div className="text-6xl animate-bounce hover:scale-110 transition-transform cursor-pointer" title="Leãozinho da Coragem">🦁</div>
            <div className="text-5xl animate-pulse hover:scale-110 transition-transform cursor-pointer delay-75" title="Ovelhinha do Cuidado">🐑</div>
            <div className="text-5xl hover:scale-110 transition-transform cursor-pointer delay-150" title="Pombinha da Paz">🕊️</div>
         </div>
         {/* Background decorations */}
         <div className="absolute -right-10 -top-10 w-40 h-40 bg-yellow-100 rounded-full opacity-50"></div>
         <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-sky-100 rounded-full opacity-50"></div>
      </div>

      {/* Verse of the Day & Daily Challenge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Verse Card */}
        <div className="bg-gradient-to-br from-sky-400 to-indigo-500 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden transform transition hover:scale-[1.02]">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 opacity-90">
              <Star className="w-5 h-5 text-yellow-300 fill-current" />
              <span className="text-sm font-bold uppercase tracking-wider">Versículo do Dia</span>
            </div>
            <blockquote className="text-2xl md:text-3xl font-bold font-serif leading-tight mb-4">
              "O Senhor é o meu pastor; nada me faltará."
            </blockquote>
            <p className="text-lg font-medium opacity-90 text-right">— Salmos 23:1</p>
            
            <div className="mt-6 flex gap-3">
              <button className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors">
                <Music className="w-6 h-6" />
              </button>
              <button className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
             <BookOpen className="w-64 h-64" />
          </div>
        </div>

        {/* Daily Challenge Card */}
        <div className={`rounded-3xl p-6 shadow-xl border-4 transition-all ${challengeDone ? 'bg-green-100 border-green-300' : 'bg-yellow-50 border-yellow-300'}`}>
          <div className="flex justify-between items-start mb-4">
             <div className="bg-white p-3 rounded-2xl shadow-sm">
               <span className="text-3xl">🎁</span>
             </div>
             <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-500 uppercase tracking-wider shadow-sm">
               Desafio Diário
             </span>
          </div>
          
          <h3 className="text-2xl font-extrabold text-gray-800 mb-2">Oração da Manhã</h3>
          <p className="text-gray-600 font-medium mb-6">
            Feche os olhos e agradeça a Deus por 3 coisas legais que aconteceram hoje.
          </p>

          <button 
            onClick={handleChallenge}
            disabled={challengeDone}
            className={`w-full py-3 rounded-xl font-bold text-lg shadow-md flex items-center justify-center gap-2 transition-all ${
              challengeDone 
                ? 'bg-green-500 text-white cursor-default' 
                : 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500 hover:translate-y-0.5'
            }`}
          >
            {challengeDone ? (
              <>
                <CheckCircle className="w-6 h-6" /> Completado! (+50 🪙)
              </>
            ) : (
              "Marcar como Feito"
            )}
          </button>
        </div>
      </div>

      {/* Main Action: Start Journey */}
      <div className="bg-gradient-to-r from-primary to-purple-600 rounded-3xl p-1 shadow-2xl transform hover:scale-[1.01] transition-transform">
        <div className="bg-white/10 backdrop-blur-sm rounded-[22px] p-8 md:p-12 text-center relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-md">
               Sua Jornada Bíblica
             </h2>
             <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto font-medium">
               Continue seus passos na história da Criação e ganhe medalhas incríveis!
             </p>
             <button 
               onClick={() => onChangeView(AppView.JOURNEY)}
               className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 text-xl md:text-2xl font-extrabold py-4 px-12 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 ring-4 ring-yellow-200/50"
             >
               CONTINUAR AVENTURA ▶
             </button>
           </div>
           
           {/* Decorative blobs */}
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-bounce"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/30 rounded-full animate-pulse"></div>
           </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          onClick={() => onChangeView(AppView.GAMES_HUB)}
          className="bg-white p-6 rounded-3xl shadow-md border-b-4 border-red-200 hover:bg-red-50 hover:-translate-y-1 transition-all group"
        >
          <div className="bg-red-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Gamepad2 className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg">Jogos</h3>
        </button>

        <button 
          onClick={() => onChangeView(AppView.STORY)}
          className="bg-white p-6 rounded-3xl shadow-md border-b-4 border-green-200 hover:bg-green-50 hover:-translate-y-1 transition-all group"
        >
          <div className="bg-green-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg">Histórias</h3>
        </button>

        <button 
          onClick={() => onChangeView(AppView.ACTIVITIES)}
          className="bg-white p-6 rounded-3xl shadow-md border-b-4 border-orange-200 hover:bg-orange-50 hover:-translate-y-1 transition-all group"
        >
          <div className="bg-orange-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Heart className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg">Atividades</h3>
        </button>

        <button 
          className="bg-white p-6 rounded-3xl shadow-md border-b-4 border-pink-200 hover:bg-pink-50 hover:-translate-y-1 transition-all group relative overflow-hidden"
        >
          <div className="absolute top-2 right-2 bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">EM BREVE</div>
          <div className="bg-pink-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Music className="w-8 h-8 text-pink-500" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg">Louvor</h3>
        </button>
      </div>
    </div>
  );
};

export default Hero;
