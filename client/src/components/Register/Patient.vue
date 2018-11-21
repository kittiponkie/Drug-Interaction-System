<template>
  <div class="container">
    <h1 class="well">Register</h1>
    <md-tabs md-sync-route>
      <md-tab id="tab-patient" md-label="Patient" to="/register/patient">
        <div>
          <div class="row">
            <form>

              <div class="col-sm-12">
                <div class="row">
                  <!-- prefix -->
                  <div class="col-sm-6 form-group">
                    <label>Prefix</label>
                    <select id="prefix" class="form-control">
                      <option selected="">MR.</option>
                      <option>MRS.</option>
                      <option>Miss</option>
                      <option>Other</option>
                      <option>Master.</option>
                      <option>Buddhist Monk</option>
                      <option>Rev.</option>
                      <option>Mom Luang (M.L.)</option>
                      <option>Mom Rajawong (M.R.)</option>
                      <option>Mom Chao (M.C.)</option>
                      <option>Emeritus Professor</option>
                      <option>Professor</option>
                      <option>Assistant Professor</option>
                      <option>Associate Professor</option>
                    </select>
                  </div>
                </div>

                <!-- Name & Surname -->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>First Name</label>
                    <input id="firstname" type="text" placeholder="Enter First Name Here.." class="form-control">
                  </div>
                  <div class="col-sm-6 form-group">
                    <label>Last Name</label>
                    <input id="lastname" type="text" placeholder="Enter Last Name Here.." class="form-control">
                  </div>
                </div>

                <div class="row">
                  <!-- Sex -->
                  <div class="col-sm-6 form-group">
                    <label>Sex</label>
                    <select id="sex" class="form-control">
                      <option selected="">Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <!-- DOB -->
                  <div class="col-sm-6 form-group">
                    <label>DOB</label>
                    <input id="dob" type="text" placeholder="Enter DOB Here.." class="form-control">
                  </div>
                </div>

                <!-- Weight & Height -->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>Weight</label>
                    <input id="weight" type="text" placeholder="Enter Weight Here.." class="form-control">
                  </div>
                  <div class="col-sm-6 form-group">
                    <label>Height</label>
                    <input id="height" type="text" placeholder="Enter Height Here.." class="form-control">
                  </div>
                </div>

                <!-- Birthday & Age(autocalculation) -->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>Birthday</label>
                    <div class='input-group date' id='datetimepicker1'>
                      <input id="birthday" type='text' class="form-control" placeholder="Enter Birthday Here.." />
                      <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                      </span>
                    </div>
                  </div>
                  <div class="col-sm-6 form-group">
                    <label>Age</label>
                    <input id="age" type="text" class="form-control" placeholder="Enter Age Here..">
                    <!--input id="age" type="text" readonly class="form-control" value="21 (Auto calculation)"-->
                  </div>
                </div>

                <!-- id card -->
                <div class="form-group">
                  <div class="row">
                    <div class="col-sm-6 form-group">
                      <label>ID Card</label>
                      <input id="idcard" type="text" placeholder="Enter Designation Here.." class="form-control">
                    </div>
                    <div class="col-sm-6 form-group">
                      <div class="col-sm-6">
                        <label>Status</label>
                        <select id="status" class="form-control">
                          <option selected="">Single </option>
                          <option>Married </option>
                          <option>Divorced </option>
                          <option>Separate</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <!-- Rac & Nationality & Religion-->
                  <div class="row">
                    <div class="col-sm-6 form-group">
                      <label>Nationality</label>
                      <input id="nation" type="text" placeholder="Enter Nationality Here.." class="form-control">
                    </div>
                    <div class="col-sm-6 form-group">
                      <label>Rac</label>
                      <input id="rac" type="text" placeholder="Enter Rac Here.." class="form-control">
                    </div>
                    <div class="col-sm-6 form-group">
                      <label>Religion</label>
                      <input id="religion" type="text" placeholder="Enter Religion Here.." class="form-control">
                    </div>
                  </div>
                  <!-- blood -->
                  <div class="row">
                    <div class="col-sm-6 form-group">
                      <label>Blood</label>
                      <select id="blood" class="form-control">
                        <option selected="">A </option>
                        <option>B</option>
                        <option>AB</option>
                        <option>O</option>
                        <option>Rh-positive</option>
                        <option>Rh-negative</option>
                        <option>Unknown</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label>Drug allergy</label>
                  <input id="drugAllergy" type="text" placeholder="Enter Drug allergy Here.." class="form-control">
                </div>
                <div class="form-group">
                  <label> Address</label>
                  <textarea id="address" placeholder="Enter Address Here.." rows="3" class="form-control"></textarea>
                </div>
                <div class="form-group">
                  <label>Phone</label>
                  <input id="phone" type="text" placeholder="Enter Phone Here.." class="form-control">
                </div>
                <br>
                <div class="form-group">
                  <label>Email</label>
                  <input id="email" type="text" placeholder="Enter Email Here.." class="form-control">
                </div>
                <div class="form-group">
                  <label>Username</label>
                  <input id="username" type="text" placeholder="Enter Username Here.." class="form-control">
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input id="password" type="password" placeholder="Enter password Here.. at least 8 character" class="form-control">
                </div>
                <button type="button" class="btn btn-lg btn-info" style="margin-left: 7px" @click="submit">Submit</button>
                <button type="button" class="btn btn-lg btn-info" style="margin-left: 7px">cancel</button>
              </div>
            </form>

          </div>
          <div>
            <h3>{{dataPatient}}</h3>
            <h3>{{dataAccount}}</h3>
            <h3>{{dataAllergic}}</h3>
          </div>
        </div>
      </md-tab>

      <md-tab id="tab-doctor" md-label="Doctor" to="/register/doctor">
      </md-tab>
      <md-tab id="tab-pharmacist" md-label="Pharmacist" to="/register/pharmacist">
      </md-tab>
    </md-tabs>

  </div>
