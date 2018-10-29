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
      <md-app-content class="text_all">
        <div class="col-lg-6" style="width:100%;">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3>Patient id : xxxxxxx {{Patientid}}</h3>
              <br>

<!-- patient data -->
<form>
<!--prefix-->
  <div class="form-goup row">
    <label for="prefix" class="col-sm-2 col-form-label">Prefix</label>
    <div class="col-sm-10">
    <input type="text" readonly class="form-control" id="prefix" value="MR.">
  </div>
  </div>
  <br>
<!--name-->
  <div class="form-group row">
    <label for="name" class="col-sm-2 col-form-label">Name</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control" id="namesurname" value="Naphatsorn">
    </div> 
  </div>
  <!--surname-->
  <div class="form-group row">
    <label for="surname" class="col-sm-2 col-form-label">Surname</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control" id="surname" value="Buarattanakarn">
    </div> 
  </div>
<!--sex-->
  <div class="form-group row">
    <label for="sex" class="col-sm-2 col-form-label">Sex</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control" id="sex" value="Female">
    </div> 
  </div>
  <!--birthday-->
  <div class="form-group row">
    <label for="bod" class="col-sm-2 col-form-label">Birthday</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control" id="birthday" value="09/06/2540">
      <input type="text" readonly class="form-control" id="age" value="21 y 5 m 21 d">
    </div> 
  </div>
  <!--id card-->
  <div class="form-group row">
    <label for="idcard" class="col-sm-2 col-form-label">ID Card</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control" id="card" value="1849900281533">
    </div> 
  </div>
  <!--status-->
  <div class="form-group row">
    <label for="idcard" class="col-sm-2 col-form-label">Status</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control" id="card" value="1849900281533">
    </div> 
  </div>
   <!--ethnicity -->
  <div class="form-group row">
    <label for="ethnicity " class="col-sm-2 col-form-label">Ethnicity</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control" id="ethnicity " value="Thai">
    </div> 
  </div>
   <!--nationality-->
  <div class="form-group row">
    <label for="nationality" class="col-sm-2 col-form-label">Nationality</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control" id="nationality" value="Thai">
    </div> 
  </div>
   <!--Religion-->
  <div class="form-group row">
    <label for="Religion" class="col-sm-2 col-form-label">Religion</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control" id="Religion" value="Thai">
    </div> 
  </div>
   <!--Blood-->
  <div class="form-group row">
    <label for="Blood" class="col-sm-2 col-form-label">Blood</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control" id="Blood" value="A">
    </div> 
  </div>
  <!--Address-->
  <div class="form-group row">
    <label for="Address" class="col-sm-2 col-form-label">Address</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control" id="Address" value="RC mansion room206 Phutthamonthon Sai 4 Road Salaya, Phutthamonthon Nakhonpathom, 73170 Thailand">
    </div> 
  </div>
  <!--PhoneNumber-->
  <div class="form-group row">
    <label for="PhoneNumber" class="col-sm-2 col-form-label">Phone Number</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control" id="PhoneNumber" value="0865076630">
    </div> 
  </div>
  <!--Drugallergy-->
  <div class="form-group row">
    <label for="Drugallergy" class="col-sm-2 col-form-label">Drug allergy</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control" id="Drugallergy" value="Tramadol,Paracetamol">
    </div> 
  </div>
  <!--Foodallergy-->
  <div class="form-group row">
    <label for="Foodallergy" class="col-sm-2 col-form-label">Food allergy</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control" id="Foodallergy" value="fish">
    </div> 
  </div>
</form>
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
