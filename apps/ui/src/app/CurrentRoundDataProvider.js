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
        setData(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);

  const selectQuestion = useCallback(
    (questionId) => {
      axios
        .get(`/api/round/question/${questionId}`)
        .then((response) => {
          setData((prevData) => {
            console.log('zzz:' + questionId);
            console.log(prevData);
            return {
              ...prevData,
              a: 'zzzz',
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
    (questionId, answer, passed = false) => {
      axios
        .post(`/api/round/question/${questionId}`)
        .then((response) => {
          const { questionId } = response.data;
          const { questions } = data;
          setData({
            ...data,
            currentQuestionId: undefined,
            questions: questions.map((question) => {
              if (question.id === questionId) {
                return {
                  ...question,
                  ...response,
                };
              } else {
                return question;
              }
            }),
          });
        })
        .catch((error) => setError(error));
    },
    [data, setData, setError]
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
