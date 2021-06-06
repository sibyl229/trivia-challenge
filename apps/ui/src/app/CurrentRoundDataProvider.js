import axios from 'axios';
import React, { useMemo, useState, useContext, useCallback } from 'react';

const CurrentRoundDataContext = React.createContext();

export const CurrentRoundDataProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  const newRound = useCallback(() => {
    setLoading(true);
    axios
      .get('/api/round/new')
      .then((response) => {
        setLoading(false);
        setError(null);
        setData({
          ...response.data,
          totalScore: 0,
          numQuestionsTotal: response.data.questions.length,
          numQuestionsCorrect: 0,
          numQuestionsRemaining: response.data.questions.length,
        });
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);

  const selectQuestion = useCallback(
    (questionId) => {
      setData((prevData) => ({
        ...prevData,
        currentQuestionId: undefined,
      }));
      axios
        .get(`/api/round/question/${questionId}`)
        .then((response) => {
          setData((prevData) => {
            return {
              ...prevData,
              currentQuestionId: questionId,
              questions: prevData.questions.map((question) => {
                if (question.id === questionId) {
                  return {
                    ...question,
                    ...response.data,
                  };
                } else {
                  return question;
                }
              }),
            };
          });
        })
        .catch((error) => setError(error));
    },
    [setData, setError]
  );

  const answerQuestion = useCallback(
    (questionId, userAnswer, passed = false) => {
      axios
        .post(`/api/round/question/${questionId}`, {
          userAnswer: userAnswer,
          passed,
        })
        .then((response) => {
          setData((prevData) => ({
            ...prevData,
            totalScore: prevData.totalScore + response.data.score_earned,
            numQuestionsRemaining: prevData.numQuestionsRemaining - 1,
            numQuestionsCorrect:
              prevData.numQuestionsCorrect +
              (response.data.score_earned > 0 ? 1 : 0),
            questions: prevData.questions.map((question) => {
              if (question.id === questionId) {
                return {
                  ...question,
                  ...response.data,
                };
              } else {
                return question;
              }
            }),
          }));
        })
        .catch((error) => setError(error));
    },
    [setData, setError]
  );

  const value = useMemo(
    () => ({
      loading,
      error,
      data,
      newRound,
      selectQuestion,
      answerQuestion,
    }),
    [data, loading, error, newRound, selectQuestion, answerQuestion]
  );
  return (
    <CurrentRoundDataContext.Provider value={value}>
      {children}
    </CurrentRoundDataContext.Provider>
  );
};

export function useCurrentRoundData() {
  const context = useContext(CurrentRoundDataContext);
  if (context === undefined) {
    throw new Error(
      'useCurrentRoundData must be called in CurrentRoundDataProvider'
    );
  }
  return context;
}

export default CurrentRoundDataProvider;
