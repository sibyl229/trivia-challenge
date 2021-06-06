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
    category: 'Sports',
    question: '?The Summer Olympics are held every how many years?',
    choices: ['2 years', '4 years', '6 years'],
    answer: 1,
  },
  {
    category: 'Science',
    question: 'This essential gas is important so that we can breathe?',
    choices: ['Oxygen', 'Nitrogen', 'Helium'],
    answer: 0,
  },
  {
    category: 'Science',
    question: 'What is the nearest planet to the sun?',
    choices: ['Mars', 'Pluto', 'Mercury'],
    answer: 2,
  },
  {
    category: 'Science',
    question: 'What is the largest planet in the solar system?',
    choices: ['Earth', 'Saturn', 'Jupiter'],
    answer: 2,
  },
  {
    category: 'Science',
    question: 'This essential gas is important so that we can breathe',
    choices: ['Oxygen', 'Nitrogen', 'Helium'],
    answer: 0,
  },
  {
    category: 'Science',
    question: 'What is the rarest blood type?',
    choices: ['O positive', 'AB negative', 'B negative'],
    answer: 1,
  },
  {
    category: 'Music',
    question: 'Who was the very first American Idol winner?',
    choices: ['Kelly Clarkson', 'Ryan Starr', 'Hilary Duff'],
    answer: 0,
  },
  {
    category: 'Music',
    question:
      'Before Miley Cyrus recorded “Wrecking Ball,” it was offered to which singer?',
    choices: ['Alicia Keys', 'Beyoncé (correct)', 'Leona Lewis'],
    answer: 1,
  },
  {
    category: 'Music',
    question:
      'What rock icon was the founder of The Society for the Prevention of Cruelty to Long-haired Men?',
    choices: ['David Bowie', 'Peter Frampton', 'Mick Jagger'],
    answer: 0,
  },
  {
    category: 'Music',
    question: 'Eminem‘s 8 Mile is named after a road in which city?',
    choices: ['Chicago', 'San Fran', 'Detroit'],
    answer: 2,
  },
  {
    category: 'Music',
    question:
      'Who was the first woman ever inducted into the Rock and Roll Hall of Fame?',
    choices: ['Janice Joplin', 'Aretha Franklin', 'Pat Benatar'],
    answer: 1,
  },
  {
    category: 'Nature',
    question: 'What part of the plant conducts photosynthesis?',
    choices: ['Stem', 'Flower', 'Leaf'],
    answer: 2,
  },
  {
    category: 'Nature',
    question: 'What is the largest known land animal?',
    choices: ['Hippopotamus', 'Elephant', 'Giraffe'],
    answer: 1,
  },
  {
    category: 'Nature',
    question: 'How many bones to sharks have in total?',
    choices: ['0 bones', '3 bones', '12 bones'],
    answer: 2,
  },
  {
    category: 'Nature',
    question:
      'Dolly was the first ever living creature to be cloned. What type of animal was she?',
    choices: ['Sheep', 'Mouse', 'Worm'],
    answer: 0,
  },
  {
    category: 'Nature',
    question: 'What is the tallest type of grass?',
    choices: ['Northwind switch grass', 'Pampas grass', 'Bamboo'],
    answer: 2,
  },
].map((element) => ({
  ...element,
  score: Math.round(Math.random() * 10 + 1) * 100,
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
  const selectedQuestions = shuffle([...QUESTION_BANK])
    .slice(0, 16)
    .sort((a, b) => {
      return a.score - b.score;
    })
    .map((question, index) => ({
      ...question,
      id: index,
      status: 'new',
      score_earned: 0,
    }));
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
  currentRound.questions = selectedQuestions;
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
  const { id, score, category, question, choices, status, score_earned } =
    currentRound.questions[req.params.qid] || {};
  res.send({
    id,
    score,
    category,
    status,
    score_earned,
    question,
    choices,
  });
});

app.post('/api/round/question/:qid', (req, res) => {
  const { userAnswer, passed } = req.body || {};
  console.log(JSON.stringify(passed));
  const currentQuestion = currentRound.questions[req.params.qid] || {};
  currentQuestion.status = passed ? 'passed' : 'answered';
  currentQuestion.userAnswer = passed ? -1 : userAnswer;
  if (passed) {
    currentQuestion.score_earned = 0;
  } else if (userAnswer === currentQuestion.answer) {
    currentQuestion.score_earned = currentQuestion.score;
  } else {
    currentQuestion.score_earned = currentQuestion.score * -1;
  }

  res.send({
    ...currentQuestion,
  });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
