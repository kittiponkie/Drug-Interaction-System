<template>
  <div>
    <div class="col-lg-6" style="width:100%;">
      <div class="panel panel-default">
        <div class="panel-heading" style="background-color:#99a5bf" id="headBack">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item">
              <md-button v-if="changeTab[0]"
                @click="changeTab=[true, false, false, false];changeBackgroundColorHeader('#99a5bf')"
                style="background-color:#444C5C" data-toggle="pill" href="#pills-patient" role="tab" id="home-tab"
                aria-selected="true">
                <h6 style="color:white">Patient</h6>
              </md-button>
              <md-button v-if="!changeTab[0]"
                @click="changeTab=[true, false, false, false];changeBackgroundColorHeader('#99a5bf')"
                style="background-color:#f1f1f1" data-toggle="pill" href="#pills-patient" role="tab">
                <h6 style="color:black">Patient</h6>
              </md-button>
            </li>
            <li class="nav-item">
              <md-button v-if="changeTab[1]"
                @click="changeTab=[false,true,false,false];changeBackgroundColorHeader('#b6d6d4')"
                style="background-color:#78A5A3" data-toggle="pill" href="#pills-doctor" role="tab">
                <h6 style="color:white">Doctor</h6>
              </md-button>
              <md-button v-if="!changeTab[1]"
                @click="changeTab=[ false,true,false,false];changeBackgroundColorHeader('#b6d6d4')"
                style="background-color:#f1f1f1" data-toggle="pill" href="#pills-doctor" role="tab">
                <h6 style="color:black">Doctor</h6>
              </md-button>
            </li>
            <li class="nav-item">
              <md-button v-if="changeTab[2]"
                @click="changeTab=[false,false,true,false];changeBackgroundColorHeader('#e8928f')"
                style="background-color:#CE5A57" data-toggle="pill" href="#pills-pharmacist" role="tab">
                <h6 style="color:white">Pharmacist</h6>
              </md-button>
              <md-button v-if="!changeTab[2]"
                @click="changeTab=[ false,false,true,false];changeBackgroundColorHeader('#e8928f')"
                style="background-color:#f1f1f1" data-toggle="pill" href="#pills-pharmacist" role="tab">
                <h6 style="color:black">Pharmacist</h6>
              </md-button>
            </li>
          </ul>
        </div>
        <!--data-->
        <div class="panel-body">
          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane active" id="pills-patient" role="tabpanel" aria-labelledby="home-tab">
              <div class="md-layout">
                <div class="md-layout-item">
                  <label>Select Patient</label>
                  <select id="selectedPatientID" class="form-control" @change="doSelectedPatient()">
                    <option v-for="i in patients" :value="i" :key="i">{{i}}</option>
                  </select>
                </div>
                <div class="md-layout-item md-toolbar-section-end">
                  <md-button class="md-icon-button" style="background-color:#5cb85c" @click="acceptUser(item)">
                    <md-icon style="color:white">add</md-icon>
                    <md-tooltip md-direction="left">Add Relation</md-tooltip>
                  </md-button>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="pills-doctor" role="tabpanel">
              <div class="md-layout">
                <div class="md-layout-item">
                  <label>Select Doctor</label>
                  <select id="selectedPatientID" class="form-control" @change="doSelectedPatient()">
                    <option v-for="i in patients" :value="i" :key="i">{{i}}</option>
                  </select>
                </div>
                <div class="md-layout-item md-toolbar-section-end">
                  <md-button class="md-icon-button" style="background-color:#5cb85c" @click="acceptUser(item)">
                    <md-icon style="color:white">add</md-icon>
                    <md-tooltip md-direction="left">Add Relation</md-tooltip>
                  </md-button>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="pills-pharmacist" role="tabpanel">
              <div class="md-layout">
                <div class="md-layout-item">
                  <label>Select Pharmacist</label>
                  <select id="selectedPatientID" class="form-control" @change="doSelectedPatient()">
                    <option v-for="i in patients" :value="i" :key="i">{{i}}</option>
                  </select>
                </div>
                <div class="md-layout-item md-toolbar-section-end">
                  <md-button class="md-icon-button" style="background-color:#5cb85c" @click="acceptUser(item)">
                    <md-icon style="color:white">add</md-icon>
                    <md-tooltip md-direction="left">Add Relation</md-tooltip>
                  </md-button>
                </div>
              </div>
            </div>
            <md-table class="md-elevation-7" v-if="selectedPatient != null" v-model="searched" md-sort="name" md-sort-order="asc" md-card
              md-fixed-header style="margin:20px 0 0 0">
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <h1 class="md-title">Doctor users request</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="Search by ID..." v-model="search" @input="searchOnTable" />
                </md-field>
              </md-table-toolbar>

              <md-table-empty-state md-label="No users found"
                :md-description="`No user found for this '${search}' query. Try a different search term.`">

              </md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Firstname" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Lastname" md-sort-by="email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Action">
                  <md-button class="md-icon-button" style="background-color:#f44742" @click="rejectUser(item)">
                    <md-icon style="color:white">delete</md-icon>
                    <md-tooltip md-direction="right">Delete Relation</md-tooltip>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByID = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.id).includes(toLower(term)))
    }
    return items
  }
  export default {
    name: 'TabContent',
    data() {
      return {
        search: null,
        searched: [],
        changeTab: [true, false, false, false],
        selectedPatient: null,
        patients: ["aaaaaaaaaaaaaaaaaa", "bnnnnnnnnnnnnnnnn"],
        users: [{
          id: 2,
          name: "Odette Demageard",
          email: "odemageard1@spotify.com",
          gender: "Female",
          title: "Account Coordinator"
        }]
      }
    },
    methods: {
      doSelectedPatient() {
        this.selectedPatient = document.getElementById("selectedPatientID").value
      },
      changeBackgroundColorHeader(color) {
        document.getElementById("headBack").style.backgroundColor = color
      },
      searchOnTable() {
        this.searched = searchByID(this.users, this.search)
      },

    },
    mounted() {
      this.searched = searchByID(this.users, this.search)
    }
  }

</script>
