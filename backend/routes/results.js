const express = require('express');
const router = express.Router();
const logger = require('../logger');

router.post('/', (req, res) => {
  const { text } = req.body;
  if (!text) {
    logger.error('No text provided in the request body');
    return res.status(400).json({ error: 'No text provided' });
  }

  // Process the text as needed
  logger.info(`Received OCR text: ${text}`);

  // Respond with a success message
  res.status(200).json({ message: 'OCR text received successfully' });
});

module.exports = router;