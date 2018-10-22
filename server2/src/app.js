let mysql = require('mysql')
const express = require('express')
const app = express()

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nmpcd',
  debug: false,
  multipleStatements: true
})

app.listen(8082, () => {
  console.log('Server is up and listening on 8082 port ...')
})

app.get('/info/GP/:GenName', (req, res) => {
  console.log('Fetching user with id :' + req.params.GenName)
  const GenName = req.params.GenName+"%"
  console.log(GenName)
  var sql = "SELECT GPID , FSN FROM gp WHERE FSN LIKE ?;SELECT GPUID , FSN FROM gpu WHERE FSN LIKE ?;";
  connection.query(sql, [GenName,GenName], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users : ' + err)
      res.sendStatus(500)
      return
    }
    //console.log('Successfully')
    
    const info1 = rows[0].map((row) => {
      return {
        GPID : row.GPID ,
        FSN_GPID : row.FSN ,
      }
    })

    const info2 = rows[1].map((row) => {
      return {
        GPUID : row.GPUID ,
        FSN_GPUID : row.FSN
      }
    })
    
    var result =  {
      GP: info1,
      GPU: info2
    };

    res.json(result)
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
