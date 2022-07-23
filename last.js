const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const app = express();

const store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/images/');
  },

  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage: store })


function uploadImage(params) {
  const store = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'static/images/');
    },
  
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  var upload = multer({ storage: store })
  return upload;
}


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/last.html');
});

app.post('/save', uploadImage().single('image'), async (req, res) => {
  console.log(req.file.originalname);
  res.redirect('/');
});

app.listen(4400);