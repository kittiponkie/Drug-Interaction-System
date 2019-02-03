<template>
  <div class="modal-dialog fix_top">
    <div class="modal-content">
      <div class="modal-heading">
        <h2 class="text-center">Login</h2>
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
            Login
          </button>
          <router-link to="/register" target="_parent"><button class="btn btn-success btn-lg">Register</button></router-link>
          <router-link to="/forgotpassword" target="_blank" class="btn btn-link">forget Password?</router-link>
        </div>        
        {{test}}
      </div>
    </div>
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
      test: null

    }),
    methods: {
      async Login() {
        //this.login.Username = document.getElementById("username").value
        this.login.Username = this.$refs.username.value
        this.login.Password = this.$refs.password.value

        loginService.checkLogin(this.login).then(Response => {
          if (Response.data.success == false) {
            this.test = "Message : "+Response.data.message
          } else {
            //Response.data.ID
            this.test = Response.data.AccountType
            if(Response.data.AccountType == 'Patient') this.$router.push('/patient_information')
            else if(Response.data.AccountType == 'Doctor') this.$router.push('/doctor_information')
            else if(Response.data.AccountType == 'Pharmacist') this.$router.push('/pharmacist_information')
            else if(Response.data.AccountType == 'Admin') this.$router.push('/admin')
            else this.test = "error type not found"
            
          }
        })
      }
    },
    async mounted() {
      this.Window_Width = window.innerWidth
      //let lsValue = this.$localStorage.get('someNumber')
      //console.log(lsValue)
      //this.$localStorage.set('someBoolean', false)
      //this.$localStorage.remove('someBoolean')
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
