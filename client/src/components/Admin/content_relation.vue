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
                <h5 style="color:white">ผู้ป่วย</h5>
              </md-button>
              <md-button v-if="!changeTab[0]"
                @click="changeTab=[true, false, false];changeBackgroundColorHeader('#99a5bf')"
                style="background-color:#f1f1f1" data-toggle="pill" href="#pills-patient" role="tab">
                <h5 style="color:black">ผู้ป่วย</h5>
              </md-button>
            </li>
            <li class="nav-item">
              <md-button v-if="changeTab[1]"
                @click="changeTab=[false,true,false];changeBackgroundColorHeader('#b6d6d4')"
                style="background-color:#78A5A3" data-toggle="pill" href="#pills-doctor" role="tab">
                <h5 style="color:white">แพทย์</h5>
              </md-button>
              <md-button v-if="!changeTab[1]"
                @click="changeTab=[ false,true,false];changeBackgroundColorHeader('#b6d6d4')"
                style="background-color:#f1f1f1" data-toggle="pill" href="#pills-doctor" role="tab">
                <h5 style="color:black">แพทย์</h5>
              </md-button>
            </li>
            <li class="nav-item">
              <md-button v-if="changeTab[2]"
                @click="changeTab=[false,false,true];changeBackgroundColorHeader('#e8928f')"
                style="background-color:#CE5A57" data-toggle="pill" href="#pills-pharmacist" role="tab">
                <h5 style="color:white">เภสัชกร</h5>
              </md-button>
              <md-button v-if="!changeTab[2]"
                @click="changeTab=[ false,false,true];changeBackgroundColorHeader('#e8928f')"
                style="background-color:#f1f1f1" data-toggle="pill" href="#pills-pharmacist" role="tab">
                <h5 style="color:black">เภสัชกร</h5>
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
                  <label>เลือกผู้ป่วย</label>
                  <list-select :list="patients"
                     option-value="PatientID"
                     option-text="Firstname"
                     :custom-text="showOptionsSelect"
                     :selected-item="selectedPatient"
                     @select="doSelectedPatient"
                     placeholder="เลือกผู้ป่วย">
                  </list-select>
                  <br>
                  <div v-if="selectedPatient.PatientID">
                    <label v-if="selectedPatient.Status">สถานะ : {{selectedPatient.Status.ActiveStatus=='1'&&selectedPatient.Status.RegisterStatus=='1'? ': Active':': Non Active'}} </label>
                  </div>
                </div>
                <div class="md-layout-item md-toolbar-section-end">
                  <md-button v-if="selectedPatient.PatientID" class="md-icon-button" style="background-color:#5cb85c" @click="showDialog1=true">
                    <md-icon style="color:white">add</md-icon>
                    <md-tooltip md-direction="left">เพิ่มความสัมพันธ์</md-tooltip>
                  </md-button>
                </div>
              </div>
              <md-table class="md-elevation-7" v-if="selectedPatient.PatientID" v-model="searched1" md-sort="ID"
                md-sort-order="asc" md-card md-fixed-header style="margin:20px 0 0 0">
                <md-table-toolbar>
                  <div class="md-toolbar-section-start">
                    <h1 class="md-title">ตารางความสัมพันธ์</h1>
                  </div>

                  <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="ค้นหา..." v-model="search1" @input="searchOnTable" />
                  </md-field>
                </md-table-toolbar>

                <md-table-empty-state md-label="No users found"
                  :md-description="`ไม่พบรายการที่ค้นหา '${search1}' กรุณาลองใหม่อีกครั้ง`">
                </md-table-empty-state>

                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="ลำดับ" md-sort-by="ID" md-numeric>{{ item.ID }}</md-table-cell>
                  <md-table-cell md-label="ประเภทผู้ใช้" md-sort-by="Type" md-numeric>{{ item.Type }}</md-table-cell>
                  <md-table-cell md-label="ชื่อ" md-sort-by="Firstname">{{ item.Firstname }}</md-table-cell>
                  <md-table-cell md-label="นามสกุล" md-sort-by="Lastname">{{ item.Lastname }}</md-table-cell>
                  <md-table-cell md-label="สถานะ" md-sort-by="StatusActive">{{ item.StatusActive }}</md-table-cell>
                </md-table-row>
              </md-table>

              <md-dialog :md-active.sync="showDialog1" :md-click-outside-to-close="false" style="padding-top:20px; overflow: visible;" >   
                <div v-if="!loading">             
                <md-dialog-title>เพิ่มความสัมพันธ์</md-dialog-title>
                <div style="padding:20px;">
                  <div style="margin-bottom:20px;">
                <label>เลือกประเภทผู้ใช้</label>
                  <select id="selectedType" class="form-control" v-model="type" @change="select='none';selectDoctorInPatient={};selectPharmacistInPatient={}">
                    <option value="none">ไม่มี</option>
                    <option value="Doctor">แพทย์</option>
                    <option value="Pharmacist">เภสัชกร</option>
                  </select>
                  </div>
                  <div v-if="type=='Doctor'" style="margin-bottom:20px;">
                <label>เลือกแพทย์</label>
                <list-select :list="doctors"
                  option-value="DoctorID"
                  option-text="Firstname"
                  :custom-text="showOptionsSelect"
                  :selected-item="selectDoctorInPatient"
                  @select="doSelectedPatientDoctor"
                  placeholder="เลือกแพทย์">
                </list-select>
                </div>
                <div v-if="type=='Pharmacist'" style="margin-bottom:20px;">
                <label>เลือกเภสัชกร</label>
                <list-select :list="pharmacists"
                  option-value="PharmacistID"
                  option-text="Firstname"
                  :custom-text="showOptionsSelect"
                  :selected-item="selectPharmacistInPatient"
                  @select="doSelectedPatientDoctor"
                  placeholder="เลือกเภสัชกร">
                </list-select>
                </div>
                </div>
                </div>
                <div v-else-if="loading==true">
                  <md-empty-state md-label="Loading" :md-description="`Please wait a second`">
                  <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                  </md-empty-state>
                </div>
                <div v-else-if="loading=='success'">
                  <md-dialog-title>สำเร็จ</md-dialog-title>
                </div>
                <div v-else-if="loading=='fail'">
                  <md-dialog-title>ผิดพลาด</md-dialog-title>
                  <div><md-dialog-title>มีความสัมพันธ์นี้ในระบบแล้ว</md-dialog-title></div>
                </div>
                <md-dialog-actions>
                  <md-button v-if="loading!=true" class="md-primary" @click="onClose()">{{loading==false? 'ยกเลิก':'ปิด'}}</md-button>
                  <md-button v-if="type!='none' && select!='none' && loading==false" class="md-primary" @click="onSave1()">บันทึก</md-button>
                  <md-button v-else-if="!loading" class="md-primary" disabled>บันทึก</md-button>
                </md-dialog-actions>
              </md-dialog>
            </div>

            <!-- doctor tab -->
             <div class="tab-pane" id="pills-doctor" role="tabpanel" aria-labelledby="home-tab">
              <div class="md-layout">
                <div class="md-layout-item">
                  <label>เลือกแพทย์</label>
                  <list-select :list="doctors"
                     option-value="DoctorID"
                     option-text="Firstname"
                     :custom-text="showOptionsSelect"
                     :selected-item="selectedDoctor"
                     @select="doSelectedDoctor"
                     placeholder="เลือกแพทย์">
                  </list-select>
                  <br>
                  <div v-if="selectedDoctor.DoctorID">
                    <label v-if="selectedDoctor.Status">สถานะ : {{selectedDoctor.Status.ActiveStatus=='1'&&selectedDoctor.Status.RegisterStatus=='1'? ': Active':': Non Active'}} </label>
                  </div>
                </div>
                <div class="md-layout-item md-toolbar-section-end">
                  <md-button v-if="selectedDoctor.DoctorID" class="md-icon-button" style="background-color:#5cb85c" @click="showDialog2=true">
                    <md-icon style="color:white">add</md-icon>
                    <md-tooltip md-direction="left">เพิ่มความสัมพันธ์</md-tooltip>
                  </md-button>
                </div>
              </div>
              <md-table class="md-elevation-7" v-if="selectedDoctor.DoctorID" v-model="searched2" md-sort="ID"
                md-sort-order="asc" md-card md-fixed-header style="margin:20px 0 0 0">
                <md-table-toolbar>
                  <div class="md-toolbar-section-start">
                    <h1 class="md-title">ตารางความสัมพันธ์</h1>
                  </div>

                  <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="ค้นหา..." v-model="search2" @input="searchOnTable" />
                  </md-field>
                </md-table-toolbar>

                <md-table-empty-state md-label="No users found"
                  :md-description="`ไม่พบรายการที่ค้นหา '${search2}' กรุณาลองใหม่อีกครั้ง`">
                </md-table-empty-state>

                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="ลำดับ" md-sort-by="ID" md-numeric>{{ item.ID }}</md-table-cell>
                  <md-table-cell md-label="ประเภทผู้ใช้" md-sort-by="Type" md-numeric>{{ item.Type }}</md-table-cell>
                  <md-table-cell md-label="ชื่อ" md-sort-by="Firstname">{{ item.Firstname }}</md-table-cell>
                  <md-table-cell md-label="นามสกุล" md-sort-by="Lastname">{{ item.Lastname }}</md-table-cell>
                  <md-table-cell md-label="สถานะ" md-sort-by="StatusActive">{{ item.StatusActive }}</md-table-cell>
                </md-table-row>
              </md-table>

              <md-dialog :md-active.sync="showDialog2" :md-click-outside-to-close="false" style="padding-top:20px;overflow: visible;">   
                <div v-if="!loading">             
                  <md-dialog-title>เพิ่มความสัมพันธ์</md-dialog-title>
                  <div style="padding:20px;">
                    <div style="margin-bottom:20px;">
                      <label>เลือกผู้ป่วย</label>               
                      <list-select :list="patients"
                        option-value="PatientID"
                        option-text="Firstname"
                        :custom-text="showOptionsSelect"
                        :selected-item="selectPatient"
                        @select="doSelectedPatientDoctor"
                        placeholder="เลือกผู้ป่วย">
                      </list-select>
                    </div>
                  </div>
                </div>
                <div v-else-if="loading==true">
                  <md-empty-state md-label="Loading" :md-description="`Please wait a second`">
                  <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                  </md-empty-state>
                </div>
                <div v-else-if="loading=='success'">
                  <md-dialog-title>สำเร็จ</md-dialog-title>
                </div>
                <div v-else-if="loading=='fail'">
                  <md-dialog-title>ผิดพลาด</md-dialog-title>
                  <div><md-dialog-title>มีความสัมพันธ์นี้ในระบบแล้ว</md-dialog-title></div>
                </div>
                <md-dialog-actions>
                  <md-button v-if="loading!=true" class="md-primary" @click="onClose()">{{loading==false? 'ยกเลิก':'ปิด'}}</md-button>
                  <md-button v-if="select!='none' && loading==false" class="md-primary" @click="onSave2()">บันทึก</md-button>
                  <md-button v-else-if="!loading" class="md-primary" disabled>บันทึก</md-button>
                </md-dialog-actions>
              </md-dialog>
            </div>

            <!-- pharmacist tab -->
            <div class="tab-pane" id="pills-pharmacist" role="tabpanel">
              <div class="md-layout">
                <div class="md-layout-item">
                  <label>เลือกเภสัชกร</label>
                  <list-select :list="pharmacists"
                     option-value="PharmacistID"
                     option-text="Firstname"
                     :custom-text="showOptionsSelect"
                     :selected-item="selectedPharmacist"
                     @select="doSelectedPharmacist"
                     placeholder="เลือกเภสัชกร">
                  </list-select>
                  <br>
                  <div v-if="selectedPharmacist.PharmacistID">
                    <label v-if="selectedPharmacist.Status">สถานะ : {{selectedPharmacist.Status.ActiveStatus=='1'&&selectedPharmacist.Status.RegisterStatus=='1'? ': Active':': Non Active'}} </label>
                  </div>
                </div>
                <div class="md-layout-item md-toolbar-section-end">
                  <md-button v-if="selectedPharmacist.PharmacistID" class="md-icon-button" style="background-color:#5cb85c" @click="showDialog3=true">
                    <md-icon style="color:white">add</md-icon>
                    <md-tooltip md-direction="left">เพิ่มความสัมพันธ์</md-tooltip>
                  </md-button>
                </div>
              </div>
              <md-table class="md-elevation-7" v-if="selectedPharmacist.PharmacistID" v-model="searched3" md-sort="ID"
                md-sort-order="asc" md-card md-fixed-header style="margin:20px 0 0 0">
                <md-table-toolbar>
                  <div class="md-toolbar-section-start">
                    <h1 class="md-title">ตารางความสัมพันธ์</h1>
                  </div>

                  <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="ค้นหา..." v-model="search3" @input="searchOnTable" />
                  </md-field>
                </md-table-toolbar>

                <md-table-empty-state md-label="No users found"
                  :md-description="`ไม่พบรายการที่ค้นหา '${search3}' กรุณาลองใหม่อีกครั้ง`">
                </md-table-empty-state>

                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="ลำดับ" md-sort-by="ID" md-numeric>{{ item.ID }}</md-table-cell>
                  <md-table-cell md-label="ประเภทผู้ใช้" md-sort-by="Type" md-numeric>{{ item.Type }}</md-table-cell>
                  <md-table-cell md-label="ชื่อ" md-sort-by="Firstname">{{ item.Firstname }}</md-table-cell>
                  <md-table-cell md-label="นามสกุล" md-sort-by="Lastname">{{ item.Lastname }}</md-table-cell>
                  <md-table-cell md-label="สถานะ" md-sort-by="StatusActive">{{ item.StatusActive }}</md-table-cell>
                </md-table-row>
              </md-table>

              <md-dialog :md-active.sync="showDialog3" :md-click-outside-to-close="false" style="padding-top:20px;overflow:visible;" >   
                <div v-if="!loading">             
                  <md-dialog-title>เพิ่มความสัมพันธ์</md-dialog-title>
                  <div style="padding:20px;">
                    <div style="margin-bottom:20px;">
                      <label>เลือกผู้ป่วย</label>               
                      <list-select :list="patients"
                        option-value="PatientID"
                        option-text="Firstname"
                        :custom-text="showOptionsSelect"
                        :selected-item="selectPatient"
                        @select="doSelectedPatientDoctor"
                        placeholder="เลือกผู้ป่วย">
                      </list-select>
                    </div>
                  </div>
                </div>
                <div v-else-if="loading==true">
                  <md-empty-state md-label="Loading" :md-description="`Please wait a second`">
                  <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                  </md-empty-state>
                </div>
                <div v-else-if="loading=='success'">
                  <md-dialog-title>สำเร็จ</md-dialog-title>
                </div>
                <div v-else-if="loading=='fail'">
                  <md-dialog-title>ผิดพลาด</md-dialog-title>
                  <div><md-dialog-title>มีความสัมพันธ์นี้ในระบบแล้ว</md-dialog-title></div>
                </div>
                <md-dialog-actions>
                  <md-button v-if="loading!=true" class="md-primary" @click="onClose()">{{loading==false? 'ยกเลิก':'ปิด'}}</md-button>
                  <md-button v-if="select!='none' && loading==false" class="md-primary" @click="onSave3()">บันทึก</md-button>
                  <md-button v-else-if="!loading" class="md-primary" disabled>บันทึก</md-button>
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
      return items.filter(item => {
        if(toLower(item.ID).includes(toLower(term))) return item
        else if(toLower(item.Firstname).includes(toLower(term))) return item
        else if(toLower(item.Lastname).includes(toLower(term))) return item
        else if(toLower(item.StatusActive).includes(toLower(term))) return item
        else if(toLower(item.Type).includes(toLower(term))) return item        
      })
    }
    return items
  }
  import axios from 'axios'
  import adminServices from '@/services/admin'
  import { ListSelect } from 'vue-search-select'
  export default {
    name: 'TabContent',
    components: {
      ListSelect
    },
    data() {
      return {
        loading: false,
        search1: null,
        searched1: [],
        users1: [],
        showDialog1:false,
        type: "none",
        select: "none",
        selectPatient: {},
        selectDoctorInPatient: {},
        selectPharmacistInPatient: {},
        search2: null,
        searched2: [],
        users2: [],
        showDialog2:false,
        search3: null,
        searched3: [],
        users3: [],
        showDialog3:false,
        changeTab: [true, false, false],
        selectedPatient: {},
        selectedDoctor: {},
        selectedPharmacist: {},
        patients: [],
        doctors: [],
        pharmacists: [],
      }
    },
    methods: {
      //select Patient
      showOptionsSelect(item){
        if(item.DoctorID) return `${item.DoctorID} - ${item.Firstname} ${item.Lastname}`
        else if(item.PharmacistID) return `${item.PharmacistID} - ${item.Firstname} ${item.Lastname}`
        else if(item.PatientID) return `${item.PatientID} - ${item.Firstname} ${item.Lastname}`
      },
      //patient tab
      async doSelectedPatient(item) {           
        this.selectedPatient = item
        //console.log( this.selectedPatient )  
        this.search1 = null
        this.searched1 = []
        this.users1 = []
        if(this.selectedPatient.PatientID){
          //console.log('test')
          await adminServices.getPatientRelation(this.selectedPatient.PatientID).then(Response => {
            //console.log(Response.data)
            if(Response.data){
              if(Response.data[0].length!=0){
                for(var i in Response.data[0]) {
                  Response.data[0][i].ID = Response.data[0][i].DoctorID 
                  this.doctors.forEach(doctorItem =>{
                    if(Response.data[0][i].DoctorID == doctorItem.DoctorID) {
                      if(doctorItem.Status.ActiveStatus=='1' && doctorItem.Status.RegisterStatus=='1'){
                        Response.data[0][i].StatusActive = 'Active'
                      } else {
                        Response.data[0][i].StatusActive = 'Non Active'
                      }                      
                    }
                  })
                  Response.data[0][i].Type = "แพทย์"
                  this.users1.push(Response.data[0][i])                  
                  this.searchOnTable()
                }
              }
              if(Response.data[1].length!=0){
                for(var i in Response.data[1]) {
                  Response.data[1][i].ID = Response.data[1][i].PharmacistID 
                  this.pharmacists.forEach(pharmacistItem =>{
                    if(Response.data[1][i].PharmacistID == pharmacistItem.PharmacistID) {
                      if(pharmacistItem.Status.ActiveStatus=='1' && pharmacistItem.Status.RegisterStatus=='1'){
                        Response.data[1][i].StatusActive = 'Active'
                      } else {
                        Response.data[1][i].StatusActive = 'Non Active'
                      }    
                    }
                  })
                  Response.data[1][i].Type = "เภสัชกร"
                  this.users1.push(Response.data[1][i])
                  this.searchOnTable()
                }
              }
            }
          })  
        }
      },
      doSelectedPatientDoctor(item){
        if(this.changeTab[0] && this.type == 'Doctor') {
          this.selectDoctorInPatient = item          
          this.select = item.DoctorID
        }
        else if(this.changeTab[0] && this.type == 'Pharmacist') {
          this.selectPharmacistInPatient = item
          this.select = item.PharmacistID
        } else  {
          this.selectPatient = item
          this.select = item.PatientID
        }
      },      
      async onSave1(){
        this.loading = true
        if(this.type == "Doctor"){
          await adminServices.addRelationDoctorPatient({
            PatientID:this.selectedPatient.PatientID,
            DoctorID:this.select
          }).then(Response =>{
            if(Response.data){
              if(Response.data.success==true){
                adminServices.getDoctor(this.select).then(Response2 =>{
                  if(Response2.data){
                    Response2.data[0].ID = Response2.data[0].DoctorID
                    this.users1.push(Response2.data[0])
                    this.doSelectedPatient(this.selectedPatient) 
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
            PatientID:this.selectedPatient.PatientID,
            PharmacistID:this.select
          }).then(Response =>{
            if(Response.data){
              if(Response.data.success==true){
                adminServices.getPharmacist(this.select).then(Response2 =>{
                  if(Response2.data){
                    Response2.data[0].ID = Response2.data[0].PharmacistID
                    this.users1.push(Response2.data[0])                    
                    this.doSelectedPatient(this.selectedPatient) 
                    this.loading = "success"
                  }
                })
              } 
              else this.loading = "fail"
            }
          })
        }        
      },
      //doctor tab
      async doSelectedDoctor(item) {  
        this.selectedDoctor = item  
        this.search2 = null
        this.searched2 = []
        this.users2 = []        
        await adminServices.getDoctorRelation(this.selectedDoctor.DoctorID).then(Response => {
          if(Response.data){
            for(var i in Response.data) {
                Response.data[i].ID = Response.data[i].PatientID 
                this.patients.forEach(patientItem =>{
                  if(Response.data[i].PatientID == patientItem.PatientID) {
                    if(patientItem.Status.ActiveStatus=='1' && patientItem.Status.RegisterStatus=='1'){
                      Response.data[i].StatusActive = 'Active'
                    } else {
                      Response.data[i].StatusActive = 'Non Active'
                    }  
                  }                  
                }) 
                Response.data[i].Type = "ผู้ป่วย"
                this.users2.push(Response.data[i])
                this.searchOnTable()
            }
          }
        })  
      },
      async onSave2(){
        this.loading = true        
        await adminServices.addRelationDoctorPatient({
          PatientID:this.select,
          DoctorID:this.selectedDoctor.DoctorID
        }).then(Response =>{
          if(Response.data){
            if(Response.data.success==true){
              adminServices.getPatient(this.select).then(Response2 =>{
                if(Response2.data){
                Response2.data[0].ID = Response2.data[0].PatientID
                this.users2.push(Response2.data[0])
                this.doSelectedDoctor(this.selectedDoctor) 
                this.loading = "success"
                }
              }) 
            } 
            else this.loading = "fail"              
          }
        })        
      },
      //pharmacist tab
      async doSelectedPharmacist(item) {    
        this.selectedPharmacist = item    
        this.search3 = null
        this.searched3 = []
        this.users3 = []
        await adminServices.getPharmacistRelation(this.selectedPharmacist.PharmacistID).then(Response => {
          ////console.log(Response.data)
          if(Response.data){
            for(var i in Response.data) {
              Response.data[i].ID = Response.data[i].PatientID 
              this.patients.forEach(patientItem =>{
                if(Response.data[i].PatientID == patientItem.PatientID) {
                  if(patientItem.Status.ActiveStatus=='1' && patientItem.Status.RegisterStatus=='1'){
                    Response.data[i].StatusActive = 'Active'
                  } else {
                    Response.data[i].StatusActive = 'Non Active'
                  }  
                }
              })                  
              Response.data[i].Type = "ผู้ป่วย"
              this.users3.push(Response.data[i])
              this.searchOnTable()   
            }
          }          
        })  
      },
      async onSave3(){
        this.loading = true        
        await adminServices.addRelationPharmacistPatient({
          PatientID:this.select,
          PharmacistID:this.selectedPharmacist.PharmacistID
        }).then(Response =>{
          if(Response.data){
            if(Response.data.success==true){
              adminServices.getPatient(this.select).then(Response2 =>{
                if(Response2.data){
                Response2.data[0].ID = Response2.data[0].PatientID
                this.users3.push(Response2.data[0])
                this.doSelectedPharmacist(this.selectedPharmacist) 
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
        this.selectDoctorInPatient = {}
        this.selectPharmacistInPatient = {}
        this.selectPatient = {}
      },
      changeBackgroundColorHeader(color) {
        document.getElementById("headBack").style.backgroundColor = color
        this.selectedPatient = {}
        this.selectedDoctor = {}
        this.selectedPharmacist = {}
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
                Response.data[0].Status = allAccount[i]
                this.patients.push(Response.data[0])   
                this.searchOnTable()  
                ////console.log(this.patients)  
              }
              this.searchOnTable()     
            })
          }

          //doctor
          else if(allAccount[i].ID[0] == 'D') {
            await adminServices.getDoctor(allAccount[i].ID).then(Response =>{
              if(Response.data.length != 0) {
                Response.data[0].Status = allAccount[i]
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
                Response.data[0].Status = allAccount[i] 
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

<style scoped>

</style>
