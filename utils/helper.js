const fs = require('fs');
const path = require('path');

const clearImage = (filePath, cb) => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    }
    if (cb) {
      cb(err); // Pass the error to the callback if provided
    }
  });
};

module.exports = clearImage;
