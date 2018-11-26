<template>
  <div class="modal-dialog">
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
        test
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
            this.test = Response.data.message
          } else {
            this.test = Response.data.ID
            this.$router.push('/register')
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

<style>
  .modal-content {
    background-color: #5DBFA8;
    padding-top: 0px;
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

</style>
