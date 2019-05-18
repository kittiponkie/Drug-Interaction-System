<template>
  <div>
    <div class="col-lg-6" style="width:100%;">
      <div class="panel panel-default">

        <!--data-->
        <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header style="margin:0">
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <h1 class="md-title">คำร้องขอ</h1>
            </div>

            <md-field md-clearable class="md-toolbar-section-end">
              <md-input placeholder="ค้นหา..." v-model="search" @input="searchOnTable" />
            </md-field>
          </md-table-toolbar>

          <md-table-empty-state md-label="No users found"
            :md-description="`ไม่พบรายการที่ค้นหา '${search}' กรุณาลองใหม่อีกครั้ง`">
          </md-table-empty-state>

          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="ลำดับ" md-sort-by="ID" md-numeric>{{ item.ID }}</md-table-cell>
            <md-table-cell md-label="ประเภทผู้ใช้" md-sort-by="Type" md-numeric>{{ item.Type }}</md-table-cell>
            <md-table-cell md-label="ชื่อ" md-sort-by="Firstname">{{ item.Firstname }}</md-table-cell>
            <md-table-cell md-label="นามสกุล" md-sort-by="Lastname">{{ item.Lastname }}</md-table-cell>
            <md-table-cell md-label=" ">
              <md-button class="md-icon-button" style="background-color:#5cb85c" @click="acceptUser(item)">
                <md-icon style="color:white">done</md-icon>
                <md-tooltip md-direction="left">ยอมรับ</md-tooltip>
              </md-button>
              <md-button class="md-icon-button" style="background-color:#f44742" @click="rejectUser(item)">
                <md-icon style="color:white">clear</md-icon>
                <md-tooltip md-direction="right">ปฏิเสธ</md-tooltip>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <md-dialog-confirm :md-active.sync="confirmAccept"
          :md-content="'ต้องการยอมรับการสมัครเข้าใช้ระบบของ '+targetUser.Firstname+ ' '+targetUser.Lastname+' ใช่ไหม ?'"
          md-confirm-text="Confirm" md-cancel-text="Cancel" @md-cancel="confirmAccept = false"
          @md-confirm="onConfirmAccept()" />
        <md-dialog-confirm :md-active.sync="confirmReject"
          :md-content="'ต้องการปฏิเสธการสมัครเข้าใช้ระบบของ '+targetUser.Firstname+ ' '+targetUser.Lastname+' ใช่ไหม ?'"
          md-confirm-text="Confirm" md-cancel-text="Cancel" @md-cancel="confirmReject = false"
          @md-confirm="onConfirmReject()" />
        <md-dialog-alert :md-active.sync="success" md-content="Success" md-confirm-text="Close" />
        <md-dialog-alert :md-active.sync="fail" md-content="Fail" md-confirm-text="Close" />
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
      return items.filter(item => {
        if(toLower(item.ID).includes(toLower(term))) return item
        else if(toLower(item.Firstname).includes(toLower(term))) return item
        else if(toLower(item.Lastname).includes(toLower(term))) return item
        else if(toLower(item.Type).includes(toLower(term))) return item        
      })
    }
    return items
  }
  import axios from 'axios'
  import adminServices from '@/services/admin'
  export default {
    name: 'TabContent',
    data() {
      return {
        search: null,
        searched: [],
        confirmAccept: false,
        confirmReject: false,
        success: false,
        fail: false,
        targetUser: {},
        users: []
      }
    },
    methods: {
      searchOnTable() {
        this.searched = searchByID(this.users, this.search)
      },
      acceptUser(item) {
        this.targetUser = item
        this.confirmAccept = true
      },
      async onConfirmAccept() {
        for (var i in this.users) {
          if (this.targetUser.DoctorID == this.users[i].DoctorID && this.targetUser.DoctorID) {
            this.confirmAccept = false
            await adminServices.changeRegisterStatusForDoctor(this.targetUser.DoctorID, '1').then(Response => {
              if (Response.data) {
                this.targetUser = {}
                this.success = true
                this.users.splice(i, 1)
              } else {
                this.targetUser = {}
                this.fail = true
              }
            })
          } else if(this.targetUser.PharmacistID == this.users[i].PharmacistID) {
            console.log(this.targetUser)
            this.confirmAccept = false
            await adminServices.changeRegisterStatusForDoctor(this.targetUser.PharmacistID, '1').then(Response => {
              if (Response.data) {
                this.targetUser = {}
                this.success = true
                this.users.splice(i, 1)
              } else {
                this.targetUser = {}
                this.fail = true
              }
            })
          }
        }
      },
      rejectUser(item) {
        this.targetUser = item
        this.confirmReject = true
      },
      async onConfirmReject() {
        for (var i in this.users) {
          if (this.targetUser.DoctorID == this.users[i].DoctorID) {
            this.confirmReject = false
            await adminServices.changeRegisterStatusForDoctor(this.targetUser.DoctorID, '2').then(Response => {
              if (Response.data) {
                this.targetUser = {}
                this.success = true
                this.users.splice(i, 1)
              } else {
                this.targetUser = {}
                this.fail = true
              }
            })
          }
        }
      },
      async setData(allAccount) {
        for (var i in allAccount) {
          //doctor
          if (allAccount[i].ID[0] == 'D' && allAccount[i].RegisterStatus == '0') {
            await adminServices.getDoctor(allAccount[i].ID).then(Response => {
              console.log(Response.data)
              if (Response.data.length != 0) {
                Response.data[0].ID = Response.data[0].DoctorID
                Response.data[0].Type = "แพทย์"
                this.users.push(Response.data[0])
                this.searchOnTable()
              }
              this.searchOnTable()
            })
          }

          //phar
          else if (allAccount[i].ID[0] == 'P' && allAccount[i].ID[1] == 'H' && allAccount[i].RegisterStatus == '0') {
            await adminServices.getPharmacist(allAccount[i].ID).then(Response => {
              console.log(Response.data)
              if (Response.data.length != 0) {
                Response.data[0].ID = Response.data[0].PharmacistID                
                Response.data[0].Type = "เภสัชกร"
                this.users.push(Response.data[0])
                this.searchOnTable()
              }
              this.searchOnTable()
            })
          }

        }
      }
    },
    async mounted() {
      //set data on table
      await adminServices.getAccount().then(Response => {
        this.setData(Response.data)
      })
    }
  }

</script>
