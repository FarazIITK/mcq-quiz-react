import { useState } from 'react';
import './App.scss';
import questions from './Assets/question.json';
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';
import { FaStar } from 'react-icons/fa';
import { ProgressBar } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { shuffleArray } from './Utils/UtilityFunctions';

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [isAnswerGiven, setIsAnswerGiven] = useState<boolean>(false);
  const [resultMessageText, setResultMessageText] = useState<string>('');
  const [percentCompleted, setPercentCompleted] = useState<number>(
    (currentQuestion / questions.length) * 100
  );

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
      setPercentCompleted((newQuestion / questions.length) * 100);
    }
    console.log('Percent: ', (currentQuestion / questions.length) * 100);
  };

  // Function to return the JSX for the options
  // The options are returned after shuffling in random order
  const renderOptions = () => {
    // Options for the question
    const options = [
      questions[currentQuestion - 1].correct_answer,
      ...questions[currentQuestion - 1].incorrect_answers
    ];
    const shuffledOptions = shuffleArray(options);

    return (
      <div className="options-cont">
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
      <small>
        {Array(3)
          .fill(undefined)
          .map((_, index) => (
            <FaStar color={index < starColorCount ? 'orange' : 'grey'} />
          ))}
      </small>
    );
  };

  return (
    <div className="App">
      <h1 className="heading-txt">MCQ Quiz</h1>
      {!isTestCompleted && (
        <div className="test-div">
          <br />
          {/* This is a fluentUI component */}
          <ProgressIndicator
            percentComplete={percentCompleted / 100}
            styles={{
              progressBar: {
                height: '20px'
              }
            }}
          />
          <section className="test-content">
            <header className="question-header">
              <h3>
                Question {currentQuestion} of {questions.length}
              </h3>
              <small>
                {decodeURIComponent(questions[currentQuestion - 1].category)}
              </small>
              {/* Renders JSX for the stars */}
              {renderDifficultyWithStars()}
            </header>
            <section className="question-section">
              <p>
                {/* <b>Question:</b> */}
                {decodeURIComponent(questions[currentQuestion - 1].question)}
              </p>
              {/* Displays the options for the question */}
              {renderOptions()}
            </section>

            {/* This section displays the result of a question */}
            <section className="prompt-cont">
              {isAnswerGiven && (
                <>
                  <h1
                    className={
                      resultMessageText === 'Sorry!'
                        ? 'red-class'
                        : 'green-class'
                    }
                  >
                    {resultMessageText}
                  </h1>
                  <button onClick={continueButtonHandler}>
                    {currentQuestion < questions.length
                      ? 'Next Question'
                      : 'End Test'}
                  </button>
                </>
              )}
            </section>

            <br />
            {/* This section is for score count */}
            <section className="score-count">
              <p>
                Your score:{' '}
                {((100 * correctAnswers) / questions.length).toFixed(2)}%
              </p>
              <p>
                Maximum Score:{' '}
                {((100 * currentQuestion) / questions.length).toFixed(2)}%
              </p>
            </section>
            {/* <br /> */}
            {/* This is a react-bootstrap component */}
            <ProgressBar style={{ height: '30px' }}>
              <ProgressBar
                variant="success"
                now={percentCompleted * (correctAnswers / currentQuestion)}
                key={1}
              />
              <ProgressBar
                variant="danger"
                now={percentCompleted * (incorrectAnswers / currentQuestion)}
                key={2}
              />
              <ProgressBar
                variant="grey"
                now={
                  100 -
                  ((correctAnswers + incorrectAnswers) / questions.length) * 100
                }
                key={3}
              />
            </ProgressBar>
          </section>
        </div>
      )}
      {/* Display this JSX when the test is completed */}
      {isTestCompleted && (
        <div className="result-div">
          <h1 className="heading">Test Completed</h1>
          <h3>Total Questions: {questions.length}</h3>
          <h3>Correct Answers: {correctAnswers}</h3>
          <h3>Incorrect Answers: {incorrectAnswers}</h3>
          <h2>
            Score: {((correctAnswers / questions.length) * 100).toFixed(2)}/100
          </h2>
        </div>
      )}
    </div>
  );
};

export default App;
