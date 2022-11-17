const express = require('express');


// First challenge
const helmet = require('helmet');


const app = express();


// Second challenge
app.use(helmet.hidePoweredBy());

// Third challege (IFrame control)
app.use(helmet.frameguard({ action: 'deny' }));

// Fourth challenge
app.use(helmet.xssFilter());

// Fifth challenge
app.use(helmet.noSniff());

// Sixth challenge
app.use(helmet.ieNoOpen());

// Sebenth challenge
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;

app.use(helmet.hsts({
  maxAge: ninetyDaysInSeconds, /*timeInSeconds*/
  force: true
}));

// Eigth challenge
app.use(helmet.dnsPrefetchControl());

// Nineth challenge
app.use(helmet.noCache());

// Tenth challenge
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'trusted-cdn.com'],
    },
  }),
);


// Eleventh challenge
// no tests - it's a descriptive challenge




module.exports = app;

const api = require('./server.js');

app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});



