'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Person } from '@/types';
import { format } from 'date-fns';
import { X } from 'lucide-react';

interface PersonModalProps {
  person: Person | null;
  isOpen: boolean;
  onClose: () => void;
}

const PersonModal = ({ person, isOpen, onClose }: PersonModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && person && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
           onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
             <button 
                onClick={onClose} 
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 hover:bg-background text-foreground/80 hover:text-foreground transition-colors backdrop-blur-sm"
             >
               <X size={20} />
             </button>

             <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar">
                
                {person.photoUrl && (
                  <div className="w-full aspect-video bg-muted rounded-xl overflow-hidden relative shadow-inner mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={person.photoUrl} 
                      alt={person.name} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                )}

                <div className="space-y-2">
                   <h2 className="text-3xl md:text-4xl font-bold text-card-foreground tracking-tight">{person.name}</h2>
                   <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                     <span className="bg-secondary px-3 py-1 rounded-full text-secondary-foreground">
                        {format(new Date(person.date), 'MMMM do, yyyy')}
                     </span>
                   </div>
                </div>
                
                <div className="space-y-4 text-card-foreground/80 leading-relaxed text-lg font-light">
                   {person.description && (
                     <p className="font-medium text-card-foreground border-l-2 border-primary/20 pl-4 py-1 italic">
                       {person.description}
                     </p>
                   )}
                   {person.details ? (
                     <div className="prose dark:prose-invert prose-sm max-w-none opacity-90 text-card-foreground/90">
                       {person.details.split('\n').map((line, i) => (
                         <p key={i} className="mb-2">{line}</p>
                       ))}
                     </div>
                   ) : (
                     <p className="opacity-50 italic text-sm">No additional details provided.</p>
                   )}
                </div>
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PersonModal;
