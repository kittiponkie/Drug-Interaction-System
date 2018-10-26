<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary" md-elevation="0" style="background-color:#5DBFA8;">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!(Window_Width>600)">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Smart Drug Use</span>
      </md-app-toolbar>

      <!--menu card-->
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
          <md-list-item to="/Patient_information" class="selected">
            <md-icon style="margin-right:10px">account_circle</md-icon>
            <span class="md-list-item-text unselected_text">Patient Information</span>
          </md-list-item>

          <md-list-item to="/Drug_History" class="unselected">
            <md-icon style="margin-right:10px">folder_shared</md-icon>
            <span class="md-list-item-text unselected_text">Drug History</span>
          </md-list-item>

          <md-list-item to="/Drug_Information" class="unselected">
            <md-icon style="margin-right:10px">description</md-icon>
            <span class="md-list-item-text selected_text">Drug Information</span>
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
      <md-app-content class="text_all">
        <div class="col-lg-6" style="width:100%;">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3>Drug Name : {{drugName}}</h3>
              <form v-on:submit.prevent="getData">
                <md-field md-clearable class="md-toolbar-section-end textSearch">
                  <md-input placeholder="Search by Drug name..." v-model="drugName" @input="change"></md-input>
                </md-field>
                <md-button type="submit" class="md-raised buttonSearch">search</md-button>
              </form>
              <br>
            </div>
            <!--md-content><br></md-content-->
            <!-- content that search -->
            <div class="viewport">
              <md-toolbar :md-elevation="1">
                <span class="md-title">Generic Drug Name</span>
              </md-toolbar>
              <div class="text_padding">
                <p>Paracetamol</p>
              </div>
            </div>

            <div class="viewport">
              <md-toolbar :md-elevation="1">
                <span class="md-title">RxCui ID</span>
              </md-toolbar>
              <div class="text_padding">
                <p>161</p>
              </div>
            </div>

            <div class="viewport">
              <md-toolbar :md-elevation="1">
                <span class="md-title">GP ID</span>
              </md-toolbar>
              <md-subheader class="md-primary"></md-subheader>
              <div class="panel-body">
                <table class="table table-condensed" style="border-collapse:collapse;">
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th>GP ID</th>
                    </tr>
                  </thead>
                  <tbody v-for="index in 2">
                    <tr data-toggle="collapse" :data-target="'#rowGP'+index" class="accordion-toggle">
                      <td><button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-eye-open"></span></button></td>
                      <td>GP ID {{index}}</td>
                    </tr>
                    <tr>
                      <td colspan="12" class="hiddenRow">
                        <div class="accordian-body collapse" :id="'rowGP'+index">
                          <div class="panel-body">
                            <table class="table table-condensed" style="border-collapse:collapse;">
                              <thead>
                                <tr>
                                  <th>&nbsp;</th>
                                  <th>GPU ID</th>
                                </tr>
                              </thead>
                              <tbody v-for="ind in 2">
                                <tr data-toggle="collapse" :data-target="'#rowGPU'+ind+index" class="accordion-toggle">
                                  <td><button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-eye-open"></span></button></td>
                                  <td>GPU ID {{ind}}</td>
                                </tr>
                                <tr>
                                  <td colspan="12" class="hiddenRow">
                                    <div class="accordian-body collapse" :id="'rowGPU'+ind+index">
                                      <br>
                                <tr>
                                  GP ID : GP ID {{index}}
                                </tr>
                                <br>
                                <tr>
                                  GPU ID : {{ind}}
                                </tr>
                                <br>
                                <tr>
                                  Drug Name : aaaaaaaaaaaaaaaa
                                </tr>
                                <br>
                          </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="panel-body">
                <table class="table table-condensed" style="border-collapse:collapse;">
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th>TP ID</th>
                    </tr>
                  </thead>
                  <tbody v-for="ind in 2">
                    <tr data-toggle="collapse" :data-target="'#rowTP'+ind+index" class="accordion-toggle">
                      <td><button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-eye-open"></span></button></td>
                      <td>TP ID {{ind}}</td>
                    </tr>
                    <tr>
                      <td colspan="12" class="hiddenRow">
                        <div class="accordian-body collapse" :id="'rowTP'+ind+index">
                          <div class="panel-body">
                            <table class="table table-condensed" style="border-collapse:collapse;">
                              <thead>
                                <tr>
                                  <th>&nbsp;</th>
                                  <th>TPU ID</th>
                                </tr>
                              </thead>
                              <tbody v-for="i in 2">
                                <tr data-toggle="collapse" :data-target="'#rowTPU'+i+ind+index" class="accordion-toggle">
                                  <td><button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-eye-open"></span></button></td>
                                  <td>TPU ID {{i}}</td>
                                </tr>
                                <tr>
                                  <td colspan="12" class="hiddenRow">
                                    <div class="accordian-body collapse" :id="'rowTPU'+i+ind+index">
                                      <br>
                                <tr>
                                  GP ID : {{index}}
                                </tr>
                                <br>
                                <tr>
                                  TP ID : {{ind}}
                                </tr>
                                <br>
                                <tr>
                                  TPU ID : {{i}}
                                </tr>
                                <br>
                                <tr>
                                  Drug Name : aaaaaaaaaaaaaaaa
                                </tr>
                                <br>
                          </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            </td>
            </tr>
            </tbody>
            </table>
          </div>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
  </div>
  <md-divider></md-divider>
  </div>

  <div class="viewport">
    <md-toolbar :md-elevation="1">
      <span class="md-title">ATC</span>
    </md-toolbar>
    <div class="text_padding">
      <p>ATC ID : 1234567</p>
      <p>Description : xxx</p>
    </div>
  </div>

  <div class="viewport">
    <md-toolbar :md-elevation="1">
      <span class="md-title">Barcode</span>
    </md-toolbar>
    <md-subheader class="md-primary">Barcode ID</md-subheader>
    <div class="text_padding">
      <p>Barcode ID : 1234567</p>
    </div>
    <md-divider></md-divider>
    <md-subheader class="md-primary">Barcode Picture</md-subheader>
    <div class="text_padding">
      <img src="../assets/logo.png" alt="Barcode" width="50" height="50">
    </div>
  </div>

  <div class="viewport">
    <md-toolbar :md-elevation="1">
      <span class="md-title">More Information</span>
    </md-toolbar>
    <div class="text_padding">
      <p>Website : http.....</p>
    </div>
  </div>

  </div>
  </div>
  </md-app-content>
  </md-app>
  </div>

</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
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
      loading: false //true when you have to wait for call API
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
      }
    },
    async mounted() {
      this.Window_Width = window.innerWidth
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

  .text_padding {
    padding: 20px;
    overflow: auto;
  }
</style>