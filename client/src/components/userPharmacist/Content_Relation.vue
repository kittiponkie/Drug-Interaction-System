<template>
  <div>
    <h3>Friend</h3>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#basicExampleModal2" style="float: right;margin-right: 20px;">Add Friend</button>

    
    
    <!--card1-->
    <div class="inline" v-for="i in 5" :key="i">
      <router-link to="/pharmacist">
        <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">Patient</div>
              <div class="md-subhead">Name : xxxxxxx </div>
            </md-card-header>
        </md-card>
      </router-link>
    </div>
    <!-- end card1-->
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

  .inline{
    display: inline-block;
  }

</style>
