import React, { useState, useEffect } from 'react';
import { Task } from '@/types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { X } from 'lucide-react';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Task>) => Promise<void>;
  initialData?: Task;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'TODO' | 'IN_PROGRESS' | 'DONE'>('TODO');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title);
        setDescription(initialData.description || '');
        setStatus(initialData.status);
        setPriority(initialData.priority);
        setDueDate(initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '');
      } else {
        setTitle('');
        setDescription('');
        setStatus('TODO');
        setPriority('MEDIUM');
        setDueDate('');
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ title, description, status, priority, dueDate: dueDate || undefined });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0 animate-fade-in">
      <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[500px] overflow-hidden animate-scale-in">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Task' : 'Create New Task'}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-700 bg-white hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <Input
            label="Task Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Design homepage hero section"
            className="text-base"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Description</label>
            <textarea
              className="block w-full rounded-xl border border-gray-200 bg-gray-50/50 shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:text-sm px-4 py-3 transition-all duration-200 outline-none"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add comprehensive details, acceptance criteria, etc."
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Status</label>
              <select
                className="block w-full rounded-xl border border-gray-200 bg-gray-50/50 shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:text-sm px-4 py-3 transition-all duration-200 outline-none appearance-none"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Priority</label>
              <select
                className="block w-full rounded-xl border border-gray-200 bg-gray-50/50 shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:text-sm px-4 py-3 transition-all duration-200 outline-none appearance-none"
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <Input
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <div className="pt-6 flex justify-end space-x-3 border-t border-gray-50 mt-6">
            <Button type="button" variant="secondary" onClick={onClose} className="px-6">
              Cancel
            </Button>
            <Button type="submit" isLoading={loading} className="px-8">
              {initialData ? 'Save Changes' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
