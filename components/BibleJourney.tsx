import React from 'react';
import { ArrowLeft, MapPin, Star, Lock, CheckCircle } from 'lucide-react';

interface BibleJourneyProps {
  onBack: () => void;
}

const BibleJourney: React.FC<BibleJourneyProps> = ({ onBack }) => {
  const levels = [
    { id: 1, title: "A Criação", status: "completed", icon: "🌍", pos: "left" },
    { id: 2, title: "Arca de Noé", status: "current", icon: "🌈", pos: "right" },
    { id: 3, title: "Abraão", status: "locked", icon: "✨", pos: "left" },
    { id: 4, title: "Moisés", status: "locked", icon: "🌊", pos: "right" },
    { id: 5, title: "Davi", status: "locked", icon: "👑", pos: "center" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
       <div className="flex justify-between items-center mb-8">
        <button 
          onClick={onBack}
          className="bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-primary"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2">
          <span className="text-yellow-500 text-xl">⭐</span>
          <span className="font-bold text-gray-800">Nível 2</span>
        </div>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-primary mb-2">Mapa da Aventura 🗺️</h2>
        <p className="text-gray-600">Complete as missões para avançar!</p>
      </div>

      <div className="relative py-10">
        {/* Connecting Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-4 bg-gray-200 -ml-2 rounded-full z-0"></div>

        <div className="flex flex-col gap-12 relative z-10">
          {levels.map((level, index) => (
            <div key={level.id} className={`flex items-center ${level.pos === 'right' ? 'flex-row-reverse' : 'flex-row'} justify-center w-full relative`}>
              
              {/* Card */}
              <div className={`w-5/12 ${level.pos === 'right' ? 'text-left pl-8' : 'text-right pr-8'}`}>
                <h3 className={`font-bold text-xl ${level.status === 'locked' ? 'text-gray-400' : 'text-gray-800'}`}>
                  {level.title}
                </h3>
                {level.status === 'current' && (
                  <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full mt-1">
                    Em Progresso
                  </span>
                )}
              </div>

              {/* Node */}
              <button 
                className={`w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-10 relative
                  ${level.status === 'completed' ? 'bg-green-500 border-green-200 cursor-pointer' : ''}
                  ${level.status === 'current' ? 'bg-primary border-indigo-200 cursor-pointer animate-pulse ring-4 ring-indigo-100' : ''}
                  ${level.status === 'locked' ? 'bg-gray-300 border-gray-200 cursor-not-allowed' : ''}
                `}
              >
                <span className="text-3xl">{level.icon}</span>
                
                {level.status === 'completed' && (
                  <div className="absolute -right-1 -bottom-1 bg-white rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-green-500 fill-current" />
                  </div>
                )}
                {level.status === 'locked' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-full">
                    <Lock className="w-6 h-6 text-gray-500" />
                  </div>
                )}
              </button>
              
              {/* Spacer for alignment */}
              <div className="w-5/12"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BibleJourney;
