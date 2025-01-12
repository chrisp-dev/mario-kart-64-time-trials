const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const timeTrialsRouter = require('./routes/timeTrials');

app.use(bodyParser.json());
app.use('/time_trials', timeTrialsRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
