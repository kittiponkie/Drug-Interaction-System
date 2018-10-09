let mysql = require('mysql')
const express = require('express')
const app = express()

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nmpcd'
})

app.listen(8082, () => {
  console.log('Server is up and listening on 8082 port ...')
})

app.get('/', (req, res) => {
  console.log('Responding to root route')
  // console.log("Fetching user with id : "+ req.params.id)

  const query = 'SELECT TPID , FSN FROM tp WHERE 1 ;'
  connection.query(query, (err, rows, fields) => {
    console.log('Successfully')
    res.json(rows)
  })
  // res.end()
})

app.get('/info/TP/:tpid', (req, res) => {
  console.log('Fetching user with id :' + req.params.tpid)
  const tpid = req.params.tpid
  const query = 'SELECT TPID , FSN FROM tp WHERE TPID = ? ;'
  connection.query(query, [tpid], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users : ' + err)
      res.sendStatus(500)
      return
    }
    console.log('Successfully')

    const info = rows.map((row) => {
      return {FSN: row.FSN}
    })

    // res.json(rows)
    res.json(info)
  })
  // res.end()
})
