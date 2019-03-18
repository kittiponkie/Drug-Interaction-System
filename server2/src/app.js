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

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

app.get('/info/:GenName', (req, res) => {
  console.log('Fetching user with id :' + req.params.GenName)
  const GenName = req.params.GenName + " %"
  var CheckGenName
  console.log(GenName)
  var sql = "SELECT GPID , FSN FROM gp WHERE FSN LIKE ?;SELECT GPUID , FSN FROM gpu WHERE FSN LIKE ?;SELECT * FROM tp WHERE TPID IN ( SELECT TPID FROM gptotp WHERE GPID IN ( SELECT GPID FROM gp WHERE FSN LIKE ? )); SELECT * FROM tpu WHERE TPUID IN ( SELECT TPUID FROM tptotpu WHERE TPID IN ( SELECT TPID FROM gptotp WHERE GPID IN ( SELECT GPID FROM gp WHERE FSN LIKE ? )));";

  connection.query(sql, [GenName, GenName, GenName, GenName], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users : ' + err)
      res.sendStatus(500)
      return
    }


    if (CheckGenName == 0) {
      var sql2 = "SELECT * FROM gp WHERE GPID IN ( SELECT GPID FROM gptotp WHERE TPID IN ( SELECT TPID FROM tp WHERE FSN LIKE ?));SELECT * FROM gpu WHERE GPUID IN (SELECT GPUID FROM gptogpu WHERE GPID IN (SELECT GPID FROM gp WHERE GPID IN ( SELECT GPID FROM gptotp WHERE TPID IN ( SELECT TPID FROM `tp` WHERE FSN LIKE ?))));";
      var sql3 = "SELECT * FROM tp WHERE FSN LIKE ?;SELECT * FROM tpu WHERE TPUID IN ( SELECT TPUID FROM tptotpu WHERE TPID IN (SELECT TPID FROM tp WHERE FSN LIKE ?));";
      connection.query(sql2 + sql3, [GenName, GenName, GenName, GenName], (err, rows, fields) => {
        if (err) {
          console.log('Failed to query for users : ' + err)
          res.sendStatus(500)
          return
        }

        var row2 = Object.values(rows)
        const info1 = row2[0].map((row) => {
          return {
            GPID: row.GPID,
            FSN_GPID: row.FSN
          }
        })
        const info2 = row2[1].map((row) => {
          return {
            GPUID: row.GPUID,
            FSN_GPUID: row.FSN
          }
        })
        const info3 = row2[2].map((row) => {
          return {
            TPID: row.TPID,
            FSN_TPID: row.FSN,
            MANUFACTURER: row.MANUFACTURER,
            CHANGEDATE: row.CHANGEDATE
          }
        })
        const info4 = row2[3].map((row) => {
          return {
            TPUID: row.TPUID,
            FSN_TPUID: row.FSN,
            MANUFACTURER: row.MANUFACTURER,
            CHANGEDATE: row.CHANGEDATE
          }
        })

        var result = {
          CheckGenName: CheckGenName,
          GP: info1,
          GPU: info2,
          TP: info3,
          TPU: info4
        };
        res.json(result)
      })
    }
    else {
      const info1 = rows[0].map((row) => {
        return {
          GPID: row.GPID,
          FSN_GPID: row.FSN
        }
      })
      const info2 = rows[1].map((row) => {
        return {
          GPUID: row.GPUID,
          FSN_GPUID: row.FSN
        }
      })
      const info3 = rows[2].map((row) => {
        return {
          TPID: row.TPID,
          FSN_TPID: row.FSN,
          MANUFACTURER: row.MANUFACTURER,
          CHANGEDATE: row.CHANGEDATE
        }
      })
      const info4 = rows[3].map((row) => {
        return {
          TPUID: row.TPUID,
          FSN_TPUID: row.FSN,
          MANUFACTURER: row.MANUFACTURER,
          CHANGEDATE: row.CHANGEDATE
        }
      })

      var result = {
        CheckGenName: CheckGenName,
        GP: info1,
        GPU: info2,
        TP: info3,
        TPU: info4
      };
      res.json(result)
    }
  })
})


app.get('/CompleteInfo/GPID', (req, res) => {

  var sql = "SELECT * FROM `vtm` WHERE FSN NOT LIKE '%+%' AND FSN NOT LIKE '%,%' ;";

  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users : ' + err)
      res.sendStatus(500)
      return
    }

    const info1 = rows.map((row) => {
      return row.FSN

    })

    var result = {
      GP: info1
    };

    res.json(result);
    //save file
    console.log(result)
    var fs = require('fs');
    fs.writeFile('message.txt', JSON.stringify(result),
      function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
      }
    )
  })
})


app.get('/CompleteInfo/VTM', (req, res) => {

  var sql = "SELECT * FROM `vtm` WHERE FSN NOT LIKE '%+%' AND FSN NOT LIKE '%,%' ;";

  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users : ' + err)
      res.sendStatus(500)
      return
    }

    const info1 = rows.map((row) => {
      return row.FSN
    })

    var result = {
      VTM: info1
    };

    res.json(result);
    //save file
    console.log(result)
    var fs = require('fs');
    fs.writeFile('message.txt', JSON.stringify(result),
      function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
      }
    )
  })
})

// Check allergic drug ฺBy VtMname  - return list of GPID Drug 
app.get('/Allergic/:VTMName', (req, res) => {
  console.log('Fetching VTM :' + req.params.VTMName)
  const VTMName = "%" + req.params.VTMName + "%"
  console.log(VTMName)
  var sql = "SELECT * FROM gp WHERE GPID IN (SELECT GPID FROM vtmtogp WHERE VTMID IN (SELECT VTMID FROM `vtm` WHERE FSN LIKE ? ))";

  connection.query(sql, [VTMName], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users : ' + err)
      res.sendStatus(500)
      return
    }

    const info1 = rows.map((row) => {
      return {
        GPID: row.GPID
      }
    })

    var result = {
      GP: info1
    };

    res.json(result)

  })

})


// Search GPID By GPName 
app.get('/Allergic/GP/:GPName', (req, res) => {
  console.log('Fetching GP :' + req.params.GPName)
  const GPName = req.params.GPName
  var sql = "SELECT GPID FROM gp WHERE FSN LIKE ? ";

  connection.query(sql, [GPName], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users : ' + err)
      res.sendStatus(500)
      return
    }

    const info1 = rows.map((row) => {
      return {
        GPID: row.GPID
      }
    })

    var result = {
      GP: info1
    };

    res.json(result)

  })
})