const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const logger = require('winston');

const port = process.env.PORT || 3000;
const app = express();

app.use(helmet({
  noCache: true
}));
app.use(compression());
app.get('/version', require('version-healthcheck'));
app.get('/service-worker.js', function (req, res) {
  res.sendFile(path.join(__dirname, '/service-worker.js'));
});
app.use(express.static(__dirname + '/build/default'));

app.listen(port, function (err) {
  if (err) {
    logger.info(err);
  } else {
    logger.info(`Server is Running with port ${port}`);
  }
});
