import tw from 'twin.macro';
const TriviaBoard = ({ children }) => {
  return <div tw="grid grid-cols-4">{children}</div>;
};

export default TriviaBoard;
