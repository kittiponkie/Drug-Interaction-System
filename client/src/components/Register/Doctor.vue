<template>
  <div class="container">
    <h1 class="well">Register</h1>
    <md-tabs md-sync-route>
      <md-tab id="tab-patient" md-label="Patient" to="/register/patient">
        
      </md-tab>

      <md-tab id="tab-doctor" md-label="Doctor" to="/register/doctor">
      {{Window.test}}
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
