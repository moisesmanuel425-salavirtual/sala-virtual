
import React, { useState } from 'react';
import { Comment } from '../types';

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <div className="mt-12 pt-10 border-t border-slate-800">
      <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
        💬 Discussão e Dúvidas 
        <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-500">{comments.length}</span>
      </h3>

      <form onSubmit={handleSubmit} className="mb-10">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center text-xs font-bold border border-slate-700">VOCÊ</div>
          <div className="flex-1 space-y-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Adicione um comentário ou tire uma dúvida sobre este módulo..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all min-h-[100px] resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/10"
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-slate-500 py-10 italic">Nenhum comentário ainda. Seja o primeiro a participar!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex gap-4 group">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">
                {comment.userName.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 bg-slate-900/30 p-4 rounded-2xl border border-slate-800/50 group-hover:bg-slate-900/50 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-bold text-indigo-400">{comment.userName}</h4>
                  <span className="text-[10px] text-slate-600">{comment.timestamp.toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{comment.content}</p>
                <div className="flex items-center gap-4 mt-4">
                  <button className="text-[10px] text-slate-500 hover:text-indigo-400 flex items-center gap-1 transition-colors">
                    👍 {comment.likes} curtidas
                  </button>
                  <button className="text-[10px] text-slate-500 hover:text-indigo-400 transition-colors">
                    Responder
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
