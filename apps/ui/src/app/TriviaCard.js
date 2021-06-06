import tw from 'twin.macro';
import PropTypes from 'prop-types';

const TiviaCard = ({ category, score, onClick, status }) => {
  return (
    <div
      css={[
        tw`flex flex-col items-center text-white p-5 m-2 rounded-md`,
        tw`cursor-pointer`,
        status !== 'new' && tw`invisible`,
        category === 'Sports' && tw`bg-indigo-500`,
        category === 'Science' && tw`bg-pink-500`,
        category === 'Nature' && tw`bg-green-500`,
        category === 'Music' && tw`bg-yellow-500`,
      ]}
      onClick={onClick}
    >
      <span>{category}</span>
      <span tw="text-2xl">{score}</span>
    </div>
  );
};

TiviaCard.propTypes = {
  category: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

export default TiviaCard;
