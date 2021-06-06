import tw from 'twin.macro';

const RoundReport = ({ numQuestionsCorrect, numQuestionsTotal }) => {
  return numQuestionsTotal > 0 ? (
    <div tw="border-gray-100 border-2 rounded-lg p-10 max-w-screen-md text-gray-700 text-4xl text-center">
      {numQuestionsCorrect === numQuestionsTotal
        ? 'You scored perfectly 🎉'
        : 'You can do better next time!'}
    </div>
  ) : null;
};

RoundReport.propTypes = {};

export default RoundReport;
