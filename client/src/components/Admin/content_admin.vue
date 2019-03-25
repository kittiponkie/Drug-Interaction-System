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
            <md-table v-model="searched1" md-sort="Firstname" md-sort-order="asc" md-card md-fixed-header style="margin:0">
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
                <md-table-cell md-label="Action">
                  <md-button class="md-icon-button" style="background-color:#f44742" @click="deletedUser(item)">
                    <md-icon style="color:white">delete</md-icon>
                    <md-tooltip md-direction="right">Delete User</md-tooltip>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
          <!--Doctor-->
          <div class="tab-pane" id="pills-doctor" role="tabpanel">
            <md-table v-model="searched2" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="margin:0">
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
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Firstname" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Lastname" md-sort-by="email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Action">
                  <md-button class="md-icon-button" style="background-color:#f44742" @click="deletedUser(item)">
                    <md-icon style="color:white">delete</md-icon>
                    <md-tooltip md-direction="right" style="margin-left:10px;">Delete User</md-tooltip>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
          <!--Pharmacist-->
          <div class="tab-pane" id="pills-pharmacist" role="tabpanel">
            <md-table v-model="searched3" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="margin:0">
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
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Firstname" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Lastname" md-sort-by="email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Action">
                  <md-button class="md-icon-button" style="background-color:#f44742" @click="deletedUser(item)">
                    <md-icon style="color:white">delete</md-icon>
                    <md-tooltip md-direction="right" style="margin-left:10px;">Delete User</md-tooltip>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
          <!--Admin-->
          <div class="tab-pane" id="pills-admin" role="tabpanel">
            <md-table v-model="searched4" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="margin:0">
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <h1 class="md-title">Admin Users</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="Search by ID..." v-model="search[3]" @input="searchOnTable" />
                </md-field>
              </md-table-toolbar>

              <md-table-empty-state md-label="No users found"
                :md-description="`No user found for this '${search[3]}' query. Try a different search term.`">
              </md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Firstname" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Lastname" md-sort-by="email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Action">
                  <md-button class="md-icon-button" style="background-color:#f44742" @click="deletedUser(item)">
                    <md-icon style="color:white">delete</md-icon>
                    <md-tooltip md-direction="right" style="margin-left:10px;">Delete User</md-tooltip>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
          <!--md-dialog-confirm :md-active.sync="confirmDelete"
            :md-content="'Do you want to Delete '+deleteUser.name+ ' '+deleteUser.email+' ?'" md-confirm-text="Confirm"
            md-cancel-text="Cancel" @md-cancel="confirmDelete = false" @md-confirm="onConfirmDelete()" />
          <md-dialog-confirm :md-active.sync="loadingDelete"
            :md-content="'Do you want to Delete '+deleteUser.name+ ' '+deleteUser.email+' ?'" md-confirm-text="Confirm"
            md-cancel-text="Cancel" @md-cancel="loadingDelete = false" @md-confirm="onCompleteDelete()" /-->
          <md-dialog :md-active.sync="confirmDelete" :md-click-outside-to-close="false" >            
                <p v-if="!loadingDelete && !loadingDeleteFinish" style="margin:20px;margin-left:30px">Do you want to Delete {{deleteUser.name}} {{deleteUser.email}} ?</p>
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
      else if (type == 3)  return items.filter(item => toLower(item.AdminID).includes(toLower(term)))     
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
        users1: [],
        users2: [],
        users3:[],
        users4: []
      }
    },
    methods: {
      changeBackgroundColorHeader(color, type) {
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
      deletedUser(item) {
        this.deleteUser = item
        this.confirmDelete = true
      },
      async onConfirmDelete() {
        this.loadingDelete = true
        if (this.type == 0) {
          for (var i in this.users1) {
            if (this.deleteUser.PatientID == this.users1[i].PatientID) {
              

              await adminServices.deletePatient(this.users1[i].PatientID).then(Response => {
                if(Response != null) {
                    this.loadingDelete = false
                    this.loadingDeleteFinish = true
                    if(Response.data.success) this.completeDelete = true
                    else this.completeDelete = false
                  }
              })
              
              this.users1.splice(i, 1)
            }
          }
        } else if (this.type == 1) {
          for (var i in this.users2) {
            if (this.deleteUser.DoctorID == this.users2[i].id) {
              adminServices.deletePatient()
              this.loadingDelete = false
              this.loadingDeleteFinish = true
              this.completeDelete = false
              this.deleteUser = {}
              this.users2.splice(i, 1)
            }
          }
        } else if (this.type == 2) {
          for (var i in this.users3) {
            if (this.deleteUser.PharmacistID == this.users3[i].id) {
              this.loadingDelete = false
              this.loadingDeleteFinish = true
              this.completeDelete = false
              this.deleteUser = {}
              this.users3.splice(i, 1)
            }
          }
        } else if (this.type == 3) {
          for (var i in this.users4) {
            if (this.deleteUser.AdminID == this.users4[i].id) {
              this.loadingDelete = false
              this.loadingDeleteFinish = true
              this.completeDelete = false
              this.deleteUser = {}
              this.users4.splice(i, 1)
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
      }
    },
    async mounted() {      
      await adminServices.getAllPatient().then(Response => {
        this.users1 = Response.data
        console.log(Response.data)
        this.searchOnTable()
      })
    }
  }

</script>
