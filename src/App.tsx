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
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [isAnswerGiven, setIsAnswerGiven] = useState<boolean>(false);

  const optionButtonHandler = (e: any) => {
    console.log(e.target.innerText);
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
    console.log('Options: ', options);
    const shuffledOptions = shuffleArray(options);

    return (
      <div>
        {shuffledOptions.map((element) => {
          return (
            <button disabled={isAnswerGiven} onClick={optionButtonHandler}>
              {decodeURIComponent(element)}
            </button>
          );
        })}
        {/* <h2>vdkjvkj</h2>
        <h2>dbjb</h2> */}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>MCQ Quiz</h1>

      {!isTestCompleted && (
        <div>
          <h1>
            Question {currentQuestion} of {questions.length}
          </h1>
          <h3>{decodeURIComponent(questions[currentQuestion - 1].category)}</h3>
          <h3>
            Difficulty:{' '}
            {decodeURIComponent(questions[currentQuestion - 1].difficulty)}
          </h3>
          <p>
            <b>Question:</b>
            {decodeURIComponent(questions[currentQuestion - 1].question)}
          </p>
          {renderOptions()}
          {/* <button onClick={optionButtonHandler} disabled={isAnswerGiven}>
            Option 1
          </button>
          <button onClick={optionButtonHandler} disabled={isAnswerGiven}>
            Option 1
          </button>
          <button onClick={optionButtonHandler} disabled={isAnswerGiven}>
            Option 1
          </button>
          <button onClick={optionButtonHandler} disabled={isAnswerGiven}>
            Option 1
          </button> */}

          {isAnswerGiven && (
            <button onClick={continueButtonHandler}>Continue</button>
          )}

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
