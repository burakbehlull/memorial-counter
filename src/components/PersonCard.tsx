'use client';

import { motion } from 'framer-motion';
import { Person } from '@/types';
import { cn } from '@/lib/utils'; // wait, need utils first
import { format } from 'date-fns';

interface PersonCardProps {
  person: Person;
  onClick: (person: Person) => void;
  index: number;
}

const PersonCard = ({ person, onClick, index }: PersonCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(person)}
      className={
        "cursor-pointer p-4 rounded-lg bg-card border border-border backdrop-blur-sm " +
        "hover:bg-accent hover:text-accent-foreground transition-colors flex flex-col items-center justify-center text-center gap-2"
      }
    >
      <h3 className="text-lg font-semibold text-card-foreground truncate w-full">
        {person.name}
      </h3>
      <span className="text-xs text-muted-foreground">
        {format(new Date(person.date), 'dd MMM yyyy')}
      </span>
    </motion.div>
  );
};

export default PersonCard;
