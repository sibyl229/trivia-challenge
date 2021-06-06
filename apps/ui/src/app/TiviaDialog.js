import tw from 'twin.macro';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { useCallback, useEffect, useState } from 'react';
import useInterval from './hooks/useInterval';

export default function TriviaDialog({
  isOpen,
  question,
  answerQuestion,
  setIsOpen,
  numPassesRemaining,
}) {
  const [userAnswer, setUserAnswer] = useState(-1);
  const {
    id: questionId,
    question: questionPhrase,
    choices = [],
    status,
    answer,
    score,
  } = question || {};

  const handlePass = () => {
    answerQuestion(questionId, undefined, true);
  };

  const handleSubmitAnswer = useCallback(() => {
    answerQuestion(questionId, userAnswer);
  }, [questionId, answerQuestion, userAnswer]);

  const handleClose = useCallback(() => {
    if (status !== 'new') {
      setIsOpen(false);
    }
  }, [setIsOpen, status]);

  const [countDown, setCountDown] = useState(60);
  const updateTimer = useCallback(() => {
    if (countDown > 0 && status === 'new') {
      setCountDown(countDown - 1);
    }
  }, [countDown, setCountDown, status]);
  useInterval(updateTimer, 1000);

  useEffect(() => {
    setCountDown(60);
    setUserAnswer(-1);
  }, [questionId]);

  useEffect(() => {
    if (countDown <= 0) {
      handleSubmitAnswer();
    }
  }, [countDown, handleSubmitAnswer]);

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {countDown} seconds left
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{questionPhrase}</DialogContentText>
          <RadioGroup
            aria-label="answer"
            name="answer"
            value={userAnswer}
            onChange={(e) => {
              setUserAnswer(parseInt(e.target.value));
            }}
          >
            {choices.map((choice, index) => (
              <div
                css={[
                  tw`flex justify-between items-center px-2`,
                  status === 'answered' && index === userAnswer
                    ? userAnswer === answer
                      ? tw`bg-green-200`
                      : tw`bg-red-200`
                    : null,
                ]}
              >
                <FormControlLabel
                  key={index}
                  value={index}
                  disabled={status !== 'new'}
                  control={<Radio color="primary" />}
                  label={choice}
                />
                {status === 'new' ? null : (
                  <span tw="text-right">
                    {index === answer ? 'Correct answer ' : null}
                    {index === userAnswer
                      ? index === answer
                        ? `+${score}pts`
                        : `-${score}pts`
                      : null}
                  </span>
                )}
              </div>
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          {status !== 'new' ? (
            <Button onClick={handleClose}>Close</Button>
          ) : (
            <>
              <Tooltip title="You can pass only once per round" placement="top">
                <span>
                  <Button
                    onClick={handlePass}
                    disabled={numPassesRemaining <= 0}
                  >
                    Pass
                  </Button>
                </span>
              </Tooltip>
              <Button onClick={handleSubmitAnswer} color="primary">
                Submit
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
