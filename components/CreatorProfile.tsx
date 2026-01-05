
import React from 'react';
import { CREATOR_DATA } from '../constants';

export const CreatorProfile: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in duration-700">
      <div className="h-48 bg-gradient-to-r from-indigo-900 via-slate-800 to-indigo-950 relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute -bottom-16 left-8 p-1.5 bg-slate-900 rounded-[2rem] shadow-2xl">
          {/* Using a placeholder for the avatar but styling it for the professional photo provided */}
          <div className="w-32 h-32 rounded-[1.75rem] overflow-hidden bg-slate-800 border-2 border-indigo-500/30">
            <img 
              src={CREATOR_DATA.avatar} 
              alt={CREATOR_DATA.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="pt-20 p-8 md:p-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-4xl font-bold text-white tracking-tight">
                {CREATOR_DATA.name}
              </h2>
              <span className="flex items-center gap-1 text-[10px] bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-indigo-500/30">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
                Expert
              </span>
            </div>
            <p className="text-xl text-indigo-400 font-medium max-w-2xl">{CREATOR_DATA.role}</p>
          </div>
          <div className="flex gap-3">
            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
              Enviar Mensagem
            </button>
            <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl border border-slate-700 transition-all">
              🔗
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-950/40 p-6 rounded-3xl border border-slate-800/50 backdrop-blur-sm group hover:border-indigo-500/30 transition-all">
            <p className="text-3xl font-bold text-white mb-1">{CREATOR_DATA.stats.students.toLocaleString()}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Alunos Formados</p>
          </div>
          <div className="bg-slate-950/40 p-6 rounded-3xl border border-slate-800/50 backdrop-blur-sm group hover:border-indigo-500/30 transition-all">
            <p className="text-3xl font-bold text-white mb-1">{CREATOR_DATA.stats.courses}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Módulos Publicados</p>
          </div>
          <div className="bg-slate-950/40 p-6 rounded-3xl border border-slate-800/50 backdrop-blur-sm group hover:border-indigo-500/30 transition-all">
            <p className="text-3xl font-bold text-white mb-1">★ {CREATOR_DATA.stats.rating}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Média de Feedback</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-3">
              <span className="w-8 h-px bg-indigo-500/50"></span>
              Biografia Profissional
            </h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              {CREATOR_DATA.bio}
            </p>
            <div className="p-6 bg-indigo-600/5 border border-indigo-500/10 rounded-3xl italic text-slate-300">
              "Minha missão na Sala Virtual é traduzir a complexidade do setor aeroespacial em conhecimento prático, preparando profissionais para a nova era das constelações de satélites."
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-xl font-bold text-slate-100">Certificações</h3>
            <div className="flex flex-col gap-3">
              {[
                { icon: '🛰️', label: 'Engenharia de Sistemas Espaciais' },
                { icon: '📊', label: 'PMP - Project Management Professional' },
                { icon: '📡', label: 'Especialista em Link Budget (RF)' },
                { icon: '🏗️', label: 'Infraestrutura de Estação Terrena' }
              ].map((cert, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                  <span className="text-xl">{cert.icon}</span>
                  <span className="text-sm font-medium text-slate-300">{cert.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
