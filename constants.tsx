
import { LearningModule, Creator } from './types';

export const CREATOR_DATA: Creator = {
  name: "Engenheiro Moisés Manuel",
  role: "Especialista em Comunicação via Satélite e Gestão de Projetos Aeroespaciais",
  bio: "Especialista sênior com vasta experiência no setor aeroespacial, focado em arquiteturas de comunicação por satélite e gestão técnica de projetos complexos. Atua na capacitação de novos engenheiros para os desafios da conectividade global e exploração espacial.",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Moises", // Note: The app should ideally use the provided photo as a local asset 'moises.png'
  stats: {
    students: 2150,
    courses: 12,
    rating: 4.95
  }
};

export const INITIAL_MODULES: LearningModule[] = [
  {
    id: 'intro',
    title: 'Fundamentos de Satélites',
    description: 'História, tipos de órbitas e componentes básicos de um satélite.',
    fullContent: 'Os satélites artificiais são objetos colocados em órbita ao redor da Terra para diversos fins... (Clique para expandir)',
    icon: '🚀',
    difficulty: 'Iniciante',
    topics: ['Órbitas LEO, MEO, GEO', 'Componentes do Satélite', 'Lançamento'],
    comments: [
      { id: '1', userName: 'Maria Oliveira', content: 'Muito clara a explicação sobre órbitas GEO!', timestamp: new Date(), likes: 12 },
      { id: '2', userName: 'João Tech', content: 'Poderia falar mais sobre o foguete Falcon 9?', timestamp: new Date(), likes: 5 }
    ]
  },
  {
    id: 'link-budget',
    title: 'Balanço de Link (Link Budget)',
    description: 'Cálculos de potência, perdas no espaço livre e relação sinal-ruído.',
    fullContent: 'O Balanço de Link é o cálculo detalhado de todos os ganhos e perdas desde o transmissor até o receptor...',
    icon: '📊',
    difficulty: 'Intermediário',
    topics: ['Equação de Friis', 'Ganho de Antena', 'Perdas Atmosféricas'],
    comments: []
  },
  {
    id: 'modulation',
    title: 'Modulação e Acesso Múltiplo',
    description: 'Técnicas de transmissão de dados: QPSK, 16-QAM, TDMA, FDMA.',
    fullContent: 'Para transmitir dados eficientemente, usamos técnicas de modulação que alteram propriedades da onda portadora...',
    icon: '📡',
    difficulty: 'Avançado',
    topics: ['Transponders', 'Espectro de Frequência', 'Eficiência Espectral'],
    comments: []
  }
];

export const TUTOR_PROMPT = `Você é o Engenheiro Moisés Manuel, Tutor Especialista em Engenharia de Comunicações via Satélite e Gestão de Projetos Aeroespaciais na "Sala Virtual de Ciência e Tecnologia". 
Seu objetivo é ensinar de forma didática, técnica mas extremamente profissional. 
Regras:
1. Use analogias espaciais e exemplos de gestão de projetos reais.
2. Seja encorajador e mentor.
3. Se o aluno perguntar algo complexo, quebre em partes menores citando as fases de um projeto (Elicitação, Design, Testes).
4. Use Markdown para formatar fórmulas e listas.
5. Fale sempre em Português do Brasil de forma culta e acessível.
6. Foque em tópicos como: Órbitas, Bandas de Frequência, Segmento Espacial/Terrestre, e as boas práticas de gestão no setor aeroespacial.`;
