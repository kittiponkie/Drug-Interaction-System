const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const axios = require('axios')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/post', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
})

app.listen(process.env.PORT || 8081)

var mongoose = require('mongoose');
mongoose.connect('mongodb://Win:winwin@cluster0-shard-00-00-koz3g.mongodb.net:27017,cluster0-shard-00-01-koz3g.mongodb.net:27017,cluster0-shard-00-02-koz3g.mongodb.net:27017/DrugInteraction?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection Succeeded");
});

var PatientInfo = require("../models/Patient");
var DoctorInfo = require("../models/Doctor");
var AllergicDrug = require("../models/AllergicDrug")
var Account = require("../models/Account")
var AccountRelation = require("../models/AccountRelation")

// PatientInfo
// Fetch single post
app.get("/PatientInfo/:Id", (req, res) => {
  console.log('GET method')
  const id = req.params.Id;
  PatientInfo.find({ "_id": id })
    .exec()
    .then(doc => {
      console.log(id);
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });

});

// Fetch all posts
app.get("/PatientInfo", (req, res, next) => {
  console.log('GET method')
  PatientInfo.find()
    .exec()
    .then(docs => {
      console.log(docs);
      if (docs.length >= 0) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: 'No entries found'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

app.post('/post/PatientInfo', (req, res) => {
  var db = req.db;
  var PatientID = req.body.PatientID
  var Prefix = req.body.Prefix
  var Firstname = req.body.Firstname
  var Lastname = req.body.Lastname
  var Sex = req.body.Sex
  var DOB = req.body.DOB
  var Age = req.body.Age
  var Email = req.body.Email
  var Weight = req.body.Weight
  var Height = req.body.Height
  var IDcardNumber = req.body.IDcardNumber
  var Status = req.body.Status
  var Race = req.body.Race
  var Nation = req.body.Nation
  var Religion = req.body.Religion
  var Bloodgroup = req.body.Bloodgroup
  var Address = req.body.Address
  var Phone = req.body.Phone

  var new_Patient = new PatientInfo({
    PatientID: PatientID,
    Prefix: Prefix,
    Firstname: Firstname,
    Lastname: Lastname,
    Sex: Sex,
    DOB: DOB,
    Age: Age,
    Email: Email,
    Weight: Weight,
    Height: Height,
    IDcardNumber: IDcardNumber,
    Status: Status,
    Race: Race,
    Nation: Nation,
    Religion: Religion,
    Bloodgroup: Bloodgroup,
    Address: Address,
    Phone: Phone
  })
  new_Patient.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

app.put("/update/PatientInfo/:Id", (req, res, next) => {
  console.log("POST Method")
  var id = req.params.Id
  PatientInfo.findOne({ _id: id }, function (err, foundObject) {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        res.status(404).send()
      } else {
        if (req.body.PatientID) { foundObject.PatientID = req.body.PatientID }
        if (req.body.Prefix) { foundObject.Prefix = req.body.Prefix }
        if (req.body.Firstname) { foundObject.Firstname = req.body.Firstname }
        if (req.body.Lastname) { foundObject.Lastname = req.body.Lastname }
        if (req.body.Sex) { foundObject.Sex = req.body.Sex }
        if (req.body.DOB) { foundObject.DOB = req.body.DOB }
        if (req.body.Age) { foundObject.Age = req.body.Age }
        if (req.body.Email) { foundObject.Email = req.body.Email }
        if (req.body.Weight) { foundObject.Weight = req.body.Weight }
        if (req.body.Height) { foundObject.Height = req.body.Height }
        if (req.body.IDcardNumber) { foundObject.IDcardNumber = req.body.IDcardNumber }
        if (req.body.Status) { foundObject.Status = req.body.Status }
        if (req.body.Race) { foundObject.Race = req.body.Race }
        if (req.body.Nation) { foundObject.Nation = req.body.Nation }
        if (req.body.Religion) { foundObject.Religion = req.body.Religion }
        if (req.body.Bloodgroup) { foundObject.Bloodgroup = req.body.Bloodgroup }
        if (req.body.Address) { foundObject.Address = req.body.Address }
        if (req.body.Phone) { foundObject.Phone = req.body.Phone }

        foundObject.save(function (err, updateObject) {
          if (err) {
            console.log(err)
            res.status(500).send();
          } else {
            res.send(updateObject)
          }
        })
      }
    }
  })
})

// Delete a post
app.delete('/remove/PatientInfo/:id', (req, res) => {
  var db = req.db;
  PatientInfo.remove({
    _id: req.params.id
  }, function (err, post) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

// DoctorInfo
// Fetch single post
app.get("/DoctorInfo/:Id", (req, res) => {
  console.log('GET method')
  const id = req.params.Id;
  DoctorInfo.find({ "_id": id })
    .exec()
    .then(doc => {
      console.log("Doctorid :" + id);
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });

});

// Fetch all posts
app.get("/DoctorInfo", (req, res, next) => {
  console.log('GET method')
  DoctorInfo.find()
    .exec()
    .then(docs => {
      console.log(docs);
      if (docs.length >= 0) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: 'No entries found'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

app.post('/post/DoctorInfo', (req, res) => {
  var db = req.db;
  var DoctorID = req.body.DoctorID
  var Prefix = req.body.Prefix
  var Firstname = req.body.Firstname
  var Lastname = req.body.Lastname
  var Sex = req.body.Sex
  var Email = req.body.Email
  var IDcardNumber = req.body.IDcardNumber
  var Ward = req.body.ward
  var Department = req.body.Department
  var Address = req.body.Address
  var Phone = req.body.Phone

  var new_Doctor = new DoctorInfo({
    DoctorID: DoctorID,
    Prefix: Prefix,
    Firstname: Firstname,
    Lastname: Lastname,
    Email: Email,
    Department: Department,
    Ward: Ward,
    Sex: Sex,
    IDcardNumber: IDcardNumber,
    Address: Address,
    Phone: Phone
  })
  new_Doctor.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

app.put("/update/DoctorInfo/:Id", (req, res, next) => {
  console.log("POST Method")
  var id = req.params.Id
  DoctorInfo.findOne({ _id: id }, function (err, foundObject) {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        res.status(404).send()
      } else {
        if (req.body.DoctorID) { foundObject.DoctorID = req.body.DoctorID }
        if (req.body.Prefix) { foundObject.Prefix = req.body.Prefix }
        if (req.body.Firstname) { foundObject.Firstname = req.body.Firstname }
        if (req.body.Lastname) { foundObject.Lastname = req.body.Lastname }
        if (req.body.Ward) { foundObject.Ward = req.body.Ward }
        if (req.body.Department) { foundObject.Department = req.body.Department }
        if (req.body.Sex) { foundObject.Sex = req.body.Sex }
        if (req.body.Email) { foundObject.Email = req.body.Email }
        if (req.body.IDcardNumber) { foundObject.IDcardNumber = req.body.IDcardNumber }
        if (req.body.Address) { foundObject.Address = req.body.Address }
        if (req.body.Phone) { foundObject.Phone = req.body.Phone }

        foundObject.save(function (err, updateObject) {
          if (err) {
            console.log(err)
            res.status(500).send();
          } else {
            res.send({
              success: true,
              message: 'Update successfully!'
            })
          }
        })
      }
    }
  })
})

// Delete a post
app.delete('/remove/DoctorInfo/:id', (req, res) => {
  var db = req.db;
  DoctorInfo.remove({
    _id: req.params.id
  }, function (err, post) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

// AllergicDrug 
// Get list of Allergic Drug for 1 Patient By PatientID
app.get("/AllergicDrug/:PatientID", (req, res) => {
  console.log('GET method')
  const PatientID = req.params.PatientID;
  AllergicDrug.find({ "PatientID": PatientID })
    .exec()
    .then(doc => {
      console.log("PatientID :" + PatientID);
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });

});

// ADD AllergicDrug
app.post('/post/AllergicDrug', (req, res) => {
  var db = req.db;
  var PatientID = req.body.PatientID
  var GPName = req.body.GPName
  //var GPID = req.body.GPID

  console.log("POST Method")
  async function getData() {
    await axios.get('https://rxnav.nlm.nih.gov/REST/rxcui?name=' + GPName).then(Response => {
      console.log('Axios OK')
      if (Response.data.idGroup.rxnormId == null) {
        console.log('rxcui id is null')
        res.send({
          success: false,
          message: 'RXCUI is NULL'
        })
      } else {
        RXCUI = Response.data.idGroup.rxnormId
        console.log('rxcui ok : ' + RXCUI)
      }
    });

    console.log('rxcui : ' + RXCUI)
    var new_AllergicDrug = new AllergicDrug({
      PatientID: PatientID,
      GPName: GPName,
      //GPIP: GPID,
      RXCUI: RXCUI
    })
    new_AllergicDrug.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'Post saved successfully!'
      })
    })
  };

  getData()
})

// Delete AllergicDrug By PatientID and GPName 
app.delete('/remove/AllergicDrug/:PatientID/:GPName', (req, res) => {
  var db = req.db;
  var PatientID = req.params.PatientID
  var GPName = req.params.GPName

  AllergicDrug.remove({
    "PatientID": PatientID,
    "GPName": GPName
  }, function (err, post) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

// AccountRelation
// Get friend list of Patient By PatientID
app.get("/AccountRelation/Patient/:PatientID", (req, res) => {
  console.log('GET method')
  const PatientID = req.params.PatientID;
  AccountRelation.find({ "PatientID": PatientID })
    .exec()
    .then(doc => {
      console.log("PatientID :" + PatientID);
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Get friend list of Patient By DoctorID
app.get("/AccountRelation/Doctor/:DoctorID", (req, res) => {
  console.log('GET method')
  const DoctorID = req.params.DoctorID;
  AccountRelation.find({ "DoctorID": DoctorID })
    .exec()
    .then(doc => {
      console.log("DoctorID :" + DoctorID);
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// ADD Relation between Account and Check ralation had already or not?
app.post('/post/AccountRelation', (req, res) => {
  var db = req.db;
  var D 
  var PatientID = req.body.PatientID
  var DoctorID = req.body.DoctorID
  var DateTime = new Date();
  var DateNow = DateTime.toLocaleDateString();
  console.log(DateNow);
  var PatientReq = req.body.PatientReq
  var DoctorReq = req.body.DoctorReq

  function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

  AccountRelation.find({ "PatientID": PatientID, "DoctorID": DoctorID })
    .exec()
    .then(doc => {
      console.log(doc)

      if (isEmptyObject(doc)) {
        var new_AccountRelation = new AccountRelation({
          PatientID: PatientID,
          DoctorID: DoctorID,
          Date: DateNow,
          PatientReq: PatientReq,
          DoctorReq: DoctorReq,
        })
        new_AccountRelation.save(function (error) {
          if (error) {
            console.log(error)
          }
          res.status(200).send({
            success: true,
            message: 'Post saved successfully!'
          })
        })
      } else {
        res
          .status(404)
          .json({
            success: false,
            message: "This relation had already"
          })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
})

// Accept Relation
app.put("/update/AccountRelation/:PatientID/:DoctorID", (req, res, next) => {
  console.log("POST Method")
  var PatientID = req.params.PatientID
  var DoctorID = req.params.DoctorID
  AccountRelation.findOne({
    "PatientID": PatientID,
    "DoctorID": DoctorID
  }, function (err, foundObject) {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        res.status(404).send()
      } else {
        if (req.body.PatientReq) { foundObject.PatientReq = req.body.PatientReq }
        if (req.body.DoctorReq) { foundObject.DoctorReq = req.body.DoctorReq }
        foundObject.save(function (err, updateObject) {
          if (err) {
            console.log(err)
            res.status(500).send();
          } else {
            res.send({
              success: true,
              message: 'Update successfully!'
            })
          }
        })
      }
    }
  })
})

// Delete Relation By PatientID and DoctorID 
app.delete('/remove/AccountRelation/:PatientID/:DoctorID', (req, res) => {
  var db = req.db;
  var PatientID = req.params.PatientID
  var DoctorID = req.params.DoctorID

  AccountRelation.findOneAndRemove({
    "PatientID": PatientID,
    "DoctorID": DoctorID
  }, function (err, post) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})
