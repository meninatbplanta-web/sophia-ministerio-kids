import React from 'react';
import { AppView } from '../types';
import { BookOpen, Star, Heart } from 'lucide-react';

interface HeroProps {
  onChangeView: (view: AppView) => void;
}

const Hero: React.FC<HeroProps> = ({ onChangeView }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-sky-blue/20 to-white pb-16 pt-10 px-4 sm:px-6 lg:px-8 rounded-3xl mx-2 mt-4 shadow-xl border-4 border-white">
      <div className="relative max-w-7xl mx-auto text-center z-10">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
          <span className="text-red-500">Ministério</span> <span className="text-blue-600">Bíblico</span> <br/> 
          <span className="text-sunny-yellow text-5xl sm:text-7xl" style={{ textShadow: '2px 2px 0px #F59E0B' }}>Kids</span>
          <span className="ml-4 text-5xl sm:text-7xl inline-block transform hover:scale-110 transition-transform" role="img" aria-label="Jesus">🧔‍♂️</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 font-semibold">
          Aprendendo sobre o amor de Jesus com histórias incríveis e brincadeiras divertidas!
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
          <button
            onClick={() => onChangeView(AppView.STORY)}
            className="flex items-center justify-center gap-2 px-8 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-secondary hover:bg-green-600 md:py-4 md:text-xl transition-all transform hover:scale-105 shadow-lg ring-4 ring-green-200"
          >
            <BookOpen className="w-6 h-6" />
            Hora da História
          </button>
          
          <button
            onClick={() => onChangeView(AppView.QUIZ)}
            className="flex items-center justify-center gap-2 px-8 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-primary hover:bg-indigo-700 md:py-4 md:text-xl transition-all transform hover:scale-105 shadow-lg ring-4 ring-indigo-200"
          >
            <Star className="w-6 h-6" />
            Quiz Bíblico
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 animate-bounce delay-1000 duration-3000">
        <Heart className="text-gentle-pink w-12 h-12 fill-current opacity-60" />
      </div>
      <div className="absolute bottom-10 right-10 animate-pulse">
        <Star className="text-sunny-yellow w-16 h-16 fill-current opacity-60" />
      </div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
    </div>
  );
};

export default Hero;