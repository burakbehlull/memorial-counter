'use client';

import { useState, useEffect } from 'react';
import { Person } from '@/types';
import PersonForm from './PersonForm';
import { Trash2, Edit, Plus, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPanel = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const fetchPeople = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/people');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPeople(data);
    } catch (err) {
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this person?')) return;
    try {
      await fetch(`/api/people/${id}`, { method: 'DELETE' });
      setPeople(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const handleCreate = async (data: Partial<Person>) => {
    try {
      const res = await fetch('/api/people', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create');
      await fetchPeople();
      setIsCreating(false);
    } catch (err) {
      alert('Failed to create');
    }
  };

  const handleUpdate = async (data: Partial<Person>) => {
    if (!editingPerson) return;
    try {
      const res = await fetch(`/api/people/${editingPerson._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update');
      await fetchPeople();
      setEditingPerson(null);
    } catch (err) {
      alert('Failed to update');
    }
  };

  if (loading && people.length === 0) return <div className="p-8 text-center text-zinc-500">Loading admin panel...</div>;

  return (
    <div className="container mx-auto p-6 space-y-8 min-h-screen">
      <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
          Admin Dashboard
        </h1>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
        >
          <Plus size={18} /> Add New Person
        </button>
      </div>

      <AnimatePresence>
        {(isCreating || editingPerson) && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <div className="w-full max-w-2xl relative">
               <button 
                 onClick={() => { setIsCreating(false); setEditingPerson(null); }}
                 className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors"
               >
                 Close
               </button>
               <PersonForm 
                 initialData={editingPerson} 
                 onSubmit={editingPerson ? handleUpdate : handleCreate} 
                 onCancel={() => { setIsCreating(false); setEditingPerson(null); }} 
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {people.map(person => (
          <motion.div 
            key={person._id} 
            layoutId={person._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col justify-between gap-4 hover:border-zinc-700 transition-colors group relative overflow-hidden"
          >
            <div className="space-y-1">
              <h3 className="font-bold text-lg truncate pr-8">{person.name}</h3>
              <p className="text-xs text-zinc-500 font-mono">
                {new Date(person.date).toLocaleDateString()}
              </p>
              {person.photoUrl && (
                <div className="w-full h-32 bg-zinc-800 rounded-lg mt-2 overflow-hidden">
                  <img src={person.photoUrl} alt="" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
              <button 
                onClick={() => setEditingPerson(person)}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                title="Edit"
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={() => handleDelete(person._id)}
                className="p-2 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 transition-colors"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
