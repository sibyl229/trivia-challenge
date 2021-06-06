import tw from 'twin.macro';
import CurrentRoundDataProvider from './CurrentRoundDataProvider';
import GameView from './GameView';

export function App() {
  return (
    <CurrentRoundDataProvider>
      <GameView />
    </CurrentRoundDataProvider>
  );
}
export default App;
