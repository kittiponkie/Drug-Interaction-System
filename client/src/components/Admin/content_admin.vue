<template>
  <div>
    <div class="col-lg-6" style="width:100%;">
      <div class="panel panel-default">
        <!--change background-->
        <div class="panel-heading" style="background-color:#99a5bf" id="headBack">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item">
              <md-button v-if="changeTab[0]"
                @click="changeTab=[true, false, false, false];changeBackgroundColorHeader('#99a5bf',0)"
                style="background-color:#444C5C" data-toggle="pill" href="#pills-patient" role="tab" id="home-tab"
                aria-selected="true">
                <h6 style="color:white">ผู้ป่วย</h6>
              </md-button>
              <md-button v-if="!changeTab[0]"
                @click="changeTab=[true, false, false, false];changeBackgroundColorHeader('#99a5bf',0)"
                style="background-color:#f1f1f1" data-toggle="pill" href="#pills-patient" role="tab">
                <h6 style="color:black">ผู้ป่วย</h6>
              </md-button>
            </li>
            <li class="nav-item">
              <md-button v-if="changeTab[1]"
                @click="changeTab=[false,true,false,false];changeBackgroundColorHeader('#b6d6d4',1)"
                style="background-color:#78A5A3" data-toggle="pill" href="#pills-doctor" role="tab">
                <h6 style="color:white">แพทย์</h6>
              </md-button>
              <md-button v-if="!changeTab[1]"
                @click="changeTab=[ false,true,false,false];changeBackgroundColorHeader('#b6d6d4',1)"
                style="background-color:#f1f1f1" data-toggle="pill" href="#pills-doctor" role="tab">
                <h6 style="color:black">แพทย์</h6>
              </md-button>
            </li>
            <li class="nav-item">
              <md-button v-if="changeTab[2]"
                @click="changeTab=[false,false,true,false];changeBackgroundColorHeader('#e8928f',2)"
                style="background-color:#CE5A57" data-toggle="pill" href="#pills-pharmacist" role="tab">
                <h6 style="color:white">เภสัชกร</h6>
              </md-button>
              <md-button v-if="!changeTab[2]"
                @click="changeTab=[ false,false,true,false];changeBackgroundColorHeader('#e8928f',2)"
                style="background-color:#f1f1f1" data-toggle="pill" href="#pills-pharmacist" role="tab">
                <h6 style="color:black">เภสัชกร</h6>
              </md-button>
            </li>
            <li class="nav-item">
              <md-button v-if="changeTab[3]"
                @click="changeTab=[false,false,false,true];changeBackgroundColorHeader('#edcd9e',3)"
                style="background-color:#E1B16A" data-toggle="pill" href="#pills-admin" role="tab">
                <h6 style="color:white">แอดมิน</h6>
              </md-button>
              <md-button v-if="!changeTab[3]"
                @click="changeTab=[ false,false,false,true];changeBackgroundColorHeader('#edcd9e',3)"
                style="background-color:#f1f1f1" data-toggle="pill" href="#pills-admin" role="tab">
                <h6 style="color:black">แอดมิน</h6>
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
                  <h1 class="md-title">ผู้ป่วย</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="ค้นหา..." v-model="search[0]" @input="searchOnTable" />
                </md-field>
              </md-table-toolbar>

              <md-table-empty-state md-label="No users found"
                :md-description="`No user found for this '${search[0]}' query. Try a different search term.`">
              </md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ลำดับ" md-sort-by="PatientID" md-numeric>{{ item.PatientID }}</md-table-cell>
                <md-table-cell md-label="ชื่อ" md-sort-by="Firstname">{{ item.Firstname }}</md-table-cell>
                <md-table-cell md-label="นามสกุล" md-sort-by="Lastname">{{ item.Lastname }}</md-table-cell>
                <md-table-cell md-label="สถานะการใช้งาน" md-sort-by="StatusActive">{{ item.StatusActive }}</md-table-cell>
                <md-table-cell md-label=" ">
                  <md-button v-if="item.StatusActive=='Non Active'" class="md-icon-button"  @click="showDialog_recoverUser(item)" style="background-color:#5cb85c">
                    <md-icon style="color:white">redo</md-icon>
                    <md-tooltip md-direction="right">กู้คืนผู้ใช้</md-tooltip>
                  </md-button>
                  <md-button v-else-if="item.StatusActive=='Active'" class="md-icon-button" style="background-color:#f44742" @click="showDialog_deleteUser(item)">
                    <md-icon style="color:white">delete</md-icon>
                    <md-tooltip md-direction="right">ลบผู้ใช้</md-tooltip>
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
                  <h1 class="md-title">แพทย์</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="ค้นหา..." v-model="search[1]" @input="searchOnTable" />
                </md-field>
              </md-table-toolbar>

              <md-table-empty-state md-label="No users found"
                :md-description="`ไม่พบรายการที่ค้นหา '${search[1]}' กรุณาลองใหม่อีกครั้ง`">
              </md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ลำดับ" md-sort-by="DoctorID" md-numeric>{{ item.DoctorID }}</md-table-cell>
                <md-table-cell md-label="ชื่อ" md-sort-by="Firstname">{{ item.Firstname }}</md-table-cell>
                <md-table-cell md-label="นามสกุล" md-sort-by="Lastname">{{ item.Lastname }}</md-table-cell>
                <md-table-cell md-label="สถานะการใช้งาน" md-sort-by="StatusActive">{{ item.StatusActive }}</md-table-cell>
                <md-table-cell md-label=" ">
                  <md-button v-if="item.StatusActive=='Non Active'" class="md-icon-button"  @click="showDialog_recoverUser(item)" style="background-color:#5cb85c">
                    <md-icon style="color:white">redo</md-icon>
                    <md-tooltip md-direction="right">กู้คืนผู้ใช้</md-tooltip>
                  </md-button>
                  <md-button v-else-if="item.StatusActive=='Active'" class="md-icon-button" style="background-color:#f44742" @click="showDialog_deleteUser(item)">
                    <md-icon style="color:white">delete</md-icon>
                    <md-tooltip md-direction="right">ลบผู้ใช้</md-tooltip>
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
                  <h1 class="md-title">เภสัชกร</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="ค้นหา..." v-model="search[2]" @input="searchOnTable" />
                </md-field>
              </md-table-toolbar>

              <md-table-empty-state md-label="No users found"
                :md-description="`ไม่พบรายการที่ค้นหา '${search[2]}' กรุณาลองใหม่อีกครั้ง`">
              </md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ลำดับ" md-sort-by="PharmacistID" md-numeric>{{ item.PharmacistID }}</md-table-cell>
                <md-table-cell md-label="ชื่อ" md-sort-by="Firstname">{{ item.Firstname }}</md-table-cell>
                <md-table-cell md-label="นามสกุล" md-sort-by="Lastname">{{ item.Lastname }}</md-table-cell>
                <md-table-cell md-label="สถานะการใช้งาน" md-sort-by="StatusActive">{{ item.StatusActive }}</md-table-cell>
                <md-table-cell md-label=" ">
                  <md-button v-if="item.StatusActive=='Non Active'" class="md-icon-button"  @click="showDialog_recoverUser(item)" style="background-color:#5cb85c">
                    <md-icon style="color:white">redo</md-icon>
                    <md-tooltip md-direction="right">กู้คืนผู้ใช้</md-tooltip>
                  </md-button>
                  <md-button v-else-if="item.StatusActive=='Active'" class="md-icon-button" style="background-color:#f44742" @click="showDialog_deleteUser(item)">
                    <md-icon style="color:white">delete</md-icon>
                    <md-tooltip md-direction="right">ลบผู้ใช้</md-tooltip>
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
                  <h1 class="md-title">แอดมิน</h1>                  
                </div>

                <div class="md-toolbar-section-end">
                <md-field md-clearable >
                  <md-input placeholder="ค้นหา..." v-model="search[3]" @input="searchOnTable" />
                  
                </md-field>
                <md-button class="md-icon-button" style="background-color:#5cb85c" @click="add_admin()">
                    <md-icon style="color:white">add</md-icon>
                    <md-tooltip md-direction="left">เพิ่มแอดมิน</md-tooltip>
                  </md-button>
                </div>
                
              </md-table-toolbar>

              <md-table-empty-state md-label="No users found"
                :md-description="`ไม่พบรายการที่ค้นหา '${search[3]}'กรุณาลองใหม่อีกครั้ง`">
              </md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ลำดับ" md-sort-by="ID" md-numeric>{{ item.ID }}</md-table-cell>
                <md-table-cell md-label="ชื่อผู้ใช้" md-sort-by="Username">{{ item.Username }}</md-table-cell>
                <md-table-cell md-label="อีเมล์" md-sort-by="Email">{{ item.Email }}</md-table-cell>
                <md-table-cell md-label="สถานะการใช้งาน" md-sort-by="StatusActive">{{ item.StatusActive }}</md-table-cell>
                <md-table-cell md-label=" ">
                  <md-button v-if="item.StatusActive=='Non Active'" class="md-icon-button"  @click="showDialog_recoverUser(item)" style="background-color:#5cb85c">
                    <md-icon style="color:white">redo</md-icon>
                    <md-tooltip md-direction="right">กู้คืนผู้ใช้</md-tooltip>
                  </md-button>
                  <md-button v-else-if="item.StatusActive=='Active'" class="md-icon-button" style="background-color:#f44742" @click="showDialog_deleteUser(item)">
                    <md-icon style="color:white">delete</md-icon>
                    <md-tooltip md-direction="right">ลบผู้ใช้</md-tooltip>
                  </md-button>
                </md-table-cell>   
              </md-table-row>
            </md-table>
          </div>

          <!--delete user dialog-->
           <md-dialog :md-active.sync="confirmDelete" :md-click-outside-to-close="false" >            
                <p v-if="!loadingDelete && !loadingDeleteFinish" style="margin:20px;margin-left:30px">ต้องการลบ {{deleteUser.PatientID || deleteUser.DoctorID || deleteUser.PharmacistID || deleteUser.ID}} {{deleteUser.Firstname || deleteUser.Username}} {{deleteUser.Lastname}} ?</p>
                <md-empty-state v-if="loadingDelete" md-label="Loading" :md-description="`Please wait a second`">
                  <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                </md-empty-state>
                <h3 v-if="completeDelete && loadingDeleteFinish" style="margin:20px;margin-left:30px;text-align:center">สำเร็จ</h3>
                <h3 v-if="!completeDelete && loadingDeleteFinish" style="margin:20px;margin-left:30px;text-align:center">ผิดพลาด</h3>
                <h5 v-if="!completeDelete && loadingDeleteFinish" style="margin:20px;margin-left:30px;text-align:center">กรุณาลองใหม่อีกครั้ง</h5>              
            <md-dialog-actions>
            <md-button v-if="!loadingDelete && !loadingDeleteFinish" class="md-primary" @click="onConfirmDelete()">ยืนยัน</md-button>
            <md-button v-if="!loadingDelete && !loadingDeleteFinish" class="md-primary" @click="confirmDelete = false">ยกเลิก</md-button>            
            <md-button v-if="!loadingDelete && loadingDeleteFinish" class="md-primary" @click="onCompleteDelete()">ปิด</md-button>
            </md-dialog-actions>
          </md-dialog>

          <!--recover user dialog-->
          <md-dialog :md-active.sync="confirmRecover" :md-click-outside-to-close="false" >            
                <p v-if="!loadingRecover && !loadingRecoverFinish" style="margin:20px;margin-left:30px">ต้องการที่จะกู้คืน {{recoverUser.PatientID || recoverUser.DoctorID || recoverUser.PharmacistID || recoverUser.ID}} {{recoverUser.Firstname || recoverUser.Username}} {{recoverUser.Lastname}}?</p>
                <md-empty-state v-if="loadingRecover" md-label="Loading" :md-description="`Please wait a second`">
                  <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                </md-empty-state>
                <h3 v-if="completeRecover && loadingRecoverFinish" style="margin:20px;margin-left:30px;text-align:center">สำเร็จ</h3>
                <h3 v-if="!completeRecover && loadingRecoverFinish" style="margin:20px;margin-left:30px;text-align:center">ผิดพลาด</h3>
                <h5 v-if="!completeRecover && loadingRecoverFinish" style="margin:20px;margin-left:30px;text-align:center">กรุณาลองใหม่อีกครั้ง</h5>              
            <md-dialog-actions>
            <md-button v-if="!loadingRecover && !loadingRecoverFinish" class="md-primary" @click="onConfirmRecover()">ยืนยัน</md-button>
            <md-button v-if="!loadingRecover && !loadingRecoverFinish" class="md-primary" @click="confirmRecover = false">ยกเลิก</md-button>            
            <md-button v-if="!loadingRecover && loadingRecoverFinish" class="md-primary" @click="onCompleteRecover()">ปิด</md-button>
            </md-dialog-actions>
          </md-dialog>

          <!--add admin dialog-->
          <md-dialog :md-active.sync="showDialogAddAdmin" :md-click-outside-to-close="false" >
            <md-card >
        <md-card-header>
          <div class="md-title">สมัครบัญชีผู้ใช้ประเภทแอดมิน</div>
        </md-card-header>

        <md-card-content>
            <div class="md-layout">
              <md-field md-clearable>
                <label>ชื่อผู้ใช้</label>
                <md-input v-model="infoAdmin.Username"/>
              </md-field>
            </div>
            <div class="md-layout">
              <md-field >
                <label>รหัสผ่าน</label>
                <md-input v-model="infoAdmin.Password"  type="password"/>
              </md-field>
            </div>
            <div class="md-layout">
              <md-field md-clearable>
                <label>อีเมล์</label>
                <md-input v-model="infoAdmin.Email"/>
              </md-field>
            </div>        
          
        </md-card-content>
            </md-card>
            <md-dialog-actions>
            <md-button class="md-primary" @click="addAdmin()">ยืนยัน</md-button>
            <md-button class="md-primary" @click="showDialogAddAdmin = false">ยกเลิก</md-button> 
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
      return items.filter(item => {        
        if (item.PatientID && toLower(item.PatientID).includes(toLower(term))) return item
        else if (item.DoctorID && toLower(item.DoctorID).includes(toLower(term))) return item
        else if (item.PharmacistID && toLower(item.PharmacistID).includes(toLower(term))) return item
        else if (item.ID && toLower(item.ID).includes(toLower(term))) return item
        else if (item.Firstname && toLower(item.Firstname).includes(toLower(term))) return item
        else if (item.Lastname && toLower(item.Lastname).includes(toLower(term))) return item        
        else if (item.Email && toLower(item.Email).includes(toLower(term))) return item
        else if (item.Username && toLower(item.Username).includes(toLower(term))) return item
        else if (item.StatusActive && toLower(item.StatusActive).includes(toLower(term))) return item        
      })          
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
                    this.users1[i].StatusActive = "Non Active"
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
                    this.users2[i].StatusActive = "Non Active"
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
                    this.users3[i].StatusActive = "Non Active"
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
                    this.users4[i].StatusActive = "Non Active"
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
                    this.users1[i].StatusActive = "Active"
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
                    this.users2[i].StatusActive = "Active"
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
                    this.users3[i].StatusActive = "Active"
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
                    this.users4[i].StatusActive = "Active"
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
                this.infoAdmin.StatusActive = 'Active'
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
                if(allAccount[i].ActiveStatus=='1' && allAccount[i].RegisterStatus=='1'){                  
                  Response.data[0].StatusActive = 'Active'
                } else if(allAccount[i].ActiveStatus=='0' && allAccount[i].RegisterStatus=='1'){
                  Response.data[0].StatusActive = 'Non Active'
                } else if(allAccount[i].RegisterStatus=='0'){
                  Response.data[0].StatusActive = 'รอแอดมินอนุมัติ'
                } else if(allAccount[i].RegisterStatus=='2'){
                  Response.data[0].StatusActive = 'แอดมินไม่อนุมัติ'
                }
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
                if(allAccount[i].ActiveStatus=='1' && allAccount[i].RegisterStatus=='1'){                  
                  Response.data[0].StatusActive = 'Active'
                } else if(allAccount[i].ActiveStatus=='0' && allAccount[i].RegisterStatus=='1'){
                  Response.data[0].StatusActive = 'Non Active'
                } else if(allAccount[i].RegisterStatus=='0'){
                  Response.data[0].StatusActive = 'รอแอดมินอนุมัติ'
                } else if(allAccount[i].RegisterStatus=='2'){
                  Response.data[0].StatusActive = 'แอดมินไม่อนุมัติ'
                }
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
                if(allAccount[i].ActiveStatus=='1' && allAccount[i].RegisterStatus=='1'){                  
                  Response.data[0].StatusActive = 'Active'
                } else if(allAccount[i].ActiveStatus=='0' && allAccount[i].RegisterStatus=='1'){
                  Response.data[0].StatusActive = 'Non Active'
                } else if(allAccount[i].RegisterStatus=='0'){
                  Response.data[0].StatusActive = 'รอแอดมินอนุมัติ'
                } else if(allAccount[i].RegisterStatus=='2'){
                  Response.data[0].StatusActive = 'แอดมินไม่อนุมัติ'
                }
                this.users3.push(Response.data[0])   
                this.searchOnTable()    
              }
              this.searchOnTable()     
            })
          }

          //admin
          else if(allAccount[i].ID[0] == 'A') {
            if(allAccount[i].ActiveStatus=='1' && allAccount[i].RegisterStatus=='1'){                  
              allAccount[i].StatusActive = 'Active'
            } else if(allAccount[i].ActiveStatus=='0' && allAccount[i].RegisterStatus=='1'){
              allAccount[i].StatusActive = 'Non Active'
            } else if(allAccount[i].RegisterStatus=='0'){
              allAccount[i].StatusActive = 'รอแอดมินอนุมัติ'
            } else if(allAccount[i].RegisterStatus=='2'){
              allAccount[i].StatusActive = 'แอดมินไม่อนุมัติ'
            }
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
