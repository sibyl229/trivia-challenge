import { useCurrentRoundData } from './CurrentRoundDataProvider';
import TriviaBoard from './TriviaBoard';
import TriviaCard from './TriviaCard';

const GameView = () => {
  const { newRound, loading, error, data } = useCurrentRoundData();

  if (loading) {
    return '...loading';
  } else if (error) {
    return error;
  }

  console.log(data);
  const { questions = [] } = data;
  return (
    <div>
      <button onClick={newRound}>Start new round</button>;
      <pre>{JSON.stringify(questions, null, 2)}</pre>
      <TriviaBoard>
        {questions.map((question) => (
          <TriviaCard key={question.id} {...question} />
        ))}
      </TriviaBoard>
    </div>
  );
};

export default GameView;
