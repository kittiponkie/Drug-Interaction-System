<template>
  <div>
    <div class="col-lg-6" style="width:100%;">
      <div class="panel panel-default">
        <div class="panel-heading" style="background-color:#99a5bf" id="headBack">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item">
              <md-button v-if="changeTab[0]"
                @click="changeTab=[true, false, false];changeBackgroundColorHeader('#99a5bf')"
                style="background-color:#444C5C" data-toggle="pill" href="#pills-patient" role="tab" id="home-tab"
                aria-selected="true">
                <h6 style="color:white">Patient</h6>
              </md-button>
              <md-button v-if="!changeTab[0]"
                @click="changeTab=[true, false, false];changeBackgroundColorHeader('#99a5bf')"
                style="background-color:#f1f1f1" data-toggle="pill" href="#pills-patient" role="tab">
                <h6 style="color:black">Patient</h6>
              </md-button>
            </li>
            <li class="nav-item">
              <md-button v-if="changeTab[1]"
                @click="changeTab=[false,true,false];changeBackgroundColorHeader('#b6d6d4')"
                style="background-color:#78A5A3" data-toggle="pill" href="#pills-doctor" role="tab">
                <h6 style="color:white">Doctor</h6>
              </md-button>
              <md-button v-if="!changeTab[1]"
                @click="changeTab=[ false,true,false];changeBackgroundColorHeader('#b6d6d4')"
                style="background-color:#f1f1f1" data-toggle="pill" href="#pills-doctor" role="tab">
                <h6 style="color:black">Doctor</h6>
              </md-button>
            </li>
            <li class="nav-item">
              <md-button v-if="changeTab[2]"
                @click="changeTab=[false,false,true];changeBackgroundColorHeader('#e8928f')"
                style="background-color:#CE5A57" data-toggle="pill" href="#pills-pharmacist" role="tab">
                <h6 style="color:white">Pharmacist</h6>
              </md-button>
              <md-button v-if="!changeTab[2]"
                @click="changeTab=[ false,false,true];changeBackgroundColorHeader('#e8928f')"
                style="background-color:#f1f1f1" data-toggle="pill" href="#pills-pharmacist" role="tab">
                <h6 style="color:black">Pharmacist</h6>
              </md-button>
            </li>
          </ul>
        </div>
        <!--data-->
        <div class="panel-body">
          <div class="tab-content" id="pills-tabContent">
            <!-- patient tab -->
            <div class="tab-pane active" id="pills-patient" role="tabpanel" aria-labelledby="home-tab">
              <div class="md-layout">
                <div class="md-layout-item">
                  <label>Select Patient</label>
                  <select id="selectedPatientID" class="form-control" @change="doSelectedPatient()">
                    <option v-for="i in patients" :value="i.PatientID" :key="i.PatientID">{{i.PatientID}}</option>
                  </select>
                </div>
                <div class="md-layout-item md-toolbar-section-end">
                  <md-button v-if="selectedPatient != null" class="md-icon-button" style="background-color:#5cb85c" @click="showDialog1=true">
                    <md-icon style="color:white">add</md-icon>
                    <md-tooltip md-direction="left">Add Relation</md-tooltip>
                  </md-button>
                </div>
              </div>
              <md-table class="md-elevation-7" v-if="selectedPatient != null" v-model="searched1" md-sort="ID"
                md-sort-order="asc" md-card md-fixed-header style="margin:20px 0 0 0">
                <md-table-toolbar>
                  <div class="md-toolbar-section-start">
                    <h1 class="md-title">Relation Table</h1>
                  </div>

                  <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Search by ID..." v-model="search1" @input="searchOnTable" />
                  </md-field>
                </md-table-toolbar>

                <md-table-empty-state md-label="No users found"
                  :md-description="`No user found for this '${search1}' query. Try a different search term.`">
                </md-table-empty-state>

                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="ID" md-sort-by="ID" md-numeric>{{ item.ID }}</md-table-cell>
                  <md-table-cell md-label="Firstname" md-sort-by="Firstname">{{ item.Firstname }}</md-table-cell>
                  <md-table-cell md-label="Lastname" md-sort-by="Lastname">{{ item.Lastname }}</md-table-cell>
                </md-table-row>
              </md-table>

              <md-dialog :md-active.sync="showDialog1" :md-click-outside-to-close="false" style="padding-top:20px" >   
                <div v-if="!loading">             
                <md-dialog-title>Add Relation</md-dialog-title>
                <div style="padding:20px;">
                  <div style="margin-bottom:20px;">
                <label>Select Type</label>
                  <select id="selectedType" class="form-control" v-model="type" @change="select='none'">
                    <option value="none">None</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Pharmacist">Pharmacist</option>
                  </select>
                  </div>
                  <div v-if="type=='Doctor'" style="margin-bottom:20px;">
                <label>Select Doctor</label>
                <select v-model="select" class="form-control" >
                  <option v-for="i in doctors" :value="i.DoctorID" :key="i.DoctorID">{{i.DoctorID}}</option>
                </select>
                </div>
                <div v-if="type=='Pharmacist'" style="margin-bottom:20px;">
                <label>Select Pharmacist</label>
                <select v-model="select" class="form-control">
                  <option v-for="i in pharmacists" :value="i.PharmacistID" :key="i.PharmacistID">{{i.PharmacistID}}</option>
                </select>
                </div>
                </div>
                </div>
                <div v-else-if="loading==true">
                  <md-empty-state md-label="Loading" :md-description="`Please wait a second`">
                  <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                  </md-empty-state>
                </div>
                <div v-else-if="loading=='success'">
                  <md-dialog-title>Success</md-dialog-title>
                </div>
                <div v-else-if="loading=='fail'">
                  <md-dialog-title>Fail</md-dialog-title>
                  <div><md-dialog-title>This relation had already</md-dialog-title></div>
                </div>
                <md-dialog-actions>
                  <md-button v-if="loading!=true" class="md-primary" @click="onClose()">{{loading==false? 'Cancel':'Close'}}</md-button>
                  <md-button v-if="type!='none' && select!='none' && loading==false" class="md-primary" @click="onSave1()">Save</md-button>
                </md-dialog-actions>
              </md-dialog>
            </div>

            <!-- doctor tab -->
             <div class="tab-pane" id="pills-doctor" role="tabpanel" aria-labelledby="home-tab">
              <div class="md-layout">
                <div class="md-layout-item">
                  <label>Select Doctor</label>
                  <select id="selectedDoctorID" class="form-control" @change="doSelectedDoctor()">
                    <option v-for="i in doctors" :value="i.DoctorID" :key="i.DoctorID">{{i.DoctorID}}</option>
                  </select>
                </div>
                <div class="md-layout-item md-toolbar-section-end">
                  <md-button v-if="selectedDoctor != null" class="md-icon-button" style="background-color:#5cb85c" @click="showDialog2=true">
                    <md-icon style="color:white">add</md-icon>
                    <md-tooltip md-direction="left">Add Relation</md-tooltip>
                  </md-button>
                </div>
              </div>
              <md-table class="md-elevation-7" v-if="selectedDoctor != null" v-model="searched2" md-sort="ID"
                md-sort-order="asc" md-card md-fixed-header style="margin:20px 0 0 0">
                <md-table-toolbar>
                  <div class="md-toolbar-section-start">
                    <h1 class="md-title">Relation Table</h1>
                  </div>

                  <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Search by ID..." v-model="search2" @input="searchOnTable" />
                  </md-field>
                </md-table-toolbar>

                <md-table-empty-state md-label="No users found"
                  :md-description="`No user found for this '${search2}' query. Try a different search term.`">
                </md-table-empty-state>

                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="ID" md-sort-by="ID" md-numeric>{{ item.ID }}</md-table-cell>
                  <md-table-cell md-label="Firstname" md-sort-by="Firstname">{{ item.Firstname }}</md-table-cell>
                  <md-table-cell md-label="Lastname" md-sort-by="Lastname">{{ item.Lastname }}</md-table-cell>
                </md-table-row>
              </md-table>

              <md-dialog :md-active.sync="showDialog2" :md-click-outside-to-close="false" style="padding-top:20px" >   
                <div v-if="!loading">             
                <md-dialog-title>Add Relation</md-dialog-title>
                <div style="padding:20px;">
                  <div style="margin-bottom:20px;">
                <label>Select Patient</label>
                <select v-model="select" class="form-control" >
                  <option v-for="i in patients" :value="i.PatientID" :key="i.PatientID">{{i.PatientID}}</option>
                </select>
                </div>
                </div>
                </div>
                <div v-else-if="loading==true">
                  <md-empty-state md-label="Loading" :md-description="`Please wait a second`">
                  <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                  </md-empty-state>
                </div>
                <div v-else-if="loading=='success'">
                  <md-dialog-title>Success</md-dialog-title>
                </div>
                <div v-else-if="loading=='fail'">
                  <md-dialog-title>Fail</md-dialog-title>
                  <div><md-dialog-title>This relation had already</md-dialog-title></div>
                </div>
                <md-dialog-actions>
                  <md-button v-if="loading!=true" class="md-primary" @click="onClose()">{{loading==false? 'Cancel':'Close'}}</md-button>
                  <md-button v-if="select!='none' && loading==false" class="md-primary" @click="onSave2()">Save</md-button>
                </md-dialog-actions>
              </md-dialog>
            </div>

            <!-- pharmacist tab -->
            <div class="tab-pane" id="pills-pharmacist" role="tabpanel">
              <div class="md-layout">
                <div class="md-layout-item">
                  <label>Select Pharmacist</label>
                  <select id="selectedPharmacistID" class="form-control" @change="doSelectedPharmacist()">
                    <option v-for="i in pharmacists" :value="i.PharmacistID" :key="i.PharmacistID">{{i.PharmacistID}}</option>
                  </select>
                </div>
                <div class="md-layout-item md-toolbar-section-end">
                  <md-button v-if="selectedPharmacist != null" class="md-icon-button" style="background-color:#5cb85c" @click="showDialog3=true">
                    <md-icon style="color:white">add</md-icon>
                    <md-tooltip md-direction="left">Add Relation</md-tooltip>
                  </md-button>
                </div>
              </div>
              <md-table class="md-elevation-7" v-if="selectedPharmacist != null" v-model="searched3" md-sort="ID"
                md-sort-order="asc" md-card md-fixed-header style="margin:20px 0 0 0">
                <md-table-toolbar>
                  <div class="md-toolbar-section-start">
                    <h1 class="md-title">Relation Table</h1>
                  </div>

                  <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Search by ID..." v-model="search3" @input="searchOnTable" />
                  </md-field>
                </md-table-toolbar>

                <md-table-empty-state md-label="No users found"
                  :md-description="`No user found for this '${search3}' query. Try a different search term.`">
                </md-table-empty-state>

                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="ID" md-sort-by="ID" md-numeric>{{ item.ID }}</md-table-cell>
                  <md-table-cell md-label="Firstname" md-sort-by="Firstname">{{ item.Firstname }}</md-table-cell>
                  <md-table-cell md-label="Lastname" md-sort-by="Lastname">{{ item.Lastname }}</md-table-cell>
                </md-table-row>
              </md-table>

              <md-dialog :md-active.sync="showDialog3" :md-click-outside-to-close="false" style="padding-top:20px" >   
                <div v-if="!loading">             
                <md-dialog-title>Add Relation</md-dialog-title>
                <div style="padding:20px;">
                  <div style="margin-bottom:20px;">
                <label>Select Patient</label>
                <select v-model="select" class="form-control" >
                  <option v-for="i in patients" :value="i.PatientID" :key="i.PatientID">{{i.PatientID}}</option>
                </select>
                </div>
                </div>
                </div>
                <div v-else-if="loading==true">
                  <md-empty-state md-label="Loading" :md-description="`Please wait a second`">
                  <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                  </md-empty-state>
                </div>
                <div v-else-if="loading=='success'">
                  <md-dialog-title>Success</md-dialog-title>
                </div>
                <div v-else-if="loading=='fail'">
                  <md-dialog-title>Fail</md-dialog-title>
                  <div><md-dialog-title>This relation had already</md-dialog-title></div>
                </div>
                <md-dialog-actions>
                  <md-button v-if="loading!=true" class="md-primary" @click="onClose()">{{loading==false? 'Cancel':'Close'}}</md-button>
                  <md-button v-if="select!='none' && loading==false" class="md-primary" @click="onSave3()">Save</md-button>
                </md-dialog-actions>
              </md-dialog>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByID = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.ID).includes(toLower(term)))
    }
    return items
  }
  import axios from 'axios'
  import adminServices from '@/services/admin'
  export default {
    name: 'TabContent',
    data() {
      return {
        loading: false,
        search1: null,
        searched1: [],
        users1: [],
        showDialog1:false,
        type: "none",
        select: "none",
        search2: null,
        searched2: [],
        users2: [],
        showDialog2:false,
        search3: null,
        searched3: [],
        users3: [],
        showDialog3:false,
        changeTab: [true, false, false],
        selectedPatient: null,
        selectedDoctor: null,
        selectedPharmacist: null,
        patients: [{
          PatientID: "none"
        }],
        doctors: [{
          DoctorID: "none"
        }],
        pharmacists: [{
          PharmacistID: "none"
        }],
      }
    },
    methods: {
      async doSelectedPatient() {        
        this.search1 = null
        this.searched1 = []
        this.users1 = []
        if(document.getElementById("selectedPatientID").value == "none") this.selectedPatient = null
        else {
          this.selectedPatient = document.getElementById("selectedPatientID").value
          await adminServices.getPatientRelation(this.selectedPatient).then(Response => {
            console.log(Response.data)
            if(Response.data){
              if(Response.data[0].length!=0){
                for(var i in Response.data[0]) {
                  Response.data[0][i].ID = Response.data[0][i].DoctorID 
                  this.users1.push(Response.data[0][i])                  
                  this.searchOnTable()
                }
              }
              if(Response.data[1].length!=0){
                for(var i in Response.data[1]) {
                  Response.data[1][i].ID = Response.data[1][i].PharmacistID 
                  this.users1.push(Response.data[1][i])
                  this.searchOnTable()
                }
              }
            }
          })  
        }
      },
      async onSave1(){
        this.loading = true
        if(this.type == "Doctor"){
          await adminServices.addRelationDoctorPatient({
            PatientID:this.selectedPatient,
            DoctorID:this.select
          }).then(Response =>{
            if(Response.data){
              if(Response.data.success==true){
                adminServices.getDoctor(this.select).then(Response2 =>{
                  if(Response2.data){
                  Response2.data[0].ID = Response2.data[0].DoctorID
                  this.users1.push(Response2.data[0])
                  this.searchOnTable()
                  this.loading = "success"
                  }
                }) 
              } 
              else this.loading = "fail"              
            }
          })
        }
        else if(this.type == 'Pharmacist'){
          await adminServices.addRelationPharmacistPatient({
            PatientID:this.selectedPatient,
            PharmacistID:this.select
          }).then(Response =>{
            if(Response.data){
              if(Response.data.success==true){
                adminServices.getPharmacist(this.select).then(Response2 =>{
                  if(Response2.data){
                    Response2.data[0].ID = Response2.data[0].PharmacistID
                    this.users1.push(Response2.data[0])
                    this.searchOnTable()
                    this.loading = "success"
                  }
                })
              } 
              else this.loading = "fail"
            }
          })
        }        
      },
      async doSelectedDoctor() {        
        this.search2 = null
        this.searched2 = []
        this.users2 = []
        if(document.getElementById("selectedDoctorID").value == "none") this.selectedDoctor = null
        else {
          this.selectedDoctor = document.getElementById("selectedDoctorID").value
          await adminServices.getDoctorRelation(this.selectedDoctor).then(Response => {
            console.log(Response.data)
            if(Response.data){
              for(var i in Response.data) {
                  Response.data[i].ID = Response.data[i].PatientID 
                  this.users2.push(Response.data[i])
                  this.searchOnTable()
              }
            }
          })  
        }
      },
      async onSave2(){
        this.loading = true
        
          await adminServices.addRelationDoctorPatient({
            PatientID:this.select,
            DoctorID:this.selectedDoctor
          }).then(Response =>{
            if(Response.data){
              if(Response.data.success==true){
                adminServices.getPatient(this.select).then(Response2 =>{
                  if(Response2.data){
                  Response2.data[0].ID = Response2.data[0].PatientID
                  this.users2.push(Response2.data[0])
                  this.searchOnTable()
                  this.loading = "success"
                  }
                }) 
              } 
              else this.loading = "fail"              
            }
          })
        
      },
      async doSelectedPharmacist() {        
       this.search3 = null
        this.searched3 = []
        this.users3 = []
        if(document.getElementById("selectedPharmacistID").value == "none") this.selectedPharmacist = null
        else {
          this.selectedPharmacist = document.getElementById("selectedPharmacistID").value
          await adminServices.getPharmacistRelation(this.selectedPharmacist).then(Response => {
            console.log(Response.data)
            if(Response.data){
              for(var i in Response.data) {
                  Response.data[i].ID = Response.data[i].PatientID 
                  this.users3.push(Response.data[i])
                  this.searchOnTable()
              }
            }
          })  
        }
      },
      async onSave3(){
        this.loading = true
        
          await adminServices.addRelationPharmacistPatient({
            PatientID:this.select,
            PharmacistID:this.selectedPharmacist
          }).then(Response =>{
            if(Response.data){
              if(Response.data.success==true){
                adminServices.getPatient(this.select).then(Response2 =>{
                  if(Response2.data){
                  Response2.data[0].ID = Response2.data[0].PatientID
                  this.users3.push(Response2.data[0])
                  this.searchOnTable()
                  this.loading = "success"
                  }
                }) 
              } 
              else this.loading = "fail"              
            }
          })
      },
      onClose(){
        this.showDialog1 = false
        this.loading= false
        this.type= "none"
        this.select= "none"
        this.showDialog2 = false
        this.showDialog3 = false
      },
      changeBackgroundColorHeader(color) {
        document.getElementById("headBack").style.backgroundColor = color
      },
      searchOnTable() {
        this.searched1 = searchByID(this.users1, this.search1)
        this.searched2 = searchByID(this.users2, this.search2)
        this.searched3 = searchByID(this.users3, this.search3)
      },
      async setData(allAccount){        
        for(var i in allAccount){          
          //patient
          if(allAccount[i].ID[0] == 'P' && allAccount[i].ID[1] != 'H') {
            await adminServices.getPatient(allAccount[i].ID).then(Response =>{
              if(Response.data.length != 0) {
                this.patients.push(Response.data[0])   
                this.searchOnTable()  
                console.log(this.patients)  
              }
              this.searchOnTable()     
            })
          }

          //doctor
          else if(allAccount[i].ID[0] == 'D') {
            await adminServices.getDoctor(allAccount[i].ID).then(Response =>{
              if(Response.data.length != 0) {
                this.doctors.push(Response.data[0])   
                this.searchOnTable()    
              }
              this.searchOnTable()     
            })
          }

          //Pharmacist
          else if(allAccount[i].ID[0] == 'P' && allAccount[i].ID[1] == 'H') {
            await adminServices.getPharmacist(allAccount[i].ID).then(Response =>{
              if(Response.data.length != 0) {
                this.pharmacists.push(Response.data[0])   
                this.searchOnTable()    
              }
              this.searchOnTable()     
            })
          }          
        }
      }
    },
    async mounted() {
      //set data on table
      await adminServices.getAccount().then(Response => {
        this.setData(Response.data)
      })  
    }
  }

</script>
