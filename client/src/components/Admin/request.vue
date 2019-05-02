<template>
  <div class="page-container">
    <md-app md-mode="fixed">
      <md-app-toolbar class="md-primary" md-elevation="0" style="background-color:#E1B16A;">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!(Window_Width>600)">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Smart Drug Use</span>
        <div class="md-toolbar-section-end">          
          <md-button @click="logout()" style="background-color: #edcd9e; " v-if="(Window_Width>600)">
            <h6 style="color:black">ออกจากระบบ</h6>
          </md-button>
            <md-button @click="logout()" class="md-icon-button" style="background-color:#edcd9e" v-if="!(Window_Width>600)">
              <md-icon style="color:black;">power_settings_new</md-icon>
            </md-button>
        </div>
      </md-app-toolbar>

      <md-app-drawer md-permanent="card" :md-active.sync="menuVisible" class="menu_color">
        <md-toolbar class="md-transparent" md-elevation="0">
          <div class="md-toolbar-section-end">
            <span class="span_center">เมนู</span>
            <md-button class="md-icon-button md-dense" @click="toggleMenu" v-if="!(Window_Width>600)">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>
 
        <md-list class="delete_margin">
          <md-list-item to="/admin" class="unselected">
            <md-icon style="margin-right:10px;color:black;">account_circle</md-icon>
            <span class="md-list-item-text unselected_text" style="color:black;">การจัดการบัญชีผู้ใช้</span>
          </md-list-item>
          <md-list-item to="/admin_request" class="selected">
            <md-icon style="margin-right:10px;color:white;">account_circle</md-icon>
            <span class="md-list-item-text unselected_text" style="color:white;">คำร้องขอ</span>
          </md-list-item>
          <md-list-item to="/admin_relation" class="unselected">
            <md-icon style="margin-right:10px;color:black;">account_circle</md-icon>
            <span class="md-list-item-text unselected_text" style="color:black;">การจัดการความสัมพันธ์</span>
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
  import contentA from './content_request.vue'
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
    background-color: #E1B16A;
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
  :hover:focus {
    outline: none;
    text-decoration: none;
  }

  .a {
    outline: none;
    text-decoration: none;
    width: 25%;
  }

  .tab .nav-tabs {
    position: relative;
    border-bottom: none;
  }

  .tab .nav-tabs li {
    margin: 0;
    width: 100%;
  }

  .tab .nav-tabs li a {
    display: block;
    padding: 20px 15px;
    background: #fff;
    font-size: 17px;
    font-weight: 700;
    color: black;
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
    background: #f1f1f1;
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
    background: #f1f1f1;
    transform: perspective(900px) rotate3d(1, 0, 0, 0deg);
  }

  .tab .nav-tabs li.active a,
  .tab .nav-tabs li a:hover {
    color: #E1B16A;
    border: none;
  }

  .tab .tab-content {
    padding: 20px;
    background-color: #E1B16A;

    font-size: 15px;
    color: #fffefe;
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
