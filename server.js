const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Create 'uploads' folder if it doesn't exist
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, 'inputFile.xls'); // Static filename to keep things simple
  },
});

const upload = multer({ storage });

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('✅ File uploaded:', req.file.path);

  // Macro triggering will be added in Step 4
  res.status(200).json({ message: 'File uploaded successfully!' });
});

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
