<template>
  <div>
    <!--header-->
    <md-card style="padding-left: 0px;">
      <md-card-header>
        <md-card-header-text>
          <h4 style="text-align:left;">Patient Name : {{patient.Firstname}} {{patient.Lastname}}
            <span style="float:right;margin-right: 150px;">Pharmacist Name : {{doctor.Firstname}} {{doctor.Lastname}}</span>
          </h4>
        </md-card-header-text>
      </md-card-header>
    </md-card>

    <!--Table-->
    <md-table v-model="searched" md-sort="GPName" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Users Name</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by drug name..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state md-label="No users found" :md-description="`No drug name found for this '${search}' query. Try a different search term.`"></md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Order ID" md-sort-by="OrderID" md-numeric>{{ item.OrderID }}</md-table-cell>
        <md-table-cell md-label="Drug Name" md-sort-by="GPName">{{ item.GPName }}</md-table-cell>
        <md-table-cell md-label="Doctor's Name" md-sort-by="DoctorID">{{ item.DoctorID }}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="UsingStatus">{{ item.UsingStatus }}</md-table-cell>
        <md-table-cell md-label="Receive Medicine" md-sort-by="Dispend2">
          <b-progress :value="parseFloat(item.Dispend2)" striped show-value class="mb-3"></b-progress>
        </md-table-cell>
        <md-table-cell md-label="Detail">
          <md-button @click="showDetail(item)" class="md-icon-button md-dense">
            <md-icon>assignment</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell md-label="Dispense">
          <md-button v-if="item.Dispend2 != '100.00'" @click="dispensing(item)" class="md-icon-button md-dense">
            <md-icon>ballot</md-icon>
          </md-button>
          <md-button v-else disabled class="md-icon-button md-dense">
            <md-icon>ballot</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <!--Detail Dialog-->
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
                  <div class="md-layout-item"><label style="min-width:180px;" v-if="index == 0">Frequency : </label><label
                      style="min-width:180px;" v-else></label></div>
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
                      readonly :value="itemDialog.Dispend2"></div>
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
                      readonly :value="itemDialog.OrderID"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Ward :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.OrderID"></div>
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
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Pharmacist id :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.PharmacistID"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Pharmacist Name :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.OrderID"></div>
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

    <!--Dispense Dialog-->
    <md-dialog :md-active.sync="showDispenDialog">
      <md-card class="md-layout-item">
        <md-card-header style="padding :20px;">
          <div class="md-title">Dispense</div>
        </md-card-header>
        <md-card-content style="padding-bottom:0px;" class="md-scrollbar">

          <form>
            <div class="md-layout textInDialog">
              <div class="md-layout-item"><label style="min-width:180px;">Drug Name (GP) :</label></div>
              <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                  readonly :value="itemDispenseDialog.GPName"></div>
            </div>
            <div class="md-layout textInDialog">
              <div class="md-layout-item"><label style="min-width:180px;">Quantity({{itemDispenseDialog.Dosage.unit}})
                  :</label></div>
              <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                  readonly :value="itemDispenseDialog.Quantity"></div>
            </div>
            <div class="md-layout textInDialog">
              <div class="md-layout-item"><label style="min-width:180px;">Recieve
                  Medicine({{itemDispenseDialog.Dosage.unit}}) :</label></div>
              <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                  readonly :value="itemDispenseDialog.Dispend"></div>
            </div>
            <div class="md-layout textInDialog">
              <div class="md-layout-item"><label style="min-width:180px;">Remaining
                  Medicine({{itemDispenseDialog.Dosage.unit}}) :</label></div>
              <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                  readonly :value="itemDispenseDialog.Remaining"></div>
            </div>
            <div class="md-layout textInDialog">
              <div class="md-layout-item"><label style="min-width:180px;">Dispensing({{itemDispenseDialog.Dosage.unit}}) :</label></div>
              <div class="md-layout-item"> <input class="form-control" type="text" placeholder="Enter Number" style="min-width:260px;"
                  v-model="itemDispenseDialog.Dispensing"></div>
            </div>
            <md-card-actions style="padding:0px;padding-bottom:8px;padding-top:8px;">
              <md-button class="md-primary" @click="saveDispensing()">Save</md-button>
              <md-button class="md-primary" @click="showDispenDialog = false">Close</md-button>              
            </md-card-actions>
          </form>
        </md-card-content>
      </md-card>
    </md-dialog>

     <md-dialog :md-active.sync="showErrorDialog">
      <md-card class="md-layout-item">
        <md-card-header style="padding :20px;">
          <div class="md-title">Message</div>
        </md-card-header>
        <md-card-content style="padding-bottom:0px;" class="md-scrollbar">
          {{messageError}}
          <md-card-actions style="padding:0px;padding-bottom:8px;padding-top:8px;">
              <md-button class="md-primary" @click="reloadPage()">Close</md-button>              
            </md-card-actions>
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
  import pharmacistServices from '@/services/pharmacist'
  import axios from "axios";
  export default {
    name: "Drug_Interaction",
    data: () => ({
      //header
      patient: [],
      doctor: [],
      //table
      search: null,
      searched: [],
      users: [],
      //detail dialog
      showDialog: false,
      itemDialog: {
        Dosage: {
          unit: null
        }
      },
      dialogShift: "General",
      //dispense dialog
      showDispenDialog: false,
      itemDispenseDialog: {
        Dosage: {
          unit: null
        }
      },
      showErrorDialog: false,
      messageError: ""
    }),
    methods: {
      //detail dialog
      showDetail(item) {
        this.dialogShift = "General"
        this.showDialog = true
        this.itemDialog = JSON.parse(JSON.stringify(item));

        //do dosage
        this.itemDialog.Dosage = this.itemDialog.Dosage.dose + " " + this.itemDialog.Dosage.unit

        //do frequency        
        this.itemDialog.Frequency = []
        if (item.Frequency.mor == "true") this.itemDialog.Frequency.push("Morning(เช้า)")
        if (item.Frequency.aft == "true") this.itemDialog.Frequency.push("Afternoon(กลางวัน)")
        if (item.Frequency.eve == "true") this.itemDialog.Frequency.push("Evening(เย็น)")
        if (item.Frequency.bed == "true") this.itemDialog.Frequency.push("Before Bed(ก่อนนอน)")
        if (item.Frequency.before == "true") this.itemDialog.Frequency.push("Before Meal(ก่อนอาหาร)")
        if (item.Frequency.after == "true") this.itemDialog.Frequency.push("After Meal(หลังอาหาร)")
        if (item.Frequency.symptoms == "true") this.itemDialog.Frequency.push("Symptoms(ตามอาการ)")

        //do duration
        this.itemDialog.Duration = ""
        if (item.Duration.year != "0") this.itemDialog.Duration += item.Duration.year + " year "
        if (item.Duration.month != "0") this.itemDialog.Duration += item.Duration.month + " month "
        if (item.Duration.day != "0") this.itemDialog.Duration += item.Duration.day + " day"
        if (item.Duration.year == "0" && item.Duration.month == "0" && item.Duration.day == "0") this.itemDialog.Duration =
          "0"

        //do dispense
        if (item.DispendStatus == "0") this.itemDialog.DispendStatus = "Not Dispense"
      },
      //dispense dialog
      dispensing(item) {
        this.showDispenDialog = true
        this.itemDispenseDialog = JSON.parse(JSON.stringify(item));
        this.itemDispenseDialog.Remaining = (parseInt(item.Quantity) - parseInt(item.Dispend)).toString()
        this.itemDispenseDialog.Dispensing = ""
      },
      async saveDispensing(){
        console.log(this.itemDispenseDialog)
        if(this.itemDispenseDialog.Dispensing == ""){

        }
        else {
          var dispense = parseInt(this.itemDispenseDialog.Dispend) + parseInt(this.itemDispenseDialog.Dispensing)
          var quantity = parseInt(this.itemDispenseDialog.Quantity)
          console.log(dispense+" = "+this.itemDispenseDialog.Dispend+" + "+this.itemDispenseDialog.Dispensing)
          console.log(quantity)
          if(quantity < dispense){
            this.showErrorDialog = true
            this.messageError = "จ่ายยาเกินแพทย์สั่งครับ"
          } else {
            this.showErrorDialog = true
            this.messageError = "จ่ายยาเรียบร้อยครับ"  
            this.itemDispenseDialog.Dispend = dispense.toString() 
            await pharmacistServices.dispense(this.itemDispenseDialog.OrderID,this.itemDispenseDialog.DrugNo,this.itemDispenseDialog).then(Response => {
              console.log(Response.data)
            })       
          }
        }
        //this.showDispenDialog = false
      },
      reloadPage(){
        var dispense = parseInt(this.itemDispenseDialog.Dispend) + parseInt(this.itemDispenseDialog.Dispensing)
        var quantity = parseInt(this.itemDispenseDialog.Quantity)
        if(quantity < dispense){
          this.showErrorDialog = false
        } else { 
          window.location.reload();        
        }       
      },
      //table
      searchOnTable() {
        this.searched = searchByName(this.users, this.search);
      }
    },
    created() {

    },
    async mounted() {
      //console.log(this.$localStorage.get('doctor_patient'))
      await pharmacistServices.patientInfo(this.$localStorage.get('pharmacist_patient')).then(Response => {
        console.log(Response.data[0])
        this.patient = Response.data[0]
      })
      console.log(this.$localStorage.get('userID'))
      await pharmacistServices.pharmacistInfo(this.$localStorage.get('userID')).then(Response => {
        console.log(Response.data[0])
        this.doctor = Response.data[0]
      })

      await pharmacistServices.getOrderId(this.$localStorage.get('pharmacist_patient'), this.$localStorage.get(
        'userID')).then(
        Response => {
          console.log(Response.data)
          this.users = Response.data
          //do receive medicine
          for (var i in this.users) {
            var quantity = parseFloat(this.users[i].Quantity)
            var dispense = parseFloat(this.users[i].Dispend)
            this.users[i].Dispend2 = parseFloat(dispense * 100 / quantity).toFixed(2).toString()    
            console.log(this.users[i].Dispend2)
          }
          this.searched = this.users
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
