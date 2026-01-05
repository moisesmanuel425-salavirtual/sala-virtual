
import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { AppView, LearningModule } from './types';
import { INITIAL_MODULES } from './constants';
import { ModuleCard } from './components/ModuleCard';
import { TutorChat } from './components/TutorChat';
import { Simulator } from './components/Simulator';
import { CreatorProfile } from './components/CreatorProfile';
import { ContentForm } from './components/ContentForm';
import { CommentsSection } from './components/CommentsSection';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [modules, setModules] = useState<LearningModule[]>(INITIAL_MODULES);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const filteredModules = useMemo(() => {
    if (!searchTerm.trim()) return modules;
    const lower = searchTerm.toLowerCase();
    return modules.filter(m => 
      m.title.toLowerCase().includes(lower) || 
      m.description.toLowerCase().includes(lower) ||
      m.topics.some(t => t.toLowerCase().includes(lower))
    );
  }, [modules, searchTerm]);

  const activeModule = useMemo(() => 
    modules.find(m => m.id === activeModuleId), 
  [modules, activeModuleId]);

  const handleAddModule = (newMod: Partial<LearningModule>) => {
    setModules(prev => [newMod as LearningModule, ...prev]);
    setView(AppView.MODULES);
  };

  const handleAddComment = (content: string) => {
    if (!activeModuleId) return;
    setModules(prev => prev.map(m => {
      if (m.id === activeModuleId) {
        return {
          ...m,
          comments: [
            { id: Date.now().toString(), userName: 'Aluno VIP', content, timestamp: new Date(), likes: 0 },
            ...m.comments
          ]
        };
      }
      return m;
    }));
  };

  const renderContent = () => {
    if (activeModuleId && (view === AppView.MODULES || view === AppView.HOME)) {
      if (!activeModule) return <div>Módulo não encontrado.</div>;
      
      return (
        <div className="p-4 md:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => setActiveModuleId(null)}
            className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-2 mb-4"
          >
            ← Voltar para a lista
          </button>
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-start justify-between mb-8">
              <div>
                <span className="text-5xl block mb-4">{activeModule.icon}</span>
                <h2 className="text-4xl font-bold text-white mb-2">{activeModule.title}</h2>
                <div className="flex gap-4 items-center">
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                    activeModule.difficulty === 'Iniciante' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {activeModule.difficulty}
                  </span>
                  <span className="text-xs text-slate-500">• Aula Técnica</span>
                </div>
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20">
                Transmitir Dados
              </button>
            </div>

            <div className="prose prose-invert max-w-none text-slate-300">
              <p className="text-lg leading-relaxed mb-6">
                {activeModule.fullContent || activeModule.description}
              </p>
              <h4 className="text-white font-bold mb-4">Plano de Estudo Orbital:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                {activeModule.topics.map((t, idx) => (
                  <li key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                    <span className="text-indigo-500">✔</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            
            <CommentsSection 
              comments={activeModule.comments} 
              onAddComment={handleAddComment} 
            />
          </div>
        </div>
      );
    }

    switch (view) {
      case AppView.HOME:
        return (
          <div className="space-y-0">
            {/* Hero Section with Cover Image */}
            <section 
              className="relative h-[600px] flex items-center justify-center text-center overflow-hidden border-b border-slate-800"
              style={{
                backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Note: In a real app, the background image would be the satellite dish cover provided by the user */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              
              <div className="relative z-10 max-w-4xl px-6">
                <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-indigo-600/20 border border-indigo-500/30 backdrop-blur-sm">
                   <p className="text-xs font-bold text-indigo-400 tracking-widest uppercase">Tecnologia de Vanguarda</p>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-2xl">
                  Sala Virtual de <br /> Ciência e Tecnologia
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                  A sua plataforma orbital para o ensino avançado de comunicações via satélite. Aprenda com simulações e tutoria especializada.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => setView(AppView.MODULES)}
                    className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-2xl shadow-indigo-600/40 transition-all transform hover:-translate-y-1"
                  >
                    Iniciar Aprendizagem
                  </button>
                  <button 
                    onClick={() => setView(AppView.TUTOR)}
                    className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold border border-white/20 backdrop-blur-md transition-all transform hover:-translate-y-1"
                  >
                    Consultar Tutor
                  </button>
                </div>
              </div>
            </section>

            <section className="p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-950">
               <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-indigo-500/30 transition-all">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl mb-6">📡</div>
                 <h4 className="font-bold text-lg mb-2 text-white">Segmento Terrestre</h4>
                 <p className="text-sm text-slate-400 leading-relaxed">Domine o funcionamento de estações terrenas e telemetria.</p>
               </div>
               <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-indigo-500/30 transition-all">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl mb-6">🛰️</div>
                 <h4 className="font-bold text-lg mb-2 text-white">Segmento Espacial</h4>
                 <p className="text-sm text-slate-400 leading-relaxed">Entenda a arquitetura interna e transponders de satélites.</p>
               </div>
               <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-indigo-500/30 transition-all">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl mb-6">📐</div>
                 <h4 className="font-bold text-lg mb-2 text-white">Cálculo de Órbita</h4>
                 <p className="text-sm text-slate-400 leading-relaxed">Simule parâmetros orbitais e trajetórias Keplerianas.</p>
               </div>
               <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-indigo-500/30 transition-all">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl mb-6">🧠</div>
                 <h4 className="font-bold text-lg mb-2 text-white">Tutor Inteligente</h4>
                 <p className="text-sm text-slate-400 leading-relaxed">Dúvidas técnicas respondidas instantaneamente por IA.</p>
               </div>
            </section>
          </div>
        );

      case AppView.MODULES:
        return (
          <div className="p-4 md:p-10 space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Grade de Conteúdo</h2>
              <p className="text-slate-400 text-lg">Selecione uma transmissão para começar sua aula.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map(mod => (
                <ModuleCard key={mod.id} module={mod} onStart={() => setActiveModuleId(mod.id)} />
              ))}
            </div>
          </div>
        );

      case AppView.TUTOR:
        return <div className="p-4 md:p-10"><TutorChat /></div>;

      case AppView.SIMULATOR:
        return <div className="p-4 md:p-10"><Simulator /></div>;

      case AppView.CREATOR:
        return <div className="p-4 md:p-10"><CreatorProfile /></div>;

      case AppView.ADMIN:
        return <div className="p-4 md:p-10"><ContentForm onAddModule={handleAddModule} /></div>;

      default:
        return <div className="p-4 md:p-10">Em construção...</div>;
    }
  };

  return (
    <Layout activeView={view} setView={(v) => { setView(v); setActiveModuleId(null); }} onSearch={setSearchTerm}>
      {renderContent()}
    </Layout>
  );
};

export default App;
