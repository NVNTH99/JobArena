const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();

router.use(express.static(path.join(__dirname, 'React', 'dist')));

router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'React', 'dist', 'index.html'));
});

app.use('/', router);

const server = app.listen(5173, () => {
  console.log(`Server is running on port 5173`);
});
