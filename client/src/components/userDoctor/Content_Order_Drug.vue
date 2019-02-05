<template>
  <div class="container">
    <!-- Add Drug Button 
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#ordermodal"
      style="float:right; padding-right: 10px; margin-left:15px;"
    >Add Drug To list</button>
    <br>-->
    <!-- table 
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
          <button type="button" class="btn" style="border-top-width: 0px;">See data</button>
          <button type="button" class="close" aria-label="Close" data-dismiss="modal" data-toggle="modal" data-target="#myModalclose" style="border-top-width: 0px,font:10px;">
            <span aria-hidden="true">&times;</span>
          </button>
      </md-table-cell>
      </md-table-row>
    </md-table>-->
    <div class="container">
      <div class="table-wrapper">
        <div class="table-title" style="padding-top: 25px;">
          <div class="row">
            <div class="col-sm-6">
              <h2>Ordering Drug</h2>
            </div>
            <div class="col-sm-6">
               <a href="#basicExampleModal" class="btn btn-success" data-toggle="modal">
                <i class="material-icons">&#xE15C;</i>
                <span>Confirm</span>
              </a>
              <a href="#adddrugtolist" class="btn btn-default" data-toggle="modal">
                <i class="material-icons">&#xE147;</i>
                <span>Add drug to list</span>
              </a>
              <a href="#deleteEmployeeModal" class="btn btn-default" data-toggle="modal">
                <i class="material-icons">list</i>
                <span>Drug History</span>
              </a>
             
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>
                <span class="custom-checkbox">
                  <input type="checkbox" id="selectAll">
                  <label for="selectAll"></label>
                </span>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span class="custom-checkbox">
                  <input type="checkbox" id="checkbox1" name="options[]" value="1">
                  <label for="checkbox1"></label>
                </span>
              </td>
              <td>Thomas Hardy</td>
              <td>thomashardy@mail.com</td>
              <td>89 Chiaroscuro Rd, Portland, USA</td>
              <td>(171) 555-2222</td>
              <td>
                <a href="#editdrugModal" class="edit" data-toggle="modal">
                  <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                </a>
                <a href="#deleteEmployeeModal" class="delete" data-toggle="modal">
                  <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>



<script>
/* data mockup */
import axios from "axios";
export default {
  name: "Drug_Interaction",
  data: () => ({
    search: null,
    searched: [],
    users: [
      {
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
      this.searched = searchByName(this.users, this.search);
    }
  },
  created() {
    this.searched = this.users;
  }
};
$(document).ready(function() {
  // Activate tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // Select/Deselect checkboxes
  var checkbox = $('table tbody input[type="checkbox"]');
  $("#selectAll").click(function() {
    if (this.checked) {
      checkbox.each(function() {
        this.checked = true;
      });
    } else {
      checkbox.each(function() {
        this.checked = false;
      });
    }
  });
  checkbox.click(function() {
    if (!this.checked) {
      $("#selectAll").prop("checked", false);
    }
  });
});
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
<style type="text/css">
body {
  color: #566787;
  background: white;
  font-family: "Varela Round", sans-serif;
  font-size: 13px;
  padding-right: 0px;
}
.table-wrapper {
  background: #f5f5f5;
  padding: 20px 25px;
  margin: 30px 0;
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.table-title {
  padding-bottom: 15px;
  background: #f1f1f1;
  color: black;
  padding: 16px 30px;
  margin: -20px -25px 10px;
  border-radius: 3px 3px 0 0;
}
.table-title h2 {
  margin: 5px 0 0;
  font-size: 24px;
}
.table-title .btn-group {
  float: right;
}
.table-title .btn {
  color: #fff;
  float: right;
  font-size: 13px;
  border: none;
  min-width: 50px;
  border-radius: 2px;
  border: none;
  outline: none !important;
  margin-left: 10px;
}
.table-title .btn i {
  float: left;
  font-size: 21px;
  margin-right: 5px;
}
.table-title .btn span {
  float: left;
  margin-top: 2px;
}
table.table tr th,
table.table tr td {
  border-color: #e9e9e9;
  padding: 12px 15px;
  vertical-align: middle;
}
table.table tr th:first-child {
  width: 60px;
}
table.table tr th:last-child {
  width: 100px;
}
table.table-striped tbody tr:nth-of-type(odd) {
  background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
  background: #f5f5f5;
}
table.table th i {
  font-size: 13px;
  margin: 0 5px;
  cursor: pointer;
}
table.table td:last-child i {
  opacity: 0.9;
  font-size: 22px;
  margin: 0 5px;
}
table.table td a {
  font-weight: bold;
  color: #566787;
  display: inline-block;
  text-decoration: none;
  outline: none !important;
}
table.table td a:hover {
  color: #2196f3;
}
table.table td a.edit {
  color: #ffc107;
}
table.table td a.delete {
  color: #f44336;
}
table.table td i {
  font-size: 19px;
}
table.table .avatar {
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}
.pagination {
  float: right;
  margin: 0 0 5px;
}
.pagination li a {
  border: none;
  font-size: 13px;
  min-width: 30px;
  min-height: 30px;
  color: #999;
  margin: 0 2px;
  line-height: 30px;
  border-radius: 2px !important;
  text-align: center;
  padding: 0 6px;
}
.pagination li a:hover {
  color: #666;
}
.pagination li.active a,
.pagination li.active a.page-link {
  background: #03a9f4;
}
.pagination li.active a:hover {
  background: #0397d6;
}
.pagination li.disabled i {
  color: #ccc;
}
.pagination li i {
  font-size: 16px;
  padding-top: 6px;
}
.hint-text {
  float: left;
  margin-top: 10px;
  font-size: 13px;
}
/* Custom checkbox */
.custom-checkbox {
  position: relative;
}
.custom-checkbox input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  margin: 5px 0 0 3px;
  z-index: 9;
}
.custom-checkbox label:before {
  width: 18px;
  height: 18px;
}
.custom-checkbox label:before {
  content: "";
  margin-right: 10px;
  display: inline-block;
  vertical-align: text-top;
  background: white;
  border: 1px solid #bbb;
  border-radius: 2px;
  box-sizing: border-box;
  z-index: 2;
}
.custom-checkbox input[type="checkbox"]:checked + label:after {
  content: "";
  position: absolute;
  left: 6px;
  top: 3px;
  width: 6px;
  height: 11px;
  border: solid #000;
  border-width: 0 3px 3px 0;
  transform: inherit;
  z-index: 3;
  transform: rotateZ(45deg);
}
.custom-checkbox input[type="checkbox"]:checked + label:before {
  border-color: #03a9f4;
  background: #03a9f4;
}
.custom-checkbox input[type="checkbox"]:checked + label:after {
  border-color: #fff;
}
.custom-checkbox input[type="checkbox"]:disabled + label:before {
  color: #b8b8b8;
  cursor: auto;
  box-shadow: none;
  background: #ddd;
}
/* Modal styles */
.modal .modal-dialog {
  max-width: 600px;
}
.modal .modal-header,
.modal .modal-body,
.modal .modal-footer {
  padding: 20px 30px;
}
.modal .modal-content {
  border-radius: 3px;
}
.modal .modal-footer {
  background: #ecf0f1;
  border-radius: 0 0 3px 3px;
}
.modal .modal-title {
  display: inline-block;
}
.modal .form-control {
  border-radius: 2px;
  box-shadow: none;
  border-color: #dddddd;
}
.modal textarea.form-control {
  resize: vertical;
}
.modal .btn {
  border-radius: 2px;
  min-width: 100px;
}
.modal form label {
  font-weight: normal;
}
</style>
