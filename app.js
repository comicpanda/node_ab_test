const express = require('express')
const app = express()
const port = 3000

const mysql = require('mysql');
const connectionPool = mysql.createPool({
  connectionLimit : process.env.DB_POOL_LIMIT || 10,
  host     : process.env.DB_HOST || 'localhost',
  user     : process.env.DB_USER || 'cpu',
  password : process.env.DB_PASS,
  database : process.env.DB_NAME || 'comicpanda',
});

app.get('/', (req, res) => { 
	connectionPool.getConnection(function(poolErr, connection) {
	  if (poolErr) {
		console.error(poolErr);
		throw poolErr;
	  }

	  connection.query('update ad_campaign set spent_cnt=spent_cnt+1 where id=9', function (error, results) {
		if (error) {
		  console.error(error);
		  throw error;
		}
		connection.release();
		res.send('Hello World!!!!')
	  });
	});

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
