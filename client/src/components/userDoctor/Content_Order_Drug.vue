<template>
  <div>
    <!--header-->    
    <md-card>
      <md-card-header>
        <md-card-header-text>
          <h4 style="text-align:left;">Patient Name : {{patient.Firstname}} {{patient.Lastname}}
            <span style="float:right;margin-right: 150px;">Doctor Name : {{doctor.Firstname}} {{doctor.Lastname}}</span>
          </h4>
        </md-card-header-text>
      </md-card-header>
    </md-card>
    <!--end header-->

    <!--list drug order-->
    <div style="margin-bottom:20px;">
      <md-table v-model="searched" md-sort="GPName" md-sort-order="asc" md-card md-fixed-header>

        <!--header of list-->
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Ordering Drug</h1>
          </div>
          <md-field md-clearable class="md-toolbar-section-end" style="margin-left:5px;margin-right:5px;">
            <md-input placeholder="Search by Drug Name..." v-model="search" @input="searchOnTable" />
          </md-field>

          <!--add drug to list button-->
          <div style="margin-left:5px;margin-right:5px;">
            <md-dialog :md-active.sync="active">
              <md-card class="md-layout-item">
                <md-card-header>
                  <div class="md-title">Ordering Drug</div>
                </md-card-header>
                <md-card-content style="padding-bottom:0px;">

                  <form novalidate @submit.prevent="addDrugToList">
                    <label>GPName</label>   
                     <div style="margin:20px 0 20px 0;">                 
                    <input v-model="query2" id="input" class="form-control" type="text" placeholder="Type to search...">
                    <typeahead v-model="query" @select="query2=query" target="#input" :data="drugsSearch" :limit="drugsSearch.length" match-start=true force-select=true />    
                     </div>                
                    <div class="md-layout">
                      <div class="md-layout-item" style="margin-right:5px">
                        <label>Dosage</label>
                        <md-field md-clearable>
                          <md-input v-model="newDrugs.Dosage.dose" type="number" placeholder="Enter Number" @input="calculateQuantity"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item" style="margin-left:5px">
                        <label>Unit</label>
                        <md-field>

                          <md-select v-model="newDrugs.Dosage.unit" placeholder="Select Unit" @input="calculateQuantity">
                            <md-option value="amp">Amp(หลอด)</md-option>
                            <md-option value="cc">CC(ซีซี)</md-option>
                            <md-option value="drop">Drop(หยด)</md-option>
                            <md-option value="ml">ML(มิลลิลิตร)</md-option>
                            <md-option value="tab">Tab(เม็ด)</md-option>
                            <md-option value="other">Other(อื่นๆ)</md-option>
                          </md-select>
                        </md-field>
                      </div>
                    </div>

                    <label>Duration(ระยะเวลาที่บริโภคยา)</label>
                    <div class="md-layout">
                      <div class="md-layout-item" style="margin-right:5px">
                        <md-field md-clearable>
                          <label>ปี</label>
                          <md-input v-model="newDrugs.Duration.year" type="number" @input="calculateQuantity"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item" style="margin-right:5px">
                        <md-field md-clearable>
                          <label>เดือน</label>
                          <md-input v-model="newDrugs.Duration.month" type="number" @input="calculateQuantity"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item" style="margin-right:5px">
                        <md-field md-clearable>
                          <label>วัน</label>
                          <md-input v-model="newDrugs.Duration.day" type="number" @input="calculateQuantity"></md-input>
                        </md-field>
                      </div>
                    </div>
                    <!--md-field>
                      <label>Date</label>
                      <md-input v-model="newDrugs.Dosage"></md-input>
                    </md-field-->
                    <label>Frequency</label>
                    <div class="md-layout">
                      <md-checkbox v-if="newDrugs.Frequency.symptoms == 'true'" v-model="newDrugs.Frequency.mor" value="true"
                        @change="calculateQuantity" disabled>เช้า</md-checkbox>
                      <md-checkbox v-else v-model="newDrugs.Frequency.mor" value="true" @change="calculateQuantity">เช้า</md-checkbox>
                      <md-checkbox v-if="newDrugs.Frequency.symptoms == 'true'" v-model="newDrugs.Frequency.aft" value="true"
                        @change="calculateQuantity" disabled>กลางวัน</md-checkbox>
                      <md-checkbox v-else v-model="newDrugs.Frequency.aft" value="true" @change="calculateQuantity">กลางวัน</md-checkbox>
                      <md-checkbox v-if="newDrugs.Frequency.symptoms == 'true'" v-model="newDrugs.Frequency.eve" value="true"
                        @change="calculateQuantity" disabled>เย็น</md-checkbox>
                      <md-checkbox v-else v-model="newDrugs.Frequency.eve" value="true" @change="calculateQuantity">เย็น</md-checkbox>
                      <md-checkbox v-if="newDrugs.Frequency.symptoms == 'true'" v-model="newDrugs.Frequency.bed" value="true"
                        @change="calculateQuantity" disabled>ก่อนนอน</md-checkbox>
                      <md-checkbox v-else v-model="newDrugs.Frequency.bed" value="true" @change="calculateQuantity">ก่อนนอน</md-checkbox>
                      <md-checkbox v-if="newDrugs.Frequency.mor == 'true' || newDrugs.Frequency.aft == 'true' || newDrugs.Frequency.eve == 'true' || newDrugs.Frequency.bed == 'true'"
                        v-model="newDrugs.Frequency.symptoms" value="true" @change="calculateQuantity" disabled>ทานตามอาการ</md-checkbox>
                      <md-checkbox v-else v-model="newDrugs.Frequency.symptoms" value="true" @change="calculateQuantity">ทานตามอาการ</md-checkbox>
                    </div>
                    <div class="md-layout">
                      <md-checkbox v-if="newDrugs.Frequency.after == 'true'" v-model="newDrugs.Frequency.before" value="true"
                        @change="calculateQuantity" disabled>ก่อนอาหาร</md-checkbox>
                      <md-checkbox v-else v-model="newDrugs.Frequency.before" value="true" @change="calculateQuantity">ก่อนอาหาร</md-checkbox>
                      <md-checkbox v-if="newDrugs.Frequency.before == 'true'" v-model="newDrugs.Frequency.after" value="true"
                        @change="calculateQuantity" disabled>หลังอาหาร</md-checkbox>
                      <md-checkbox v-else v-model="newDrugs.Frequency.after" value="true" @change="calculateQuantity">หลังอาหาร</md-checkbox>
                    </div>

                    <label>Quantity(ปริมาณยาทั้งหมด)</label>                    
                    <div class="md-layout" v-if="newDrugs.Frequency.symptoms != 'true'">
                      <div class="md-layout-item" style="margin-right:5px">

                        <md-field>
                      <label>Calculate Automatic</label>
                      <md-input readonly v-model="newDrugs.Quantity" placeholder="Calculate Automatic"></md-input>
                    </md-field>
                      </div>

                      <div class="md-layout-item" style="margin-left:5px">
                        <md-field>
                          <label>Unit</label>
                          <md-select v-model="newDrugs.Dosage.unit" placeholder="Select Unit" @input="calculateQuantity">
                            <md-option value="amp">Amp(หลอด)</md-option>
                            <md-option value="cc">CC(ซีซี)</md-option>
                            <md-option value="drop">Drop(หยด)</md-option>
                            <md-option value="ml">ML(มิลลิลิตร)</md-option>
                            <md-option value="tab">Tab(เม็ด)</md-option>
                            <md-option value="other">Other(อื่นๆ)</md-option>
                          </md-select>
                        </md-field>
                      </div>
                    </div>

                    <div class="md-layout" v-else>
                      <div class="md-layout-item" style="margin-right:5px">

                        <md-field md-clearable>
                          <label>Calculate Automatic</label>
                          <md-input v-model="newDrugs.Quantity" type="number" placeholder="Enter Number" @input="calculateQuantity"></md-input>
                        </md-field>
                      </div>

                      <div class="md-layout-item" style="margin-left:5px">
                        <md-field>
                          <label>Unit</label>
                          <md-select v-model="newDrugs.Dosage.unit" placeholder="Select Unit" @input="calculateQuantity">
                            <md-option value="amp">Amp(หลอด)</md-option>
                            <md-option value="cc">CC(ซีซี)</md-option>
                            <md-option value="drop">Drop(หยด)</md-option>
                            <md-option value="ml">ML(มิลลิลิตร)</md-option>
                            <md-option value="tab">Tab(เม็ด)</md-option>
                            <md-option value="other">Other(อื่นๆ)</md-option>
                          </md-select>
                        </md-field>
                      </div>
                    </div>

                    <label>Note</label>
                    <md-field md-clearable>

                      <md-textarea v-model="newDrugs.Description" placeholder="Enter Text"></md-textarea>
                    </md-field>

                    <md-card-actions style="padding:0px;padding-bottom:8px;">
                      <!--md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button-->
                      <md-button class="md-primary" @click="active = false">Close</md-button>
                      <md-button type="submit" class="md-primary" @click="active = false">Save</md-button>
                    </md-card-actions>
                  </form>
                </md-card-content>
              </md-card>



            </md-dialog>
            <md-button class="md-primary md-raised" @click="addDrugToListBtn">
              <!--i class="material-icons">&#xE147;</i-->
              Add drug to list
            </md-button>
          </div>
          <!--confirm button-->
          <div style="margin-left:5px;margin-right:5px;">
            <md-dialog :md-active.sync="showDialog" style="overflow:auto">
              <md-dialog-title>List of Ordering Drugs</md-dialog-title>
              <md-table v-model="drugs" md-sort="DrugNO" md-sort-order="asc" md-card>
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="Drug No.">{{ item.DrugNo }}</md-table-cell>
                  <md-table-cell md-label="Drug Name">{{ item.GPName }}</md-table-cell>
                </md-table-row>
              </md-table>
              <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                <md-button class="md-primary" @click="confirmOrder">Save</md-button>
              </md-dialog-actions>
            </md-dialog>
            <!--md-button class="md-accent md-raised" @click="showDialog = true">Confirm</md-button-->
            <md-button class="md-primary md-raised" @click="showDialog = true">Confirm</md-button>
          </div>
          <!--show drug history button-->
          <div style="margin-left:5px;margin-right:5px;">
            <md-dialog-alert :md-active.sync="first" md-content="Your post has been deleted!" md-confirm-text="Cool!" />
            <md-button class="md-primary md-raised" @click="first = true">Drug History</md-button>
          </div>
        </md-table-toolbar>

        <!--show when search not found-->
        <md-table-empty-state md-label="No drugs found" :md-description="`No Drug found for this '${search}' query. Try a different search term or create a new drug.`">
          <md-button class="md-primary md-raised" @click="addDrugToListBtn">Add New Drug</md-button>
        </md-table-empty-state>

        <!--list-->
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Order No." md-sort-by="DrugNo" md-numeric>{{ item.DrugNo }}</md-table-cell>
          <md-table-cell md-label="Drug Name" md-sort-by="GPName" md-numeric>{{ item.GPName }}</md-table-cell>
          <md-table-cell md-label="Duration(days)" md-sort-by="Duration" md-numeric>{{ item.Duration.year }} ปี {{
            item.Duration.month }} เดือน {{ item.Duration.day }} วัน</md-table-cell>
          <md-table-cell md-label="Doctor Name" md-sort-by="doctorName" md-numeric>{{ item.doctorName }}</md-table-cell>
          <md-table-cell md-label="Ward" md-sort-by="ward" md-numeric>{{ item.ward }}</md-table-cell>
          <md-table-cell md-label="Actions" md-numeric>
            <md-button class="md-icon-button" @click="editDrug(item)">
              <md-icon style="color:#ffc107;">&#xE254;</md-icon>
            </md-button>
            <md-button class="md-icon-button" @click="deleteOnTable(item)">
              <md-icon style="color:#f44336;">&#xE872;</md-icon>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>

  const toLower = text => {
    return text.toString().toLowerCase()
  }
  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.GPName).includes(toLower(term)))
    }
    return items
  }
