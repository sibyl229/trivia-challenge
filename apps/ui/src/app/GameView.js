import { useCurrentRoundData } from './CurrentRoundDataProvider';
import { useState } from 'react';
import TriviaBoard from './TriviaBoard';
import TriviaCard from './TriviaCard';
import TriviaDialog from './TiviaDialog';

const GameView = () => {
  const { newRound, loading, error, data } = useCurrentRoundData();
  const [isOpen, setIsOpen] = useState(false);

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
          <TriviaCard
            key={question.id}
            {...question}
            onClick={() => setIsOpen(true)}
          />
        ))}
      </TriviaBoard>
      <TriviaDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default GameView;
