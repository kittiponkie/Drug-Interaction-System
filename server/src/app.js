const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const axios = require('axios')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

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
var PharmacistInfo = require("../models/Pharmacist")
var AllergicDrug = require("../models/AllergicDrug")
var Account = require("../models/Account")
var PharmacistRelation = require("../models/PharmacistRelation")
var DoctorRelation = require("../models/DoctorRelation")
var DrugHistory = require("../models/DrugHistory")

// PatientInfo
// Fetch single post
app.get("/PatientInfo/:Id", (req, res) => {
  console.log('GET method')
  const id = req.params.Id;
  PatientInfo.find({ "PatientID": id })
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
  var newID
  async function main() {
    await PatientInfo.findOne({}, null, { "sort": { "PatientID": -1 } })
      .exec()
      .then(doc => {
        if (doc) {
          console.log("LastID :", doc.PatientID);
          newID = doc.PatientID.replace('U', '');
          newID = (newID * 1) + 1
          if (newID <= 9) newID = "U0000" + newID
          else if (newID <= 99) newID = "U000" + newID
          else if (newID <= 999) newID = "U00" + newID
          else if (newID <= 9999) newID = "U0" + newID
          else newID = "U" + newID
          console.log("์NewID :", newID);
        } else {
          newID = "U00001"
        }
      })

    var PatientID = newID
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
  }

  main()

})

