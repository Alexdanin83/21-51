// post.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db/db.js');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
//  Math.floor(Math.random() * max) + 1
}
// get all posts
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});
router.route('/testimonials/:id').get((req, res) => {
  if ((req.params.id)=='random')   {

  //  res.json(db.testimonials.filter(item=> (item.id == getRandomInt(db.testimonials.length) )));
   res.json(db.testimonials[getRandomInt(db.testimonials.length)]);
  } else {
    res.json(db.testimonials.filter(item=> (item.id ==req.params.id )));
  }
});
router.route('/testimonials').post((req, res) => {
    //db.product.push(JSON.stringify(req.body))
    db.testimonials.push(req.body)
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
router.route('/testimonials/:id').put((req, res) => {
    db.testimonials[req.params.id]=req.body;
    res.json({ message: 'OK' });
});
router.route('/testimonials/:id').delete((req, res) => {
  //  delete db.testimonials[req.params.id];
  db.testimonials.filter(item=> (item.id !=req.params.id ));
      res.json({ message: 'OK' });

});


module.exports = router;
