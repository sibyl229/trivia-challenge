import tw from 'twin.macro';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useCallback, useEffect, useState } from 'react';
import useInterval from './hooks/useInterval';

export default function FormDialog({ isOpen, question, answerQuestion }) {
  const [answer, setAnswer] = useState();
  const { id: questionId, question: questionPhrase } = question || {};

  const handlePass = () => {
    answerQuestion(questionId, undefined, true);
  };

  const handleSubmitAnswer = useCallback(() => {
    answerQuestion(questionId, answer);
  }, [questionId, answerQuestion, answer]);

  const [countDown, setCountDown] = useState(60);
  const updateTimer = useCallback(() => {
    setCountDown(countDown - 1);
  }, [countDown, setCountDown]);
  useInterval(updateTimer, 1000);

  useEffect(() => {
    setCountDown(60);
  }, [questionId]);

  useEffect(() => {
    if (countDown <= 0) {
      handleSubmitAnswer();
    }
  }, [countDown, handleSubmitAnswer]);

  return (
    <div>
      <Dialog open={isOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Question</DialogTitle>
        <DialogContent>
          <DialogContentText>{questionPhrase}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePass} color="primary">
            Pass
          </Button>
          <Button onClick={handleSubmitAnswer} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
