<!--<template>

  <div class="page-container">
    <md-app md-mode="reveal">
    
      <md-app-content class="text_all">
        <div class="col-lg-6" style="width:100%;">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3>Forgot Password</h3>
              
              <form v-on:submit.prevent="getData">
                <md-field md-clearable class="md-toolbar-section-end textSearch">
                  <md-input placeholder="Search by E-mail ..." v-model="drugName" @input="change"></md-input>
                </md-field>
                <md-button type="submit" class="md-raised buttonSearch">search</md-button>
              </form>
              <br>
            </div>
          
            <div class="panel-body" v-if="found">
            </div>
          
          <div class="panel-body " v-else-if="!found && checkSearch">
            <md-empty-state md-label="Not found" :md-description="`No drug found for this query.  Please Try again.`">
            </md-empty-state>
          </div>
          
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
</template> -->
<template>
  <div class="form-gap">
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-md-offset-4">
          <div class="panel panel-default">
            <div class="panel-body">
              <div class="text-center">
                <h3>
                  <i class="fa fa-lock fa-4x"></i>
                </h3>
                <h2 class="text-center">Forgot Password?</h2>
                <p>You can reset your password here.</p>
                <div class="panel-body">
                  <form
                    id="register-form"
                    role="form"
                    autocomplete="off"
                    class="form"
                    method="post"
                    v-on:submit.prevent="getData"
                  >
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon">
                          <i class="glyphicon glyphicon-envelope color-blue"></i>
                        </span>
                        <input
                          id="email"
                          name="email"
                          placeholder="email address"
                          class="form-control"
                          type="email"
                        >
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        name="recover-submit"
                        class="btn btn-lg btn-primary btn-block"
                        value="Reset Password"
                        type="submit"
                        v-if="found"
                      >
                    </div>
                    <input type="hidden" class="hide" name="token" id="token" value>
                  <md-button class="md-raised md-cornered">Submit</md-button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
.form-gap {
    padding-top: 70px;
}
</style>
