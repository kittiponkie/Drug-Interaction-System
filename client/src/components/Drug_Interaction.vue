<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary" md-elevation="0" style="background-color:#5DBFA8;">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!(Window_Width>600)">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">My Web Application</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="card" :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          <div class="md-toolbar-section-end">
            <span class="span_center">Menu</span>
            <md-button class="md-icon-button md-dense" @click="toggleMenu" v-if="!(Window_Width>600)">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon style="margin-right:10px">account_circle</md-icon>
            <span class="md-list-item-text">Patient Information</span>
          </md-list-item>

          <md-list-item>
            <md-icon style="margin-right:10px">folder_shared</md-icon>
            <span class="md-list-item-text">Drug History</span>
          </md-list-item>

          <md-list-item>
            <md-icon style="margin-right:10px">description</md-icon>
            <span class="md-list-item-text">Drug Information</span>
          </md-list-item>

          <md-list-item>
            <md-icon style="margin-right:10px">bubble_chart</md-icon>
            <span class="md-list-item-text">Drug Interaction</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>



      <md-app-content>
        <md-table md-card>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <h1 class="md-title">Drug Name : {{search}}</h1>
            </div>
            <md-field md-clearable class="md-toolbar-section-end">
              <md-input placeholder="Search by name..." v-model="search" @input="getData" />
            </md-field>
          </md-table-toolbar>

          <md-table-row>
            <md-table-head>Name</md-table-head>
          </md-table-row>
          <div class="full-control">
            <md-list class="list" v-for="drugs in drug">
              <md-list-item md-expand>
                <span class="md-list-item-text">{{ drugs.name }} </span>
                <md-list class="list" slot="md-expand">
                  <md-list-item>World</md-list-item>
                  <md-list-item>Europe</md-list-item>
                  <md-list-item>South America</md-list-item>
                </md-list>
              </md-list-item>
              
            </md-list>
          </div>

          <md-table-row v-if="!this.drug">
            <md-table-cell>Loading ... </md-table-cell>
          </md-table-row>


        </md-table>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  export default {
    name: 'Drug_Interaction',
    data: () => ({
      menuVisible: false, //visible three line
      Window_Width: 0,
      search: null, //word when search
      drugName: '',
      load: false, //load when search
      drug: [{
          id: 1,
          name: "Shawna Dubbin",
          email: "sdubbin0@geocities.com",
          gender: "Male",
          title: "Assistant Media Planner"
        },
        {
          id: 2,
          name: "Odette Demageard",
          email: "odemageard1@spotify.com",
          gender: "Female",
          title: "Account Coordinator"
        },
        {
          id: 3,
          name: "Vera Taleworth",
          email: "vtaleworth2@google.ca",
          gender: "Male",
          title: "Community Outreach Specialist"
        },
        {
          id: 4,
          name: "Lonnie Izkovitz",
          email: "lizkovitz3@youtu.be",
          gender: "Female",
          title: "Operator"
        },
        {
          id: 5,
          name: "Thatcher Stave",
          email: "tstave4@reference.com",
          gender: "Male",
          title: "Software Test Engineer III"
        }
      ]
    }),
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible
      },
      getData() {
        this.drugName = this.search
        this.drug = null
      }
    },
    mounted() {
      this.Window_Width = window.innerWidth
    }
  }

</script>

<style lang="scss" scoped>
  .md-app {
    height: calc(100vh);
    border: 1px solid rgba(#000, .12);
  }

  // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .span_center {
    text-align: center;
    width: 100%;
  }

  .md-app-content {
    margin: 0 2% 0 2%;
    max-width: calc(100vw);
  }

  .md-table {
    max-width: calc(100vw);
    margin: 0px;
    overflow: auto;
  }

  .md-input {
    overflow: auto;
  }

  .list {
    margin: auto;
    width: 100%;
  }

  .full-control {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
  }

  .full-control>.md-list {
    max-width: 100%;
    display: inline-block;
    overflow: auto;
    vertical-align: top;
    padding:0;
  }

</style>
