'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types';
import { taskService } from '@/services/taskService';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskFormModal } from '@/components/tasks/TaskFormModal';
import { Button } from '@/components/common/Button';
import { Plus, LayoutGrid, CheckSquare, Clock, CheckCircle2, ListTodo } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [filterStatus, setFilterStatus] = useState('');
  
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks(filterStatus ? { status: filterStatus } : undefined);
      setTasks(data);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filterStatus]);

  const handleCreateOrUpdate = async (data: Partial<Task>) => {
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask._id, data);
        toast.success('Task updated successfully');
      } else {
        await taskService.createTask(data);
        toast.success('Task created successfully');
      }
      fetchTasks();
    } catch (error) {
      toast.error('Failed to save task');
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      try {
        await taskService.deleteTask(id);
        toast.success('Task deleted securely');
        fetchTasks();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const stats = [
    { name: 'Total Tasks', value: tasks.length, icon: LayoutGrid, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'To Do', value: tasks.filter(t => t.status === 'TODO').length, icon: ListTodo, color: 'text-slate-600', bg: 'bg-slate-100' },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'IN_PROGRESS').length, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Done', value: tasks.filter(t => t.status === 'DONE').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="pb-12">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="mt-1.5 text-sm text-gray-500 font-medium">Manage your projects and tasks seamlessly.</p>
        </div>
        
        <Button onClick={openCreateModal} className="w-full sm:w-auto shadow-sm">
          <Plus size={18} className="mr-2" />
          Create Task
        </Button>
      </div>

      {/* Premium Stats Cards */}
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.name} 
              className="relative bg-white pt-6 px-6 pb-6 shadow-sm rounded-2xl border border-gray-100/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-out"></div>
              
              <dt className="relative z-10 flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-500 truncate">{stat.name}</p>
                <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} aria-hidden="true" />
                </div>
              </dt>
              <dd className="relative z-10 mt-2 flex items-baseline">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </dd>
            </div>
          );
        })}
      </dl>

      {/* Controls */}
      <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-2xl shadow-sm border border-gray-100/80">
        <div className="flex items-center space-x-4 px-2">
          <span className="text-sm font-semibold text-gray-700">Filter tasks:</span>
          <div className="relative inline-block text-left w-40">
            <select
              className="block w-full pl-3 pr-10 py-2 text-sm border-0 bg-gray-50 text-gray-700 font-medium focus:ring-2 focus:ring-indigo-500 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors appearance-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Grid */}
      {loading ? (
        <div className="flex justify-center py-32">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
          </div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-gray-300">
          <div className="w-20 h-20 mx-auto bg-indigo-50 rounded-full flex items-center justify-center mb-4">
             <CheckSquare className="h-10 w-10 text-indigo-400" />
          </div>
          <h3 className="mt-2 text-lg font-bold text-gray-900">No tasks found</h3>
          <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
            You're all caught up! Either you've completed everything, or it's time to create a new task to get started.
          </p>
          <div className="mt-8">
            <Button onClick={openCreateModal} className="px-8 shadow-md shadow-indigo-500/20">
              <Plus size={18} className="mr-2" />
              Create your first task
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tasks.map((task, index) => (
            <div 
              key={task._id} 
              className="animate-fade-in-up" 
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TaskCard
                task={task}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdate}
        initialData={editingTask}
      />
    </div>
  );
}
