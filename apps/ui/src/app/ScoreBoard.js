import tw from 'twin.macro';
import React from 'react';

const ScoreBoard = ({ totalScore = 0 }) => {
  return (
    <div
      css={[
        totalScore > 0
          ? tw`text-green-500`
          : totalScore < 0
          ? tw`text-red-500`
          : null,
        tw`flex justify-center items-center mx-auto p-4`,
      ]}
    >
      <span>Score:</span>
      <span tw="text-4xl mx-1">{totalScore}</span>
    </div>
  );
};

export default ScoreBoard;
