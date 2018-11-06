const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

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

var Post = require("../models/post");
var PatientInfo = require("../models/Patient");

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

/*
// Update a post
app.put('/update/PatientInfo/:id', (req, res) => {
  var db = req.db;
  PatientInfo.find({"_id" : req.params.id}, 'title description', function (error, post) {
    if (error) { console.error(error); }
    PatientInfo.PatientID = req.body.PatientID
    PatientInfo.Prefix = req.body.Prefix
    PatientInfo.Firstname = req.body.Firstname
    PatientInfo.Lastname = req.body.Lastname
    PatientInfo.Sex = req.body.Sex
    PatientInfo.DOB = req.body.DOB
    PatientInfo.Age = req.body.Age
    PatientInfo.Weight = req.body.Weight
    PatientInfo.Height = req.body.Height
    PatientInfo.IDcardNumber = req.body.IDcardNumber
    PatientInfo.Status = req.body.Status
    PatientInfo.Race = req.body.Race
    PatientInfo.Nation = req.body.Nation
    PatientInfo.Religion = req.body.Religion
    PatientInfo.Bloodgroup = req.body.Bloodgroup
    PatientInfo.Address = req.body.Address
    PatientInfo.Phone = req.body.Phone
    PatientInfo.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})
*/

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