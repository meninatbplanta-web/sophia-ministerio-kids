import React from 'react';
import { UserProfile } from '../types';
import { ArrowLeft, Shield, Award, Zap } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-600 font-bold hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Voltar
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-sky-400 to-primary relative"></div>
        
        {/* Profile Header */}
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-12 mb-6 gap-6">
            <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg flex items-center justify-center text-6xl border-4 border-yellow-400">
              {user.avatar}
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-black text-gray-800">{user.name}</h2>
              <p className="text-gray-500 font-medium">Membro desde 2024</p>
            </div>
            <div className="flex gap-3">
               <button className="bg-primary text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-indigo-700">
                 Editar Avatar
               </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-yellow-50 p-4 rounded-2xl border-2 border-yellow-100 flex items-center gap-4">
               <div className="bg-yellow-200 p-3 rounded-full">
                 <Zap className="w-6 h-6 text-yellow-700" />
               </div>
               <div>
                 <p className="text-sm text-yellow-600 font-bold uppercase">Pontos</p>
                 <p className="text-2xl font-black text-yellow-800">{user.points}</p>
               </div>
            </div>
            <div className="bg-green-50 p-4 rounded-2xl border-2 border-green-100 flex items-center gap-4">
               <div className="bg-green-200 p-3 rounded-full">
                 <Shield className="w-6 h-6 text-green-700" />
               </div>
               <div>
                 <p className="text-sm text-green-600 font-bold uppercase">Nível</p>
                 <p className="text-2xl font-black text-green-800">{user.level}</p>
               </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-100 flex items-center gap-4">
               <div className="bg-purple-200 p-3 rounded-full">
                 <Award className="w-6 h-6 text-purple-700" />
               </div>
               <div>
                 <p className="text-sm text-purple-600 font-bold uppercase">Conquistas</p>
                 <p className="text-2xl font-black text-purple-800">{user.badges.length}</p>
               </div>
            </div>
          </div>

          {/* Badges Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Minhas Medalhas
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
               {user.badges.map((badge, idx) => (
                 <div key={idx} className="flex flex-col items-center text-center p-2">
                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 text-3xl shadow-sm border border-gray-200">
                     🏅
                   </div>
                   <span className="text-xs font-bold text-gray-600">{badge}</span>
                 </div>
               ))}
               {/* Placeholder for locked badges */}
               {[1, 2, 3].map((i) => (
                 <div key={`locked-${i}`} className="flex flex-col items-center text-center p-2 opacity-50 grayscale">
                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 text-3xl border border-gray-200">
                     🔒
                   </div>
                   <span className="text-xs font-bold text-gray-400">Bloqueado</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
