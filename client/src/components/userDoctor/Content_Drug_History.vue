<template>
  <div>
    <!--header-->
    <md-card style="padding-left: 0px;">
      <md-card-header>
        <md-card-header-text>
          <h2 style="text-align:center;">Drug History</h2>
          <h4 style="text-align:left;">Patient Name : {{patient.Firstname}} {{patient.Lastname}}</h4>
          <h4 style="text-align:left;">Doctor Name : {{doctor.Firstname}} {{doctor.Lastname}}</h4>
        </md-card-header-text>
      </md-card-header>
    </md-card>
    <!--end header-->
    <md-table v-model="searched" md-sort="UsingStatus" md-sort-order="asc" md-card style="margin-bottom:10px;">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Using</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by drug name..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state md-label="No Order Found" :md-description="`No order found for this '${search}' query. Try a different search term.`"></md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="OrderID" md-sort-by="OrderID" md-numeric>{{ item.OrderID }}</md-table-cell>
        <md-table-cell md-label="Drug Name" md-sort-by="GPName">{{ item.GPName }}</md-table-cell>
        <md-table-cell md-label="Doctor's Name" md-sort-by="DoctorID">{{ item.DoctorName }}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="UsingStatus">{{ item.UsingStatus }}</md-table-cell>
        <md-table-cell md-label="Receive Medicine" md-sort-by="Dispend">
          <b-progress :value="parseFloat(item.Dispend)" striped show-value class="mb-3"></b-progress>
        </md-table-cell>
        <md-table-cell md-label="Using Medicine" md-sort-by="Dispend">
          <b-progress :value="parseFloat(item.Using)" striped show-value class="mb-3"></b-progress>
        </md-table-cell>
        <md-table-cell md-label="Detail">
          <md-button @click="showDetail(item)" class="md-icon-button md-dense">
            <md-icon>assignment</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-table v-model="searched2" md-sort="UsingStatus" md-sort-order="asc" md-card style="margin-bottom:10px;">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Stop Using</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by drug name..." v-model="search2" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state md-label="No Order Found" :md-description="`No order found for this '${search2}' query. Try a different search term.`"></md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="OrderID" md-sort-by="OrderID" md-numeric>{{ item.OrderID }}</md-table-cell>
        <md-table-cell md-label="Drug Name" md-sort-by="GPName">{{ item.GPName }}</md-table-cell>
        <md-table-cell md-label="Doctor's Name" md-sort-by="DoctorID">{{ item.DoctorName }}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="UsingStatus">{{ item.UsingStatus }}</md-table-cell>
        <md-table-cell md-label="Receive Medicine" md-sort-by="Dispend">
          <b-progress :value="parseFloat(item.Dispend)" striped show-value class="mb-3"></b-progress>
        </md-table-cell>
        <md-table-cell md-label="Using Medicine" md-sort-by="Dispend">
          <b-progress :value="parseFloat(item.Using)" striped show-value class="mb-3"></b-progress>
        </md-table-cell>
        <md-table-cell md-label="Detail">
          <md-button @click="showDetail(item)" class="md-icon-button md-dense">
            <md-icon>assignment</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <!---->
    <md-dialog :md-active.sync="showDialog">
      <md-card class="md-layout-item">
        <md-card-header style="padding :20px;">
          <div class="md-title">Detail</div>
        </md-card-header>
        <md-card-content style="padding-bottom:0px;" class="md-scrollbar">

          <md-speed-dial md-effect="scale" class="md-top-right" md-direction="bottom">
            <md-speed-dial-target class="md-primary">
              <md-icon class="md-morph-initial">folder</md-icon>
              <md-icon class="md-morph-final">folder_open</md-icon>
            </md-speed-dial-target>

            <md-speed-dial-content>
              <md-button class="md-icon-button" @click="dialogShift = 'General'">
                <md-avatar>
                  <md-icon>description</md-icon>
                  <md-tooltip md-direction="left">General</md-tooltip>
                </md-avatar>
              </md-button>

              <md-button class="md-icon-button" @click="dialogShift = 'Doctor'">
                <md-avatar>
                  <md-icon>person</md-icon>
                  <md-tooltip md-direction="left">Doctor</md-tooltip>
                </md-avatar>
              </md-button>

              <md-button class="md-icon-button" @click="dialogShift = 'Pharmacist'">
                <md-avatar>
                  <md-icon>person</md-icon>
                  <md-tooltip md-direction="left">Pharmacist</md-tooltip>
                </md-avatar>
              </md-button>
            </md-speed-dial-content>
          </md-speed-dial>

          <md-tabs md-dynamic-height v-if="dialogShift == 'General'">
            <md-tab md-label="General">
              <form>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Order ID :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.OrderID"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Drug Name (GP) :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.GPName"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">RXcui :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.RXCUI"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Status :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.UsingStatus"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Dosage :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.Dosage"></div>
                </div>

                <div class="md-layout textInDialog" v-for="(i,index) in itemDialog.Frequency" v-bind:key="index">
                  <div class="md-layout-item"><label style="min-width:180px;" v-if="index == 0">Frequency : </label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="i"></div>  
                </div>

                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Duration :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.Duration"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Quantity :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.Quantity"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Recieve medicine(%) :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.Dispend"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Using medicine(%) :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.Using"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Next Receive Medicine :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.nextReceiveMedicine"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Note :</label></div>
                  <div class="md-layout-item"> <textarea class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly v-model="itemDialog.Description"></textarea></div>
                </div>
                <md-card-actions style="padding:0px;padding-bottom:8px;padding-top:8px;">
                  <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                </md-card-actions>
              </form>
            </md-tab>
          </md-tabs>
          <md-tabs md-dynamic-height v-if="dialogShift == 'Doctor'">
            <md-tab md-label="Doctor">
              <form>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Doctor id :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.DoctorID"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Doctor Name :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.DoctorName"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Ward :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.DoctorWard"></div>
                </div>
                <md-card-actions style="padding:0px;padding-bottom:8px;padding-top:8px;">
                  <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                </md-card-actions>
              </form>
            </md-tab>
          </md-tabs>
          <md-tabs md-dynamic-height v-if="dialogShift == 'Pharmacist'">
            <md-tab md-label="Pharmacist">
              <form>
                <div v-for="index in itemDialog.PharmacistID.length" :key="index">
                <label v-if="itemDialog.PharmacistID.length>1">{{index}}.</label>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Pharmacist id :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.PharmacistID[index-1].ID"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Pharmacist Name :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.PharmacistID[index-1].Name"></div>
                </div>
                </div>
                <br>
                <br>
                <md-card-actions style="padding:0px;padding-bottom:8px;padding-top:8px;">
                  <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                </md-card-actions>
              </form>
            </md-tab>
          </md-tabs>
        </md-card-content>
      </md-card>
    </md-dialog>
  </div>
