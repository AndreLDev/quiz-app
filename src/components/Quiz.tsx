import React, { useState, useEffect } from 'react';
import Question from './Question';
import Home from './Home';
import Result from './Result';

enum QuizState {
  HOME,
  QUIZ,
  RESULT,
}

const shuffleArray = (array: string[]) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Quiz: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>(QuizState.HOME);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<Set<string>>(new Set());

  const questions = [
    {
      question: 'Qual é a capital do Brasil?',
      options: ['Brasília', 'Rio de Janeiro', 'São Paulo', 'Salvador'],
      correctAnswer: 'Brasília',
    },
    {
      question: 'Qual é o maior planeta do sistema solar?',
      options: [ 'Vênus', 'Marte', 'Saturno','Júpiter'],
      correctAnswer: 'Júpiter',
    },
    {
      question: 'Quem escreveu "Dom Quixote"?',
      options: ['William Shakespeare','Miguel de Cervantes',  'Charles Dickens', 'Jane Austen'],
      correctAnswer: 'Miguel de Cervantes',
    },
    {
      question: 'Qual é a capital da França?',
      options: ['Berlim','Paris', 'Londres',  'Roma'],
      correctAnswer: 'Paris',
    },
    {
      question: 'Em que ano ocorreu a independência do Brasil?',
      options: [ '1492','1822', '1789', '1922'],
      correctAnswer: '1822',
    },
    {
      question: 'Quem pintou a Mona Lisa?',
      options: [ 'Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci','Claude Monet'],
      correctAnswer: 'Leonardo da Vinci',
    },
    {
      question: 'Qual é o número atômico do hidrogênio?',
      options: ['1', '8', '16', '32'],
      correctAnswer: '1',
    },
    {
      question: 'Quem foi o primeiro presidente dos Estados Unidos?',
      options: [ 'Thomas Jefferson', 'John Adams', 'James Madison', 'George Washington',],
      correctAnswer: 'George Washington',
    },
    {
      question: 'Qual é a maior cordilheira do mundo?',
      options: ['Himalaias', 'Andes', 'Montanhas Rochosas', 'Alpes'],
      correctAnswer: 'Himalaias',
    },
    {
      question: 'Quantos elementos químicos existem na tabela periódica?',
      options: ['118', '92', '64', '105'],
      correctAnswer: '118',
    },
    {
      question: 'Quem escreveu "Romeu e Julieta"?',
      options: ['William Shakespeare', 'Jane Austen', 'Fyodor Dostoevsky', 'Homer'],
      correctAnswer: 'William Shakespeare',
    },
    {
      question: 'Qual é o maior oceano do mundo?',
      options: ['Oceano Atlântico', 'Oceano Índico', 'Oceano Ártico', 'Oceano Pacífico'],
      correctAnswer: 'Oceano Pacífico',
    },
    {
      question: 'Quem foi o primeiro homem a pisar na Lua?',
      options: ['Neil Armstrong', 'Buzz Aldrin', 'Yuri Gagarin', 'Alan Shepard'],
      correctAnswer: 'Neil Armstrong',
    },
    {
      question: 'Qual é o elemento mais abundante na crosta terrestre?',
      options: ['Oxigênio', 'Silício', 'Ferro', 'Alumínio'],
      correctAnswer: 'Oxigênio',
    },
    {
      question: 'Em que ano começou a Segunda Guerra Mundial?',
      options: ['1939', '1941', '1945', '1940'],
      correctAnswer: '1939',
    },
    {
      question: 'Quem foi o pintor do famoso quadro "A Noite Estrelada"?',
      options: ['Vincent van Gogh', 'Pablo Picasso', 'Claude Monet', 'Leonardo da Vinci'],
      correctAnswer: 'Vincent van Gogh',
    },
    {
      question: 'Qual é a capital da Austrália?',
      options: ['Canberra', 'Sydney', 'Melbourne', 'Brisbane'],
      correctAnswer: 'Canberra',
    },
    {
      question: 'Quantos planetas existem no sistema solar?',
      options: ['8', '9', '7', '10'],
      correctAnswer: '8',
    },
    {
      question: 'Quem foi o fundador da Microsoft?',
      options: ['Bill Gates', 'Steve Jobs', 'Mark Zuckerberg', 'Larry Page'],
      correctAnswer: 'Bill Gates',
    },
    {
      question: 'Qual é o país mais populoso do mundo?',
      options: ['China', 'Índia', 'Estados Unidos', 'Brasil'],
      correctAnswer: 'China',
    },
    {
      question: 'Qual é o rio mais longo do mundo?',
      options: ['Rio Amazonas', 'Rio Nilo', 'Rio Yangtzé', 'Rio Mississipi'],
      correctAnswer: 'Rio Amazonas',
    },
    {
      question: 'Quem é conhecido como o "pai da computação"?',
      options: ['Alan Turing', 'Bill Gates', 'Steve Jobs', 'Charles Babbage'],
      correctAnswer: 'Charles Babbage',
    },
    {
      question: 'Qual é a maior ilha do mundo?',
      options: ['Groenlândia', 'Austrália', 'Borneo', 'Havaí'],
      correctAnswer: 'Groenlândia',
    },
    {
      question: 'Quem foi o líder sul-africano que lutou contra o apartheid?',
      options: ['Nelson Mandela', 'Desmond Tutu', 'Steve Biko', 'F. W. de Klerk'],
      correctAnswer: 'Nelson Mandela',
    },
    {
      question: 'Qual é o livro mais vendido de todos os tempos?',
      options: ['Bíblia', 'Dom Quixote', 'O Pequeno Príncipe', 'Crepúsculo'],
      correctAnswer: 'Bíblia',
    },
    {
      question: 'Quem é conhecido como o "gênio da física"?',
      options: ['Albert Einstein', 'Isaac Newton', 'Stephen Hawking', 'Niels Bohr'],
      correctAnswer: 'Albert Einstein',
    },
    {
      question: 'Em que ano ocorreu a Revolução Francesa?',
      options: ['1789', '1800', '1850', '1700'],
      correctAnswer: '1789',
    },
    {
      question: 'Qual é o metal mais abundante na crosta terrestre?',
      options: ['Alumínio', 'Ferro', 'Cobre', 'Ouro'],
      correctAnswer: 'Alumínio',
    },
    {
      question: 'Quem foi o primeiro presidente dos Estados Unidos?',
      options: ['George Washington', 'Thomas Jefferson', 'Abraham Lincoln', 'John Adams'],
      correctAnswer: 'George Washington',
    },
    {
      question: 'Qual é o animal terrestre mais rápido?',
      options: ['Guepardo', 'Leão', 'Elefante', 'Zebra'],
      correctAnswer: 'Guepardo',
    },
    {
      question: 'Qual é a moeda oficial do Japão?',
      options: ['Iene', 'Won', 'Dólar', 'Euro'],
      correctAnswer: 'Iene',
    },
    {
      question: 'Quem escreveu "Cem Anos de Solidão"?',
      options: ['Gabriel García Márquez', 'Isabel Allende', 'Mario Vargas Llosa', 'Jorge Luis Borges'],
      correctAnswer: 'Gabriel García Márquez',
    },
    {
      question: 'Qual é o segundo planeta do sistema solar?',
      options: ['Vênus', 'Marte', 'Júpiter', 'Saturno'],
      correctAnswer: 'Vênus',
    },
    {
      question: 'Quem é conhecido como "Rei do Pop"?',
      options: ['Michael Jackson', 'Elvis Presley', 'Prince', 'Madonna'],
      correctAnswer: 'Michael Jackson',
    },
    {
      question: 'Qual é a montanha mais alta do mundo?',
      options: ['Monte Everest', 'K2', 'Annapurna', 'Makalu'],
      correctAnswer: 'Monte Everest',
    },
    {
      question: 'Quem pintou "A Última Ceia"?',
      options: ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Michelangelo'],
      correctAnswer: 'Leonardo da Vinci',
    },
    {
      question: 'Qual é o maior mamífero do mundo?',
      options: ['Baleia Azul', 'Elefante Africano', 'Girafa', 'Rinoceronte Branco'],
      correctAnswer: 'Baleia Azul',
    },
    {
      question: 'Quem é o autor de "1984"?',
      options: ['George Orwell', 'Aldous Huxley', 'Ray Bradbury', 'Isaac Asimov'],
      correctAnswer: 'George Orwell',
    },
    {
      question: 'Em que ano foi fundada a Microsoft?',
      options: ['1975', '1980', '1985', '1990'],
      correctAnswer: '1975',
    },
    {
      question: 'Qual é o maior deserto do mundo?',
      options: ['Antártica', 'Deserto do Saara', 'Deserto do Atacama', 'Deserto da Arábia'],
      correctAnswer: 'Antártica',
    },
    {
      question: 'Qual é o menor país do mundo?',
      options: ['Vaticano', 'Mônaco', 'Nauru', 'San Marino'],
      correctAnswer: 'Vaticano',
    },
    {
      question: 'Quem é o autor de "Crime e Castigo"?',
      options: ['Fiódor Dostoiévski', 'Lev Tolstói', 'Anton Tchekhov', 'Ivan Turguêniev'],
      correctAnswer: 'Fiódor Dostoiévski',
    },
    {
      question: 'Qual é o segundo maior oceano do mundo?',
      options: ['Oceano Índico', 'Oceano Atlântico', 'Oceano Ártico', 'Oceano Antártico'],
      correctAnswer: 'Oceano Atlântico',
    },
    {
      question: 'Quem foi o primeiro imperador romano?',
      options: ['César Augusto', 'Nero', 'Trajano', 'Júlio César'],
      correctAnswer: 'César Augusto',
    },
    {
      question: 'Qual é o maior lago de água doce do mundo?',
      options: ['Lago Baikal', 'Lago Vitória', 'Lago Superior', 'Lago Titicaca'],
      correctAnswer: 'Lago Baikal',
    },
    {
      question: 'Quem é conhecido como "Príncipe das Trevas"?',
      options: ['Ozzy Osbourne', 'Alice Cooper', 'Marilyn Manson', 'Gene Simmons'],
      correctAnswer: 'Ozzy Osbourne',
    },
    {
      question: 'Qual é a capital do Canadá?',
      options: ['Ottawa', 'Toronto', 'Vancouver', 'Montreal'],
      correctAnswer: 'Ottawa',
    },
    {
      question: 'Quantos elementos químicos existem na tabela periódica?',
      options: ['118', '92', '105', '63'],
      correctAnswer: '118',
    },
    {
      question: 'Quem foi o primeiro astronauta a dar um passeio espacial?',
      options: ['Alexei Leonov', 'Yuri Gagarin', 'Neil Armstrong', 'Buzz Aldrin'],
      correctAnswer: 'Alexei Leonov',
    },
    {
      question: 'Qual é o livro sagrado do hinduísmo?',
      options: ['Bhagavad Gita', 'Bíblia', 'Alcorão', 'Zend-Avesta'],
      correctAnswer: 'Bhagavad Gita',
    },
  ];

  const handleStartQuiz = () => {
    setQuizState(QuizState.QUIZ);
  };

  const handleSelectOption = (selectedOption: string) => {
    setScore((prevScore) => {
      if (selectedOption === questions[currentQuestion].correctAnswer) {
        return prevScore + 1;
      }

      const wrongAnswer = `${currentQuestion + 1}. ${questions[currentQuestion].question}`;
      setWrongAnswers((prevWrongAnswers) => new Set(prevWrongAnswers.add(wrongAnswer)));

      return prevScore;
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizState(QuizState.RESULT);
    }
  };

  const handleRestartQuiz = () => {
    setQuizState(QuizState.HOME);
    setCurrentQuestion(0);
    setScore(0);
    setWrongAnswers(new Set());
  };

  useEffect(() => {
    if (quizState === QuizState.QUIZ) {
      setCurrentQuestion(0);
      setScore(0);
      setWrongAnswers(new Set());
    }
  }, [quizState]);

  return (
    <div className="container">
      {quizState === QuizState.HOME && <Home onStartQuiz={handleStartQuiz} />}
      {quizState === QuizState.QUIZ && (
        <>
          <h1>Quiz App</h1>
          <Question
            question={questions[currentQuestion].question}
            options={shuffleArray(questions[currentQuestion].options)}
            onSelectOption={handleSelectOption}
          />
        </>
      )}
      {quizState === QuizState.RESULT && (
        <Result wrongAnswers={Array.from(wrongAnswers)} onRestartQuiz={handleRestartQuiz} />
      )}
    </div>
  );
};

export default Quiz;
