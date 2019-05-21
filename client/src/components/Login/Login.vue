<template>
  <div class="modal-dialog fix_top">
    <div class="modal-content">
         

      <div class="modal-heading">
        <h2 class="text-center">Smart Drug Use</h2>

      </div>
      <!--	<hr /> -->
      <div class="modal-body">
        <form action="" role="form">
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon">
                <span class="glyphicon glyphicon-user"></span>
              </span>
              <input ref="username" type="text" class="form-control" placeholder="User Name" />
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon">
                <span class="glyphicon glyphicon-lock"></span>
              </span>
              <input ref="password" type="password" class="form-control" placeholder="Fill your Password" />
            </div>
          </div>
        </form>
        <div class="form-group text-center">
          <button type="submit" class="btn btn-success btn-lg" @click="Login()">
            เข้าสู่ระบบ
          </button>
          <router-link to="/register" target="_parent"><button class="btn btn-success btn-lg">ลงทะเบียน</button></router-link>
        </div> 
        {{MessageError}} <button v-if="MessagePop" @click="confirmRequest=true" style="color:#f44742">Request Again</button>
      </div>
    </div>
    <!--Request user dialog-->
    <md-dialog :md-active.sync="confirmRequest" :md-click-outside-to-close="false" >            
          <p v-if="!loadingRequest && !loadingRequestFinish" style="margin:20px;margin-left:30px">ยืนยันการขอสิทธิเข้าใช้งานอีกครั้ง ?</p>
          <md-empty-state v-if="loadingRequest" md-label="Loading" :md-description="`Please wait a second`">
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
          </md-empty-state>
          <h3 v-if="completeRequest && loadingRequestFinish" style="margin:20px;margin-left:30px;text-align:center">สำเร็จ</h3>
          <h3 v-if="!completeRequest && loadingRequestFinish" style="margin:20px;margin-left:30px;text-align:center">ผิดพลาด</h3>
          <h5 v-if="!completeRequest && loadingRequestFinish" style="margin:20px;margin-left:30px;text-align:center">กรุณาลองใหม่อีกครั้ง</h5>              
      <md-dialog-actions>
      <md-button v-if="!loadingRequest && !loadingRequestFinish" class="md-primary" @click="onConfirmRequest()">ยืนยัน</md-button>
      <md-button v-if="!loadingRequest && !loadingRequestFinish" class="md-primary" @click="confirmRequest = false">ยกเลิก</md-button>            
      <md-button v-if="!loadingRequest && loadingRequestFinish" class="md-primary" @click="onCompleteRequest()">ปิด</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>


</template>

<script>
  import axios from 'axios'
  import loginService from '@/services/loginService'

  export default {
    name: 'Drug_Interaction',
    data: () => ({
      login: {
        Username: null,
        Password: null
      },
      ID:'',
      MessageError: null,
      confirmRequest: false,
      completeRequest: false,
      loadingRequest: false,
      loadingRequestFinish: false,
      MessagePop: false
    }),
    methods: {
      async Login() {
        this.MessagePop= false
        //this.login.Username = document.getElementById("username").value
        this.login.Username = this.$refs.username.value
        this.login.Password = this.$refs.password.value

        loginService.checkLogin(this.login).then(Response => {
          if (Response.data.success == false) {
            if(Response.data.message=='Account is not approve') {
              this.MessagePop = true
              this.ID = Response.data.ID
            }
            this.MessageError = "Message : "+Response.data.message
          } else {
            //Response.data.ID
            console.log(Response.data)
            this.MessageError = Response.data.AccountType
            this.$localStorage.set('userID', Response.data.ID)
            if(Response.data.AccountType == 'Patient')  this.$router.push('/patient_information')            
            else if(Response.data.AccountType == 'Doctor') this.$router.push('/doctor_relation')
            else if(Response.data.AccountType == 'Pharmacist') this.$router.push('/pharmacist_relation')
            else if(Response.data.AccountType == 'Admin') this.$router.push('/admin')
            else {
              this.MessageError = "error type not found"              
              this.$localStorage.set('userID', null)
            }
          }
        })
      },
      onConfirmRequest(){
        console.log(this.ID)
        this.loadingRequest = true
        loginService.changeRegisterStatusForDoctor(this.ID, '0').then(Response => {
          if(Response != null) {
            this.loadingRequest = false
            this.loadingRequestFinish = true
            if(Response.data) {
              this.completeRequest = true
            }
            else this.completeRequest = false
          }
        })             
      },
      onCompleteRequest(){
        this.confirmRequest = false
        this.loadingRequest = false
        this.loadingRequestFinish = false
        this.completeRequest = false 
        this.MessagePop = false
      }
    },
    async mounted() {
      this.Window_Width = window.innerWidth
    }
  }

</script>

<style lang="scss" scoped>
  .modal-content {
    background-color: #5DBFA8;
  }

  .btn-link {
    color: white;
  }

  .modal-heading h2 {
    color: white;
  }

  .form {
    background-color: white;
  }

  .fix_top{
    margin-top:0px;
    padding-top:30px;
  }
</style>
