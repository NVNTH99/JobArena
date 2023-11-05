const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'React', 'dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'React', 'dist','index.html'));
});

// app.get('/home', (req, res) => {
//   res.sendFile(path.join(__dirname, 'React', 'dist','index.html'));
// });

// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname, 'React', 'dist','index.html'));
// });

// app.get('/signup', (req, res) => {
//     res.sendFile(path.join(__dirname, 'React', 'dist','index.html'));
//   });
  

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'React', 'dist','index.html'));
// });

app.listen(5173, () => {
  console.log(`Server is running on port 5173`);
});