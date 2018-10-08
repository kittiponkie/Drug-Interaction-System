let mysql = require('mysql')
const express = require('express')
const app = express()

app.listen(8082, () => {
  console.log('Server is up and listening on 8082 port ...')
})

app.get('/', (req, res) => {
  console.log('Responding to root route')
  // console.log("Fetching user with id : "+ req.params.id)

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nmpcd'
  })

  const query = 'SELECT TPID , FSN FROM tp WHERE 1 ;'
  connection.query(query, (err, rows, fields) => {
    console.log('Successfully')
    res.json(rows)
  })

  // res.end()
})
