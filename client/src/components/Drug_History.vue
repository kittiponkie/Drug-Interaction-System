<template>
  <div id="app">
    <!-- <h1> SMART DRUG USE </h1> -->
     <div id="header">
    <h1><img style="display: inline;" src="src/assets/pills.png" alt="logo" />Smart Drug Use</h1>
    </div>
    <div class="page-container">
    <md-app>
      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          Menu
        </md-toolbar>
          <md-list>
          <md-list-item>
            <md-icon style="margin-right:10px">person</md-icon>
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
        <div>
   <div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search By Drug Name..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No data found"
        :md-description="`No data found for this '${search}' query. Try a different search term`">
      </md-table-empty-state>

       <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Drug Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Doctor's Name" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="gender">{{ item.gender }}</md-table-cell>
        <md-table-cell md-label="Remark" md-sort-by="title">{{ item.title }}</md-table-cell>
        </md-table-row>
      <!--<md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Drug Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Doctor's Name" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="gender">{{ item.gender }}</md-table-cell>
        <md-table-cell md-label="Remark" md-sort-by="title">{{ item.title }}</md-table-cell>
        <md-table-cell md-label>
        <md-menu md-size="auto">
      <md-button md-menu-trigger>Details</md-button>
        <md-menu-content>
        <md-menu-item>My Item 1</md-menu-item>
        <md-menu-item>This content is long enough</md-menu-item>
        <md-menu-item>My Item 3</md-menu-item>
        </md-menu-content>
        </md-menu>
        </md-table-cell>
      </md-table-row>-->
    </md-table>
  </div>
        </div>
      </md-app-content>
    </md-app>
  </div>
  </div>
</template>

<script>
const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.name).includes(toLower(term)))
    }

    return items
  }


export default {
  name: 'normal',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
    name: 'TableSearch',
    data: () => ({
      search: null,
      searched: [],
      users: [
        {
          id: 1,
          name: "Acetaminophen",
          email: "Shawna Dubbins",
          gender: "Using",
          title: "-"
        },
        {
          id: 2,
          name: "Omeprazole",
          email: "Odette Demageard",
          gender: "Using",
          title: "-"
        },
        {
          id: 3,
          name: "Tramadol",
          email: "Vera Taleworth",
          gender: "Using",
          title: "Community Outreach Specialist"
        },
        {
          id: 4,
          name: "Tramadol",
          email: "Lonnie Izkovitz",
          gender: "Stopped using",
          title: "Operator"
        },
        {
          id: 5,
          name: "Acetaminophen",
          email: "Thatcher Stave",
          gender: "Stopped using",
          title: "-"
        }
      ]
    }),
    methods: {
      newUser () {
        window.alert('Noop')
      },
      searchOnTable () {
        this.searched = searchByName(this.users, this.search)
      }
    },
    created () {
      this.searched = this.users
    }
}
</script>
<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: white;  
}
h1 {
    font-weight: bold;
    background-color: #5DBFA8;
    color: #ffffff;
    padding: 50px;
    margin-top: 0px;
    width: 100%;
    height: 200px;  
    font-size:2.5vw;
}
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
    width: 75%;
  }
  .md-content{
    padding: 0%;
    margin: 0%;
    margin-left: 0%;
    margin-right: 0%;
    margin-top: 0%;
    padding-left: 0%;
  }
  .md-table-row{
    padding: 0%;
    margin: 0%;
    margin-left: 0%;
    margin-right: 0%;
    margin-top: 0%;
    padding-left: 0%;
  }
</style>
