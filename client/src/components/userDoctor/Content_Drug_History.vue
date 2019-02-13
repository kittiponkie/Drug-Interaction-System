<template>
  <div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Users Name</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by drug name..." v-model="search" @input="searchOnTable"/>
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No users found"
        :md-description="`No drug name found for this '${search}' query. Try a different search term.`"
      ></md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Drug Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Doctor's Name" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="gender">{{ item.gender }}</md-table-cell>
        <md-table-cell md-label="Receive Medicine">
          <b-progress :value="item.progress" striped :animated="animate" show-value class="mb-3"></b-progress>
        </md-table-cell>
        <md-table-cell
          md-label="Detail"
          
          md-sort-by="title"
        >
          <md-button  data-toggle="modal"
          data-target="#modalforshowdata" class="md-icon-button md-dense">
            <md-icon>assignment</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase();
};
const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)));
  }
  return items;
};
import axios from "axios";
export default {
  name: "Drug_Interaction",
  data: () => ({
    return: {
      animate: true,
      max: 100
    },
    search: null,
    searched: [],
    users: [
      {
        id: 1,
        name: "Acetaminophen",
        email: "Shawna Dubbins",
        gender: "Using",
        progress: 20,
        title: "-"
      },
      {
        id: 2,
        name: "Omeprazole",
        email: "Odette Demageard",
        gender: "Using",
        progress: 100,
        title: "-"
      },
      {
        id: 3,
        name: "Tramadol",
        email: "Vera Taleworth",
        gender: "Waiting Dispend",
        progress: 40,
        title: "Community Outreach Specialist"
      },
      {
        id: 4,
        name: "Tramadol",
        email: "Lonnie Izkovitz",
        gender: "Stopped using",
        progress: 50,
        title: "Operator"
      },
      {
        id: 5,
        name: "Acetaminophen",
        email: "Thatcher Stave",
        gender: "Stopped using",
        progress: 60,
        title: "-"
      }
    ]
  }),
  methods: {
    searchOnTable() {
      this.searched = searchByName(this.users, this.search);
    }
  },
  created() {
    this.searched = this.users;
  }
};
</script>

<style lang="scss" scoped>
.md-app {
  height: calc(100vh);
  border: 1px solid rgba(#000, 0.12);
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
  background-color: #5dbfa8;
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

.md-drawer
  md-app-drawer
  menu_color
  md-theme-default
  md-left
  md-permanent
  md-permanent-card {
  padding-top: 20px;
}
#tallModal .modal-body p { margin-bottom: 900px }
</style>
