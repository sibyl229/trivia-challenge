/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';

const app = express();
app.use(express.json());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const QUESTION_BANK = [
  {
    category: 'Sports',
    question: 'What’s the diameter of a basketball hoop in inches?',
    choices: ['14 inches', '16 inches', '18 inches'],
    answer: 2,
  },
  {
    category: 'Sports',
    question: 'How big is an Olympic sized swimming pool in meters?',
    choices: ['50m x 30m', '50m x 25m', '60m x 30m'],
    answer: 1,
  },
  {
    category: 'Sports',
    question:
      'In professional basketball, how high is the basketball hoop from the ground?',
    choices: ['10ft', '11ft', '12ft'],
    answer: 0,
  },
  {
    category: 'Science',
    question: 'This essential gas is important so that we can breathe',
    choices: ['Oxygen', 'Nitrogen', 'Helium'],
    answer: 0,
  },
  {
    category: 'Music',
    question: 'Who was the very first American Idol winner?',
    choices: ['Kelly Clarkson', 'Ryan Starr', 'Hilary Duff'],
    answer: 0,
  },
  {
    category: 'Nature',
    question: 'What part of the plant conducts photosynthesis?',
    choices: ['Stem', 'Flower', 'Leaf'],
    answer: 2,
  },
]
  .flatMap((element) => [element, element, element, element])
  .map((element) => ({
    ...element,
    score: Math.round(Math.random() * 10) * 100,
  }));

var historicalRounds = [];
var currentRound = {};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

app.get('/api/round/new', (req, res) => {
  const selectedQuestions = shuffle([...QUESTION_BANK]).slice(0, 16);
  if (currentRound.questions) {
    const totalScoreEarned = currentRound.questions.reduce(
      (result, { score_earned }) => result + score_earned,
      0
    );
    historicalRounds.push({
      totalScoreEarned,
    });
    currentRound = {};
  }
  currentRound.questions = selectedQuestions.map((question, index) => ({
    ...question,
    id: index,
    status: 'new',
    score_earned: 0,
  }));
  res.send({
    questions: selectedQuestions.map(
      ({ category, score, status, score_earned }, index) => ({
        id: index,
        category,
        score,
        status,
        score_earned,
      })
    ),
  });
});

app.get('/api/round/list', (req, res) => {
  res.send([...historicalRounds]);
});

app.get('/api/round/question/:qid', (req, res) => {
  const { id, score, category, question, choices } =
    currentRound.questions[req.params.qid] || {};
  res.send({
    id,
    score,
    category,
    question,
    choices,
  });
});

app.post('/api/round/question/:qid', (req, res) => {
  const { userAnswer, passed } = req.body || {};
  console.log(JSON.stringify(passed));
  const currentQuestion = currentRound.questions[req.params.qid] || {};
  currentQuestion.status = passed ? 'passed' : 'answered';
  currentQuestion.score_earned = passed
    ? 0
    : userAnswer === currentQuestion.answer
    ? currentQuestion.score
    : -1 * currentQuestion.score;
  currentQuestion.userAnswer = userAnswer;
  res.send({
    ...currentQuestion,
  });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
