// post.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db/db.js');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
//  Math.floor(Math.random() * max) + 1
}
// get all posts
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});
router.route('/concerts/:id').get((req, res) => {
  if ((req.params.id)=='random')   {

  //  res.json(db.concerts.filter(item=> (item.id == getRandomInt(db.concerts.length) )));
   res.json(db.concerts[getRandomInt(db.concerts.length)]);
  } else {
    res.json(db.concerts.filter(item=> (item.id ==req.params.id )));
  }
});
router.route('/concerts').post((req, res) => {
    //db.product.push(JSON.stringify(req.body))
    db.concerts.push(req.body)
      res.json({ message: 'OK' });
  /*
postman-> body->raw-> json
  {
    "id": "6",
    "author": "golden retriever",
    "text": "test"
}*/
  }
)
router.route('/concerts/:id').put((req, res) => {
    db.concerts[req.params.id]=req.body;
    res.json({ message: 'OK' });
});
router.route('/concerts/:id').delete((req, res) => {
  //  delete db.concerts[req.params.id];
  db.concerts.filter(item=> (item.id !=req.params.id ));
      res.json({ message: 'OK' });

});


module.exports = router;
