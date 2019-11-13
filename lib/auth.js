var jwt = require('jsonwebtoken');

exports.bearerAuth = (req,res, next) => {
  var decoded = jwt.verify(req.headers.somekey, 'gbf4wregwgr4e63resg');
  res.send(decoded) // bar
};