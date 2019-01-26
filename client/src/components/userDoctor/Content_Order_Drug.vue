<template>
  <div class="container">
  <!-- Add Drug Button -->
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#ordermodal"
      style="float:right; padding-right: 10px; margin-left:15px;"
    >Add Drug To list</button>
    <br>
<!-- table -->
  <md-table v-model="searched" style="padding-left: 0px;margin-left: 0px;" md-sort="name" md-sort-order="asc" md-card >
      <md-table-toolbar >
        <div class="md-toolbar-section-start">
          <h1 class="md-title">List Of Drug</h1>
        </div>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Drug ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Drug Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="duration" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Date" md-sort-by="gender">{{ item.gender }}</md-table-cell>
       <md-table-cell>
       <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#basicExampleModal" style="float:right; padding-right: 10px;">See data</button>
      </md-table-cell>
      <md-table-cell>
          <!--<button type="button" class="btn" style="border-top-width: 0px;">See data</button>-->
          <button type="button" class="close" aria-label="Close" data-dismiss="modal" data-toggle="modal" data-target="#myModalclose" style="border-top-width: 0px,font:10px;">
            <span aria-hidden="true">&times;</span>
          </button>
      </md-table-cell>
      </md-table-row>
      
    </md-table>
  </div>
</template>

<script>
/* data mockup */
 import axios from 'axios'
  export default {
    name: 'Drug_Interaction',
    data: () => ({
      search: null,
      searched: [],
      users: [{
          id: "D001",
          name: "Acetaminophen",
          email: "Shawna Dubbins",
          gender: "Using",
          title: "-"
        },
        {
          id: "D002",
          name: "Omeprazole",
          email: "Odette Demageard",
          gender: "Using",
          title: "-"
        },
        {
          id: "D003",
          name: "Tramadol",
          email: "Vera Taleworth",
          gender: "Using",
          title: "Community Outreach Specialist"
        },
        {
          id: "D004",
          name: "Tramadol",
          email: "Lonnie Izkovitz",
          gender: "Stopped using",
          title: "Operator"
        },
        {
          id: "D005",
          name: "Acetaminophen",
          email: "Thatcher Stave",
          gender: "Stopped using",
          title: "-"
        }
      ]
    }),
    methods: {
      searchOnTable() {
        this.searched = searchByName(this.users, this.search)
      }
    },
    created() {
      this.searched = this.users
    }
  }
</script>

<style lang="scss" scoped>
.md-app {
  height: calc(100vh);
  border: 1px solid rgba(#000, 0.12);
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
  background-color: #5dbfa8;
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

.md-content md-app-content md-flex text_all md-theme-default {
  padding-top: 23px;
}

/*Autocomplete*/
@at-root* {
  box-sizing: border-box;
}

body {
  font: 16px Arial;
}

.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline-block;
}

input {
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
}

input[type="text"] {
  background-color: #f1f1f1;
  width: 100%;
}

input[type="submit"] {
  background-color: DodgerBlue;
  color: #fff;
}

.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
}

.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}

.autocomplete-items div:hover {
  /*when hovering an item:*/
  background-color: #e9e9e9;
}

.autocomplete-active {
  /*when navigating through the items using the arrow keys:*/
  background-color: DodgerBlue !important;
  color: #ffffff;
}

/*popup*/
</style>
