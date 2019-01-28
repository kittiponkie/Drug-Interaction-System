<template>
  <div class="page-container">
    <h3>Friend</h3>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" style="float:right;margin-right:10px;">AddFriend</button>
    <md-card md-with-hover>
      <md-ripple>
        <!--card1-->
        <md-card-header>
          <div class="md-title">Doctor</div>
          <div class="md-subhead">Name : xxxxxxx </div>
        </md-card-header>

        <md-card-actions>
          <md-button>See data</md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>
    <!-- end card1-->
    <br />
    <md-card md-with-hover>
      <md-ripple>
        <!--card2-->
        <md-card-header>
          <div class="md-title">Pharmacist</div>
          <div class="md-subhead">Name :xxxxxxx</div>
        </md-card-header>
        <md-card-actions>
          <!--   <md-button>See data</md-button> -->
          <md-button class="md-primary" ng-click="showAdvanced($event)">See data</md-button>
          <script type="text/ng-template" id="dialog1.tmpl.html"></script>
        </md-card-actions>
      </md-ripple>
    </md-card>
    <!-- end display card -->
    <br />
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <div class="md-toolbar-section-start" style="width: 782px;">
          <h1 class="md-title">Friend Request</h1>
        </div>
      </md-table-toolbar>
      <md-table-empty-state md-label="No users found" :md-description="`No drug name found for this '${search}' query. Try a different search term.`">
      </md-table-empty-state>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Surname" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Status">
          <button type="button" class="btn btn-success"  style="border-top-width: 0px;">Accept</button>
          <button type="button" class="btn btn-danger"  style="border-top-width: 0px;">Reject</button>
          <button type="button" class="close" aria-label="Close" style="border-top-width: 0px,font:10px;"><span aria-hidden="true">&times;</span></button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  const toLower = text => {
    return text.toString().toLowerCase()
  }
  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.name).includes(toLower(term)))
    }
    return items
  }
  import axios from 'axios'
  export default {
    name: 'Drug_Interaction',
    data: () => ({
      menuVisible: false, //toggle visible menu when responsive
      Window_Width: 0, //width of window
      drugName: null, //drug name that submit already
      drugList: null, //list of drug that interaction with drugName
      found: false, //true when found data , false when don't have data from API
      rxcuiID: null, //ID of drug from API
      checkSearch: false, //true when you search something
      loading: false, //true when you have to wait for call API  
      search: null,
      searched: [],
      users: [{
          id: 1,
          name: "khaofang pebble",
          email: "pebble",
        },
        {
          id: 2,
          name: "name2",
          email: "surname2",
        },
        {
          id: 3,
          name: "name3",
          email: "surname2",
        },
        {
          id: 4,
          name: "name4",
          email: "surname4",
        },
        {
          id: 5,
          name: "name5",
          email: "surname5",
        }
      ]
    }),
    methods: {
      //toggle visible menu
      toggleMenu() {
        this.menuVisible = !this.menuVisible
      },

      //get data from API
      async getData() {

      },
      change() {
        console.log(this.drugName)
        this.loading = false
        this.found = false
        this.drugList = null
        this.checkSearch = false
      },
      searchOnTable() {
        this.searched = searchByName(this.users, this.search)
      }
    },
    async mounted() {
      this.Window_Width = window.innerWidth
    },
    created() {
      this.searched = this.users
    }
  }

</script>

<style lang="scss" scoped>
  .md-app {
    height: calc(100vh);
    border: 1px solid rgba(#000, .12);
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
    max-width: calc(100% - 110px);
    overflow: auto;
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
    background-color: #5DBFA8;
    margin: 2px;
  }

  .unselected {
    background-color: #f1f1f1;
    margin: 2px;
  }

  .selected_text {
    color: black;
  }

  .unselected_text {
    color: black;
  }

  .md-card {
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

  .md.table {
    width: 750px;
  }

  .dialogdemoThemeInheritance .container {
    text-align: center;
  }

</style>
