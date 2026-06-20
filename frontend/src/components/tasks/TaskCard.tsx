import React from 'react';
import { Task } from '@/types';
import { format } from 'date-fns';
import { Calendar, MoreVertical, Edit2, Trash2, Clock } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const statusColors = {
    TODO: 'bg-slate-100 text-slate-700 ring-slate-200/50',
    IN_PROGRESS: 'bg-indigo-50 text-indigo-700 ring-indigo-200/50',
    DONE: 'bg-emerald-50 text-emerald-700 ring-emerald-200/50',
  };

  const priorityColors = {
    LOW: 'text-slate-500',
    MEDIUM: 'text-amber-500',
    HIGH: 'text-rose-500',
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100/80 p-5 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 hover:border-indigo-100 transition-all duration-300 relative flex flex-col h-full animate-scale-in">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ring-1 ring-inset ${statusColors[task.status]}`}>
          {task.status.replace('_', ' ')}
        </span>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            onBlur={() => setTimeout(() => setShowMenu(false), 200)}
            className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1.5 focus:outline-none opacity-0 group-hover:opacity-100 transition-all duration-200"
          >
            <MoreVertical size={16} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100 z-10 py-1.5 animate-fade-in origin-top-right">
              <button
                onClick={() => onEdit(task)}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Edit2 size={14} className="mr-2.5 text-gray-400" />
                Edit Task
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={14} className="mr-2.5 text-red-400" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-[1.05rem] font-bold text-gray-900 mb-2.5 leading-snug line-clamp-2">
        {task.title}
      </h3>
      
      {task.description && (
        <p className="text-sm text-gray-500 mb-6 line-clamp-3 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
        <div className="flex items-center text-xs font-semibold">
          <div className={`w-2 h-2 rounded-full mr-1.5 bg-current ${priorityColors[task.priority]}`}></div>
          <span className="text-gray-600 capitalize">{task.priority.toLowerCase()}</span>
        </div>
        
        {task.dueDate && (
          <div className="flex items-center text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
            <Clock size={13} className="mr-1.5 text-gray-400" />
            {format(new Date(task.dueDate), 'MMM d')}
          </div>
        )}
      </div>
    </div>
  );
};
