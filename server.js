const http = require('http');
const fileOp = require('./main')
const server = http.createServer(function (req, res) {
  console.log('client connected to http server');
  // req ==> http request
  // res ===>http response
  const url = req.url;
  if (url === '/write') {
    // challanges try to use dynamic value from url
    fileOp.w(' ', 'i am random')
      .then(function (data) {
        res.end('successfull')
      })
      .catch(function (err) {
        res.end('error in writing' + err)
      })
  }
  else if(url ==='/read'){
    // readoperation
  }
  else {
    res.end('nothing to perform')
  }

  // req-res cycle must be completed
  // to complete req-res cycle server should send response to requesting client
  // regardless of http url and http method this callback will be executed
  // res.end('welcome to nodejs server')
  // to end response use response.end() method
})

server.listen(4040, function (err, done) {
  if (err) {
    console.log('server listening failed', err);
  } else {
    console.log('server listening at port 4040');
    console.log('press CTRL + C to exit')
  }
})

// express
// sails,hapi,koa

// API framework
// loobback, actionhero

// web architecture (3 tier architecture)
// MVC
// seperation of concerns
// Models (data layer)
// Views (presentation layer)
// controllers (controller layer)