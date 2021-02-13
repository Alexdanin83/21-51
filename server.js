const express = require('express')
const app = express();
const path = require('path');
const cors = require('express-cors');
app.use(cors());
app.use(
  cors()
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

const testimonials = require('./routes/testimonials.router');
const concerts = require('./routes/concerts.router');
const seats = require('./routes/seats.router');

app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
app.use((req, res) => {
  res.status(404).json({message: 'Not found...'});
})


app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
