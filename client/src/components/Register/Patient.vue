<template>
  <div class="container">
    <h1 class="well">Register</h1>
    <md-tabs md-sync-route>
      <md-tab id="tab-patient" md-label="Patient" to="/register/patient">
        <div>
          <div class="row">
            <form>
              <div class="form-group">
                <!-- prefix -->
                <div class="col-sm-6">
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
                <div class="col-sm-6 form-group">
                  <label>Sex</label>
                  <select id="sex" class="form-control">
                    <option selected="">Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <!-- Name & Surname -->
              <div class="col-sm-12">
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>First Name</label>
                    <input type="text" placeholder="Enter First Name Here.." class="form-control">
                  </div>
                  <div class="col-sm-6 form-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Enter Last Name Here.." class="form-control">
                  </div>
                </div>
                <!-- Birthday & Age(autocalculation) -->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>Birthday</label>
                    <div class='input-group date' id='datetimepicker1'>
                      <input type='text' class="form-control" />
                      <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                      </span>
                    </div>
                  </div>
                  <div class="col-sm-6 form-group">
                    <label>Age</label>
                    <input type="text" readonly class="form-control" value="21 (Auto calculation)">
                  </div>
                </div>
                <!-- id card -->
                <div class="form-group">
                  <div class="row">
                    <div class="col-sm-6 form-group">
                      <label>ID Card</label>
                      <input type="text" placeholder="Enter Designation Here.." class="form-control">
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
                  <!-- Nationality -->
                  <div class="row">
                    <div class="col-sm-6">
                      <label>Ethnicity</label>
                      <select id="ethnicity" class="form-control">
                        <option selected="">Thailand</option>
                      </select>
                    </div>
                    <div class="col-sm-6 form-group">
                      <div class="col-sm-6">
                        <label>Nationality</label>
                        <select id="nationality" class="form-control">
                          <option selected="">Thai</option>
                        </select>
                      </div>
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
                  <input type="text" placeholder="Enter Drug allergy Here.." class="form-control">
                </div>
                <div class="form-group">
                  <label>Food allergy</label>
                  <input type="text" placeholder="Enter Food allergy Here.." class="form-control">
                </div>
                <div class="form-group">
                  <label> Address</label>
                  <textarea placeholder="Enter Address Here.." rows="3" class="form-control"></textarea>
                </div>
                <br>
                <div class="form-group">
                  <label>Email</label>
                  <input type="text" placeholder="Enter Email Here.." class="form-control">
                </div>
                <div class="form-group">
                  <label>Username</label>
                  <input type="text" placeholder="Enter Username Here.." class="form-control">
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="Enter password Here.. at least 8 character" class="form-control">
                </div>
                <button type="button" class="btn btn-lg btn-info" style="margin-left: 7px" @click="submit">Submit</button>
                <button type="button" class="btn btn-lg btn-info" style="margin-left: 7px">cancel</button>
              </div>
              <div>
                {{userInfo}}
                {{data.Prefix}}
                {{data.Sex}}
                {{data.Status}}
                {{data.Ethnicity}}
                {{data.Nationality}}
                {{data.Blood}}
              </div>
            </form>
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
      userInfo: null,
      data: {
        Prefix: null,
        Sex: null,
        Status: null,
        Ethnicity: null,
        Nationality: null,
        Blood: null
      },
      test: null
    }),
    methods: {
      async submit() {
        this.userInfo = "userinfo"
        var e = document.getElementById("prefix")
        this.data.Prefix = e.options[e.selectedIndex].text
        e = document.getElementById("sex")
        this.data.Sex = e.options[e.selectedIndex].text
        e = document.getElementById("status")
        this.data.Status = e.options[e.selectedIndex].text
        e = document.getElementById("ethnicity")
        this.data.Ethnicity = e.options[e.selectedIndex].text
        e = document.getElementById("nationality")
        this.data.Nationality = e.options[e.selectedIndex].text
        e = document.getElementById("blood")
        this.data.Blood = e.options[e.selectedIndex].text
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
