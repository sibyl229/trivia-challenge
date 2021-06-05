import { useCurrentRoundData } from './CurrentRoundDataProvider';

const GameView = () => {
  const { newRound, loading, error, data } = useCurrentRoundData();

  if (loading) {
    return '...loading';
  } else if (error) {
    return error;
  }
  return (
    <div>
      <button onClick={newRound}>Start new round</button>;
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default GameView;
