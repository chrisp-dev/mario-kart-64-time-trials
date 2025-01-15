const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const bodyParser = require('body-parser');
const timeTrialsRouter = require('./routes/timeTrials');

app.use(cors({
  origin: 'http://localhost:3000', // Ensure this matches your frontend's address and port
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(bodyParser.json());
app.use(morgan('dev')); // Enable logging
app.use('/time_trials', timeTrialsRouter);

async function ensureDatabaseExists() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}

ensureDatabaseExists().then(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});

// Ensure Prisma Client is properly disconnected on server shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
