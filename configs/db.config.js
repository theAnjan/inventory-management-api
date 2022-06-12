
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbName = 'group40db';
const conxnURL = 'mongodb://localhost:27017';
const OID = mongodb.ObjectId;

module.exports = {
  MongoClient,
  dbName,
  conxnURL,
  OID

}