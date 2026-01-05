
import React, { useState } from 'react';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setView: (view: AppView) => void;
  onSearch: (term: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, setView, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const navItems = [
    { id: AppView.HOME, label: 'Painel', icon: '🏠' },
    { id: AppView.MODULES, label: 'Meus Cursos', icon: '📚' },
    { id: AppView.TUTOR, label: 'Tutor IA', icon: '🤖' },
    { id: AppView.SIMULATOR, label: 'Laboratório', icon: '🛰️' },
    { id: AppView.CREATOR, label: 'Instrutor', icon: '👨‍🏫' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <nav className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col p-4 z-20">
        <div 
          className="flex flex-col items-center gap-2 mb-10 px-2 cursor-pointer group" 
          onClick={() => setView(AppView.HOME)}
        >
          <img 
            src="https://raw.githubusercontent.com/google/material-design-icons/master/png/communication/satellite/materialicons/48dp/2x/baseline_satellite_white_48dp.png" 
            alt="Logo Placeholder"
            className="hidden" // We'll use the user provided logo conceptually
          />
          <div className="w-full h-24 bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center border border-slate-700 group-hover:border-indigo-500/50 transition-all">
             {/* Note: In a real app, this would be src="logo.png" as provided by the user */}
             <div className="text-center p-2">
               <span className="text-xs font-bold text-indigo-400 block mb-1">SALA VIRTUAL</span>
               <span className="text-[10px] text-slate-500 uppercase">Ciência & Tecnologia</span>
             </div>
          </div>
        </div>

        <div className="space-y-2 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeView === item.id
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-lg shadow-indigo-500/5'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
          
          <div className="pt-6 border-t border-slate-800 mt-4">
            <button
              onClick={() => setView(AppView.ADMIN)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeView === AppView.ADMIN
                  ? 'bg-rose-600/20 text-rose-400 border border-rose-500/30'
                  : 'text-slate-500 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span className="text-xl">⚙️</span>
              <span className="font-medium">Criar Conteúdo</span>
            </button>
          </div>
        </div>

        <div className="mt-auto p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
             <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold">ALU</div>
             <div>
               <p className="text-xs font-semibold">Aluno VIP</p>
               <p className="text-[10px] text-slate-500">online</p>
             </div>
          </div>
          <p className="text-[10px] text-slate-400 mb-2">Progresso Geral</p>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-[45%] shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-20 bg-slate-900/50 border-b border-slate-800 flex items-center px-6 md:px-10 justify-between sticky top-0 backdrop-blur-md z-30">
          <div className="flex-1 max-w-xl relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors">🔍</span>
            <input 
              type="text" 
              placeholder="Pesquisar lições, tópicos ou ajuda do tutor..." 
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
            />
          </div>
          <div className="flex items-center gap-4 ml-4">
             <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
               🔔
               <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border border-slate-900"></span>
             </button>
             <div className="w-px h-6 bg-slate-800 mx-2 hidden md:block"></div>
             <div className="hidden md:block text-right">
               <p className="text-xs font-bold">Semestre Ativo</p>
               <p className="text-[10px] text-indigo-400 font-mono">2024.Q1</p>
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto relative">
          <div className="max-w-7xl mx-auto relative min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
