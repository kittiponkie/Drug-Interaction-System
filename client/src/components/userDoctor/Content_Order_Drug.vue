<template>
  <div>
    <!--header-->
    <md-card>
      <md-card-header>
        <md-card-header-text>
          <h4 style="text-align:left;">Patient Name :
            <span style="float:right;margin-right: 150px;">Doctor Name :</span>
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
                    <md-field>
                      <md-input v-model="newDrugs.GPName" placeholder="Enter Text"></md-input>
                    </md-field>

                    <div class="md-layout">
                      <div class="md-layout-item" style="margin-right:5px">
                        <label>Dosage</label>
                        <md-field>
                          <md-input v-model="newDrugs.Dosage.dose" type="number" placeholder="Enter Number"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item" style="margin-left:5px">
                        <label>Unit</label>
                        <md-field>

                          <md-select v-model="newDrugs.Dosage.unit" placeholder="Select Unit">
                            <md-option value="ml">ML(มิลลิลิตร)</md-option>
                            <md-option value="tab">Tab(เม็ด)</md-option>
                            <md-option value="amp">Amp(หลอด)</md-option>
                            <md-option value="cc">CC(ซีซี)</md-option>
                            <md-option value="drop">Drop(หยด)</md-option>
                            <md-option value="other">Other(อื่นๆ)</md-option>
                          </md-select>
                        </md-field>
                      </div>
                    </div>

                    <label>Quantity(ปริมาณยาทั้งหมด)</label>
                    <md-field>
                      <md-input v-model="newDrugs.Quantity" type="number" placeholder="Enter Number"></md-input>
                    </md-field>

                    <label>Duration(ระยะเวลาที่บริโภคยา)</label>
                    <div class="md-layout">
                      <div class="md-layout-item" style="margin-right:5px">
                        <md-field>
                          <label>ปี</label>
                          <md-input v-model="newDrugs.Duration.year" type="number"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item" style="margin-right:5px">
                        <md-field>
                          <label>เดือน</label>
                          <md-input v-model="newDrugs.Duration.month" type="number"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item" style="margin-right:5px">
                        <md-field>
                          <label>วัน</label>
                          <md-input v-model="newDrugs.Duration.day" type="number"></md-input>
                        </md-field>
                      </div>
                    </div>
                    <!--md-field>
                      <label>Date</label>
                      <md-input v-model="newDrugs.Dosage"></md-input>
                    </md-field-->
                    <label>Frequency</label>
                    <div class="md-layout">
                      <md-checkbox v-model="newDrugs.Frequency.mor" value="true">เช้า</md-checkbox>
                      <md-checkbox v-model="newDrugs.Frequency.aft" value="true">กลางวัน</md-checkbox>
                      <md-checkbox v-model="newDrugs.Frequency.eve" value="true">เย็น</md-checkbox>
                      <md-checkbox v-model="newDrugs.Frequency.bed" value="true">ก่อนนอน</md-checkbox>
                      <md-checkbox v-model="newDrugs.Frequency.symptoms" value="true">ทานตามอาการ</md-checkbox>
                    </div>
                    <div class="md-layout">
                      <md-checkbox v-model="newDrugs.Frequency.before" value="true">ก่อนอาหาร</md-checkbox>
                      <md-checkbox v-model="newDrugs.Frequency.after" value="true">หลังอาหาร</md-checkbox>
                    </div>

                    <label>Description</label>
                    <md-field>

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
            <md-dialog :md-active.sync="showDialog">
              <md-dialog-title>Preferences</md-dialog-title>
              <md-tabs md-dynamic-height>
                <md-tab md-label="General">
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae
                    commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium
                    inventore ducimus ipsa aut.</p>
                </md-tab>

                <md-tab md-label="Activity">
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae
                    commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium
                    inventore ducimus ipsa aut.</p>
                </md-tab>

                <md-tab md-label="Account">
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae
                    commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium
                    inventore ducimus ipsa aut.</p>
                </md-tab>
              </md-tabs>
              <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                <md-button class="md-primary" @click="showDialog = false">Save</md-button>
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
          <md-button class="md-primary md-raised" @click="newDrug">Add New Drug</md-button>
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

  import axios from "axios";
  export default {
    name: "Drug_Interaction",
    data: () => ({
      //search in table
      search: null,
      searched: [],
      drugs: [],
      /*[{
          //in db        
          OrderID: null,
          PatientID: null,
          DoctorID: null,
          PharmacistID: "not dispense",
          OrderStartDate: null,
          DispendStartDate: "not dispense",
          DrugNo: "1",
          Duration: {
            year: "0",
            month: "0",
            day: "100"
          },
          UsingStatus: null,
          DispendStatus: null,
          GPName: "Tramadol",
          RXCUI: null,
          Dosage: {
            dose: null,
            unit: null
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
          Times: null,
          Quantity: null,
          Dispend: "not dispense",
          Description: null,
          // not in db
          doctorName: "George",
          ward: "อายุรกรรม(MEDICINE)"
        },
        {
          //in db        
          OrderID: null,
          PatientID: null,
          DoctorID: null,
          PharmacistID: "not dispense",
          OrderStartDate: null,
          DispendStartDate: "not dispense",
          DrugNo: "2",
          Duration: {
            year: "1",
            month: "2",
            day: "100"
          },
          UsingStatus: null,
          DispendStatus: null,
          GPName: "Paracetamol",
          RXCUI: null,
          Dosage: {
            dose: null,
            unit: null
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
          Times: null,
          Quantity: null,
          Dispend: "not dispense",
          Description: null,
          // not in db
          doctorName: "Alice",
          ward: "อายุ(MEDICINE)"
        }
      ],*/
      //edit in table
      checkEdit: false,
      itemEdit: null,
      //add drug to list 
      active: false,
      newDrugs: {
        //in db        
        OrderID: null,
        PatientID: null,
        DoctorID: null,
        PharmacistID: "not dispense",
        OrderStartDate: null,
        DispendStartDate: "not dispense",
        DrugNo: null,
        Duration: {
          year: "0",
          month: "0",
          day: "0"
        },
        UsingStatus: null,
        DispendStatus: null,
        GPName: null,
        RXCUI: null,
        Dosage: {
          dose: null,
          unit: null
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
        Times: null,
        Quantity: null,
        Dispend: "not dispense",
        Description: null,
        // not in db
        doctorName: "not found",
        ward: "not found"
      },
      //confirm
      showDialog: false,
      //drug history
      first: false,
    }),
    methods: {
      //add drug to list
      addDrugToListBtn() {
        this.active = true
      },
      addDrugToList() {
        var x = {
          OrderID: this.newDrugs.OrderID,
          PatientID: this.newDrugs.PatientID,
          DoctorID: this.newDrugs.DoctorID,
          PharmacistID: this.newDrugs.PharmacistID,
          OrderStartDate: this.newDrugs.OrderStartDate,
          DispendStartDate: this.newDrugs.DispendStartDate,
          DrugNo: this.newDrugs.DrugNo,
          Duration: {
            year: this.newDrugs.Duration.year,
            month: this.newDrugs.Duration.month,
            day: this.newDrugs.Duration.day
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
          doctorName: this.newDrugs.doctorName,
          ward: this.newDrugs.ward
        }
        if (this.checkEdit) {
          console.log()
          this.drugs[this.itemEdit.DrugNo - 1] = x
          this.checkEdit = false
        } else {
          console.log("add drug success")
          x.DrugNo = (this.drugs.length + 1).toString()
          console.log(this.newDrugs)
          this.drugs.push(x)
        }
        //OrderID: null,
        //PatientID: null,
        //DoctorID: null,
        //PharmacistID: "not dispense",
        //OrderStartDate: null,
        //DispendStartDate: "not dispense",
        this.newDrugs.DrugNo = null
        this.newDrugs.Duration.year = "0"
        this.newDrugs.Duration.month = "0"
        this.newDrugs.Duration.day = "0"
        //UsingStatus: null,
        //DispendStatus: null,
        this.newDrugs.GPName = null
        this.newDrugs.RXCUI = null
        this.newDrugs.Dosage.dose = null
        this.newDrugs.Dosage.unit = null
        this.newDrugs.Frequency.mor = "false"
        this.newDrugs.Frequency.aft = "false"
        this.newDrugs.Frequency.eve = "false"
        this.newDrugs.Frequency.bed = "false"
        this.newDrugs.Frequency.before = "false"
        this.newDrugs.Frequency.after = "false"
        this.newDrugs.Frequency.symptoms = "false"
        //Times: null,
        this.newDrugs.Quantity = null
        //Dispend: "not dispense",
        this.newDrugs.Description = null
        //doctorName: "not found",
        //ward: "not found"
      },
      //table
      newDrug() {
        this.active = true
      },
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
      }
    },
    //table add drug
    created() {
      this.searched = this.drugs
    }
  }

</script>

<style lang="css" scoped>

</style>