</template>

<script>
  const toLower = text => {
    return text.toString().toLowerCase();
  };
  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.GPName).includes(toLower(term)));
    }
    return items;
  };
  import doctorServices from '@/services/doctor'
  import axios from "axios";
  export default {
    name: "Drug_Interaction",
    data: () => ({
      //header
      patient: [],
      doctor: [],
      //table using ,waiting dispense
      search: null,
      searched: [],
      users: [],
      //table stop using ,incomplete
      search2: null,
      searched2: [],
      users2: [],
      //dialog
      showDialog: false,
      itemDialog: [],
      dialogShift: "General"
    }),
    methods: {
      async showDetail(item) {
        this.dialogShift = "General"
        this.showDialog = true
        this.itemDialog = JSON.parse(JSON.stringify(item));    

        //do dosage
        this.itemDialog.Dosage = this.itemDialog.Dosage.dose + " " + this.itemDialog.Dosage.unit

        //do frequency        
        this.itemDialog.Frequency = []
        if(item.Frequency.mor == "true" ) this.itemDialog.Frequency.push("Morning(เช้า)")
        if(item.Frequency.aft == "true" ) this.itemDialog.Frequency.push("Afternoon(กลางวัน)")
        if(item.Frequency.eve == "true" ) this.itemDialog.Frequency.push("Evening(เย็น)")
        if(item.Frequency.bed == "true" ) this.itemDialog.Frequency.push("Before Bed(ก่อนนอน)")
        if(item.Frequency.before == "true" ) this.itemDialog.Frequency.push("Before Meal(ก่อนอาหาร)")
        if(item.Frequency.after == "true" ) this.itemDialog.Frequency.push("After Meal(หลังอาหาร)")
        if(item.Frequency.symptoms == "true" ) this.itemDialog.Frequency.push("Symptoms(ตามอาการ)")

        //do duration
        this.itemDialog.Duration = ""
        if(item.Duration.year != "0") this.itemDialog.Duration += item.Duration.year + " year " 
        if(item.Duration.month != "0") this.itemDialog.Duration += item.Duration.month + " month " 
        if(item.Duration.day != "0") this.itemDialog.Duration += item.Duration.day + " day"
        if(item.Duration.year == "0" && item.Duration.month == "0" && item.Duration.day == "0") this.itemDialog.Duration = "0"
      
        //do dispense
        if(item.DispendStatus == "0") this.itemDialog.DispendStatus = "Not Dispense"
      },
      searchOnTable() {
        this.searched = searchByName(this.users, this.search);
        this.searched2 = searchByName(this.users2, this.search2);
      }
    },
    created() {

    },
    async mounted() {
      //get patient info
      await doctorServices.patientInfo(this.$localStorage.get('doctor_patient')).then(Response => {
        console.log(Response.data[0])
        this.patient = Response.data[0]
      })

      //get dortor info
      await doctorServices.doctorInfo(this.$localStorage.get('userID')).then(Response => {
        console.log(Response.data[0])
        this.doctor = Response.data[0]
      })

      //get order of patient
      await doctorServices.getOrderId(this.$localStorage.get('doctor_patient')).then(Response => {
          console.log(Response.data)    
          Response.data.forEach((item,i) =>{
            //set pharmacist
            if(item.PharmacistID[0] == 'P' && item.PharmacistID[1] == 'H') {
              var tempPharmacistInfo = item.PharmacistID.split(',')
              item.PharmacistID = []
              tempPharmacistInfo.forEach(itemPhar=>{
                var tempPhar = {
                  ID: itemPhar,
                  Name: ''
                }
                item.PharmacistID.push(tempPhar)
              })
              console.log(item.PharmacistID)
            } else {
              item.PharmacistID = ''
            }

            //set Time
            var dispenseTime = new Date(item.DispendStartDate)
            var dispenseNextTime = new Date(item.DispendStatus) 
            dispenseNextTime.setHours(0,0,0,0) 
            var currentTime = new Date()
            currentTime.setHours(0,0,0,0) 
            var finalTime = new Date(item.DispendStartDate)
            finalTime.setFullYear(finalTime.getFullYear() + parseInt(item.Duration.year),
                                  finalTime.getMonth() + parseInt(item.Duration.month),
                                  finalTime.getDate() + parseInt(item.Duration.day))

            //do receive medicine
            var quantity = parseFloat(item.Quantity.split(" ")[0])
            var dispense = parseFloat(item.Dispend)
            item.Dispend = parseFloat(dispense*100/quantity).toFixed(2).toString()  

            //do using medicine            
            var usingMed = currentTime-dispenseTime
            var allMed = finalTime-dispenseTime
            item.Using = parseFloat(usingMed*100/allMed).toFixed(2).toString()
            if(item.Using > item.Dispend) item.Using = item.Dispend
            else if(item.Using <0) item.Using = 0
            
            //next receive medicine
            if(item.DispendStatus == 'done') item.nextReceiveMedicine = "Received All Medicine"
            else {
              item.nextReceiveMedicine = new Date(item.DispendStatus).toDateString()
            }

            //get doctor info
            item.DoctorName = 'Loading'
            doctorServices.doctorInfo(item.DoctorID).then(result => {    
              item.DoctorName = result.data[0].Firstname + ' ' + result.data[0].Lastname
              item.DoctorWard = result.data[0].Department
            })

            //get pharmacist info
            item.PharmacistID.forEach(phar =>{
              doctorServices.pharmacistInfo(phar.ID).then(result => {
                if(result.data[0])  {       
                  phar.Name = result.data[0].Firstname + ' ' + result.data[0].Lastname
                } else {
                  phar.Name = "-"
                }
              })
            }) 

            //separate table
            if(item.DispendStatus == 'done'){ 
              //separate using and stop using
              if(item.Using != 100){
                item.UsingStatus = "Using"  
                this.users.push(item) 
              } else {
                item.UsingStatus = "Stop Using"  
                this.users2.push(item) 
              } 
            }
            else{
              //separate Incomplete ,waiting dispense and Using  
              if(dispenseNextTime-currentTime >= 0){
                //separate waiting dispense and using 
                if(item.Dispend == 0) {
                  item.UsingStatus = "Waiting Dispense"
                } else {
                  item.UsingStatus = "Using"
                }
                this.users.push(item) 
              } else {
                item.UsingStatus = "Incomplete"  
                this.users2.push(item) 
              }                             
            }
            
            //update response data to Table 
            if(i == Response.data.length-1) {
              console.log("Last item")
              this.searched = this.users
              this.searched2 = this.users2
            }     
          })          
      })     
    }
  };

</script>

<style>
  .textInDialog {
    margin-bottom: 8px;
  }

  .md-app {
    height: calc(100vh);
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
    max-width: 300px;
  }

  .textSearch {
    float: left;
  }

  .md-input {
    max-width: calc(100%);
  }

  .menu_color {
    background-color: #f1f1f1;
  }

  .selected {
    background-color: #5dbfa8;
    margin: 2px;
  }

  .unselected {
    background-color: #f1f1f1;
    margin: 2px;
  }

  .md-content md-app-content md-flex md-theme-default {
    padding-top: 23px;
  }

  .md-drawer md-app-drawer menu_color md-theme-default md-left md-permanent md-permanent-card {
    padding-top: 20px;
  }

  #tallModal .modal-body p {
    margin-bottom: 900px
  }

</style>
