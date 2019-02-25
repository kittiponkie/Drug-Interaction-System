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
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Preferences</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="General">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae
            commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae
            commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae
            commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.</p>
        </md-tab>

        <md-tab md-label="Activity">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae
            commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae
            commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae
            commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae
            commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae
            commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.</p>
        </md-tab>

        <md-tab md-label="Account">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae
            commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium
            inventore ducimus ipsa aut.</p>
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
      showDialog: false,
      search: null,
      searched: [],
      users: []
      /*[{
          OrderID: 1,
          GPName: "Acetaminophen",
          DoctorID: "Shawna Dubbins",
          UsingStatus: "Using",
          Dispend: 20
        },
        {
          OrderID: 2,
          GPName: "Omeprazole",
          DoctorID: "Odette Demageard",
          UsingStatus: "Using",
          Dispend: 100
        },
        {
          OrderID: 3,
          GPName: "Tramadol",
          DoctorID: "Vera Taleworth",
          UsingStatus: "Waiting Dispend",
          Dispend: 40
        },
        {
          OrderID: 4,
          GPName: "Tramadol",
          DoctorID: "Lonnie Izkovitz",
          UsingStatus: "Stopped using",
          Dispend: 50
        },
        {
          OrderID: 5,
          GPName: "Acetaminophen",
          DoctorID: "Thatcher Stave",
          UsingStatus: "Stopped using",
          Dispend: 60
        }
      ]*/
    }),
    methods: {
      showDetail(item) {
        this.showDialog = true
        console.log("show item = ", item)
      },
      searchOnTable() {
        this.searched = searchByName(this.users, this.search);
      }
    },
    created() {
      
    },
    async mounted(){
      await doctorServices.getOrderId(this.$localStorage.get('doctor_patient'),this.$localStorage.get('userID')).then(Response => {
        console.log(Response.data[0])
        this.users = Response.data
        this.searched = this.users;
        //this.doctor = Response.data[0]
      })
    }
  };

</script>

<style>
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
