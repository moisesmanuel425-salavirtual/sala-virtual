
import React from 'react';
import { LearningModule } from '../types';

interface ModuleCardProps {
  module: LearningModule;
  onStart: (id: string) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onStart }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-4xl grayscale group-hover:grayscale-0 transition-all">{module.icon}</span>
        <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${
          module.difficulty === 'Iniciante' ? 'bg-emerald-500/10 text-emerald-500' :
          module.difficulty === 'Intermediário' ? 'bg-amber-500/10 text-amber-500' :
          'bg-rose-500/10 text-rose-500'
        }`}>
          {module.difficulty}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">{module.title}</h3>
      <p className="text-slate-400 text-sm mb-6 line-clamp-2">{module.description}</p>
      
      <div className="space-y-2 mb-6">
        {module.topics.map((topic, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-1 h-1 bg-indigo-500 rounded-full"></div>
            {topic}
          </div>
        ))}
      </div>

      <button
        onClick={() => onStart(module.id)}
        className="w-full py-2.5 bg-slate-800 hover:bg-indigo-600 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
      >
        Iniciar Módulo
        <span>→</span>
      </button>
    </div>
  );
};
