const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.static('public'));
app.use(express.json());

// Load existing data or create empty file
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]');
}

app.post('/api/generate', (req, res) => {
  const { publisher, format, suffix, artist, title } = req.body;

  let data = JSON.parse(fs.readFileSync(DATA_FILE));

  const usedNumbers = data
    .filter(item => item.publisher === publisher)
    .map(item => parseInt(item.number));

  const nextNumber = usedNumbers.length > 0
    ? Math.max(...usedNumbers) + 1
    : 1;

  const paddedNumber = String(nextNumber).padStart(3, '0');

  let catalogNumber = `${publisher}-${paddedNumber}-${format}`;
  if (suffix) catalogNumber += `-${suffix}`;

  const newEntry = { publisher, number: paddedNumber, format, suffix, artist, title };
  data.push(newEntry);

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  res.json({ catalogNumber });
});

app.listen(PORT, () => {
  console.log(`Catalog Generator running at http://localhost:${PORT}`);
});
