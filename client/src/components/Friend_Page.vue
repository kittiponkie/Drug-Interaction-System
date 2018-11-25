<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary" md-elevation="0" style="background-color:#5DBFA8;">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!(Window_Width>600)">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Smart Drug Use</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="card" :md-active.sync="menuVisible" class="menu_color">
        <md-toolbar class="md-transparent" md-elevation="0">
          <div class="md-toolbar-section-end">
            <span class="span_center">Menu</span>
            <md-button class="md-icon-button md-dense" @click="toggleMenu" v-if="!(Window_Width>600)">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list class="delete_margin">
          <md-list-item class="unselected">
            <md-icon style="margin-right:10px">account_circle</md-icon>
            <span class="md-list-item-text unselected_text">Patient Information</span>
          </md-list-item>

          <md-list-item to="/Drug_History" class="unselected">
            <md-icon style="margin-right:10px">folder_shared</md-icon>
            <span class="md-list-item-text unselected_text">Drug History</span>
          </md-list-item>

          <md-list-item to="/Friend_Page" class="selected">
            <md-icon style="margin-right:10px">person_add</md-icon>
            <span class="md-list-item-text selected_text">Friend</span>
          </md-list-item>

          <md-list-item to="/Drug_Information" class="unselected">
            <md-icon style="margin-right:10px">description</md-icon>
            <span class="md-list-item-text unselected_text">Drug Information</span>
          </md-list-item>

          <md-list-item to="/Drug_Interaction" class="unselected">
            <md-icon style="margin-right:10px">bubble_chart</md-icon>
            <span class="md-list-item-text selected_text">Drug Interaction</span>
          </md-list-item>

          <md-list-item to="/login" class="unselected">
            <md-icon style="margin-right:10px">power_settings_new</md-icon>
            <span class="md-list-item-text unselected_text">Logout</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

    <!--content-->
<md-app-content>
        <h3>Friend</h3>
 <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#basicExampleModal" style="float:right;" >Add Friend</button>

<!-- Modal -->
<div class="modal fade" id="basicExampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Friend</h5><br/>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
       </div>
       <!--content summary -->
       <div class="modal-body">
        <p>Please Search Friend ID</p>
						<div class="row">
							<div class="col-sm-6 form-group">
								<input type="text" placeholder="Enter First Name Here.." class="form-control">
                <!-- ยังไม่ได้ทำ auto complete -->
							</div>
						</div>
       </div>
       <!-- confirm to dispend drug button -->
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Add Friend</button>
        <button type="button" class="btn btn-primary">Cancle</button>
      </div>
    </div>
  </div>
</div>
<!-- end modal -->
         
       
<!-- end modal -->
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
    <br/>
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
<br/>
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
            <md-table-cell md-label="Status" >           
               <button type="button" class="btn btn-success" style="border-top-width: 0px;">Accept</button>
               <button type="button" class="btn btn-danger"  style="border-top-width: 0px;">Reject</button>
            <button type="button" class="close" aria-label="Close"  style="border-top-width: 0px,font:10px;" ><span aria-hidden="true">&times;</span></button> 
           </md-table-cell>
          </md-table-row>
        </md-table>
    </md-app-content>
  </md-app>
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
        this.loading = true
        this.rxcui = null
        var checkfound = false
        await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui?name=${this.drugName}`).then(Response => {
          if (Response.data.idGroup.rxnormId == null) {
            console.log('rxcui id is null')
            this.found = false
            this.checkSearch = true
            this.loading = false
          } else {
            this.rxcui = Response.data.idGroup.rxnormId[0]
            checkfound = true
            console.log('rxcui ok')
          }
        });
        if (checkfound == true) {
          await axios.get(
              `https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=${this.rxcui}&sources=DrugBank`)
            .then(Response => {
              this.drugList = Response.data.interactionTypeGroup[0].interactionType[0].interactionPair
              if (Response.data == null) console.log('data is null')
              else {
                console.log(this.drugList)
                this.found = true
                this.loading = false
              }
            });
        }
      },
      change() {
        console.log(this.drugName)
        this.loading = false
        this.found = false
        this.drugList = null
        this.checkSearch = false
      },
      searchOnTable () {
        this.searched = searchByName(this.users, this.search)
      }
    },
    async mounted() {
      this.Window_Width = window.innerWidth
    },
    created () {
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
  .md.table{
     width: 750px;
  }
  .dialogdemoThemeInheritance .container {
  text-align: center; 
  }

</style>