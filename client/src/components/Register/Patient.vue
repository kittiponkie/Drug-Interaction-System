<template>
  <div class="container">
    <h1 class="well">
      <router-link to="/login" target="_parent">
        <button type="button" class="btn btn-lg btn-info" style="margin-right: 20px">
          กลับ
        </button>
      </router-link>
      ลงทะเบียน
    </h1>

    <md-tabs md-sync-route>
      <md-tab id="tab-patient" md-label="Patient" to="/register/patient" style="overflow:scroll;">
        <div>
          <div class="row">
            <form>
              <div class="col-sm-12">
                <div class="row">
                  <!-- prefix -->
                  <div class="col-sm-6 form-group">
                    <label>คำนำหน้า</label>
                    <select ref="prefix" class="form-control">
                      <option selected="">นาย</option>
                      <option>นาง</option>
                      <option>นางสาว</option>
                      <option>อื่นๆ</option>
                      <option>เด็กชาย</option>
                      <option>พระสงฆ์</option>
                      <option>บาทหลวง</option>
                      <option>หม่อมหลวง</option>
                      <option>หม่อมราชวงศ์</option>
                      <option>หม่อมเจ้า</option>
                      <option>ศาสตราจารย์เกียรติคุณ (กิตติคุณ)</option>
                      <option>ศาสตราจารย์</option>
                      <option>ผู้ช่วยศาสตราจารย์ </option>
                      <option>รองศาสตราจารย์ </option>
                    </select>
                  </div>
                </div>

                <!-- Name & Surname -->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>ชื่อจริง <label style="color:red">*</label></label>
                    <input ref="firstname" type="text" placeholder="กรอกชื่อจริง.." class="form-control">
                  </div>
                  <div class="col-sm-6 form-group">
                    <label>นามสกุล <label style="color:red">*</label></label>
                    <input ref="lastname" type="text" placeholder="กรอกนามสกุล.." class="form-control">
                  </div>
                </div>

                <div class="row">
                  <!-- Sex -->
                  <div class="col-sm-6 form-group">
                    <label>เพศ</label>
                    <select ref="sex" class="form-control">
                      <option selected="">ชาย</option>
                      <option>หญิง</option>
                      <option>อื่นๆ</option>
                    </select>
                  </div>
                </div>

                <!-- Weight & Height -->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>น้ำหนัก</label>
                    <input ref="weight" type="text" placeholder="กรอกน้ำหนัก(Kg.).." class="form-control">
                  </div>
                  <div class="col-sm-6 form-group">
                    <label>ส่วนสูง</label>
                    <input ref="height" type="text" placeholder="กรอกส่วนสูง(Cm.).." class="form-control">
                  </div>
                </div>

                <!-- Birthday & Age(autocalculation) -->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>วันเกิด</label>
                    <md-datepicker ref="birthday" v-model="datePicker">
                      <label>เลือกวันเกิด..</label>
                    </md-datepicker>

                  </div>
                  <!--div class="col-sm-6 form-group">
                    <label>อายุ</label>
                    <input ref="age" type="text" class="form-control" placeholder="Age .." readonly>
                  </div-->
                </div>

                <!-- id card -->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>หมายเลขบัตรประชาชน</label>
                    <input ref="idcard" type="text" placeholder="กรอกหมายเลขบัตรประชาชน.." class="form-control">
                  </div>
                  <div class="col-sm-6 form-group">
                    <label>สถานะ</label>
                    <select ref="status" class="form-control">
                      <option selected="">โสด </option>
                      <option>แต่งงาน </option>
                      <option>หย่าร้าง </option>
                      <option>แยกกันอยู่</option>
                    </select>
                  </div>
                </div>
                <!-- Rac & Nationality & Religion-->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>สัญชาติ</label>
                    <input ref="nation" type="text" placeholder="กรอกสัญชาติ.." class="form-control">
                  </div>
                  <div class="col-sm-6 form-group">
                    <label>เชื้อชาติ</label>
                    <input ref="rac" type="text" placeholder="กรอกเชื้อชาติ.." class="form-control">
                  </div>
                  <div class="col-sm-6 form-group">
                    <label>ศาสนา</label>
                    <input ref="religion" type="text" placeholder="กรอกศาสนา.." class="form-control">
                  </div>
                </div>
                <!-- blood -->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>หมู่เลือด</label>
                    <select ref="blood" class="form-control">
                      <option selected="">A </option>
                      <option>B</option>
                      <option>AB</option>
                      <option>O</option>
                      <option>Rh-positive</option>
                      <option>Rh-negative</option>
                      <option>ไม่ทราบ</option>
                    </select>
                  </div>
                </div>

                <label>ยาที่แพ้</label>
                <div style="margin:5px 0px 10px 0px;min-height:36px;">

                  <form @submit.prevent="addAllergicList()">

                    <div class="col-sm-6" style="padding-left:0;">
                      <input v-model="query2" id="input" class="form-control" type="text"
                        placeholder="พิมพ์เพื่อค้นหา...">
                      <typeahead v-model="query" target="#input" :data="drugsSearch" :limit="drugsSearch.length"
                        :match-start="true" :force-select="true" :force-clear="true" />
                    </div>
                    <div class="col-sm-6" style="padding-left:0;">

                      <md-button type="submit" style="margin:0;background-color:#5bc0de;color:black">เพิ่ม</md-button>
                    </div>

                  </form>
                  <md-chip v-for="(chip,index) in AllergicDrugs" :key="index" @md-delete="AllergicDrugs.splice(index,1)"
                    md-deletable style="margin-top:5px;">{{
                    chip }}</md-chip>
                </div>


                <div class="form-group" style="padding-top:10px;">
                  <label>ที่อยู่</label>
                  <textarea ref="address" placeholder="กรอกที่อยู่.." rows="3" class="form-control"></textarea>
                </div>
                <div class="form-group">
                  <label>เบอร์โทร</label>
                  <input ref="phone" type="text" placeholder="Enter Phone Here.." class="form-control">
                </div>
                <br>
                <div class="form-group">
                  <label>อีเมล์</label>
                  <input ref="email" type="text" placeholder="กรอกอีเมล์.." class="form-control">
                </div>
                <div class="form-group">
                  <label>ชื่อผู้ใช้ <label style="color:red">*</label></label>
                  <input ref="username" type="text" placeholder="กรอกชื่อผู้ใข้.." class="form-control">
                </div>
                <div class="form-group">
                  <label>รหัสผ่าน <label style="color:red">*</label></label>
                  <input ref="password" type="password" placeholder="กรอกรหัสผ่าน...อย่างน้อย 5 ตัวอักษร"
                    class="form-control">
                </div>
                <button type="button" class="btn btn-lg btn-info" style="margin-left: 7px"
                  @click="submit">สมัคร</button>
                <button type="button" class="btn btn-lg btn-info" style="margin-left: 7px"
                  @click="cancel">ยกเลิก</button>
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
  import DRUGS from '../../data/VTM.js'
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
        VTMName: String
      },

      //date picker
      datePicker: null,

      //auto complete
      AllergicDrugs: [],
      query: '',
      query2: '',
      drugsSearch: DRUGS.VTM,

      //regis
      checkSuccess: {
        patientInfo: false,
        account: false,
        allergic: false
      },
      checkUsername: false
    }),
    methods: {
      cancel() {
        window.location.href = "http://localhost:8080/register/patient";
      },
      async submit() {
        this.checkUsername = false
        this.checkSuccess = {
          patientInfo: false,
          account: false,
          allergic: false
        }
        if(this.$refs.firstname.value == '' || this.$refs.lastname.value == '' || this.$refs.username.value == '' || this.$refs.password.value == '') {
          let message = 'กรุณากรอกข้อมูลดังต่อไปนี้ให้ครบถ้วน\n\n'
          if(this.$refs.firstname.value == '') {
            message += '  - ชื่อจริง\n'
          } 
          if(this.$refs.lastname.value == '') {
            message += '  - นามสกุล\n'
          }
          if(this.$refs.username.value == '') {
            message += '  - ชื่อผู้ใช้\n'
          } 
          if(this.$refs.password.value == '') {
            message += '  - รหัสผ่าน\n'
          } 
          alert(message)          
        } else {
          await registerService.allAccount().then(Response=>{
            console.log(Response.data)
            if(Response.data != [] || Response.data.length != 0){
              Response.data.forEach(item =>{
                if(item.Username == this.$refs.username.value) {
                  alert("มีชื่อผู้ใช้งาน \""+item.Username+"\" ในระบบแล้ว \nกรุณากรอกชื่อผู้ใช้งานใหม่")
                  this.checkUsername = true
                }
              })
            }
          })
          await this.DataPatient()
          await this.DataAccount()  
          if (this.AllergicDrugs != []) await this.DataAllergic()     
          else this.checkSuccess.allergic = true   
        }  
        /*if (this.$refs.username.value != '') {
          await this.DataPatient()
          await this.DataAccount()
          if (this.AllergicDrugs != []) await this.DataAllergic()
          await this.$router.push('/login')
        }*/
      },
      async DataPatient() {
        //save value on variable
        this.dataPatient.PatientID = null
        this.dataPatient.Prefix = this.$refs.prefix.value
        this.dataPatient.Firstname = this.$refs.firstname.value
        this.dataPatient.Lastname = this.$refs.lastname.value
        this.dataPatient.Sex = this.$refs.sex.value
        this.dataPatient.DOB = new Date(this.datePicker).toLocaleDateString()

        var birth = new Date(this.dataPatient.DOB)
        var now = new Date()
        var year = ''
        var month = ''
        var day = ''
        if (birth.getFullYear() < now.getFullYear()) {
          year = now.getFullYear() - birth.getFullYear()
        } else {
          year = 0
        }
        if (birth.getMonth() < now.getMonth()) {
          month = now.getMonth() - birth.getMonth()
        } else {
          month = 12 - birth.getMonth() + now.getMonth()
          if (year != 0) year -= 1
        }
        if (birth.getDate() < now.getDate()) {
          day = now.getDate() - birth.getDate()
        } else {
          day = 30 - birth.getDate() + now.getDate()
          if (month == 0 && year != 0) {
            year -= 1
            month = 11
          } else if (month != 0) {
            month -= 1
          }
        }
        var age = (year + " year " + month + " month " + day + " day").toString()
        //console.log(age)
        this.dataPatient.Age = age

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
        //console.log("birthday is ", this.dataPatient.DOB)
        await registerService.patientInfo(this.dataPatient).then(Response => {
          if (Response.data != "") {
            this.dataPatient.PatientID = Response.data.PatientID
          }
        })
        if(!this.checkUsername)    
        {    
          await registerService.patientInfo(this.dataPatient).then(Response => {
            if (Response.data != "") {
              this.dataPatient.PatientID = Response.data.PatientID
              if(Response.data.status) this.checkSuccess.patientInfo = true            
              if(this.checkSuccess.account && this.checkSuccess.patientInfo && this.checkSuccess.allergic){
                this.$router.push('/login')
              }
            }
          })     
        }
      },
      DataAccount() {
        this.dataAccount.ID = this.dataPatient.PatientID
        this.dataAccount.Username = this.$refs.username.value
        this.dataAccount.Password = this.$refs.password.value
        this.dataAccount.Email = this.$refs.email.value
        this.dataAccount.AccountType = "Patient"
        if(!this.checkUsername) {
          registerService.register(this.dataAccount).then(Response=>{
            //console.log(Response.data)
            if(Response.data.success) this.checkSuccess.account = true  
            if(this.checkSuccess.account && this.checkSuccess.patientInfo && this.checkSuccess.allergic){
              this.$router.push('/login')
            }
          })
        } 
      },
      DataAllergic() {
        this.dataAllergic.PatientID = this.dataPatient.PatientID
        this.dataAllergic.VTMName = this.AllergicDrugs
        //console.log(this.dataAllergic)
        registerService.allergicDrug(this.dataAllergic).then(Response=>{
          if(Response.data.success) this.checkSuccess.allergic = true  
          if(this.checkSuccess.account && this.checkSuccess.patientInfo && this.checkSuccess.allergic){
            this.$router.push('/login')
          }
        })
      },
      async addAllergicList() {
        //console.log(this.drugsSearch.findIndex(x => x == this.query))
        //this.drugsSearch.splice(this.drugsSearch.findIndex(x => x == this.query),1)
        if (this.query != null && this.query != '') {
          let checkConflict = true
          await this.AllergicDrugs.forEach(item=>{
            if(item == this.query) {
              alert("ในรายการแพ้ยามียา \'"+item+"\' แล้ว") 
              checkConflict = false             
            }
          })
          if(checkConflict) {
            await this.AllergicDrugs.push(this.query)            
          }
        }
        this.query = ''
        this.query2 = ''
      }
    },
    async mounted() {
      this.Window_Width = window.innerWidth
      /*var DateTime = new Date()
      console.log(DateTime.toLocaleDateString())*/
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
