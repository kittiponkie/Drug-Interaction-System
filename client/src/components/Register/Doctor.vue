<template>
  <div class="container">
    <h1 class="well" >
      <router-link to="/login" target="_parent">
        <button type="button" class="btn btn-lg btn-info" style="margin-right: 20px">
          Back
        </button>
      </router-link>
      Register
    </h1>
    <md-tabs md-sync-route>
      <md-tab id="tab-patient" md-label="Patient" to="/register/patient">
      </md-tab>

      <md-tab id="tab-doctor" md-label="Doctor" to="/register/doctor">
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
                  <!-- id card -->
                  <div class="col-sm-6 form-group">
                    <label>ID Card</label>
                    <input ref="idcard" type="text" placeholder="Enter Designation Here.." class="form-control">
                  </div>
                </div>

                <!-- Weight & Height -->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>Department</label>
                    <input ref="department" type="text" placeholder="Enter Department Here.." class="form-control">
                  </div>
                  <div class="col-sm-6 form-group">
                    <label>Ward</label>
                    <input ref="ward" type="text" placeholder="Enter Ward Here.." class="form-control">
                  </div>
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
            <h3>{{dataDoctor}}</h3>
            <h3>{{dataAccount}}</h3>
          </div>
        </div>
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
    name: 'DoctorRegister',
    data: () => ({
      dataDoctor: {
        DoctorID: String,
        Prefix: String,
        Firstname: String,
        Lastname: String,
        Email: String,
        Department: String,
        Ward: String,
        Sex: String,
        IDcardNumber: String,
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
      test: null
    }),
    methods: {
      cancel() {
        window.location.href = "http://localhost:8080/register/doctor";
      },
      async submit() {
        if (this.$refs.username.value != '') {
          await this.DataDoctor()
          await this.DataAccount()
        }        
      },
      async DataDoctor() {
        //save value on variable

        this.dataDoctor.DoctorID = null
        this.dataDoctor.Prefix = this.$refs.prefix.value
        this.dataDoctor.Firstname = this.$refs.firstname.value
        this.dataDoctor.Lastname = this.$refs.lastname.value
        this.dataDoctor.Sex = this.$refs.sex.value
        this.dataDoctor.Email = this.$refs.email.value
        this.dataDoctor.Department = this.$refs.department.value
        this.dataDoctor.Ward = this.$refs.ward.value
        this.dataDoctor.IDcardNumber = this.$refs.idcard.value
        this.dataDoctor.Address = this.$refs.address.value
        this.dataDoctor.Phone = this.$refs.phone.value
        await registerService.doctorInfo(this.dataDoctor).then(Response => {
          if (Response.data != "") {
            this.dataDoctor.DoctorID = Response.data.DoctorID
          }
        })
      },
      DataAccount() {
        this.dataAccount.ID = this.dataDoctor.DoctorID
        this.dataAccount.Username = this.$refs.username.value
        this.dataAccount.Password = this.$refs.password.value
        this.dataAccount.Email = this.$refs.email.value
        this.dataAccount.AccountType = "Doctor"
        registerService.register(this.dataAccount)
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
