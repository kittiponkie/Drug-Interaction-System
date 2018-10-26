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
          <md-list-item to="/Patient_information" class="unselected">
            <md-icon style="margin-right:10px">account_circle</md-icon>
            <span class="md-list-item-text unselected_text">Patient Information</span>
          </md-list-item>

          <md-list-item to="/Drug_History" class="selected">
            <md-icon style="margin-right:10px">folder_shared</md-icon>
            <span class="md-list-item-text selected_text">Drug History</span>
          </md-list-item>

          <md-list-item to="/Drug_Information" class="unselected">
            <md-icon style="margin-right:10px">description</md-icon>
            <span class="md-list-item-text unselected_text">Drug Information</span>
          </md-list-item>

          <md-list-item to="/Drug_Interaction" class="unselected">
            <md-icon style="margin-right:10px">bubble_chart</md-icon>
            <span class="md-list-item-text unselected_text">Drug Interaction</span>
          </md-list-item>

          <md-list-item to="/login" class="unselected">
            <md-icon style="margin-right:10px">power_settings_new</md-icon>
            <span class="md-list-item-text unselected_text">Logout</span>
          </md-list-item>

        </md-list>
      </md-app-drawer>

      <!--content-->
      <md-app-content>
        <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <h1 class="md-title">Users Name</h1>
            </div>

            <md-field md-clearable class="md-toolbar-section-end">
              <md-input placeholder="Search by drug name..." v-model="search" @input="searchOnTable" />
            </md-field>
          </md-table-toolbar>

          <md-table-empty-state md-label="No users found" :md-description="`No drug name found for this '${search}' query. Try a different search term.`">
          </md-table-empty-state>

          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="Drug Name" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Doctor's Name" md-sort-by="email">{{ item.email }}</md-table-cell>
            <md-table-cell md-label="Status" md-sort-by="gender">{{ item.gender }}</md-table-cell>
            <md-table-cell md-label="Remark" md-sort-by="title">{{ item.title }}</md-table-cell>
          </md-table-row>
        </md-table>

      </md-app-content>
    </md-app>
  </div>
</template>

<script>
// eslint-disable-next-line
 /* eslint-disable */
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
          name: "Acetaminophen",
          email: "Shawna Dubbins",
          gender: "Using",
          title: "-"
        },
        {
          id: 2,
          name: "Omeprazole",
          email: "Odette Demageard",
          gender: "Using",
          title: "-"
        },
        {
          id: 3,
          name: "Tramadol",
          email: "Vera Taleworth",
          gender: "Using",
          title: "Community Outreach Specialist"
        },
        {
          id: 4,
          name: "Tramadol",
          email: "Lonnie Izkovitz",
          gender: "Stopped using",
          title: "Operator"
        },
        {
          id: 5,
          name: "Acetaminophen",
          email: "Thatcher Stave",
          gender: "Stopped using",
          title: "-"
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
  .md-content md-app-content md-flex md-theme-default{
    padding-top: 23px;
  }
</style>
