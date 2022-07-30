const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const app = express();
const storage = require('sessionstorage');

// Function to upload the image
function uploadImage(params) {
  const store = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, '../static/images/'); },

    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      storage.setItem('img_url', file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  var upload = multer({ storage: store })
  return upload;
}

// Home 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/last.html');
});

// sending to db
app.post('/save', uploadImage().single('image'), async (req, res) => {
  
  console.log(req.file);

  const img_url = storage.getItem('img_url');

  console.log(img_url);

  const animal_at_farm = {
    type: req.body.animal_type,
    number: req.body.number,
    image_url: storage.getItem('img_url'),
    desc: req.body.description
  }

  console.log([animal_at_farm]);

  res.redirect('/');
});

app.listen(4400);