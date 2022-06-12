const express = require('express');
const morgan = require('morgan');
const path = require('path');

// import routing level middleware
const apiRouter = require('./routes/api.route')

const app = express();
const PORT = 4000;

require('./db_init'); // part of app.js file run db_init file

//***** */ view engine setup*******
app.set('view engine', require('pug'))
app.set('views', path.join(process.cwd(), 'views'))

//***** */ view engine setup*******


// load third party middleware
app.use(morgan('dev'))

// inbuilt middleware
// serve static content
app.use('/file', express.static(path.join(process.cwd(), 'uploads')))
// parse incoming data
// url-encoded parser
app.use(express.urlencoded({
  extended: true
}))

// json parser
app.use(express.json())
// this middleware will parse incoming data with content type x-www-formurlencoded
// and parsed data will be added in req.body property


// load routing level middleware
// mounting

app.use('/api', apiRouter)

// 404 not found handler
app.use(function (req, res, next) {
  next({
    msg: 'Not Found',
    status: 404
  })
})

// error handling middleware
// middleware with 4 arguments is error handling middleware 
// followed by
// 1st arg error
// and req,res,next
// error handling middleware must be called
// next with argument from anywhere in a application will invoke error handling middleware
app.use(function (err, req, res, next) {
  console.log('error is >>', err)
  // send error response of whole application from here
  // TODO set status code in response for error response
  res.json({
    status: err.status || 400,
    msg: err.msg || err
  })
})


app.listen(PORT, function (err, done) {
  if (err) {
    console.log('server listening failed ', err)
  } else {
    console.log('server listening at port', PORT)
  }
})


// middleware

// middleware is a function which has access to
// http request object
// http response object
// next middleware function reference

// Note ===> middleware always came into action in between req-res cycle

//  Note ==> the order of middleware is very important

// developer's role ==> once requested is received appropriate response must be sent
// data parse,
// data validation
// db stuff
// response end

// syntax
// function(req,res,next){
//   // req or 1st arg is http request object
//   // res or 2nd arg is http response object
//   // next or 3rd arg is next middleware function reference
// }

// usage configuration
// use, http verb, all

// app.use(function(req,res,next){
//   // middleware function
// })

// types of middleware
// 1. application level middleware
// 2. Routing Level middleware
// 3. Third party middleware
// 4. inbuilt middleware
// 5. error handling middleware

// application level middleware
// midleware having direct access(scope) of http request object http response object and next is application level middleware


// when client server communication is made exchange of data occurso 
// data is categorized according to their content type
// sender(client) amnd server is responsible to define the content type of data to be echanged

// incoming data must be parsed by server to access data according to their conten-type
// if form-data ==> form-data parser
// if -json ==>json parser
// if x-www-formurl-encoded ==> urlencoded parser

// server setup
// incoming request handle
// db stuff
// db modelling
// CRUD

// to learn
// REST API
// DB_backup restore
// aggregation
// Email sending/ socket server
