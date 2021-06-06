import { useCurrentRoundData } from './CurrentRoundDataProvider';
import { useState } from 'react';
import TriviaBoard from './TriviaBoard';
import TriviaCard from './TriviaCard';
import TriviaDialog from './TiviaDialog';

const GameView = () => {
  const {
    newRound,
    selectQuestion,
    answerQuestion,
    loading,
    error,
    data,
  } = useCurrentRoundData();
  const [isOpen, setIsOpen] = useState(false);

  if (loading) {
    return '...loading';
  } else if (error) {
    return error;
  }

  const { questions = [], currentQuestionId } = data;
  return (
    <div>
      <button onClick={newRound}>Start new round</button>;
      <TriviaBoard>
        {questions.map((question) => {
          const { id: questionId } = question;
          return (
            <TriviaCard
              key={question.id}
              {...question}
              onClick={() => {
                console.log(questionId);
                selectQuestion(questionId);
                setIsOpen(true);
              }}
            />
          );
        })}
      </TriviaBoard>
      <TriviaDialog
        isOpen={currentQuestionId !== undefined && isOpen}
        setIsOpen={setIsOpen}
        question={questions[currentQuestionId]}
        answerQuestion={answerQuestion}
      />
    </div>
  );
};

export default GameView;
