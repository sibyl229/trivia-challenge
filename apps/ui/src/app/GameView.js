import tw from 'twin.macro';
import { useCurrentRoundData } from './CurrentRoundDataProvider';
import { useState } from 'react';
import TriviaBoard from './TriviaBoard';
import TriviaCard from './TriviaCard';
import TriviaDialog from './TiviaDialog';
import ScoreBoard from './ScoreBoard';
import RoundReport from './RoundReport';
import Button from '@material-ui/core/Button';

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

  const {
    questions = [],
    currentQuestionId,
    totalScore,
    numQuestionsRemaining,
    numQuestionsTotal,
    numQuestionsCorrect,
    numPassesRemaining,
  } = data;

  /*   const [numCorrect, numTotal] = useMemo(() => {
    return questions.reduce(([nCorrect, nTotal], question) => {
      return [nCorrect + (question.answer === question.userAnswer)];
    });
  }, [questions]); */
  return (
    <div tw="flex flex-col h-screen justify-between">
      <ScoreBoard totalScore={totalScore} />
      <hr />
      <div tw="flex flex-col gap-10 h-screen justify-center items-center">
        <h1 tw="text-8xl">Trivia Quiz</h1>
        <h2>
          Start by picking a question below with a <strong>category</strong> and
          a <strong>score</strong>
        </h2>
        {numQuestionsRemaining ? (
          <>
            <TriviaBoard>
              {questions.map((question) => {
                const { id: questionId } = question;
                return (
                  <TriviaCard
                    key={questionId}
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
              numPassesRemaining={numPassesRemaining}
            />
          </>
        ) : (
          <RoundReport
            numQuestionsTotal={numQuestionsTotal}
            numQuestionsCorrect={numQuestionsCorrect}
          />
        )}
        {numQuestionsRemaining === 0 || questions.length === 0 ? (
          <div>
            <Button onClick={newRound} color="primary" variant="outlined">
              Start new round
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GameView;
