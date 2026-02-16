'use client';

import { useState } from 'react';
import { Person } from '@/types';
import PersonCard from './PersonCard';
import PersonModal from './PersonModal';
import Counter from './Counter';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';

const YEARS = Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() + 1 - i).toString());

interface ClientGridProps {
  initialPeople: Person[];
  year: string;
}

export default function ClientGrid({ initialPeople, year }: ClientGridProps) {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const router = useRouter();
  
  const handleYearChange = (newYear: string) => {
    router.push(`/?year=${newYear}`);
    // The page will reload/server update because of Next.js navigation,
    // but preserving state if using shallow routing might be tricky with server components.
    // For now, full navigation is fine.
  };

  return (
    <div className="space-y-12 flex flex-col items-center w-full">
      {/* Counter Section */}
      <div className="text-center space-y-4">
        <Counter value={initialPeople.length} />
        <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
          Lives lost in {year}
        </p>
      </div>

      {/* Year Selector */}
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
        {YEARS.map((y) => (
          <button
            key={y}
            onClick={() => handleYearChange(y)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${year === y 
                ? 'bg-primary text-primary-foreground shadow-lg scale-110' 
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'}
            `}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Grid */}
      {initialPeople.length > 0 ? (
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 w-full"
          layout
        >
          {initialPeople.map((person, index) => (
            <PersonCard 
              key={person._id} 
              person={person} 
              index={index} 
              onClick={setSelectedPerson} 
            />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 text-zinc-500">
          No records found for {year}.
        </div>
      )}

      {/* Modal */}
      <PersonModal 
        person={selectedPerson} 
        isOpen={!!selectedPerson} 
        onClose={() => setSelectedPerson(null)} 
      />
    </div>
  );
}
