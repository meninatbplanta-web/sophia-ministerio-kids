import React, { useState } from 'react';
import { generateBibleQuiz } from '../services/geminiService';
import { QuizData } from '../types';
import { Star, ArrowLeft, CheckCircle, XCircle, Trophy, BrainCircuit } from 'lucide-react';

interface QuizSectionProps {
  onBack: () => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ onBack }) => {
  const [topic, setTopic] = useState('');
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const QUIZ_TOPICS = ["Os Milagres de Jesus", "Velho Testamento", "Heróis da Fé", "Animais da Bíblia"];

  const handleStartQuiz = async (selectedTopic: string) => {
    setLoading(true);
    setError(null);
    setQuizData(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizFinished(false);
    setShowExplanation(false);
    setSelectedOption(null);

    try {
      const data = await generateBibleQuiz(selectedTopic);
      setQuizData(data);
    } catch (err) {
      setError("Não conseguimos criar o quiz agora. Tente de novo!");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    if (selectedOption !== null || !quizData) return; // Prevent multiple clicks

    setSelectedOption(optionIndex);
    const correct = quizData.questions[currentQuestionIndex].correctAnswer === optionIndex;
    
    if (correct) {
      setScore(s => s + 1);
    }
    
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (!quizData) return;

    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-primary font-bold hover:text-indigo-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Voltar para o Início
      </button>

      {/* SETUP SCREEN */}
      {!quizData && !loading && !isQuizFinished && (
        <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-indigo-100 text-center">
          <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <BrainCircuit className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Vamos Testar Seus Conhecimentos?</h2>
          <p className="text-gray-500 mb-8">Escolha um tema para começar o desafio!</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUIZ_TOPICS.map((t) => (
              <button
                key={t}
                onClick={() => handleStartQuiz(t)}
                className="py-4 px-6 bg-white border-2 border-indigo-200 rounded-xl text-indigo-700 font-bold hover:bg-indigo-50 hover:scale-105 transition-all shadow-sm"
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-8">
             <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-2">Ou digite um tema</p>
             <div className="flex gap-2 max-w-md mx-auto">
                <input 
                  type="text" 
                  className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-2 focus:border-primary outline-none"
                  placeholder="Ex: Vida de Paulo"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <button 
                  onClick={() => handleStartQuiz(topic)}
                  disabled={!topic}
                  className="bg-primary text-white px-6 rounded-lg font-bold disabled:opacity-50"
                >
                  Ir
                </button>
             </div>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="text-center py-20 bg-white rounded-3xl shadow-xl border-4 border-indigo-100">
           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-secondary mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 font-bold animate-bounce">Preparando as perguntas...</p>
        </div>
      )}

      {/* QUIZ ACTIVE */}
      {quizData && !isQuizFinished && !loading && (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-indigo-200">
          <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center text-white">
            <span className="font-bold text-lg">Questão {currentQuestionIndex + 1} de {quizData.questions.length}</span>
            <div className="flex items-center gap-2 bg-indigo-800 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-bold">{score} Pontos</span>
            </div>
          </div>

          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 leading-snug">
              {quizData.questions[currentQuestionIndex].question}
            </h3>

            <div className="space-y-3">
              {quizData.questions[currentQuestionIndex].options.map((option, idx) => {
                let btnClass = "w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ";
                
                if (selectedOption === null) {
                  btnClass += "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 text-gray-700";
                } else {
                  if (idx === quizData.questions[currentQuestionIndex].correctAnswer) {
                    btnClass += "border-green-500 bg-green-100 text-green-800"; // Correct
                  } else if (idx === selectedOption) {
                    btnClass += "border-red-500 bg-red-100 text-red-800"; // Wrong selected
                  } else {
                    btnClass += "border-gray-100 text-gray-400 opacity-50"; // Others
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={selectedOption !== null}
                    className={btnClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {selectedOption !== null && idx === quizData.questions[currentQuestionIndex].correctAnswer && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                      {selectedOption !== null && idx === selectedOption && idx !== quizData.questions[currentQuestionIndex].correctAnswer && (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {showExplanation && (
              <div className="mt-6 animate-fade-in">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-4 text-blue-800">
                  <span className="font-bold block mb-1">Explicação:</span>
                  {quizData.questions[currentQuestionIndex].explanation}
                </div>
                <button
                  onClick={nextQuestion}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-lg transition-transform active:scale-95"
                >
                  {currentQuestionIndex < quizData.questions.length - 1 ? 'Próxima Pergunta' : 'Ver Resultado'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RESULTS */}
      {isQuizFinished && quizData && (
        <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-yellow-300 text-center animate-fade-in-up">
          <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6 drop-shadow-lg" />
          <h2 className="text-4xl font-extrabold text-gray-800 mb-2">Quiz Completado!</h2>
          <p className="text-xl text-gray-600 mb-6">Você acertou <span className="text-primary font-bold text-2xl">{score}</span> de <span className="font-bold text-2xl">{quizData.questions.length}</span> perguntas.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => handleStartQuiz(QUIZ_TOPICS[Math.floor(Math.random() * QUIZ_TOPICS.length)])}
              className="px-8 py-3 bg-secondary text-white rounded-full font-bold shadow-md hover:bg-green-600"
            >
              Jogar Novamente
            </button>
            <button
              onClick={onBack}
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizSection;