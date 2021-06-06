import tw from 'twin.macro';

const RoundReport = ({ numQuestionsCorrect, numQuestionsTotal }) => {
  return numQuestionsTotal > 0 ? (
    <div tw="border-gray-100 border-2 rounded-lg p-10 max-w-screen-md text-gray-700 text-4xl text-center">
      <h2 tw="text-6xl font-medium pb-6">
        {numQuestionsCorrect} / {numQuestionsTotal}
      </h2>
      <h3>
        {numQuestionsCorrect === numQuestionsTotal
          ? 'You scored perfectly 🎉'
          : 'You can do better next time!'}
      </h3>
    </div>
  ) : null;
};

RoundReport.propTypes = {};

export default RoundReport;
