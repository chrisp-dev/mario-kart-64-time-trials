const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const bodyParser = require('body-parser');
const timeTrialsRouter = require('./routes/timeTrials');
const winston = require('winston');

// Configure winston logger
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ]
});

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

app.use(cors({
  origin: 'http://localhost:5173', // Ensure this matches your frontend's address and port
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(bodyParser.json());
app.use(morgan('dev')); // Enable logging
app.use('/time_trials', timeTrialsRouter);

// Error-handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      details: err.details || 'Internal Server Error'
    }
  });
});

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
