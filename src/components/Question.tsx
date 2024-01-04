import React from 'react';

interface QuestionProps {
  question: string;
  options: string[];
  onSelectOption: (selectedOption: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, options, onSelectOption }) => {
  return (
    <div>
      <h3>{question}</h3>
      <ul>
        {options.map((option) => (
          <li key={option} onClick={() => onSelectOption(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
