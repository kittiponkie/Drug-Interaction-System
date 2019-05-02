<template>
  <div>
    <!-- <h2>Relation</h2> -->
    <div class="col-lg-12" style="width:100%;height:100%">
      <div class="panel panel-default">
        <!--card1-->
        <h3 style="margin-left:20px;">ผู้ป่วย</h3>
        <div class="inline" v-for="(i,index) in users" :key="index" @click="gotoDetail(index)">
          <!--router-link to="/doctor"-->
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">{{users_name[index]}}</div>
              <div class="md-subhead">ID : {{i.PatientID}} </div>
            </md-card-header>
          </md-card>
          <!--/router-link-->
        </div>
        <!-- end card1-->
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import pharmacistServices from '@/services/pharmacist'
  export default {
    name: 'Drug_Interaction',
    data: () => ({
      Window_Width: 0, //width of window
      users: [],
      users_name: []
    }),
    methods: {
      async getPatientInfo() {
        for (var i in this.users) {
          console.log(this.users[i].PatientID)
          await pharmacistServices.patientInfo(this.users[i].PatientID).then(Response => {
            console.log(Response.data[0])
            this.users_name.push(Response.data[0].Firstname + " " + Response.data[0].Lastname)
          })
        }
      },
      gotoDetail(index) {
        console.log(this.users[index].PatientID)
        this.$localStorage.set('pharmacist_patient', this.users[index].PatientID)
        this.$router.push('/pharmacist/pharmacist_drug_dispend')
      }
    },
    async mounted() {
      this.Window_Width = window.innerWidth
      await pharmacistServices.pharmacistRelation(this.$localStorage.get('userID')).then(Response => {
        //console.log(Response.data)
        this.users = Response.data
      })
      await this.getPatientInfo()
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
  }

</style>
