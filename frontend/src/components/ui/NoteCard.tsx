import React from 'react';
import { motion } from 'framer-motion';

interface NoteCardProps {
  title: string;
  content: string;
  lastModified: string;
  onClick: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, content, lastModified, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-background-card rounded-lg p-4 shadow-card hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-accent-peach"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-text-primary truncate flex-1">
          {title}
        </h3>
        <button
          className="text-accent-red hover:bg-red-100 rounded-full p-1 transition-colors ml-2"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      <p className="text-text-secondary text-sm line-clamp-3 mb-3">
        {content}
      </p>
      
      <div className="text-xs text-text-light">
        Last Modified: {formatDate(lastModified)}
      </div>
    </motion.div>
  );
};

export default NoteCard;

