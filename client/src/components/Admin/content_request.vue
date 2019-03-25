<template>
  <div>
    <div class="col-lg-6" style="width:100%;">
      <div class="panel panel-default">
        <div class="panel-heading" style="background-color:#b6d6d4" id="headBack">
          <md-button style="background-color:#78A5A3">
            <h6 style="color:white">Doctor</h6>
          </md-button>
        </div>

        <!--data-->
          <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="margin:0">
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
                <md-button class="md-icon-button" style="background-color:#5cb85c" @click="acceptUser(item)">
                  <md-icon style="color:white">done</md-icon>
                  <md-tooltip md-direction="left">Accept</md-tooltip>
                </md-button> 
                <md-button class="md-icon-button" style="background-color:#f44742" @click="rejectUser(item)">
                  <md-icon style="color:white">clear</md-icon>
                  <md-tooltip md-direction="right">Reject</md-tooltip>
                </md-button>                 
              </md-table-cell>
            </md-table-row>
          </md-table>
          <md-dialog-confirm :md-active.sync="confirmDelete"
                  :md-content="'Do you want to Delete '+deleteUser.name+ ' '+deleteUser.email+' ?'" md-confirm-text="Confirm"
                  md-cancel-text="Cancel" @md-cancel="confirmDelete = false" @md-confirm="onConfirmDelete()" />
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
        confirmDelete: false,
        deleteUser: {},
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
          }
        ]
      }
    },
    methods: {
      searchOnTable() {
        this.searched = searchByID(this.users, this.search)
      },
      acceptUser(item) {
        this.deleteUser = item
        this.confirmDelete = true
      },
      rejectUser(item) {
        this.deleteUser = item
        this.confirmDelete = true
      },
      onConfirmDelete() {
        console.log(this.deleteUser)
        for (var i in this.users) {
          if (this.deleteUser.id == this.users[i].id) {
            this.confirmDelete = false
            this.deleteUser = {}
            this.users.splice(i, 1)
          }
        }
      }
    },
    mounted() {
      this.searched = searchByID(this.users, this.search)
      console.log(this.searched)
    }
  }

</script>
