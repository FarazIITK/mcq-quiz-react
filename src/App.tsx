import { useEffect, useState } from 'react';
import './App.css';

interface IQuestionData {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: [string, string, string];
}

function App() {
  const questions: IQuestionData[] = require('./Assets/question.json');

  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false);

  const handleContinueButton = () => {
    const newQuestion = currentQuestion + 1;
    if (newQuestion > questions.length) {
      setIsTestCompleted(true);
    } else {
      setCurrentQuestion(newQuestion);
    }
  };

  return (
    <div className="App">
      <h1>MCQ Quiz</h1>

      {!isTestCompleted && (
        <div>
          <h1>
            Question {currentQuestion} of {questions.length}
          </h1>
          <h3>
            {questions[currentQuestion - 1].category.replaceAll('%', ' ')}
          </h3>
          <h3>
            Difficulty:{' '}
            {questions[currentQuestion - 1].difficulty.replaceAll('%', ' ')}
          </h3>
          <button onClick={handleContinueButton}>Continue</button>
        </div>
      )}
      {isTestCompleted && (
        <div>
          <h1>Test Completed</h1>
        </div>
      )}
    </div>
  );
}

export default App;