import DRUGS from '../../data/drugs.js'
  import doctorServices from '@/services/doctor'
  import axios from "axios";
  export default {
    name: "Drug_Interaction",
    data: () => ({
      //header
      patient: [],
      doctor: [],
      //search in table
      search: null,
      searched: [],
      drugs: [],
      //edit in table
      checkEdit: false,
      itemEdit: null,
      //add drug to list 
      active: false,
      newDrugs: {
        //in db        
        OrderID: "-",
        PatientID: "-",
        DoctorID: "-",
        PharmacistID: "-",
        OrderStartDate: "-",
        DispendStartDate: "-",
        DrugNo: "-",
        Duration: {
          year: "0",
          month: "0",
          day: "0"
        },
        UsingStatus: "Waiting Dispense",
        DispendStatus: "0",
        GPName: "-",
        RXCUI: "-",
        Dosage: {
          dose: "0",
          unit: "Unit"
        },
        Frequency: {
          mor: "false",
          aft: "false",
          eve: "false",
          bed: "false",
          before: "false",
          after: "false",
          symptoms: "false"
        },
        Times: "0",
        Quantity: "0",
        Dispend: "0",
        Description: "-",
        // not in db
        doctorName: "-",
        ward: "-"
      },
      //confirm
      showDialog: false,
      //drug history
      first: false,

      //auto complete
      query: '',
      query2: '',
      drugsSearch: DRUGS.GP
    }),
    methods: {
      //add drug to list
      addDrugToListBtn() {
        this.active = true
        //OrderID: null,
        //PatientID: null,
        //DoctorID: null,
        //PharmacistID: "not dispense",
        //OrderStartDate: null,
        //DispendStartDate: "not dispense",
        this.newDrugs.DrugNo = "-"
        this.newDrugs.Duration.year = "0"
        this.newDrugs.Duration.month = "0"
        this.newDrugs.Duration.day = "0"
        //UsingStatus: null,
        //DispendStatus: null,
        this.newDrugs.GPName = "-"
        this.newDrugs.RXCUI = "-"
        this.newDrugs.Dosage.dose = "0"
        this.newDrugs.Dosage.unit = "Unit"
        this.newDrugs.Frequency.mor = "false"
        this.newDrugs.Frequency.aft = "false"
        this.newDrugs.Frequency.eve = "false"
        this.newDrugs.Frequency.bed = "false"
        this.newDrugs.Frequency.before = "false"
        this.newDrugs.Frequency.after = "false"
        this.newDrugs.Frequency.symptoms = "false"
        //Times: null,
        this.newDrugs.Quantity = "0"
        //Dispend: "not dispense",
        this.newDrugs.Description = "-"
        //doctorName: "not found",
        //ward: "not found"
      },
      calculateQuantity() {
        console.log("ok")
        if(this.newDrugs.Frequency.symptoms != "true"){
        this.newDrugs.Times = 0;
        var key = 0;
        for (key in this.newDrugs.Frequency) {
          if (this.newDrugs.Frequency.hasOwnProperty(key)) {
            //console.log(key)
            //console.log(this.newDrugs.Frequency[key])
            if (this.newDrugs.Frequency[key] == "true" && key != "before" && key != "after") {
              this.newDrugs.Times++
            }
          }
        }
        //console.log(Object.keys(this.newDrugs.Frequency).length)  
        //console.log(this.newDrugs.Duration)
        var year = parseInt(this.newDrugs.Duration.year) * 12 * 30
        var month = parseInt(this.newDrugs.Duration.month) * 30
        var day = parseInt(this.newDrugs.Duration.day)
        if (this.newDrugs.Duration.year == "") year = 0
        if (this.newDrugs.Duration.month == "") month = 0
        if (this.newDrugs.Duration.day == "") day = 0

        var duration = (year + month + day)

        this.newDrugs.Quantity = parseInt(this.newDrugs.Dosage.dose) * this.newDrugs.Times * duration
        this.newDrugs.Quantity = this.newDrugs.Quantity.toString()
        //console.log(this.newDrugs.Quantity)
        this.newDrugs.Times = this.newDrugs.Times.toString()
        //console.log("Times = ", this.newDrugs.Times)
        }
      },
      addDrugToList() {
        var year = parseInt(this.newDrugs.Duration.year) * 12 * 30
        var month = parseInt(this.newDrugs.Duration.month) * 30
        var day = parseInt(this.newDrugs.Duration.day)
        if (this.newDrugs.Duration.year == "") year = 0
        if (this.newDrugs.Duration.month == "") month = 0
        if (this.newDrugs.Duration.day == "") day = 0

        var duration = (year + month + day)
        if (duration >= 360) {
          this.newDrugs.Duration.year = (duration / 360).toString()
          duration = duration % 360
        } else {
          this.newDrugs.Duration.year = "0"
        }
        if (duration >= 30) {
          this.newDrugs.Duration.month = (duration / 30).toString()
          duration = duration % 30
        } else {
          this.newDrugs.Duration.month = "0"
        }

        if (duration > 0) this.newDrugs.Duration.day = duration.toString()
        else this.newDrugs.Duration.day = "0"

        if (this.newDrugs.Dosage.dose == "") this.newDrugs.Dosage.dose = "0"
        else this.newDrugs.Dosage.dose = parseInt(this.newDrugs.Dosage.dose).toString()

        if (this.newDrugs.Quantity == "") this.newDrugs.Quantity = "0"
        else this.newDrugs.Quantity = parseInt(this.newDrugs.Quantity).toString()
        var x = {
          OrderID: this.newDrugs.OrderID, //
          PatientID: this.patient.PatientID,
          DoctorID: this.doctor.DoctorID,
          PharmacistID: this.newDrugs.PharmacistID,
          OrderStartDate: this.newDrugs.OrderStartDate,
          DispendStartDate: this.newDrugs.DispendStartDate,
          DrugNo: this.newDrugs.DrugNo,
          Duration: {
            year: parseInt(this.newDrugs.Duration.year).toString(),
            month: parseInt(this.newDrugs.Duration.month).toString(),
            day: parseInt(this.newDrugs.Duration.day).toString()
          },
          UsingStatus: this.newDrugs.UsingStatus,
          DispendStatus: this.newDrugs.DispendStatus,
          GPName: this.newDrugs.GPName,
          RXCUI: this.newDrugs.RXCUI,
          Dosage: {
            dose: this.newDrugs.Dosage.dose,
            unit: this.newDrugs.Dosage.unit
          },
          Frequency: {
            mor: this.newDrugs.Frequency.mor,
            aft: this.newDrugs.Frequency.aft,
            eve: this.newDrugs.Frequency.eve,
            bed: this.newDrugs.Frequency.bed,
            before: this.newDrugs.Frequency.before,
            after: this.newDrugs.Frequency.after,
            symptoms: this.newDrugs.Frequency.symptoms
          },
          Times: this.newDrugs.Times,
          Quantity: this.newDrugs.Quantity,
          Dispend: this.newDrugs.Dispend,
          Description: this.newDrugs.Description,
          doctorName: this.doctor.Firstname + " " + this.doctor.Lastname,
          ward: this.doctor.Department
        }
        axios.get('https://rxnav.nlm.nih.gov/REST/rxcui?name=' + x.GPName).then(Response => {
          console.log('Axios OK')
          if (Response.data.idGroup.rxnormId == null) {
            console.log('rxcui id is null')
            x.RXCUI = "not found"
            console.log(this.drugs)
          } else {
            var RXCUI = Response.data.idGroup.rxnormId
            console.log('rxcui ok : ' + RXCUI)
            x.RXCUI = RXCUI.toString()
            console.log(this.drugs)
          }
        });

        if (this.checkEdit) {
          console.log()
          this.drugs[this.itemEdit.DrugNo - 1] = x
          this.checkEdit = false
        } else {
          console.log("add drug success")
          x.DrugNo = (this.drugs.length + 1).toString()
          console.log(x)
          this.drugs.push(x)
        }
      },
      //table
      searchOnTable() {
        this.searched = searchByName(this.drugs, this.search)
      },
      deleteOnTable(item) {
        console.log(item.DrugNo)
        if (item.DrugNo < this.drugs.length) {
          console.log("less than")
          for (var i = item.DrugNo; i < this.drugs.length; i++) {
            console.log(i)
            this.drugs[i].DrugNo = i
          }
          console.log(this.drugs)
        }
        this.drugs.splice(item.DrugNo - 1, 1)
      },
      //table edit
      editDrug(item) {
        var x = {
          OrderID: item.OrderID,
          PatientID: item.PatientID,
          DoctorID: item.DoctorID,
          PharmacistID: item.PharmacistID,
          OrderStartDate: item.OrderStartDate,
          DispendStartDate: item.DispendStartDate,
          DrugNo: item.DrugNo,
          Duration: {
            year: item.Duration.year,
            month: item.Duration.month,
            day: item.Duration.day
          },
          UsingStatus: item.UsingStatus,
          DispendStatus: item.DispendStatus,
          GPName: item.GPName,
          RXCUI: item.RXCUI,
          Dosage: {
            dose: item.Dosage.dose,
            unit: item.Dosage.unit
          },
          Frequency: {
            mor: item.Frequency.mor,
            aft: item.Frequency.aft,
            eve: item.Frequency.eve,
            bed: item.Frequency.bed,
            before: item.Frequency.before,
            after: item.Frequency.after,
            symptoms: item.Frequency.symptoms
          },
          Times: item.Times,
          Quantity: item.Quantity,
          Dispend: item.Dispend,
          Description: item.Description,
          doctorName: item.doctorName,
          ward: item.ward
        }
        this.newDrugs = x
        this.active = true
        this.checkEdit = true
        this.itemEdit = item
      },
      //confirm
      confirmOrder() {
        this.showDialog = false
        for (var i in this.drugs) {
          console.log(i)
          doctorServices.postOrder(this.drugs[i]).then(Response => {
            console.log("ok1" + this.drugs[i].DrugNo)
          })
        }
        window.location.reload();
      }
    },
    //table add drug
    created() {
      this.searched = this.drugs
    },
    async mounted() {
      //console.log(this.$localStorage.get('doctor_patient'))
      await doctorServices.patientInfo(this.$localStorage.get('doctor_patient')).then(Response => {
        console.log(Response.data[0])
        this.patient = Response.data[0]
      })
      //console.log(this.$localStorage.get('userID'))
      await doctorServices.doctorInfo(this.$localStorage.get('userID')).then(Response => {
        console.log(Response.data[0])
        this.doctor = Response.data[0]
      })

      await doctorServices.getOrderId(this.patient.PatientID, this.doctor.DoctorID).then(Response => {
        console.log(Response.data)
        if (Response.data == "") {
          console.log("nullll")
          this.newDrugs.OrderID = "O00001"
        } else {
          console.log(Response.data[Response.data.length - 1].OrderID)
          var orderId = Response.data[Response.data.length - 1].OrderID
          var x = orderId.split('O')
          orderId = parseInt(x[1]) + 1
          orderId = orderId.toString()
          if (orderId.length == 1) orderId = "O0000" + orderId
          else if (orderId.length == 2) orderId = "O000" + orderId
          else if (orderId.length == 3) orderId = "O00" + orderId
          else if (orderId.length == 4) orderId = "O0" + orderId
          else orderId = "O" + orderId
          console.log(orderId)
          this.newDrugs.OrderID = orderId
        }
      })

      /*axios.get(`http://localhost:8082/info/${this.drugName}`).then(Response => {          
      
      })*/
    }

  }

</script>

<style lang="css" scoped>
</style>
