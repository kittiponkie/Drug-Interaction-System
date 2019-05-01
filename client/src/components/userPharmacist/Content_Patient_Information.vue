<template>
  <div>
    <div class="col-lg-6" style="width:100%;">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h2 style="text-align:center;">Patient Information</h2>
          <br>
          <div class="form-goup row">
            <label for="prefix" class="col-sm-2 col-form-label">Patient ID</label>
            <div class="col-sm-10">
              <input type="text" readonly class="form-control" id="prefix" :value="patientInfo.PatientID">
            </div>
          </div>
          <br>
          <!-- patient data -->
          <form>
            <!--prefix-->
            <div class="form-goup row">
              <label for="prefix" class="col-sm-2 col-form-label">Prefix</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="prefix" :value="patientInfo.Prefix">
              </div>
            </div>
            <br>
            <!--name-->
            <div class="form-group row">
              <label for="name" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="namesurname" :value="patientInfo.Firstname">
              </div>
            </div>
            <!--surname-->
            <div class="form-group row">
              <label for="surname" class="col-sm-2 col-form-label">Surname</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="surname" :value="patientInfo.Lastname">
              </div>
            </div>
            <!--sex-->
            <div class="form-group row">
              <label for="sex" class="col-sm-2 col-form-label">Sex</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="sex" :value="patientInfo.Sex">
              </div>
            </div>
            <!--birthday-->
            <div class="form-group row">
              <label for="bod" class="col-sm-2 col-form-label">Birthday</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="birthday" :value="patientInfo.DOB">
              </div>
            </div>
            <div class="form-group row">
              <label for="bod" class="col-sm-2 col-form-label">Age</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="age" :value="patientInfo.Age">
              </div>
            </div>
            <!--id card-->
            <div class="form-group row">
              <label for="idcard" class="col-sm-2 col-form-label">ID Card</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="card" :value="patientInfo.IDcardNumber">
              </div>
            </div>
            <!--status-->
            <div class="form-group row">
              <label for="idcard" class="col-sm-2 col-form-label">Status</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="card" :value="patientInfo.Status">
              </div>
            </div>
            <!--nationality-->
            <div class="form-group row">
              <label for="nationality" class="col-sm-2 col-form-label">Nationality</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="nationality" :value="patientInfo.Nation">
              </div>
            </div>
            <!--Religion-->
            <div class="form-group row">
              <label for="Religion" class="col-sm-2 col-form-label">Religion</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="Religion" :value="patientInfo.Religion">
              </div>
            </div>
            <!--Blood-->
            <div class="form-group row">
              <label for="Blood" class="col-sm-2 col-form-label">Blood</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="Blood" :value="patientInfo.Bloodgroup">
              </div>
            </div>
            <!--Address-->
            <div class="form-group row">
              <label for="Address" class="col-sm-2 col-form-label">Address</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="Address" :value="patientInfo.Address">
              </div>
            </div>
            <!--PhoneNumber-->
            <div class="form-group row">
              <label for="PhoneNumber" class="col-sm-2 col-form-label">Phone Number</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="PhoneNumber" :value="patientInfo.Phone">
              </div>
            </div>
            <!--Drugallergy-->
            <div class="form-group row">
              <label for="Drugallergy" class="col-sm-2 col-form-label">Drug allergic</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="Drugallergy" :value="allergicOfPatient">
              </div>
            </div>
          </form>
        </div>
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
      patientInfo: [],
      allergicOfPatient: []
    }),
    methods: {
    },
    async mounted() {
      this.Window_Width = window.innerWidth
      this.patientID = this.$localStorage.get('pharmacist_patient')
      //get patient info   
      await pharmacistServices.patientInfo(this.$localStorage.get('pharmacist_patient')).then(Response => {
        console.log(Response.data[0])
        this.patientInfo = Response.data[0]
      })  

      //get allergic of patient
      await pharmacistServices.allergicOfPatient(this.$localStorage.get('pharmacist_patient')).then(Response => {
        console.log("Allergic drug of patient is ",Response.data)
        for(var i in Response.data){
          this.allergicOfPatient.push(Response.data[i].VTMName)
        }        
      })
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

  .md-content md-app-content md-flex text_all md-theme-default {
    padding-top: 23px;
  }

</style>
