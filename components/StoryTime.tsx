import React, { useState } from 'react';
import { generateBibleStory } from '../services/geminiService';
import { StoryResponse } from '../types';
import { BookOpen, Sparkles, ArrowLeft, Send } from 'lucide-react';

interface StoryTimeProps {
  onBack: () => void;
}

const PRESET_TOPICS = [
  "Davi e Golias",
  "A Arca de Noé",
  "O Nascimento de Jesus",
  "Daniel na Cova dos Leões",
  "Jonas e o Grande Peixe",
  "A Parábola da Ovelha Perdida"
];

const StoryTime: React.FC<StoryTimeProps> = ({ onBack }) => {
  const [topic, setTopic] = useState('');
  const [story, setStory] = useState<StoryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (selectedTopic: string) => {
    if (!selectedTopic.trim()) return;
    
    setLoading(true);
    setError(null);
    setStory(null);
    
    try {
      const result = await generateBibleStory(selectedTopic);
      setStory(result);
    } catch (err) {
      setError("Ops! Tivemos um probleminha para encontrar essa história. Tente outra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-primary font-bold hover:text-indigo-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Voltar para o Início
      </button>

      {!story && !loading && (
        <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-sky-100">
          <div className="text-center mb-8">
            <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Qual história vamos ler hoje?</h2>
            <p className="text-gray-500 mt-2">Escolha abaixo ou digite um personagem da Bíblia.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {PRESET_TOPICS.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTopic(t);
                  handleGenerate(t);
                }}
                className="p-4 rounded-xl border-2 border-dashed border-sky-300 hover:border-primary hover:bg-sky-50 text-sky-700 font-bold transition-all text-left flex items-center justify-between group"
              >
                {t}
                <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-yellow-500" />
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Moisés, Rainha Ester, O Bom Samaritano..."
              className="w-full pl-6 pr-14 py-4 rounded-full border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none text-lg transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate(topic)}
            />
            <button
              onClick={() => handleGenerate(topic)}
              disabled={!topic.trim()}
              className="absolute right-2 top-2 bottom-2 bg-primary text-white p-3 rounded-full hover:bg-indigo-700 disabled:bg-gray-300 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-20 bg-white rounded-3xl shadow-xl border-4 border-sky-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 font-bold animate-pulse">Abrindo a Bíblia...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-12 bg-red-50 rounded-3xl border-2 border-red-200">
          <p className="text-red-500 font-bold text-lg">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-4 text-primary underline font-bold"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {story && (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-200">
           <div className="h-48 bg-sky-100 relative overflow-hidden flex items-center justify-center">
             <img 
               src={`https://picsum.photos/800/400?random=${Date.now()}`} 
               alt="Story Banner" 
               className="w-full h-full object-cover opacity-80 mix-blend-overlay"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
             <h2 className="absolute bottom-4 text-3xl md:text-4xl font-extrabold text-primary text-center px-4 drop-shadow-md">
               {story.title}
             </h2>
           </div>
           
           <div className="p-8">
             <div className="prose prose-lg prose-indigo max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
               {story.content}
             </div>

             <div className="mt-8 bg-green-50 rounded-2xl p-6 border-2 border-green-200 flex items-start gap-4">
               <div className="bg-green-100 p-2 rounded-full hidden sm:block">
                 <Sparkles className="w-6 h-6 text-green-600" />
               </div>
               <div>
                 <h3 className="text-green-800 font-bold text-lg mb-1">A Lição de Hoje:</h3>
                 <p className="text-green-700 font-medium italic">"{story.moral}"</p>
               </div>
             </div>

             <div className="mt-8 text-center">
               <button
                 onClick={() => {
                   setStory(null);
                   setTopic('');
                 }}
                 className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-all hover:-translate-y-1"
               >
                 Ler Outra História
               </button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default StoryTime;