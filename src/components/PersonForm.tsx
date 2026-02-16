'use client';

import { useState } from 'react';
import { Person } from '@/types';
import { motion } from 'framer-motion';

interface PersonFormProps {
  initialData?: Person | null;
  onSubmit: (data: Partial<Person>) => void;
  onCancel: () => void;
}

const formatDateForInput = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const PersonForm = ({ initialData, onSubmit, onCancel }: PersonFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    date: formatDateForInput(initialData?.date),
    description: initialData?.description || '',
    details: initialData?.details || '',
    photoUrl: initialData?.photoUrl || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 space-y-4 w-full max-w-2xl mx-auto shadow-2xl relative z-50"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">{initialData ? 'Edit Person' : 'Add New Person'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">Name</label>
          <input 
            required 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full bg-zinc-800 border-zinc-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-white/20 outline-none" 
            placeholder="Name Surname"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">Date</label>
          <input 
            required 
            type="date"
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            className="w-full bg-zinc-800 border-zinc-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-white/20 outline-none" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-400">Photo URL</label>
        <input 
          name="photoUrl" 
          value={formData.photoUrl} 
          onChange={handleChange} 
          className="w-full bg-zinc-800 border-zinc-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-white/20 outline-none" 
          placeholder="https://example.com/photo.jpg" 
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-400">Short Description (e.g. quote)</label>
        <input 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          className="w-full bg-zinc-800 border-zinc-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-white/20 outline-none" 
          placeholder="Short text appearing directly under name or in modal header"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-400">Full Details</label>
        <textarea 
          name="details" 
          value={formData.details} 
          onChange={handleChange} 
          rows={5}
          className="w-full bg-zinc-800 border-zinc-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-white/20 outline-none resize-none" 
          placeholder="Detailed biography or story..." 
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button 
          type="button" 
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-6 py-2 rounded-lg bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
        >
          Save
        </button>
      </div>
    </motion.form>
  );
};

export default PersonForm;
