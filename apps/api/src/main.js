/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const QUESTION_BANK = [
  {
    category: 'Sports',
    question: 'What’s the diameter of a basketball hoop in inches?',
    choices: {
      a: '14 inches',
      b: '16 inches',
      c: '18 inches'
    },
    answer: 'c',
  },
  {
    category: 'Science',
    question: 'This essential gas is important so that we can breathe',
    choices: {
      a: 'Oxygen',
      b: 'Nitrogen',
      c: 'Helium',
    },
    answer: 'a',
  }
].map((element, index) => ({
  ...element,
  score: Math.round(Math.random() * 10) * 100
})),

var currentRound = {
  questions: [],
};

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
  currentRound.questions = selectedQuestions;
  res.send({
    questions: selectedQuestions.map(({category, score}, index) => ({
      id: index,
      category,
      score,
    }))
  })
});

app.get('/api/round/question/:qid', (req, res) => {
  const {
    id,
    score,
    category,
    question,
    choices,
  } = currentRound.questions[req.params.qid] || {};
  res.send({
    id,
    score,
    category,
    question,
    choices,
  })
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
