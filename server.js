const express = require('express');
const bp = require('body-parser');
const app = express();
const morgan = require('morgan');

const port = process.env.PORT || 3017;

app.use(morgan('dev'));
app.use(bp.json());

const submitReport = require('./engine/engine');

app.post('/report/:name', submitReport);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
