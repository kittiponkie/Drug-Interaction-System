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

          <md-list-item to="/Drug_History" class="unselected">
            <md-icon style="margin-right:10px">folder_shared</md-icon>
            <span class="md-list-item-text unselected_text">Drug History</span>
          </md-list-item>

          <md-list-item to="/Drug_History" class="unselected">
            <md-icon style="margin-right:10px">person_add</md-icon>
            <span class="md-list-item-text selected_text">Friend</span>
          </md-list-item>

          <md-list-item to="/Drug_Information" class="unselected">
            <md-icon style="margin-right:10px">description</md-icon>
            <span class="md-list-item-text unselected_text">Drug Information</span>
          </md-list-item>

          <md-list-item to="/Drug_Interaction" class="selected">
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
      <md-app-content class="text_all">
        <div class="col-lg-6" style="width:100%;">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3>Drug Name : {{drugName}}</h3>
              <!-- search -->
              <form v-on:submit.prevent="getData">
                <md-field md-clearable class="md-toolbar-section-end textSearch">
                  <md-input placeholder="Search by Drug name..." v-model="drugName" @input="change"></md-input>
                </md-field>
                <md-button type="submit" class="md-raised buttonSearch">search</md-button>
              </form>
              <br>
            </div>
            <!--data-->
            <div class="panel-body" v-if="found">
              <table class="table table-condensed" style="border-collapse:collapse;">
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Drug Name</th>
                  </tr>
                </thead>
                <tbody v-for="(value,index) in drugList" :key="index">
                  <tr data-toggle="collapse" :data-target="'#row'+index" class="accordion-toggle">
                    <td><button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-triangle-bottom"></span></button></td>
                    <td>{{value.interactionConcept[1].minConceptItem.name}}</td>
                  </tr>
                  <tr>
                    <td colspan="12" class="hiddenRow">
                      <div class="accordian-body collapse" :id="'row'+index">
                        <br>
                  <tr>
                   <b> RXCUI ID :</b> {{value.interactionConcept[1].minConceptItem.rxcui}}
                  </tr>
                  <br>
                  <tr>
                   <b> Generic Drug Name :</b> {{value.interactionConcept[1].minConceptItem.name}}
                  </tr>
                  <br>
                  <tr>
                  <b>  Interaction Description :</b> {{value.description}}
                  </tr>
                  <br>
                  <tr>
                   <b> Severity :</b> {{value.severity}}
                  </tr>
                  <br>
            </div>
            </td>
            </tr>
            </tbody>
            </table>
          </div>
          <!--empty state-->
          <div class="panel-body " v-else-if="!found && checkSearch">
            <md-empty-state md-label="Not found" :md-description="`No drug found for this query.  Please Try again.`">
            </md-empty-state>
          </div>
          <!-- loading-->
          <div class="panel-body " v-else-if="loading">
            <md-empty-state md-label="Loading" :md-description="`Please wait a second`">
              <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
            </md-empty-state>
          </div>
        </div>
  </div>

  </md-app-content>
  </md-app>
  </div>
</template>

<script>
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
  .md-content md-app-content md-flex text_all md-theme-default{
    padding-top: 23px;
  }
</style>
