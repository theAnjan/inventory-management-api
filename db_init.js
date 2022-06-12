const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config')

// mongodb://localhost:27017/db_name

mongoose.connect(dbConfig.conxnURL + '/' + dbConfig.dbName, function (err, done) {
  if (err) {
    console.log('db connection failed', err)
  } else {
    console.log('db connection successfull')
  }
})