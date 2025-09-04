import React from 'react';
import { Question } from './TravelQuestionnaire';

interface QuestionCardProps {
  question: Question;
  selectedOptions: string[];
  onAnswerChange: (questionId: string, selectedOptions: string[]) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOptions,
  onAnswerChange
}) => {
  const handleOptionToggle = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter(opt => opt !== option)
      : [...selectedOptions, option];
    
    onAnswerChange(question.id, updatedOptions);
  };

  return (
    <div className="travel-card p-8">
      <h2 className="text-2xl font-semibold text-foreground mb-6 leading-relaxed">
        {question.question}
      </h2>
      
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <label 
            key={index}
            className="flex items-center space-x-4 p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-accent/50 cursor-pointer transition-all duration-300 group"
          >
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionToggle(option)}
              className="travel-checkbox"
            />
            <span className="text-foreground text-lg font-medium group-hover:text-primary transition-colors duration-300">
              {option}
            </span>
          </label>
        ))}
      </div>
      
      {selectedOptions.length > 0 && (
        <div className="mt-6 p-4 bg-accent/30 rounded-lg border border-accent/50">
          <p className="text-accent-foreground text-sm font-medium">
            Selected: {selectedOptions.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};