const express = require('express')
const app = express()
app.use(express.json());

const testimonials = require('./routes/testimonials.router');
const concerts = require('./routes/concerts.router');
const seats = require('./routes/seats.router');
app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);

app.use((req, res) => {
  res.status(404).json({message: 'Not found...'});
})


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
