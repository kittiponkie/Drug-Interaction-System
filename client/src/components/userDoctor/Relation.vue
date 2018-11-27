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
          <md-list-item to="/doctor_information" class="unselected">
            <md-icon style="margin-right:10px">account_circle</md-icon>
            <span class="md-list-item-text unselected_text">Doctor Information</span>
          </md-list-item>

          <md-list-item to="/doctor_relation" class="selected">
            <md-icon style="margin-right:10px">person_add</md-icon>
            <span class="md-list-item-text selected_text">Friend</span>
          </md-list-item>      

          <md-list-item to="/doctor_drug_information" class="unselected">
            <md-icon style="margin-right:10px">description</md-icon>
            <span class="md-list-item-text unselected_text">Drug Information</span>
          </md-list-item>

          <md-list-item to="/doctor_drug_interaction" class="unselected">
            <md-icon style="margin-right:10px">bubble_chart</md-icon>
            <span class="md-list-item-text unselected_text">Drug Interaction</span>
          </md-list-item>

          <md-list-item @click="logout" class="unselected">
            <md-icon style="margin-right:10px">power_settings_new</md-icon>
            <span class="md-list-item-text unselected_text">Logout</span>
          </md-list-item>

        </md-list>

      </md-app-drawer>
      <md-app-content>
        <contentA />
      </md-app-content>
    </md-app>


  </div>
</template>

<script>
  import axios from 'axios'
  import contentA from './Content_relation.vue'
  export default {
    name: 'Drug_Interaction',
    components: {
      contentA
    },
    data: () => ({
      menuVisible: false, //toggle visible menu when responsive
      Window_Width: 0, //width of window
    }),
    methods: {
      //toggle visible menu
      toggleMenu() {
        this.menuVisible = !this.menuVisible
      },
      logout(){
        this.$router.push('/login')
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

</style>
