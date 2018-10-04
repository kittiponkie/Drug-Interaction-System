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
        <md-table v-model="users" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <h1 class="md-title">Users</h1>
            </div>

            <md-field md-clearable class="md-toolbar-section-end">
              <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
            </md-field>
          </md-table-toolbar>

          <md-table-empty-state md-label="No users found" :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">

          </md-table-empty-state>

          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
            <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>
            <md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell>
          </md-table-row>
        </md-table>

        <ul class="accordion" data-responsive-accordion-tabs="accordion medium-tabs large-accordion">
          <li class="accordion-item is-active" data-accordion-item>
            <a href="#" class="accordion-title">Accordion 1</a>
            <div class="accordion-content" data-tab-content>
              I would start in the open state, due to using the `is-active` state class.
            </div>
          </li>
          <!-- ... -->
        </ul>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  export default {
    name: 'Drug_Interaction',
    data: () => ({
      menuVisible: false,
      Window_Width: 0,
      search: null,
      searched: [],
      users: [{
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
        },
        {
          id: 6,
          name: "Karim Chipping",
          email: "kchipping5@scribd.com",
          gender: "Female",
          title: "Safety Technician II"
        },
        {
          id: 7,
          name: "Helge Holyard",
          email: "hholyard6@howstuffworks.com",
          gender: "Female",
          title: "Internal Auditor"
        },
        {
          id: 8,
          name: "Rod Titterton",
          email: "rtitterton7@nydailynews.com",
          gender: "Male",
          title: "Technical Writer"
        },
        {
          id: 9,
          name: "Gawen Applewhite",
          email: "gapplewhite8@reverbnation.com",
          gender: "Female",
          title: "GIS Technical Architect"
        },
        {
          id: 10,
          name: "Nero Mulgrew",
          email: "nmulgrew9@plala.or.jp",
          gender: "Female",
          title: "Staff Scientist"
        }
      ]
    }),
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible
      }
    },
    mounted() {
      this.Window_Width = window.innerWidth
    }
  }

</script>

<style lang="scss" scoped>
  .md-app {
    max-height: calc(100vh);
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

</style>
