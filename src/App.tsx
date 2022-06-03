import { useState } from 'react';
import './App.css';
import questions from './Assets/question.json';
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';
import { FaStar } from 'react-icons/fa';

interface IQuestionData {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: [string, string, string];
}
// const questions: IQuestionData[] = require('./Assets/question.json');

function App() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [isAnswerGiven, setIsAnswerGiven] = useState<boolean>(false);
  const [resultMessageText, setResultMessageText] = useState<string>('');
  const [percentCompleted, setPercentCompleted] = useState<number>(0);

  const optionButtonHandler = (e: React.MouseEvent<HTMLElement>) => {
    console.log((e.target as any).innerText);
    const selectedOption = (e.target as any).innerText;
    if (
      selectedOption ===
      decodeURIComponent(questions[currentQuestion - 1].correct_answer)
    ) {
      const updatedCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(updatedCorrectAnswers);
      setResultMessageText('Correct!');
    } else {
      const updatedIncorrectAnswers = incorrectAnswers + 1;
      setIncorrectAnswers(updatedIncorrectAnswers);
      setResultMessageText('Sorry!');
    }
    setIsAnswerGiven(true);
  };

  const continueButtonHandler = () => {
    const newQuestion = currentQuestion + 1;
    if (newQuestion > questions.length) {
      setIsTestCompleted(true);
    } else {
      setCurrentQuestion(newQuestion);
      setIsAnswerGiven(false);
    }
    console.log('Percent: ', (currentQuestion / questions.length) * 100);
    setPercentCompleted(currentQuestion / questions.length);
  };

  const shuffleArray = (array: string[]) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const renderOptions = () => {
    const options = [
      questions[currentQuestion - 1].correct_answer,
      ...questions[currentQuestion - 1].incorrect_answers
    ];
    const shuffledOptions = shuffleArray(options);

    return (
      <div>
        {shuffledOptions.map((element) => {
          return (
            <button
              disabled={isAnswerGiven}
              onClick={optionButtonHandler}
              key={element}
            >
              {decodeURIComponent(element)}
            </button>
          );
        })}
      </div>
    );
  };

  const renderDifficultyWithStars = () => {
    let starColorCount: number = 0;
    if (
      decodeURIComponent(questions[currentQuestion - 1].difficulty) === 'easy'
    ) {
      starColorCount = 1;
    } else if (
      decodeURIComponent(questions[currentQuestion - 1].difficulty) === 'medium'
    ) {
      starColorCount = 2;
    } else if (
      decodeURIComponent(questions[currentQuestion - 1].difficulty) === 'hard'
    ) {
      starColorCount = 3;
    }
    return (
      <span>
        {Array(5)
          .fill(undefined)
          .map((_, index) => (
            <FaStar color={index < starColorCount ? 'orange' : 'gray'} />
          ))}
        {/* {Array(5 - starColorCount)
          .fill(undefined)
          .map(() => (
            <FaStar color={'gray'} />
          ))} */}
      </span>
    );
  };

  return (
    <div className="App">
      <h1>MCQ Quiz</h1>
      <ProgressIndicator percentComplete={percentCompleted} />

      {!isTestCompleted && (
        <div>
          <br />
          <h1>
            Question {currentQuestion} of {questions.length}
          </h1>
          <h3>{decodeURIComponent(questions[currentQuestion - 1].category)}</h3>
          <h3>
            Difficulty:{' '}
            {decodeURIComponent(questions[currentQuestion - 1].difficulty)}
          </h3>
          {renderDifficultyWithStars()}
          <p>
            <b>Question:</b>
            {decodeURIComponent(questions[currentQuestion - 1].question)}
          </p>
          {renderOptions()}

          {isAnswerGiven && (
            <button onClick={continueButtonHandler}>Continue</button>
          )}
          {isAnswerGiven && <h2>{resultMessageText}</h2>}
          <br />
          <br />
          <br />
          <h4>Correct Answers: {correctAnswers}</h4>
          <h4>Incorrect Answers: {incorrectAnswers}</h4>
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
