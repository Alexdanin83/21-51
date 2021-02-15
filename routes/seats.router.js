
// post.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db/db.js');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
//  Math.floor(Math.random() * max) + 1
}
// get all posts
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});
router.route('/seats/:id').get((req, res) => {
  if ((req.params.id)=='random')   {

  //  res.json(db.seats.filter(item=> (item.id == getRandomInt(db.seats.length) )));
   res.json(db.seats[getRandomInt(db.seats.length)]);
  } else {
    res.json(db.seats.filter(item=> (item.id ==req.params.id )));
  }
});
router.route('/seats').post((req, res) => {
//sprawdzamy czy w tablicy mamy już zajęte

  if (!( db.seats.some(number => (number.seat === req.body.seat && number.day === req.body.day)))) {
    console.log(req.body.seat);
    db.seats.push({
    id: db.seats.length+1,
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email }
    );
    //db.seats.push(req.body)
    res.json({ message: 'OK' });
    //  socket.emit('updateData', tasks);
    console.log(db.seats);
     req.io.emit('seatsUpdated', db.seats);
  }
else
  res.json({ message: 'The slot is already taken...' });
  /*
postman-> body->raw-> json
  {
    "id": "6",
    "author": "golden retriever",
    "text": "test"
}*/
  }
)
router.route('/seats/:id').put((req, res) => {
    db.seats[req.params.id]=req.body;
    res.json({ message: 'OK' });
});
router.route('/seats/:id').delete((req, res) => {
  //  delete db.seats[req.params.id];
  db.seats.filter(item=> (item.id !=req.params.id ));
      res.json({ message: 'OK' });

});


module.exports = router;
