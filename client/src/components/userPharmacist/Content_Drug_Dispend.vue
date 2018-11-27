<template>
  <div class="page-container">
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Order Number : O00001</h1>
        </div>
      </md-table-toolbar>
      <md-table-empty-state md-label="No users found" :md-description="`No drug name found for this '${search}' query. Try a different search term.`">
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="patient ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Patient Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Doctor Name" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Status">
          <!--     <button type="button" class="btn" style="border-top-width: 0px;">See data</button>-->
          <button type="button" class="close" aria-label="Close" style="border-top-width: 0px,font:10px;"><span
              aria-hidden="true">&times;</span></button>
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#basicExampleModal">See data</button>

          <!-- Modal -->
          <div class="modal fade" id="basicExampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Summary</h5><br />
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <!--content summary -->
                <div class="modal-body">
                  <p>list of drug</p>
                </div>
                <!-- confirm to dispend drug button -->
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary">Confirm</button>
                  <button type="button" class="btn btn-primary">Close</button>
                </div>
              </div>
            </div>
          </div>
          <!-- end modal -->
        </md-table-cell>
      </md-table-row>
    </md-table>
    <br />
    <!-- end line -->
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
          email: "xxxxxx",
        },
        {
          id: 2,
          name: "Omeprazole",
          email: "xxxxxxx",
        },
        {
          id: 3,
          name: "Tramadol",
          email: "xxxxxxxxxxxx",
        },
        {
          id: 4,
          name: "Tramadol",
          email: "xxxxxxxxxxxxxx",
        },
        {
          id: 5,
          name: "Acetaminophen",
          email: "xxxxxxxxxxx",
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
  //modal

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

  .md-content md-app-content md-flex md-theme-default {
    padding-top: 23px;
  }

  .md-drawer md-app-drawer menu_color md-theme-default md-left md-permanent md-permanent-card {
    padding-top: 20px;
  }

  #button {
    border-top-width: 0px;
  }

  /*Tab Bar*/
  :hover,
  a:focus {
    outline: none;
    text-decoration: none;
  }

  .tab .nav-tabs {
    position: relative;
    border-bottom: none;
  }

  .tab .nav-tabs li {
    margin: 0;
  }

  .tab .nav-tabs li a {
    display: block;
    padding: 20px 15px;
    background: #fff;
    font-size: 17px;
    font-weight: 700;
    color: #f2bd47;
    text-transform: uppercase;
    text-align: center;
    border-radius: 0;
    border: none;
    margin-right: 0;
    overflow: hidden;
    z-index: 1;
    position: relative;
    transition: all 0.3s ease 0s;
  }

  .tab .nav-tabs li a:after {
    content: "";
    width: 100%;
    height: 100%;
    background: #e9e9e9;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    perspective-origin: 50% 100%;
    transform: perspective(900px) rotate3d(1, 0, 0, 90deg);
    transform-origin: 50% 100% 0;
    transition: transform 0.3s ease 0s, background-color 0.3s ease 0s;
  }

  .tab .nav-tabs li.active a:after {
    background: #eee6d2;
    transform: perspective(900px) rotate3d(1, 0, 0, 0deg);
  }

  .tab .nav-tabs li.active a,
  .tab .nav-tabs li a:hover {
    color: #4b489b;
    border: none;
  }

  .tab .tab-content {
    padding: 20px;
    background: #eee6d2;
    font-size: 15px;
    color: #757575;
    line-height: 26px;
    width: 100%;
  }

  .tab .tab-content h3 {
    font-size: 24px;
    margin-top: 0;
  }

  @media only screen and (max-width: 479px) {
    .tab .nav-tabs li {
      width: 100%;
      text-align: center;
    }
  }

</style>
