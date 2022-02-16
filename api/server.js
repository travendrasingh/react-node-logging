var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var logger = require('./WinstonLogger');

require('dotenv').config();
var { routes } = require('./src/routes/');
var app = express();

var cors = require('cors');
app.use(cors());

app.options("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.get("Origin") || "*");
  res.header("Access-Control-Allow-Origin: *");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.status(200).end();
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'ejs');

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/public', express.static(path.join(__dirname, './public')));

app.use(express.static(path.join(__dirname, '../app/build')));

app.use(function (req, res, next) {
  req.setTimeout(0)
  next()
})

routes(app);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/build/index.html'));
});

app.listen(process.env.PORT, function (err) {
  if (err) {
    logger.error(err)
    return;
  }
  console.log('Listening at ' + (process.env.URL));
});