import tw from 'twin.macro';
const TriviaBoard = ({ children }) => {
  return (
    <div tw="grid grid-cols-2 sm:grid-cols-4 max-w-screen-md mx-auto">
      {children}
    </div>
  );
};

export default TriviaBoard;
