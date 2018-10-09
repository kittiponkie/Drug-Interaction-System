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

app.get('/info/GP/:GenName', (req, res) => {
  console.log('Fetching user with id :' + req.params.GenName)
  const GenName = req.params.GenName+"%"
  console.log(GenName)
  const query = 'SELECT GPID , FSN FROM gp WHERE FSN LIKE ? ;'
  connection.query(query, [GenName], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users : ' + err)
      res.sendStatus(500)
      return
    }
    //console.log('Successfully')
    const info = rows.map((row) => {
      return {
        GPID : row.GPID ,
        FSN : row.FSN}
    })
    res.json(info)
  })
})
app.get('/info/GPU/:GenName', (req, res) => {
  console.log('Fetching user with id :' + req.params.GenName)
  const GenName = req.params.GenName+"%"
  console.log(GenName)
  const query = 'SELECT GPUID , FSN FROM gpu WHERE FSN LIKE ? ;'
  connection.query(query, [GenName], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users : ' + err)
      res.sendStatus(500)
      return
    }
    //console.log('Successfully')
    const info = rows.map((row) => {
      return {
        GPID : row.GPUID ,
        FSN : row.FSN}
    })
    res.json(info)
  })
})
app.get('/info/TP/:GenName', (req, res) => {
  console.log('Fetching user with id :' + req.params.GenName)
  const GenName = req.params.GenName+"%"
  console.log(GenName)
  const query = 'SELECT TPID , FSN FROM tp WHERE FSN LIKE ? ;'
  connection.query(query, [GenName], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users : ' + err)
      res.sendStatus(500)
      return
    }
    //console.log('Successfully')
    const info = rows.map((row) => {
      return {
        GPID : row.TPID ,
        FSN : row.FSN}
    })
    res.json(info)
  })
})
app.get('/info/TPU/:GenName', (req, res) => {
  console.log('Fetching user with id :' + req.params.GenName)
  const GenName = req.params.GenName+"%"
  console.log(GenName)
  const query = 'SELECT TPUID , FSN FROM tpu WHERE FSN LIKE ? ;'
  connection.query(query, [GenName], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users : ' + err)
      res.sendStatus(500)
      return
    }
    //console.log('Successfully')
    const info = rows.map((row) => {
      return {
        GPID : row.TPUID ,
        FSN : row.FSN}
    })
    res.json(info)
  })
})