</template>

<script>
  import axios from 'axios'
  import registerService from '@/services/registerService'

  export default {
    name: 'PatientRegister',
    data: () => ({
      dataPatient: {
        PatientID: String,
        Prefix: String,
        Firstname: String,
        Lastname: String,
        Sex: String,
        DOB: String,
        Age: String,
        Email: String,
        Weight: String,
        Height: String,
        IDcardNumber: String,
        Status: String,
        Race: String,
        Nation: String,
        Religion: String,
        Bloodgroup: String,
        Address: String,
        Phone: String
      },
      dataAccount: {
        ID: String,
        Username: String,
        Password: String,
        Email: String,
        AccountType: String,
        RegisterStatus: String
      },
      dataAllergic: {
        PatientID: String,
        GPName: String,
        //GPID: String,
        RXCUI: String
      },
      test: null
    }),
    methods: {
      async submit() {
        await this.DataPatient()
        console.log("finish 1.1")
        /*await registerService.getPatient(this.dataPatient.Email).then( Response => {
            if(Response.data != "") {
              this.dataPatient.PatientID = Response.data.PatientID
            }
            //console.log("finish 1.2")
        })*/
        console.log("finish 1.3")
        await this.DataAccount()
        console.log("finish 2")
        await this.DataAllergic()
      },
      async DataPatient() {
        //save value on variable
        this.dataPatient.PatientID = null
        var e = document.getElementById("prefix")
        this.dataPatient.Prefix = e.options[e.selectedIndex].text
        this.dataPatient.Firstname = document.getElementById("firstname").value
        this.dataPatient.Lastname = document.getElementById("lastname").value
        e = document.getElementById("sex")
        this.dataPatient.Sex = e.options[e.selectedIndex].text
        this.dataPatient.DOB = document.getElementById("dob").value
        this.dataPatient.Age = document.getElementById("age").value
        this.dataPatient.Email = document.getElementById("email").value
        this.dataPatient.Weight = document.getElementById("weight").value
        this.dataPatient.Height = document.getElementById("height").value
        this.dataPatient.IDcardNumber = document.getElementById("idcard").value
        e = document.getElementById("status")
        this.dataPatient.Status = e.options[e.selectedIndex].text
        this.dataPatient.Race = document.getElementById("rac").value
        this.dataPatient.Nation = document.getElementById("nation").value
        this.dataPatient.Religion = document.getElementById("religion").value
        this.dataPatient.Bloodgroup = document.getElementById("blood").value
        this.dataPatient.Address = document.getElementById("address").value
        this.dataPatient.Phone = document.getElementById("phone").value
        if (document.getElementById("username").value != null) {
          await registerService.patientInfo(this.dataPatient).then(Response => {
            if (Response.data != "") {
              this.dataPatient.PatientID = Response.data.PatientID
            }
            console.log(this.dataPatient.PatientID)
          })
        }
        console.log("finish one")
      },
      DataAccount() {
        this.dataAccount.ID = this.dataPatient.PatientID
        this.dataAccount.Username = document.getElementById("username").value
        this.dataAccount.Password = document.getElementById("password").value
        this.dataAccount.Email = document.getElementById("email").value
        this.dataAccount.AccountType = "Patient"
        registerService.register(this.dataAccount)
      },
      DataAllergic() {
        this.dataAllergic.PatientID = this.dataPatient.PatientID
        this.dataAllergic.GPName = document.getElementById("drugAllergy").value
        this.dataAllergic.RXCUI = "not done"
        registerService.allergicDrug(this.dataAllergic)
      }
    },
    async mounted() {
      this.Window_Width = window.innerWidth
      /*this.userInfo = {
        ID: 'String',
        Username: 'String',
        Password: 'String',
        Email: 'String',
        AccountType: 'String',
        RegisterStatus: 'String'
			}*/
      //if(this.userInfo != null) registerService.register(this.userInfo)
    }
  }

</script>


<style scoped>
  /* Customize container */
  @media (min-width: 768px) {
    .container {
      max-width: 730px;
    }
  }

</style>

<style>
  /* Space out content a bit */
  body {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  body {
    background: url('https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=62a77bae48158b98b0acdf9fa674410e&auto=format&fit=crop&w=1050&q=80') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

</style>
