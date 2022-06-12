// import fs module

const fs = require('fs');

// write

// fs.writeFile('./files/abcd.txt', 'welcome to nodejs', function (err, done) {
//   if (err) {
//     console.log('file writing failure', err);
//   }
//   else {
//     console.log('success in write File')
//   }
// });

function myWrite(filename, content) {
  return new Promise(function (resolve, reject) {
    fs.writeFile('./files/' + filename, content, function (err, done) {
      if (err) {
        reject(err)
      }
      else {
        resolve(done)
      }
    })
  })

}

fs.readFile('./files/kishor.txt','UTF-8', function (err, done) {
  if (err) {
    console.log('error reading >>', err);
  }
  else {
    console.log('success in reading >>', done)
  }
})

// rename
// fs.rename(oldPath, newPath,cb);

// remove
// fs.unlink(path,cb)

// your task
// make it functional
// export from this file
// import in another file and execute
// handle result through callback and promise

module.exports = {
  w: myWrite
}