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
        <!--md-table v-model="users" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <h1 class="md-title">Users</h1>
            </div>

            <md-field md-clearable class="md-toolbar-section-end">
              <md-input placeholder="Search by name..." v-model="search" />
            </md-field>
          </md-table-toolbar>

          <md-table-row slot="md-table-row" slot-scope="{ item }">

            <md-list :md-expand-single="expandSingle" style="width: 100%; margin:0 0 0 0;">
              <md-list-item md-expand>
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>
                <md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell>
                <md-list slot="md-expand">
                  <md-list-item class="md-inset">World</md-list-item>
                  <md-list-item class="md-inset">Europe</md-list-item>
                  <md-list-item class="md-inset">South Americaaaaaaaaaaaaaa</md-list-item>
                </md-list>
              </md-list-item>
            </md-list>
          </md-table-row>
        </md-table-->



        <div class="col-lg-6">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3>Object Store</h3>
            </div>
            <div class="panel-body">
              <table class="table table-condensed" style="border-collapse:collapse;">

                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Job Name</th>
                    <th>Description</th>
                    <th>Provider Name</th>
                    <th>Region</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr data-toggle="collapse" data-target="#demo1" class="accordion-toggle">
                    <td><button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-eye-open"></span></button></td>
                    <td>OBS Name</td>
                    <td>OBS Description</td>
                    <td>hpcloud</td>
                    <td>nova</td>
                    <td> created</td>

                  </tr>
                  <tr>
                    <td colspan="12" class="hiddenRow">
                      <div class="accordian-body collapse" id="demo1">
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <td><a href="WorkloadURL">Workload link</a></td>
                              <td>Bandwidth: Dandwidth Details</td>
                              <td>OBS Endpoint: end point</td>
                            </tr>
                            <tr>
                              <th>Access Key</th>
                              <th>Secret Key</th>
                              <th>Status </th>
                              <th> Created</th>
                              <th> Expires</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>access-key-1</td>
                              <td>secretKey-1</td>
                              <td>Status</td>
                              <td>some date</td>
                              <td>some date</td>
                              <td><a href="#" class="btn btn-default btn-sm">
                                  <i class="glyphicon glyphicon-cog"></i></a></td>
                            </tr>

                          </tbody>
                        </table>

                      </div>
                    </td>
                  </tr>
                  <tr data-toggle="collapse" data-target="#demo2" class="accordion-toggle">
                    <td><button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-eye-open"></span></button></td>
                    <td>OBS Name</td>
                    <td>OBS Description</td>
                    <td>hpcloud</td>
                    <td>nova</td>
                    <td> created</td>
                  </tr>
                  <tr>
                    <td colspan="6" class="hiddenRow">
                      <div id="demo2" class="accordian-body collapse">Demo2</div>
                    </td>
                  </tr>
                  <tr data-toggle="collapse" data-target="#demo3" class="accordion-toggle">
                    <td><button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-eye-open"></span></button></td>
                    <td>OBS Name</td>
                    <td>OBS Description</td>
                    <td>hpcloud</td>
                    <td>nova</td>
                    <td> created</td>
                  </tr>
                  <tr>
                    <td colspan="6" class="hiddenRow">
                      <div id="demo3" class="accordian-body collapse">Demo3</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  export default {
    name: 'Drug_Interaction',
    data: () => ({
      menuVisible: false,
      expandSingle: false,
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
