import PropTypes from 'prop-types';

const TiviaCard = ({ category, score, onClick }) => {
  return (
    <div onClick={onClick}>
      <span>{category}</span>
      <span>{score}pts</span>
    </div>
  );
};

TiviaCard.propTypes = {
  category: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

export default TiviaCard;
