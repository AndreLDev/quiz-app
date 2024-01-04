import React from 'react';

interface ResultProps {
  wrongAnswers: string[];
  onRestartQuiz: () => void;
}

const Result: React.FC<ResultProps> = ({ wrongAnswers, onRestartQuiz }) => {
  return (
    <div className="container">
      <h1>Resultado do Quiz</h1>
      <p>Você errou as seguintes perguntas:</p>
      <ul>
        {wrongAnswers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
      <button onClick={onRestartQuiz}>Reiniciar Quiz</button>
    </div>
  );
};

export default Result;
