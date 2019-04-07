<template>
  <div>
    <div class="col-lg-6" style="width:100%;">
      <div class="panel panel-default">
        <div class="panel-heading" style="background-color:#99a5bf" id="headBack">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item">
              <md-button v-if="changeTab[0]"
                @click="changeTab=[true, false, false, false];changeBackgroundColorHeader('#99a5bf',0)"
                style="background-color:#444C5C" data-toggle="pill" href="#pills-patient" role="tab" id="home-tab"
                aria-selected="true">
                <h6 style="color:white">Patient</h6>
              </md-button>
              <md-button v-if="!changeTab[0]"
                @click="changeTab=[true, false, false, false];changeBackgroundColorHeader('#99a5bf',0)"
                style="background-color:#f1f1f1" data-toggle="pill" href="#pills-patient" role="tab">
                <h6 style="color:black">Patient</h6>
              </md-button>
            </li>
            <li class="nav-item">
              <md-button v-if="changeTab[1]"
                @click="changeTab=[false,true,false,false];changeBackgroundColorHeader('#b6d6d4',1)"
                style="background-color:#78A5A3" data-toggle="pill" href="#pills-doctor" role="tab">
                <h6 style="color:white">Doctor</h6>
              </md-button>
              <md-button v-if="!changeTab[1]"
                @click="changeTab=[ false,true,false,false];changeBackgroundColorHeader('#b6d6d4',1)"
                style="background-color:#f1f1f1" data-toggle="pill" href="#pills-doctor" role="tab">
                <h6 style="color:black">Doctor</h6>
              </md-button>
            </li>
            <li class="nav-item">
              <md-button v-if="changeTab[2]"
                @click="changeTab=[false,false,true,false];changeBackgroundColorHeader('#e8928f',2)"
                style="background-color:#CE5A57" data-toggle="pill" href="#pills-pharmacist" role="tab">
                <h6 style="color:white">Pharmacist</h6>
              </md-button>
              <md-button v-if="!changeTab[2]"
                @click="changeTab=[ false,false,true,false];changeBackgroundColorHeader('#e8928f',2)"
                style="background-color:#f1f1f1" data-toggle="pill" href="#pills-pharmacist" role="tab">
                <h6 style="color:black">Pharmacist</h6>
              </md-button>
            </li>
            <li class="nav-item">
              <md-button v-if="changeTab[3]"
                @click="changeTab=[false,false,false,true];changeBackgroundColorHeader('#edcd9e',3)"
                style="background-color:#E1B16A" data-toggle="pill" href="#pills-admin" role="tab">
                <h6 style="color:white">Admin</h6>
              </md-button>
              <md-button v-if="!changeTab[3]"
                @click="changeTab=[ false,false,false,true];changeBackgroundColorHeader('#edcd9e',3)"
                style="background-color:#f1f1f1" data-toggle="pill" href="#pills-admin" role="tab">
                <h6 style="color:black">Admin</h6>
              </md-button>
            </li>
          </ul>
        </div>
        <!--data-->
        <div class="tab-content" id="pills-tabContent">
          <!--Patient-->
          <div class="tab-pane active" id="pills-patient" role="tabpanel" aria-labelledby="home-tab">
            <md-table v-model="searched1" md-sort="PatientID" md-sort-order="asc" md-card md-fixed-header style="margin:0">
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <h1 class="md-title">Patient Users</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="Search by ID..." v-model="search[0]" @input="searchOnTable" />
                </md-field>
              </md-table-toolbar>

              <md-table-empty-state md-label="No users found"
                :md-description="`No user found for this '${search[0]}' query. Try a different search term.`">
              </md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID" md-sort-by="PatientID" md-numeric>{{ item.PatientID }}</md-table-cell>
                <md-table-cell md-label="Firstname" md-sort-by="Firstname">{{ item.Firstname }}</md-table-cell>
                <md-table-cell md-label="Lastname" md-sort-by="Lastname">{{ item.Lastname }}</md-table-cell>
                <md-table-cell md-label="Active Status" md-sort-by="ActiveStatus">{{ checkActive(item.ActiveStatus) }}</md-table-cell>
                <md-table-cell md-label="Action">
                  <md-button v-if="checkActive(item.ActiveStatus)=='Request to Active'" class="md-icon-button"  @click="showDialog_recoverUser(item)" style="background-color:#f44742">
                    <md-icon style="color:white">redo</md-icon>
                    <md-tooltip md-direction="right">Recover User</md-tooltip>
                  </md-button>
                  <md-button v-else-if="checkActive(item.ActiveStatus)=='Active'" class="md-icon-button" style="background-color:#f44742" @click="showDialog_deleteUser(item)">
                    <md-icon style="color:white">delete</md-icon>
                    <md-tooltip md-direction="right">Delete User</md-tooltip>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
          <!--Doctor-->
          <div class="tab-pane" id="pills-doctor" role="tabpanel">
            <md-table v-model="searched2" md-sort="DoctorID" md-sort-order="asc" md-card md-fixed-header style="margin:0">
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <h1 class="md-title">Doctor Users</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="Search by ID..." v-model="search[1]" @input="searchOnTable" />
                </md-field>
              </md-table-toolbar>

              <md-table-empty-state md-label="No users found"
                :md-description="`No user found for this '${search[1]}' query. Try a different search term.`">
              </md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID" md-sort-by="DoctorID" md-numeric>{{ item.DoctorID }}</md-table-cell>
                <md-table-cell md-label="Firstname" md-sort-by="Firstname">{{ item.Firstname }}</md-table-cell>
                <md-table-cell md-label="Lastname" md-sort-by="Lastname">{{ item.Lastname }}</md-table-cell>
                <md-table-cell md-label="Active Status" md-sort-by="ActiveStatus">{{ checkActive(item.ActiveStatus) }}</md-table-cell>
                <md-table-cell md-label="Action">
                  <md-button v-if="checkActive(item.ActiveStatus)=='Request to Active'" class="md-icon-button"  @click="showDialog_recoverUser(item)" style="background-color:#f44742">
                    <md-icon style="color:white">redo</md-icon>
                    <md-tooltip md-direction="right">Recover User</md-tooltip>
                  </md-button>
                  <md-button v-else-if="checkActive(item.ActiveStatus)=='Active'" class="md-icon-button" style="background-color:#f44742" @click="showDialog_deleteUser(item)">
                    <md-icon style="color:white">delete</md-icon>
                    <md-tooltip md-direction="right">Delete User</md-tooltip>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
          <!--Pharmacist-->
          <div class="tab-pane" id="pills-pharmacist" role="tabpanel">
            <md-table v-model="searched3" md-sort="PharmacistID" md-sort-order="asc" md-card md-fixed-header style="margin:0">
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <h1 class="md-title">Pharmacist Users</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="Search by ID..." v-model="search[2]" @input="searchOnTable" />
                </md-field>
              </md-table-toolbar>

              <md-table-empty-state md-label="No users found"
                :md-description="`No user found for this '${search[2]}' query. Try a different search term.`">
              </md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID" md-sort-by="PharmacistID" md-numeric>{{ item.PharmacistID }}</md-table-cell>
                <md-table-cell md-label="Firstname" md-sort-by="Firstname">{{ item.Firstname }}</md-table-cell>
                <md-table-cell md-label="Lastname" md-sort-by="Lastname">{{ item.Lastname }}</md-table-cell>
                <md-table-cell md-label="Active Status" md-sort-by="ActiveStatus">{{ checkActive(item.ActiveStatus) }}</md-table-cell>
                <md-table-cell md-label="Action">
                  <md-button v-if="checkActive(item.ActiveStatus)=='Request to Active'" class="md-icon-button"  @click="showDialog_recoverUser(item)" style="background-color:#f44742">
                    <md-icon style="color:white">redo</md-icon>
                    <md-tooltip md-direction="right">Recover User</md-tooltip>
                  </md-button>
                  <md-button v-else-if="checkActive(item.ActiveStatus)=='Active'" class="md-icon-button" style="background-color:#f44742" @click="showDialog_deleteUser(item)">
                    <md-icon style="color:white">delete</md-icon>
                    <md-tooltip md-direction="right">Delete User</md-tooltip>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
          <!--Admin-->
          <div class="tab-pane" id="pills-admin" role="tabpanel">
            <md-table v-model="searched4" md-sort="ID" md-sort-order="asc" md-card md-fixed-header style="margin:0">
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <h1 class="md-title">Admin Users</h1>                  
                </div>

                <div class="md-toolbar-section-end">
                <md-field md-clearable >
                  <md-input placeholder="Search by ID..." v-model="search[3]" @input="searchOnTable" />
                  
                </md-field>
                <md-button class="md-icon-button" style="background-color:#5cb85c" @click="add_admin()">
                    <md-icon style="color:white">add</md-icon>
                    <md-tooltip md-direction="left">Add Admin</md-tooltip>
                  </md-button>
                </div>
                
              </md-table-toolbar>

              <md-table-empty-state md-label="No users found"
                :md-description="`No user found for this '${search[3]}' query. Try a different search term.`">
              </md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID" md-sort-by="ID" md-numeric>{{ item.ID }}</md-table-cell>
                <md-table-cell md-label="Username" md-sort-by="Username">{{ item.Username }}</md-table-cell>
                <md-table-cell md-label="Email" md-sort-by="Email">{{ item.Email }}</md-table-cell>
                <md-table-cell md-label="Active Status" md-sort-by="ActiveStatus">{{ checkActive(item.ActiveStatus) }}</md-table-cell>
                <md-table-cell md-label="Action">
                  <md-button v-if="checkActive(item.ActiveStatus)=='Request to Active'" class="md-icon-button"  @click="showDialog_recoverUser(item)" style="background-color:#f44742">
                    <md-icon style="color:white">redo</md-icon>
                    <md-tooltip md-direction="right">Recover User</md-tooltip>
                  </md-button>
                  <md-button v-else-if="checkActive(item.ActiveStatus)=='Active'" class="md-icon-button" style="background-color:#f44742" @click="showDialog_deleteUser(item)">
                    <md-icon style="color:white">delete</md-icon>
                    <md-tooltip md-direction="right">Delete User</md-tooltip>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>

          <!--delete user dialog-->
           <md-dialog :md-active.sync="confirmDelete" :md-click-outside-to-close="false" >            
                <p v-if="!loadingDelete && !loadingDeleteFinish" style="margin:20px;margin-left:30px">Do you want to delete user {{deleteUser.PatientID || deleteUser.DoctorID || deleteUser.PharmacistID || deleteUser.ID}} ?</p>
                <md-empty-state v-if="loadingDelete" md-label="Loading" :md-description="`Please wait a second`">
                  <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                </md-empty-state>
                <h3 v-if="completeDelete && loadingDeleteFinish" style="margin:20px;margin-left:30px;text-align:center">Successfull</h3>
                <h3 v-if="!completeDelete && loadingDeleteFinish" style="margin:20px;margin-left:30px;text-align:center">Fail</h3>
                <h5 v-if="!completeDelete && loadingDeleteFinish" style="margin:20px;margin-left:30px;text-align:center">Please Try again</h5>              
            <md-dialog-actions>
            <md-button v-if="!loadingDelete && !loadingDeleteFinish" class="md-primary" @click="onConfirmDelete()">Confirm</md-button>
            <md-button v-if="!loadingDelete && !loadingDeleteFinish" class="md-primary" @click="confirmDelete = false">Cancel</md-button>            
            <md-button v-if="!loadingDelete && loadingDeleteFinish" class="md-primary" @click="onCompleteDelete()">Close</md-button>
            </md-dialog-actions>
          </md-dialog>

          <!--recover user dialog-->
          <md-dialog :md-active.sync="confirmRecover" :md-click-outside-to-close="false" >            
                <p v-if="!loadingRecover && !loadingRecoverFinish" style="margin:20px;margin-left:30px">Do you want to Recover {{recoverUser.PatientID || recoverUser.DoctorID || recoverUser.PharmacistID || recoverUser.ID}} ?</p>
                <md-empty-state v-if="loadingRecover" md-label="Loading" :md-description="`Please wait a second`">
                  <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                </md-empty-state>
                <h3 v-if="completeRecover && loadingRecoverFinish" style="margin:20px;margin-left:30px;text-align:center">Successfull</h3>
                <h3 v-if="!completeRecover && loadingRecoverFinish" style="margin:20px;margin-left:30px;text-align:center">Fail</h3>
                <h5 v-if="!completeRecover && loadingRecoverFinish" style="margin:20px;margin-left:30px;text-align:center">Please Try again</h5>              
            <md-dialog-actions>
            <md-button v-if="!loadingRecover && !loadingRecoverFinish" class="md-primary" @click="onConfirmRecover()">Confirm</md-button>
            <md-button v-if="!loadingRecover && !loadingRecoverFinish" class="md-primary" @click="confirmRecover = false">Cancel</md-button>            
            <md-button v-if="!loadingRecover && loadingRecoverFinish" class="md-primary" @click="onCompleteRecover()">Close</md-button>
            </md-dialog-actions>
          </md-dialog>

          <!--add admin dialog-->
          <md-dialog :md-active.sync="showDialogAddAdmin" :md-click-outside-to-close="false" >
            <md-card >
        <md-card-header>
          <div class="md-title">Register Admin</div>
        </md-card-header>

        <md-card-content>
            <div class="md-layout">
              <md-field md-clearable>
                <label>Username</label>
                <md-input v-model="infoAdmin.Username"/>
              </md-field>
            </div>
            <div class="md-layout">
              <md-field >
                <label>Password</label>
                <md-input v-model="infoAdmin.Password"  type="password"/>
              </md-field>
            </div>
            <div class="md-layout">
              <md-field md-clearable>
                <label>Email</label>
                <md-input v-model="infoAdmin.Email"/>
              </md-field>
            </div>        
          
        </md-card-content>
            </md-card>
            <md-dialog-actions>
            <md-button class="md-primary" @click="addAdmin()">Confirm</md-button>
            <md-button class="md-primary" @click="showDialogAddAdmin = false">Cancel</md-button> 
            </md-dialog-actions>
          </md-dialog>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByID = (items, term ,type) => {
    if (term) {
      if (type == 0)  return items.filter(item => toLower(item.PatientID).includes(toLower(term)))
      else if (type == 1)  return items.filter(item => toLower(item.DoctorID).includes(toLower(term)))
      else if (type == 2)  return items.filter(item => toLower(item.PharmacistID).includes(toLower(term)))
      else if (type == 3)  return items.filter(item => toLower(item.ID).includes(toLower(term)))     
    }
    return items
  }
  import axios from 'axios'
  import adminServices from '@/services/admin'
  export default {
    name: 'TabContent',
    data() {
      return {
        changeTab: [true, false, false, false],
        type: 0,
        search: [null, null, null, null],
        searched1: [],
        searched2: [],
        searched3: [],
        searched4: [],
        confirmDelete: false,        
        loadingDelete: false,
        loadingDeleteFinish:false,
        completeDelete: false,               
        deleteUser: {},
        confirmRecover: false,
        loadingRecover: false,
        loadingRecoverFinish:false,
        completeRecover: false,
        recoverUser:{},
        users1: [],
        users2: [],
        users3:[],
        users4: [],
        showDialogAddAdmin: false,
        infoAdmin:{
          ID:"0" ,       
          Username:"",
          Password:"",
          Email:"",
          AccountType:"Admin",
          RegisterStatus:"1",
          ActiveStatus:"1"
        },
        allAccount: null
      }
    },
    methods: {
      changeBackgroundColorHeader(color, type) { //change color when clicked tab
        this.type = type
        this.searchOnTable()
        document.getElementById("headBack").style.backgroundColor = color
      },
      searchOnTable() {
        if (this.type == 0) this.searched1 = searchByID(this.users1, this.search[0],this.type)
        else if (this.type == 1) this.searched2 = searchByID(this.users2, this.search[1],this.type)
        else if (this.type == 2) this.searched3 = searchByID(this.users3, this.search[2],this.type)
        else if (this.type == 3) this.searched4 = searchByID(this.users4, this.search[3],this.type)
      },
      showDialog_deleteUser(item) {
        this.deleteUser = item
        this.confirmDelete = true
      },
      async onConfirmDelete() {
        this.loadingDelete = true
        if (this.type == 0) {
          for (var i in this.users1) {
            if (this.deleteUser.PatientID == this.users1[i].PatientID) { 
              await adminServices.changeStatusAccount(this.users1[i].PatientID,"0").then(Response => {
                if(Response != null) {
                  this.loadingDelete = false
                  this.loadingDeleteFinish = true
                  if(Response.data) {
                    this.completeDelete = true
                    this.users1[i].ActiveStatus = "0"
                    this.searchOnTable()
                  }
                  else this.completeDelete = false
                }
              })              
            }
          }
        } else if (this.type == 1) {
          for (var i in this.users2) {
            if (this.deleteUser.DoctorID == this.users2[i].DoctorID) {
              await adminServices.changeStatusAccount(this.users2[i].DoctorID,"0").then(Response => {
                if(Response != null) {
                  this.loadingDelete = false
                  this.loadingDeleteFinish = true
                  if(Response.data) {
                    this.completeDelete = true
                    this.users2[i].ActiveStatus = "0"
                    this.searchOnTable()
                  }
                  else this.completeDelete = false
                }
              })  
            }
          }
        } else if (this.type == 2) {
          for (var i in this.users3) {
            if (this.deleteUser.PharmacistID == this.users3[i].PharmacistID) {
              await adminServices.changeStatusAccount(this.users3[i].PharmacistID,"0").then(Response => {
                if(Response != null) {
                  this.loadingDelete = false
                  this.loadingDeleteFinish = true
                  if(Response.data) {
                    this.completeDelete = true
                    this.users3[i].ActiveStatus = "0"
                    this.searchOnTable()
                  }
                  else this.completeDelete = false
                }
              }) 
            }
          }
        } else if (this.type == 3) {
          for (var i in this.users4) {
            if (this.deleteUser.ID == this.users4[i].ID) {
              await adminServices.changeStatusAccount(this.users4[i].ID,"0").then(Response => {
                if(Response != null) {
                  this.loadingDelete = false
                  this.loadingDeleteFinish = true
                  if(Response.data) {
                    this.completeDelete = true
                    this.users4[i].ActiveStatus = "0"
                    this.searchOnTable()
                  }
                  else this.completeDelete = false
                }
              }) 
            }
          }
        }
      },
      onCompleteDelete(){
        this.confirmDelete = false
        this.loadingDelete = false
        this.loadingDeleteFinish = false
        this.completeDelete = false 
        this.deleteUser = {}
      },
      showDialog_recoverUser(item){
        this.recoverUser = item
        this.confirmRecover = true
      },
      async onConfirmRecover(){
        this.loadingRecover= true
        if (this.type == 0) {
          for (var i in this.users1) {
            if (this.recoverUser.PatientID == this.users1[i].PatientID) { 
              await adminServices.changeStatusAccount(this.users1[i].PatientID,"1").then(Response => {
                if(Response != null) {
                  this.loadingRecover = false
                  this.loadingRecoverFinish = true
                  if(Response.data) {
                    this.completeRecover = true
                    this.users1[i].ActiveStatus = "1"
                    this.searchOnTable()
                  }
                  else this.completeRecover = false
                }
              })              
            }
          }
        } else if (this.type == 1) {
          for (var i in this.users2) {
            if (this.recoverUser.DoctorID == this.users2[i].DoctorID) {
              await adminServices.changeStatusAccount(this.users2[i].DoctorID,"1").then(Response => {
                if(Response != null) {
                  this.loadingRecover = false
                  this.loadingRecoverFinish = true
                  if(Response.data) {
                    this.completeRecover = true
                    this.users2[i].ActiveStatus = "1"
                    this.searchOnTable()
                  }
                  else this.completeRecover = false
                }
              })  
            }
          }
        } else if (this.type == 2) {
          for (var i in this.users3) {
            if (this.recoverUser.PharmacistID == this.users3[i].PharmacistID) {
              await adminServices.changeStatusAccount(this.users3[i].PharmacistID,"1").then(Response => {
                if(Response != null) {
                  this.loadingRecover = false
                  this.loadingRecoverFinish = true
                  if(Response.data) {
                    this.completeRecover = true
                    this.users3[i].ActiveStatus = "1"
                    this.searchOnTable()
                  }
                  else this.completeRecover = false
                }
              }) 
            }
          }
        } else if (this.type == 3) {
          for (var i in this.users4) {
            if (this.recoverUser.ID == this.users4[i].ID) {
              await adminServices.changeStatusAccount(this.users4[i].ID,"1").then(Response => {
                if(Response != null) {
                  this.loadingRecover = false
                  this.loadingRecoverFinish = true
                  if(Response.data) {
                    this.completeRecover = true
                    this.users4[i].ActiveStatus = "1"
                    this.searchOnTable()
                  }
                  else this.completeRecover = false
                }
              }) 
            }
          }
        }
      },
      onCompleteRecover(){
        this.confirmRecover = false
        this.loadingRecover = false
        this.loadingRecoverFinish = false
        this.completeRecover = false 
        this.recoverUser = {}
      },
      add_admin(){
        this.showDialogAddAdmin = true
      },
      async addAdmin(){
        this.showDialogAddAdmin = false
        var id = "0"
        for(var i in this.allAccount){
          if(this.allAccount[i].AccountType == "Admin"){
            var number = this.allAccount[i].ID.split('A')
            if(parseInt(id)<=parseInt(number[1])) {
              id = (parseInt(number[1])+1).toString()
            }            
          }
          if(parseInt(i)+1 == this.allAccount.length) {
            if(id.length == 1) id = "A0000"+id
            else if(id.length == 2) id = "A000"+id
            else if(id.length == 3) id = "A00"+id
            else if(id.length == 4) id = "A0"+id
            else id = "A"+id
            this.infoAdmin.ID = id
            await adminServices.addAdmin(this.infoAdmin).then(Response =>{
              if(Response.data.success){
                this.users4.push(this.infoAdmin)      
              }    
              this.infoAdmin = {
                  ID:"0" ,       
                  Username:"",
                  Password:"",
                  Email:"",
                  AccountType:"Admin",
                  RegisterStatus:"1",
                  ActiveStatus:"1"
                }            
            })
          }
        }
      },
      checkActive(activeStatus){
            if(activeStatus == "0") return "Non Active"
            else if(activeStatus == "1") return "Active"
            else return "Request to Active"  
      },
      async setData(allAccount){        
        for(var i in allAccount){
          //var active_status = allAccount[i].ActiveStatus.slice()
          //console.log(active_status)
          //patient
          if(allAccount[i].ID[0] == 'P' && allAccount[i].ID[1] != 'H') {
            await adminServices.getPatient(allAccount[i].ID).then(Response =>{
              if(Response.data.length != 0) {
                Response.data[0].ActiveStatus = allAccount[i].ActiveStatus
                this.users1.push(Response.data[0])   
                this.searchOnTable()    
              }
              this.searchOnTable()     
            })
          }

          //doctor
          else if(allAccount[i].ID[0] == 'D') {
            await adminServices.getDoctor(allAccount[i].ID).then(Response =>{
              if(Response.data.length != 0) {
                Response.data[0].ActiveStatus = allAccount[i].ActiveStatus
                this.users2.push(Response.data[0])   
                this.searchOnTable()    
              }
              this.searchOnTable()     
            })
          }

          //Pharmacist
          else if(allAccount[i].ID[0] == 'P' && allAccount[i].ID[1] == 'H') {
            await adminServices.getPharmacist(allAccount[i].ID).then(Response =>{
              if(Response.data.length != 0) {
                Response.data[0].ActiveStatus = allAccount[i].ActiveStatus
                this.users3.push(Response.data[0])   
                this.searchOnTable()    
              }
              this.searchOnTable()     
            })
          }

          //admin
          else if(allAccount[i].ID[0] == 'A') {
            this.users4.push(allAccount[i])
            this.searchOnTable() 
          }
          
        }
      }
    },
    async mounted() {        
      //set data on table
      await adminServices.getAccount().then(Response => {
        this.allAccount = Response.data
        if(Response.data) this.setData(Response.data)
      })  
    }
  }

</script>
