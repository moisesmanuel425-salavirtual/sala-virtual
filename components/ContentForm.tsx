
import React, { useState } from 'react';
import { LearningModule } from '../types';

interface ContentFormProps {
  onAddModule: (module: Partial<LearningModule>) => void;
}

export const ContentForm: React.FC<ContentFormProps> = ({ onAddModule }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Iniciante',
    icon: '🛰️',
    topics: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    onAddModule({
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      description: formData.description,
      difficulty: formData.difficulty as any,
      icon: formData.icon,
      topics: formData.topics.split(',').map(t => t.trim()).filter(t => t !== ''),
      comments: []
    });

    setFormData({ title: '', description: '', difficulty: 'Iniciante', icon: '🛰️', topics: '' });
    alert("Módulo publicado com sucesso na rede orbital!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Publicar Nova Aula</h2>
        <p className="text-slate-400">Preencha os dados técnicos para seus alunos.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Título da Aula</label>
            <input 
              required
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Ex: Introdução ao Doppler"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Dificuldade</label>
            <select 
              value={formData.difficulty}
              onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all"
            >
              <option>Iniciante</option>
              <option>Intermediário</option>
              <option>Avançado</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Resumo do Conteúdo</label>
          <textarea 
            required
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Descreva brevemente o que o aluno aprenderá..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tópicos (separados por vírgula)</label>
          <input 
            type="text" 
            value={formData.topics}
            onChange={(e) => setFormData({...formData, topics: e.target.value})}
            placeholder="Ex: Efeito Doppler, Desvio de Frequência, Estações Terrestres"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold text-white shadow-xl shadow-indigo-600/20 transition-all transform active:scale-95"
        >
          Transmitir Módulo para Sala Virtual
        </button>
      </form>
    </div>
  );
};
