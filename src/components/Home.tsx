import React from 'react';

interface HomeProps {
  onStartQuiz: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartQuiz }) => {
  return (
    <div className="container">
      <h1>Bem-vindo ao Quiz!</h1>
      <p>Clique no botão abaixo para começar o quiz.</p>
      <button onClick={onStartQuiz}>Iniciar Quiz</button>
    </div>
  );
};

export default Home;
