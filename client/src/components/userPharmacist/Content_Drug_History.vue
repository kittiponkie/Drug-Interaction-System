<template>
  <div>
     <!--header-->
        <md-card  style="padding-left: 0px;" >
              <md-card-header>
                <md-card-header-text>
                  <h4 style="text-align:left;">ชื่อคนไข้ : 
                <span style="float:right;margin-right: 150px;">แพทย์ :</span>
                </h4>
                </md-card-header-text>
              </md-card-header>
        </md-card>
        <!--end header-->
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">ชื่อผู้ใช้</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="ค้นหา..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state md-label="No users found" :md-description="`ไม่พบรายการที่ค้นหา '${search}' กรุณาลองใหม่อีกครั้ง`">
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ลำดับ" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="ชื่อยา" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="แพทย์" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="สถานะ" md-sort-by="gender">{{ item.gender }}</md-table-cell>
        <md-table-cell md-label="หมายเหตุ" md-sort-by="title">{{ item.title }}</md-table-cell>
      </md-table-row>
    </md-table>
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
  import axios from 'axios'
  export default {
    name: 'Drug_Interaction',
    data: () => ({
      search: null,
      searched: [],
      users: [{
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
      searchOnTable() {
        this.searched = searchByName(this.users, this.search)
      }
    },
    created() {
      this.searched = this.users
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
