var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'us-cdbr-iron-east-05.cleardb.net',
  user            : 'b0811f7622ae23',
  password        : '66e91e80',
  database        : 'heroku_01a48867654ad9f'
});

pool.getConnection(function(err, connection) {
  if (err) throw err
  console.log('You are now connected...')
});

module.exports.pool = pool;