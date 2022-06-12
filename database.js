
// Database ===> a bucket to hold data

// DBMS (Database management system) to manipulate data in database

// Relational DBMS
// Distributed DBMS


// database modelling
// LMS===> Books,Users,Reviews
// Books entity ==> attributes
// E-R diagram 

// Relational DBMS

// a. Table based design
// Entities for LMS ==> Books, Reviews, Users ===> table
// b. each record inside table are called tuples/row
// c. Schema based design 
// Schema will define the properties and its datatype for a table (user_id,dob,email,username,password,address with datatype json)
// {permanentAddr:'',temporartyAddr:''}
// d. Relation between table exists
// e. non -scalable
// f. eg MySQL, SQL-lite, postgres, SQL-Sever ....
// g. SQL database (Structured Query Language)

// Distributed DBMS
// a. Collection based design 
// Books, Review,Notifications ==> collections
// b. each record inside a collection ==> document
// document based database
// each document is valid JSON .
// c. Schema less design
// d. Relatinon between collection doesnot exists
// e. highly scalable==> no schema validaiton so any valid json can be stored
// f. eg MongoDB,dynamodb,couchdb,cosmosdb ,redis (in memory database)
// g. No-SQL database (Not Only SQL)

// MONGODB ==> MERN ==> M ==> MONGODB

// UI tool==> compass, robo3t,studio 3t
// installation of mongodb
// download ==> compass (uncheck)
// c drive ==> programme files
// mongodb/version4.2/bin ==> executable file
// copy path to bin folder
// we should add that path in syste varazibles path section
// my computer==> advanced ==> environmenet variables==> system variables

// MONGODB ==> document based database (NO SQL)


// client - server

// server ==> 27017 port server will be listening

// to connect with mongodb server use mongo command from any location
// > interface will be present once connection is established.

// mongoshell command

// show dbs ==> list all the available database of server

// use <db_name> if(db exists) select existing database else create new database and select it
// db ===> selected db

// once database is selected

// show collections ==> list all available collections

// CRUD operation
// Create ==> 

// db.<collection_name>.insert({valid json})
var laptops = [{
  name: 'xps',
  brand: 'dell',
  generation: 'i7',
  color: 'silver'
},
{
  name: 'elitebook',
  brand: 'hp',
  generation: 'i5',
  color: 'black'

}, {
  name: 'legion',
  brand: 'lenovo',
  generation: 'i7',
  color: 'black'
}, {
  name: 'notebook',
  brand: 'hp',
  generation: 'i5',
  color: 'red'
}, {
  name: 'thinkpad',
  brand: 'lenovo',
  generation: 'i7',
  color: 'black'
}, {
  name: 'macbook pro',
  brand: 'apple',
  generation: 'i9',
  color: 'black'
}, {
  name: 'macbook air',
  brand: 'apple',
  generation: 'i5',
  color: 'silver'
}]

// db.<collection_name>.insert (bulk data)
// db.<collection_name>.insertMany(bulk data);




// Read
// db.<collection_name>.find({query_builder}) // ouput result from query builder
// db.<collection_name>.find({query_builder}).pretty() // formats output 
// db.<collection_name>.find({query_builder}).count() // returns length of result

// sort
// db.<collection_name>.sort({_id:-1})

// limit 
// db.<collection_name>.limit(100)

// skip
// db.<collection_name>.skip(skip_count)


// tofind from array
// &in  ==> logical OR
// &all  ...> logical AND operator

// &gt==> greater than
// &gte -==> greater than equals
// $lt==> less than
// $lte =>> les than equals

// #projection either inclusion or exclusion


// Update
// db.<collection_name>.update({},{},{})
// 1st object ==> query builder
// 2nd object ==> key value pair 
// key as $set and value as payload(object) to be updated
// 3rd object ==> options ==> optional
// eg db.<collection_name>.update({},{$set:{payload}},{multi:true,upsert:true})

// Delete
// db.<collection_name>.remove({query builder})
// NOTE ==> Do Not leave query builder empty ==> it will remove all documents


// drop collection
// db.<collection_name>.drop();

// drop database 
// db.dropDatabase();

// aggregation
// 

// const books = {
//   reviews: [{}, {}, {}, {}],
//   notification:[{},{},{}],
  
// }

// ODM ==> Object Document Modellings

// advantages
// 1. Schema Based Solution
// 
// 2. Datatypes 
// 
// 3. Methods
// 4. Middlewares
// 5. indexing is lot more easier

// ##################### DB BACKUP & RESTORE ############################
// mongodump , mongorestore
// mongoexport,mongoimport

// bson and json/csv

// bson
// BACKUP 
// command ==> mongodump
// mongodump ==> create a backup folder with bson data 
// [creates default dump folder to store bson data]
// mongodump --db <selected database name> // backups selected database inside default dump folder
// mongodump --db <selected database name> --out < path to destination_folder> 
// path can be any dynamic name

// RESTORE
// mongorestore ==> it will look after dump folder to restore bson backup database
// mongorestore --drop ==> restore incoming document droping duplicated existing documents
// mongorestore <path_to-source folder> // restore from other then dump folder


// JSON 
// backup ==>
// command  mongoexport 
// mongoexport --db <db_name> --collection<collection_name> --out <path_to_destinatio_with.csv extension>

// restore 
// mongoimport --db[new or existing db] -- collection <new or existing db> <path to  json source file>

// CSV
// command ==> mongoexport and mongoimport
// backup
// command mongoexport
// mongoexport --db <db_name> --collection<collection_name>  --query='{key:"value",key:"value"}' --type=csv --fields 'comma seperated propertyname to indentify column header' --out <path-to-destination-with .csv extension>
// mongoexport -d <db_name> -c <collection_name> --csv -q ='{"key":"value"}' -f 'comma seperated propertyname to indentify column header' -o <path-to-destination-with .csv extension>


// restore
// mongoimport --db<new or existing db> --colection <new or existing collection> --type=csv <path_to_csv_source_file> --headerline
// ##################### DB BACKUP & RESTORE ############################