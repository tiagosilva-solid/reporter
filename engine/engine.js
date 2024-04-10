module.exports = (req, res) => {
  const fs = require('fs');
  const moment = require('moment');

  var params = req.params;
  var date = moment(new Date()).format("DD-MM-YYYY-HH:MM:SS");
  var date_day_only = moment(new Date()).format("DD-MM-YYYY");
  var req_body = "";

  if (JSON.stringify(req.body.request.requestBody) == '{}') {
    req_body = req.body.request.requestBody;
  } else {
    req_body = JSON.parse(req.body.request.requestBody.raw);
  };

  var reply = req.body;

  var reportdir = `${params.name}`;

  if (!fs.existsSync(`./reports`)) {
    fs.mkdirSync(`./reports`);
  }

  if (!fs.existsSync(`./reports/${date_day_only}`)) {
    fs.mkdirSync(`./reports/${date_day_only}`);
  }

  if (!fs.existsSync(`./reports/${date_day_only}/${reportdir}`)) {
    fs.mkdirSync(`./reports/${date_day_only}/${reportdir}`);
  }

  fs.writeFile(
    `./reports/${date_day_only}/${reportdir}/${req.body.request.requestType.toUpperCase()}-${
      params.name.replace(/\s/g, '')}-${date}.json`,
      JSON.stringify(reply, null, "\t"),
    (err) => {
      if (err) throw err;
      console.log('Saved!');
    }
  );
  res.sendStatus(200);
};
