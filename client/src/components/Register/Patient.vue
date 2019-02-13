<template>
  <div class="container">
    <h1 class="well">
      <router-link to="/login" target="_parent">
        <button type="button" class="btn btn-lg btn-info" style="margin-right: 20px">
          Back
        </button>
      </router-link>
      Register
    </h1>
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
                    <select ref="prefix" class="form-control">
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
                    <input ref="firstname" type="text" placeholder="Enter First Name Here.." class="form-control">
                  </div>
                  <div class="col-sm-6 form-group">
                    <label>Last Name</label>
                    <input ref="lastname" type="text" placeholder="Enter Last Name Here.." class="form-control">
                  </div>
                </div>

                <div class="row">
                  <!-- Sex -->
                  <div class="col-sm-6 form-group">
                    <label>Sex</label>
                    <select ref="sex" class="form-control">
                      <option selected="">Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <!-- Weight & Height -->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>Weight</label>
                    <input ref="weight" type="text" placeholder="Enter Weight Here.." class="form-control">
                  </div>
                  <div class="col-sm-6 form-group">
                    <label>Height</label>
                    <input ref="height" type="text" placeholder="Enter Height Here.." class="form-control">
                  </div>
                </div>

                <!-- Birthday & Age(autocalculation) -->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>Birthday</label>                    
                      <md-datepicker ref="birthday" md-immediately>
                        <label>Enter Birthday Here..</label>
                      </md-datepicker>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm3>
        <v-checkbox v-model="landscape" hide-details label="Landscape"></v-checkbox>
      </v-flex>
      <v-flex xs12 sm3>
        <v-checkbox v-model="reactive" hide-details label="Reactive"></v-checkbox>
      </v-flex>
    </v-layout>

    <v-date-picker v-model="test" :landscape="landscape" :reactive="reactive"></v-date-picker>
  </div>
                  </div>
                  <div class="col-sm-6 form-group">
                    <label>Age</label>
                    <input ref="age" type="text" class="form-control" placeholder="Enter Age Here..">
                    <!--input ref="age" type="text" readonly class="form-control" value="21 (Auto calculation)"-->
                  </div>
                </div>

                <!-- id card -->
                  <div class="row">
                    <div class="col-sm-6 form-group">
                      <label>ID Card</label>
                      <input ref="idcard" type="text" placeholder="Enter Designation Here.." class="form-control">
                    </div>
                    <div class="col-sm-6 form-group">
                        <label>Status</label>
                        <select ref="status" class="form-control">
                          <option selected="">Single </option>
                          <option>Married </option>
                          <option>Divorced </option>
                          <option>Separate</option>
                        </select>
                    </div>
                  </div>
                  <!-- Rac & Nationality & Religion-->
                  <div class="row">
                    <div class="col-sm-6 form-group">
                      <label>Nationality</label>
                      <input ref="nation" type="text" placeholder="Enter Nationality Here.." class="form-control">
                    </div>
                    <div class="col-sm-6 form-group">
                      <label>Race</label>
                      <input ref="rac" type="text" placeholder="Enter Rac Here.." class="form-control">
                    </div>
                    <div class="col-sm-6 form-group">
                      <label>Religion</label>
                      <input ref="religion" type="text" placeholder="Enter Religion Here.." class="form-control">
                    </div>
                  </div>
                  <!-- blood -->
                  <div class="row">
                    <div class="col-sm-6 form-group">
                      <label>Blood</label>
                      <select ref="blood" class="form-control">
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
                <div class="form-group">
                  <label>Drug allergy</label>
                  <input ref="drugAllergy" type="text" placeholder="Enter Drug allergy Here.." class="form-control">
                </div>
                <div class="form-group">
                  <label> Address</label>
                  <textarea ref="address" placeholder="Enter Address Here.." rows="3" class="form-control"></textarea>
                </div>
                <div class="form-group">
                  <label>Phone</label>
                  <input ref="phone" type="text" placeholder="Enter Phone Here.." class="form-control">
                </div>
                <br>
                <div class="form-group">
                  <label>Email</label>
                  <input ref="email" type="text" placeholder="Enter Email Here.." class="form-control">
                </div>
                <div class="form-group">
                  <label>Username</label>
                  <input ref="username" type="text" placeholder="Enter Username Here.." class="form-control">
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input ref="password" type="password" placeholder="Enter password Here.. at least 8 character" class="form-control">
                </div>
                <button type="button" class="btn btn-lg btn-info" style="margin-left: 7px" @click="submit">Submit</button>
                <button type="button" class="btn btn-lg btn-info" style="margin-left: 7px" @click="cancel">cancel</button>
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
        RXCUI: String
      },
      test: null,
      picker: new Date().toISOString().substr(0, 10),
        landscape: false,
        reactive: false
    }),
    methods: {
      cancel() {
        window.location.href = "http://localhost:8080/register/patient";
      },
      async submit() {
        if (this.$refs.username.value != '') {
          await this.DataPatient()
          await this.DataAccount()
          if (this.$refs.drugAllergy.value != '') await this.DataAllergic()
          
        }
      },
      async DataPatient() {
        //save value on variable
        this.dataPatient.PatientID = null
        this.dataPatient.Prefix = this.$refs.prefix.value
        this.dataPatient.Firstname = this.$refs.firstname.value
        this.dataPatient.Lastname = this.$refs.lastname.value
        this.dataPatient.Sex = this.$refs.sex.value
        this.dataPatient.DOB = this.$refs.birthday.value
        this.dataPatient.Age = this.$refs.age.value
        this.dataPatient.Email = this.$refs.email.value
        this.dataPatient.Weight = this.$refs.weight.value
        this.dataPatient.Height = this.$refs.height.value
        this.dataPatient.IDcardNumber = this.$refs.idcard.value
        this.dataPatient.Status = this.$refs.status.value
        this.dataPatient.Race = this.$refs.rac.value
        this.dataPatient.Nation = this.$refs.nation.value
        this.dataPatient.Religion = this.$refs.religion.value
        this.dataPatient.Bloodgroup = this.$refs.blood.value
        this.dataPatient.Address = this.$refs.address.value
        this.dataPatient.Phone = this.$refs.phone.value

        await registerService.patientInfo(this.dataPatient).then(Response => {
          if (Response.data != "") {
            this.dataPatient.PatientID = Response.data.PatientID
          }
        })
      },
      DataAccount() {
        this.dataAccount.ID = this.dataPatient.PatientID
        this.dataAccount.Username = this.$refs.username.value
        this.dataAccount.Password = this.$refs.password.value
        this.dataAccount.Email = this.$refs.email.value
        this.dataAccount.AccountType = "Patient"
        registerService.register(this.dataAccount)
      },
      DataAllergic() {
        this.dataAllergic.PatientID = this.dataPatient.PatientID
        this.dataAllergic.GPName = this.$refs.drugAllergy.value
        this.dataAllergic.RXCUI = "not done"
        registerService.allergicDrug(this.dataAllergic)
      }
    },
    async mounted() {
      this.Window_Width = window.innerWidth
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
    background: url('https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=62a77bae48158b98b0acdf9fa674410e&auto=format&fit=crop&w=1050&q=80') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

</style>