app.put("/update/PatientInfo/:Id", (req, res, next) => {
  console.log("POST Method")
  var id = req.params.Id
  PatientInfo.findOne({ "PatientID": id }, function (err, foundObject) {
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
    "PatientID": req.params.id
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
  DoctorInfo.find({ "DoctorID": id })
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
  var newID
  async function main() {
    await DoctorInfo.findOne({}, null, { "sort": { "DoctorID": -1 } })
      .exec()
      .then(doc => {
        if (doc) {
          console.log("LastID :", doc.DoctorID);
          newID = doc.DoctorID.replace('D', '');
          newID = (newID * 1) + 1
          if (newID <= 9) newID = "D0000" + newID
          else if (newID <= 99) newID = "D000" + newID
          else if (newID <= 999) newID = "D00" + newID
          else if (newID <= 9999) newID = "D0" + newID
          else newID = "D" + newID
          console.log("์NewID :", newID);
        } else {
          newID = "D00001"
        }
      })
    var DoctorID = newID
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
  }
  main()
})

app.put("/update/DoctorInfo/:Id", (req, res, next) => {
  console.log("POST Method")
  var id = req.params.Id
  DoctorInfo.findOne({ "DoctorID": id }, function (err, foundObject) {
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
    "DoctorID": req.params.id
  }, function (err, post) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})


// PharmacistInfo
// Fetch single post
app.get("/PharmacistInfo/:Id", (req, res) => {
  console.log('GET method')
  const id = req.params.Id;
  PharmacistInfo.find({ "PharmacistID": id })
    .exec()
    .then(doc => {
      console.log("Pharmacistid :" + id);
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
app.get("/PharmacistInfo", (req, res, next) => {
  console.log('GET method')
  PharmacistInfo.find()
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

app.post('/post/PharmacistInfo', (req, res) => {
  var db = req.db;
  var newID
  async function main() {
    await PharmacistInfo.findOne({}, null, { "sort": { "PharmacistID": -1 } })
      .exec()
      .then(doc => {
        if (doc) {
          console.log("LastID :", doc.PharmacistID);
          newID = doc.PharmacistID.replace('P', '');
          newID = (newID * 1) + 1
          if (newID <= 9) newID = "P0000" + newID
          else if (newID <= 99) newID = "P000" + newID
          else if (newID <= 999) newID = "P00" + newID
          else if (newID <= 9999) newID = "P0" + newID
          else newID = "P" + newID
          console.log("์NewID :", newID);
        } else {
          newID = "P00001"
        }
      })
    var PharmacistID = newID
    var Prefix = req.body.Prefix
    var Firstname = req.body.Firstname
    var Lastname = req.body.Lastname
    var Sex = req.body.Sex
    var Email = req.body.Email
    var IDcardNumber = req.body.IDcardNumber
    var Department = req.body.Department
    var Address = req.body.Address
    var Phone = req.body.Phone

    var new_Pharmacist = new PharmacistInfo({
      PharmacistID: PharmacistID,
      Prefix: Prefix,
      Firstname: Firstname,
      Lastname: Lastname,
      Email: Email,
      Department: Department,
      Sex: Sex,
      IDcardNumber: IDcardNumber,
      Address: Address,
      Phone: Phone
    })
    new_Pharmacist.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'Post saved successfully!'
      })
    })
  }
  main()
})

app.put("/update/PharmacistInfo/:Id", (req, res, next) => {
  console.log("POST Method")
  var id = req.params.Id
  DoctorInfo.findOne({ "PharmacistID": id }, function (err, foundObject) {
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
app.delete('/remove/PharmacistInfo/:id', (req, res) => {
  var db = req.db;
  DoctorInfo.remove({
    "PharmacistID": req.params.id
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

// DoctorRelation
// Get Doctor list By PatientID for Patient account
app.get("/DoctorRelation/Patient/:PatientID", (req, res) => {
  console.log('GET method')
  const PatientID = req.params.PatientID;
  DoctorRelation.find({ "PatientID": PatientID })
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

// Get Patient list By DoctorID for Doctor account
app.get("/DoctorRelation/Doctor/:DoctorID", (req, res) => {
  console.log('GET method')
  const DoctorID = req.params.DoctorID;
  DoctorRelation.find({ "DoctorID": DoctorID })
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

// ADD Relation between Doctor - Patient Account and Check ralation had already or not? **ADMIN Feature**
app.post('/post/Admin/DoctorRelation', (req, res) => {
  var db = req.db;
  var PatientID = req.body.PatientID
  var DoctorID = req.body.DoctorID
  var DateTime = new Date();
  var DateNow = DateTime.toLocaleDateString();
  console.log(DateNow);

  function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

  DoctorRelation.find({ "PatientID": PatientID, "DoctorID": DoctorID })
    .exec()
    .then(doc => {
      console.log(doc)

      if (isEmptyObject(doc)) {
        var new_DoctorRelation = new DoctorRelation({
          PatientID: PatientID,
          DoctorID: DoctorID,
          Date: DateNow
        })
        new_DoctorRelation.save(function (error) {
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

// Delete Relation By PatientID and DoctorID 
app.delete('/remove/DoctorRelation/:PatientID/:DoctorID', (req, res) => {
  var db = req.db;
  var PatientID = req.params.PatientID
  var DoctorID = req.params.DoctorID

  DoctorRelation.findOneAndRemove({
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

// PharmacistRelation
// Get Pharmacist list By PatientID for Patient account
app.get("/PharmacistRelation/Patient/:PatientID", (req, res) => {
  console.log('GET method')
  const PatientID = req.params.PatientID;
  PharmacistRelation.find({ "PatientID": PatientID })
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

// Get Patient list By PharmacistID for Pharmacist account
app.get("/PharmacistRelation/Pharmacist/:PharmacistID", (req, res) => {
  console.log('GET method')
  const PharmacistID = req.params.PharmacistID;
  PharmacistRelation.find({ "PharmacistID": PharmacistID })
    .exec()
    .then(doc => {
      console.log("PharmacistID :" + PharmacistID);
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

// ADD Relation between Pharmacist - Patient Account and Check ralation had already or not? **Patient Feature , Patient can add pharmacist only
app.post('/post/PharmacistRelation', (req, res) => {
  var db = req.db;
  var PatientID = req.body.PatientID
  var PharmacistID = req.body.PharmacistID
  var DateTime = new Date();
  var DateNow = DateTime.toLocaleDateString();
  console.log(DateNow);
  var PharmacistReq = 0;

  function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

  PharmacistRelation.find({ "PatientID": PatientID, "PharmacistID": PharmacistID })
    .exec()
    .then(doc => {
      console.log(doc)

      if (isEmptyObject(doc)) {
        var new_PharmacistRelation = new PharmacistRelation({
          PatientID: PatientID,
          PharmacistID: PharmacistID,
          Date: DateNow,
          PharmacistReq: PharmacistReq
        })
        new_PharmacistRelation.save(function (error) {
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

// Accept Relation ** Pharmacist accept patient Req
app.put("/update/PharmacistRelation/:PatientID/:PharmacistID", (req, res, next) => {
  console.log("POST Method")
  var PatientID = req.params.PatientID
  var PharmacistID = req.params.PharmacistID
  AccountRelation.findOne({
    "PatientID": PatientID,
    "PharmacistID": PharmacistID
  }, function (err, foundObject) {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        res.status(404).send()
      } else {
        if (req.body.PharmacistReq) { foundObject.PharmacistReq = 1 }
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

// Delete Relation By PatientID and PharmacistID 
app.delete('/remove/PharmacistRelation/:PatientID/:PharmacistID', (req, res) => {
  var db = req.db;
  var PatientID = req.params.PatientID
  var PharmacistID = req.params.PharmacistID

  PharmacistRelation.findOneAndRemove({
    "PatientID": PatientID,
    "PharmacistID": PharmacistID
  }, function (err, post) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

// Account 
// Register (ADD an account)
app.post('/Register', (req, res) => {
  var ID = req.body.ID
  var Username = req.body.Username
  var Password = req.body.Password
  var Email = req.body.Email
  var AccountType = req.body.AccountType
  var RegisterStatus

  if (AccountType == 'Doctor' || AccountType == 'Pharmacist') { RegisterStatus = '0' }
  else { RegisterStatus = '1' }

  function isEmptyObject(obj) { return !Object.keys(obj).length; }

  Account.find({ "๊Username": Username })
    .exec()
    .then(doc => {
      console.log(doc)

      if (isEmptyObject(doc)) {

        Account.find({ "Email": Email })
          .exec()
          .then(doc => {
            console.log(doc)
            if (isEmptyObject(doc)) {
              var new_Account = new Account({
                ID: ID,
                Username: Username,
                Password: Password,
                Email: Email,
                AccountType: AccountType,
                RegisterStatus: RegisterStatus
              })
              new_Account.save(function (error) {
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
                  message: "Email had already"
                })
            }
          })
      } else {
        res
          .status(404)
          .json({
            success: false,
            message: "๊Username had already"
          })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
})


// Login
app.post('/Login', (req, res) => {
  var Username = req.body.Username
  var Password = req.body.Password
  Account.findOne({ 'Username': Username, 'Password': Password })
    .exec()
    .then(doc => {
      console.log(doc)

      if (doc) {
        if (doc.RegisterStatus == '0') {
          res
            .status(404)
            .json({
              success: false,
              message: "Account is not verified By Administrator"
            })
        }
        else {
          res
            .status(200)
            .json({
              success: true,
              message: "๊Login Success"
            })
        }
      } else {
        res
          .status(404)
          .json({
            success: false,
            message: "Username and/or Password incorrect"
          })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
})

//  Change Username / Password vetify By Email
app.put("/update/Account/:Email", (req, res, next) => {
  console.log("POST Method")
  var Email = req.params.Email
  Account.findOne({ "Email": Email }, function (err, foundObject) {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        res.status(404).send()
      } else {
        if (req.body.Username) { foundObject.Username = req.body.Username }
        if (req.body.Password) { foundObject.Password = req.body.Password }
        if (req.body.ID) { foundObject.ID = req.body.ID }
        if (req.body.Email) { foundObject.Email = req.body.Email }
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

// Confirm Account for ADMIN section By ID 
app.put("/ConfirmAccount/:ID", (req, res, next) => {
  console.log("POST Method")
  var ID = req.params.ID
  Account.findOne({ "ID": ID }, function (err, foundObject) {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        res.status(404).send()
      } else {
        foundObject.RegisterStatus = "1"
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

// Drug History 
// List Drug History By PatientID 
app.get("/DrugHistory/:PatientID", (req, res) => {
  console.log('GET method')
  const PatientID = req.params.PatientID;
  DrugHistory.find({ "PatientID": PatientID })
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

// List Drug History By PatientID and filter By DoctorID
app.get("/DrugHistory/Doctor/:PatientID/:DoctorID", (req, res) => {
  console.log('GET method')
  const PatientID = req.params.PatientID;
  const DoctorID = req.params.DoctorID;
  DrugHistory.find({ "PatientID": PatientID, "DoctorID": DoctorID })
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

// List Drug History By PatientID and filter By PharmacistID
app.get("/DrugHistory/Pharmacist/:PatientID/:PharmacistID", (req, res) => {
  console.log('GET method')
  const PatientID = req.params.PatientID;
  const PharmacistID = req.params.PharmacistID;
  DrugHistory.find({ "PatientID": PatientID, "PharmacistID": PharmacistID })
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

app.get("/test/date", (req, res) => {
  console.log('GET method')
  DrugHistory.find({ "PatientID": "U00001" })
    .exec()
    .then(doc => {
      //console.log("From database", doc);
      var DateTime = new Date();
      //var DateNow = DateTime.toLocaleDateString();
      var DateNow = new Date();
      DateTime.setDate(DateTime.getDate() + 60);
      var oneday = 1000 * 60 * 60 * 24
      console.log(DateNow.toLocaleDateString());
      console.log(DateTime.toLocaleDateString());

      var Date1_ms = DateTime.getTime()
      var Date2_ms = DateNow.getTime()
      var diff = Math.abs(Date1_ms - Date2_ms)
      console.log(Math.round(diff / oneday))
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

// ADD DrugHistory -> Drug Order Page 
app.post('/post/DrugOrder', (req, res) => {
  var db = req.db;
  //var OrderID //  ** Non Genarate OrderID **
  var OrderID = req.body.OrderID
  var newID
  var PatientID = req.body.PatientID
  var DoctorID = req.body.DoctorID
  var PharmacistID = req.body.PharmacistID
  var OrderStartDate // Date when add this record
  var DispendStartDate = "" // Date when update 'Dispend' 
  var Duration = req.body.Duration
  var UsingStatus = 0 // Calculate with DispendDate + Duration [0=Using]
  var DispendStatus // Check by Dispend Status [0,1,2]
  var DrugNo // Gen ID of 1 Order used to sort the record
  var GPName = req.body.GPName
  var RXCUI // find by axios API 
  var Dosage = req.body.Dosage
  var Frequency = req.body.Frequency
  var Times = req.body.Times
  var Quantity = req.body.Quantity
  var Dispend = 0 // Never Dispend drug
  var Description = req.body.Description

  function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

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

    /*
    await DrugHistory.findOne({}, null, { "sort": { "OrderID": -1 } })
      .exec()
      .then(doc => {
        if (doc) {
          console.log("LastID :", doc.OrderID);
          newID = doc.OrderID.replace('O', '');
          newID = (newID * 1) + 1
          if (newID <= 9) newID = "O0000" + newID
          else if (newID <= 99) newID = "O000" + newID
          else if (newID <= 999) newID = "O00" + newID
          else if (newID <= 9999) newID = "O0" + newID
          else newID = "O" + newID
          console.log("์NewID :", newID);
        } else {
          newID = "O00001"
        }
      })

      */

    OrderID = newID
    var DateTime = new Date()
    OrderStartDate = DateTime.toLocaleDateString()
    DoctorRelation.find({ "PatientID": PatientID, "DoctorID": DoctorID })
      .exec()
      .then(doc => {
        if (!isEmptyObject(doc)) {

          var new_DrugHistory = new DrugHistory({
            OrderID: OrderID,
            PatientID: PatientID,
            DoctorID: DoctorID,
            PharmacistID: PharmacistID,
            OrderStartDate: OrderStartDate,
            DispendStartDate: DispendStartDate,
            Duration: Duration,
            UsingStatus: UsingStatus,
            DispendStatus: DispendStatus,
            DrugNo: DrugNo,
            GPName: GPName,
            RXCUI: RXCUI,
            Dosage: Dosage,
            Frequency: Frequency,
            Times: Times,
            Quantity: Quantity,
            Dispend: Dispend,
            Description: Description
          })

          new_DrugHistory.save(function (error) {
            if (error) {
              console.log(error)
            }
            res.status(200).send({
              success: true,
              message: 'Post saved successfully!'
            })
          })
        }
        else {
          res.status(404).send({
            success: false,
            message: "Doesn't have relation between account"
          })
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }

  getData()
})

// ADD DrugHistory -> Drug Order Page 
app.post('/post/DrugOrder/DrugNo', (req, res) => {
  var db = req.db;
  //var OrderID //  ** Non Genarate OrderID **
  var OrderID = req.body.OrderID
  var newID
  var PatientID = req.body.PatientID
  var DoctorID = req.body.DoctorID
  var PharmacistID = req.body.PharmacistID
  var OrderStartDate // Date when add this record
  var DispendStartDate = "" // Date when update 'Dispend' 
  var Duration = req.body.Duration
  var UsingStatus = 0 // Calculate with DispendDate + Duration [0=Using]
  var DispendStatus // Check by Dispend Status [0,1,2]
  var DrugNo // Gen ID of 1 Order used to sort the record
  var GPName = req.body.GPName
  var RXCUI // find by axios API 
  var Dosage = req.body.Dosage
  var Frequency = req.body.Frequency
  var Times = req.body.Times
  var Quantity = req.body.Quantity
  var Dispend = 0 // Never Dispend drug
  var Description = req.body.Description

  function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

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

    /*
    await DrugHistory.findOne({}, null, { "sort": { "OrderID": -1 } })
      .exec()
      .then(doc => {
        if (doc) {
          console.log("LastID :", doc.OrderID);
          newID = doc.OrderID.replace('O', '');
          newID = (newID * 1) + 1
          if (newID <= 9) newID = "O0000" + newID
          else if (newID <= 99) newID = "O000" + newID
          else if (newID <= 999) newID = "O00" + newID
          else if (newID <= 9999) newID = "O0" + newID
          else newID = "O" + newID
          console.log("์NewID :", newID);
        } else {
          newID = "O00001"
        }
      })

      */

    OrderID = newID
    var DateTime = new Date()
    OrderStartDate = DateTime.toLocaleDateString()
    DoctorRelation.find({ "PatientID": PatientID, "DoctorID": DoctorID })
      .exec()
      .then(doc => {
        if (!isEmptyObject(doc)) {

          var new_DrugHistory = new DrugHistory({
            OrderID: OrderID,
            PatientID: PatientID,
            DoctorID: DoctorID,
            PharmacistID: PharmacistID,
            OrderStartDate: OrderStartDate,
            DispendStartDate: DispendStartDate,
            Duration: Duration,
            UsingStatus: UsingStatus,
            DispendStatus: DispendStatus,
            DrugNo: DrugNo,
            GPName: GPName,
            RXCUI: RXCUI,
            Dosage: Dosage,
            Frequency: Frequency,
            Times: Times,
            Quantity: Quantity,
            Dispend: Dispend,
            Description: Description
          })

          new_DrugHistory.save(function (error) {
            if (error) {
              console.log(error)
            }
            res.status(200).send({
              success: true,
              message: 'Post saved successfully!'
            })
          })
        }
        else {
          res.status(404).send({
            success: false,
            message: "Doesn't have relation between account"
          })
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }

  getData()
})

// Update DrugHistory -> Drug Dispensing Page **Pharmacist Feature**
app.put("/update/DrugHistory/:OrderID/:DrugNo", (req, res, next) => {
  console.log("POST Method")
  var OrderID = req.params.OrderID
  var DrugNo = req.params.DrugNo
  DrugHistory.findOne({
    "OrderID": OrderID,
    "DrugNo": DrugNo
  }, function (err, foundObject) {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        res.status(404).send()
      } else {
        var Dispend = req.body.Dispend
        if (Dispend) { foundObject.Dispend = Dispend }

        if (foundObject.DispendStartDate == "") {
          var DateTime = new Date()
          var DispendStartDate = DateTime.toLocaleDateString()
          foundObject.DispendStartDate = DispendStartDate
        }

        var total = (foundObject.Quantity * 1) - (Dispend * 1)      // Calculate Dispend Status 
        if ((Dispend * 1) == 0) DispendStatus = 0     // Not dispend
        else if (total >= 1) DispendStatus = 1   // In process
        else if (total <= 0) DispendStatus = 2   // Already Done
        foundObject.DispendStatus = DispendStatus
        foundObject.UsingStatus = 1
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

// Delete DrugHistory By OrderID 
app.delete('/remove/DrugHistory/:OrderID', (req, res) => {
  var db = req.db;
  var OrderID = req.params.OrderID

  DrugHistory.findOneAndRemove({
    "OrderID": OrderID
  }, function (err, post) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

// Delete DrugHistory By OrderID and DrugNo // delete each drug
app.delete('/remove/DrugHistory/:OrderID/:DrugNo', (req, res) => {
  var db = req.db;
  var OrderID = req.params.OrderID
  var DrugNo = req.params.DrugNo

  DrugHistory.findOneAndRemove({ "OrderID": OrderID, "DrugNo": DrugNo }, function (err, post) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})


