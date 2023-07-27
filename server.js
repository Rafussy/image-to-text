const express = require('express');
const Tesseract = require('tesseract.js');
const cors = require('cors');

const app = express();
app.use(express.json()); // This will parse the request body as JSON
app.use(cors());

// Replace 'YOUR_OCR_API_KEY' with your actual OCR API key
const OCR_API_KEY = 'K89622191088957';

app.post('/ocr', (req, res) => {
  const imageDataURL = req.body.imageDataURL;
  if (imageDataURL) {
    Tesseract.recognize(imageDataURL, 'eng', { logger: m => console.log(m), apiKey: OCR_API_KEY })
      .then(result => {
        res.json({ text: result.text });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'OCR processing failed' });
      });
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
