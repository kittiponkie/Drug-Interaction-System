<template>
  <div>
    <!--header-->
    <md-card style="padding-left: 0px;">
      <md-card-header>
        <md-card-header-text>
          <h4 style="text-align:left;">Patient Name :
            <span style="float:right;margin-right: 150px;">Doctor Name :</span>
          </h4>
        </md-card-header-text>
      </md-card-header>
    </md-card>
    <!--end header-->
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
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.OrderID }}</md-table-cell>
        <md-table-cell md-label="Drug Name" md-sort-by="GPName">{{ item.GPName }}</md-table-cell>
        <md-table-cell md-label="Doctor's Name" md-sort-by="DoctorID">{{ item.DoctorID }}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="UsingStatus">{{ item.UsingStatus }}</md-table-cell>
        <md-table-cell md-label="Receive Medicine">
          <b-progress :value="parseInt(item.Dispend)" striped show-value class="mb-3"></b-progress>
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
                  <div class="md-layout-item"><label style="min-width:180px;">Dispend Status :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.DispendStatus"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Dosage :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.Dosage"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">Frequency :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.Frequency"></div>
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
                  <div class="md-layout-item"><label style="min-width:180px;">Recieve madicine(%) :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.Dispend"></div>
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
      search: null,
      searched: [],
      users: [],
      /*[{
          OrderID: 1,
          GPName: "Acetaminophen",
          DoctorID: "Shawna Dubbins",
          UsingStatus: "Using",
          Dispend: 20
        }
      ]*/
      //dialog
      showDialog: false,
      itemDialog: [],
      dialogShift: "General"
    }),
    methods: {
      showDetail(item) {
        this.showDialog = true
        console.log("show item = ", item)
        this.itemDialog = item
      },
      searchOnTable() {
        this.searched = searchByName(this.users, this.search);
      }
    },
    created() {

    },
    async mounted() {
      await doctorServices.getOrderId(this.$localStorage.get('doctor_patient'), this.$localStorage.get('userID')).then(
        Response => {
          console.log(Response.data[0])
          this.users = Response.data
          this.searched = this.users;
          //this.doctor = Response.data[0]
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
