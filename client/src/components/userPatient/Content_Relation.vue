<template>
  <div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>แพทย์</h3>
      </div>
      <div class="paddingCard">
        <div class="inline" v-for="(i,index) in users[0]" :key="index">
          <!--router-link to="/doctor"-->
          <md-card class="cardColor" md-with-hover>
            <md-card-header>
              <div class="md-title">{{doctor_name[index]}}</div>
              <div class="md-subhead">ID : {{i.DoctorID}} </div>
            </md-card-header>
          </md-card>
          <!--/router-link-->
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>เภสัชกร</h3>
      </div>
      <div class="paddingCard">
        <div class="inline" v-for="(i,index) in users[1]" :key="index">
          <!--router-link to="/doctor"-->
          <md-card class="cardColor" md-with-hover>
            <md-card-header>
              <div class="md-title">{{pharmacist_name[index]}}</div>
              <div class="md-subhead">ID : {{i.PharmacistID}} </div>
            </md-card-header>
          </md-card>
          <!--/router-link-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import doctorServices from '@/services/doctor'
  export default {
    name: 'Drug_Interaction',
    data: () => ({
      Window_Width: 0, //width of window
      users: [],
      doctor_name: [],
      pharmacist_name: []
    }),
    methods: {
      async getDoctorInfo() {
        for (var i in this.users[0]) {
          console.log(this.users[0][i].DoctorID)
          await doctorServices.doctorInfo(this.users[0][i].DoctorID).then(Response => {
            console.log(Response.data[0])
            this.doctor_name.push(Response.data[0].Firstname + " " + Response.data[0].Lastname)
          })
        }
      },
      async getPharmacistInfo() {
        for (var i in this.users[1]) {
          console.log(this.users[1][i].PharmacistID)
          await doctorServices.pharmacistInfo(this.users[1][i].PharmacistID).then(Response => {
            console.log(Response.data[0])
            this.pharmacist_name.push(Response.data[0].Firstname + " " + Response.data[0].Lastname)
          })
        }
      }
    },
    async mounted() {
      this.Window_Width = window.innerWidth
      await doctorServices.patientRelation(this.$localStorage.get('userID')).then(Response => {
        console.log(Response.data)
        this.users = Response.data
      })
      await this.getDoctorInfo()
      await this.getPharmacistInfo()
    }
  }

</script>

<style lang="scss" scoped>
  .md-app {
    height: calc(100vh);
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .span_center {
    text-align: center;
    width: 100%;
    font-size: 14px;
  }

  .text_all {
    font-size: 14px;
  }

  .md-field {
    max-width: calc(100% - 110px);
    overflow: auto;
  }

  .textSearch {
    float: left;
  }

  .buttonSearch {
    margin-top: 16px;
  }

  .md-input {
    max-width: calc(100%);
  }

  .menu_color {
    background-color: #f1f1f1;
  }

  .delete_margin {
    width: 100%;
    background-color: #f1f1f1;
  }

  .selected {
    background-color: #5DBFA8;
    margin: 2px;
  }

  .unselected {
    background-color: #f1f1f1;
    margin: 2px;
  }

  .selected_text {
    color: black;
  }

  .unselected_text {
    color: black;
  }

  .md-card {
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

  .md.table {
    width: 750px;
  }

  .dialogdemoThemeInheritance .container {
    text-align: center;
  }

  .inline {
    display: inline-block;
    padding: 5px;
  }

  .paddingCard {
    padding: 10px;
  }

  .cardColor {
    background-color: #f5f5f5;
  }

</style>
