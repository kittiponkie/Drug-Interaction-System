<template>
  <div>
    <!--Card-->
    <div class="panel panel-default" style="margin-right:20px;">
      <div class="panel-heading">
        <h3 v-if="type=='Doctor'">แพทย์</h3>    
        <h3 v-else>เภสัชกร</h3> 
        <div class="md-layout">
          <div class="md-layout-item">
            <md-field>
              <md-select v-model="type" placeholder="เลือกประเภทผู้ใช้" @input="doChangeType()">
                <md-option value="Doctor">แพทย์</md-option>
                <md-option value="Pharmacist">เภสัชกร</md-option>
              </md-select>        
            </md-field>
          </div>
          <div class="md-layout-item">
            <md-field md-clearable >
              <md-input placeholder="ค้นหา..." v-model="search" @input="searchOnTable" />          
            </md-field>
          </div>
        </div>
      </div>
      <!--doctor-->
      <div v-if="type=='Doctor' && users[0]" class="paddingCard">
        <md-empty-state v-if="users[0].length==0" md-label="No users found"
          :md-description="`ไม่พบรายการที่ค้นหา '${search}'กรุณาลองใหม่อีกครั้ง`">
        </md-empty-state>
        <div class="inline" v-for="(i,index) in users[0]" :key="index">
          <md-card v-if="pagination == parseInt(index/maxItemPerPage) && i.Fullname" class="cardColor" md-with-hover>
            <md-card-header>
              <div class="md-title">{{i.Fullname}}</div>
              <div class="md-subhead">ID : {{i.DoctorID}} </div>
            </md-card-header>
          </md-card>
        </div> 
        <!--/router-link-->
        <div class="md-layout">
          <div class="md-layout-item" style="text-align:left;margin-top:25px;margin-left:10px">
            <select v-model="maxItemPerPage" @change="pagination=0">
              <option value="5">5 items/page</option>
              <option value="10">10 items/page</option>
              <option value="25">25 items/page</option>
            </select>
          </div>
          <div class="md-layout-item md-size-50 " style="text-align:center">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" @click="pagination=0" href="#pagination">First</a>
              </li>
              <li class="page-item">
                <a class="page-link" @click="pagination!=0? pagination-=1:pagination" href="#pagination">Previous</a>
              </li>
              <li
                v-if="((pagination+3 > index) && (pagination-3 < index)) || (pagination<5 && (index==3 || index==4)) || (pagination<5 && (index==3 || index==4)) || ((users[0].length%maxItemPerPage==0? parseInt((users[0].length)/maxItemPerPage)-pagination+1 <5 && (index==parseInt((users[0].length)/maxItemPerPage)-4 || index==parseInt((users[0].length)/maxItemPerPage)-5):parseInt((users[0].length)/maxItemPerPage)+1-pagination+1 <5 && (index==parseInt((users[0].length)/maxItemPerPage)-4+1 || index==parseInt((users[0].length)/maxItemPerPage)-5+1) ))"
                class="page-item"
                v-for="(item,index) in (users[0].length%maxItemPerPage==0? parseInt((users[0].length)/maxItemPerPage):parseInt((users[0].length)/maxItemPerPage)+1)"
                :key="index"><a class="page-link" @click="pagination = index" href="#pagination">{{index+1}}</a></li>

              <li class="page-item">
                <a class="page-link"
                  @click="users[0].length%maxItemPerPage==0? (pagination+1<parseInt((users[0].length)/maxItemPerPage)? pagination +=1:pagination) : (pagination+1<parseInt((users[0].length)/maxItemPerPage)+1?pagination +=1:pagination)"
                  href="#pagination">Next</a>
              </li>
              <li class="page-item">
                <a class="page-link"
                  @click="users[0].length%maxItemPerPage==0? pagination=parseInt(users[0].length/maxItemPerPage)-1:pagination=parseInt(users[0].length/maxItemPerPage)+1-1"
                  href="#pagination">Last</a>
              </li>
            </ul>
          </div>
          <div class="md-layout-item" style="text-align:right;padding-top:25px;padding-right:10px;">
            Page {{pagination+1}}
          </div>
        </div>        
              
      </div>
      <!--pharmacist-->
      <div v-else-if="type=='Pharmacist' && users[1]" class="paddingCard">        
        <md-empty-state v-if="users[1].length==0" md-label="No users found"
          :md-description="`ไม่พบรายการที่ค้นหา '${search}'กรุณาลองใหม่อีกครั้ง`">
        </md-empty-state>
        <div class="inline" v-for="(i,index) in users[1]" :key="index">
          <md-card v-if="pagination == parseInt(index/maxItemPerPage) && i.Fullname" class="cardColor" md-with-hover>
            <md-card-header>
              <div class="md-title">{{i.Fullname}}</div>
              <div class="md-subhead">ID : {{i.PharmacistID}} </div>
            </md-card-header>
          </md-card>
        </div>
        <!--/router-link-->
        <div class="md-layout">
          <div class="md-layout-item" style="text-align:left;margin-top:25px;margin-left:10px">
            <select v-model="maxItemPerPage" @change="pagination=0">
              <option value="5">5 items/page</option>
              <option value="10">10 items/page</option>
              <option value="25">25 items/page</option>
            </select>
          </div>
          <div class="md-layout-item md-size-50 " style="text-align:center">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" @click="pagination=0" href="#pagination">First</a>
              </li>
              <li class="page-item">
                <a class="page-link" @click="pagination!=0? pagination-=1:pagination" href="#pagination">Previous</a>
              </li>
              <li
                v-if="((pagination+3 > index) && (pagination-3 < index)) || (pagination<5 && (index==3 || index==4)) || (pagination<5 && (index==3 || index==4)) || ((users[1].length%maxItemPerPage==0? parseInt((users[1].length)/maxItemPerPage)-pagination+1 <5 && (index==parseInt((users[1].length)/maxItemPerPage)-4 || index==parseInt((users[1].length)/maxItemPerPage)-5):parseInt((users[1].length)/maxItemPerPage)+1-pagination+1 <5 && (index==parseInt((users[1].length)/maxItemPerPage)-4+1 || index==parseInt((users[1].length)/maxItemPerPage)-5+1) ))"
                class="page-item"
                v-for="(item,index) in (users[1].length%maxItemPerPage==0? parseInt((users[1].length)/maxItemPerPage):parseInt((users[1].length)/maxItemPerPage)+1)"
                :key="index"><a class="page-link" @click="pagination = index" href="#pagination">{{index+1}}</a></li>

              <li class="page-item">
                <a class="page-link"
                  @click="users[1].length%maxItemPerPage==0? (pagination+1<parseInt((users[1].length)/maxItemPerPage)? pagination +=1:pagination) : (pagination+1<parseInt((users[1].length)/maxItemPerPage)+1?pagination +=1:pagination)"
                  href="#pagination">Next</a>
              </li>
              <li class="page-item">
                <a class="page-link"
                  @click="users[1].length%maxItemPerPage==0? pagination=parseInt(users[1].length/maxItemPerPage)-1:pagination=parseInt(users[1].length/maxItemPerPage)+1-1"
                  href="#pagination">Last</a>
              </li>
            </ul>
          </div>
          <div class="md-layout-item" style="text-align:right;padding-top:25px;padding-right:10px;">
            Page {{pagination+1}}
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
  const searchByID = (items, term ,type) => {
    if (term) {       
      return items.filter(item => {      
        if (item.DoctorID && toLower(item.DoctorID).includes(toLower(term))) return item
        else if (item.PharmacistID && toLower(item.PharmacistID).includes(toLower(term))) return item  
        else if (item.Fullname && toLower(item.Fullname).includes(toLower(term))) return item   
      })          
    }
    return items
  }
  import axios from 'axios'
  import doctorServices from '@/services/doctor'
  export default {
    name: 'Drug_Interaction',
    data: () => ({
      Window_Width: 0, //width of window
      type: 'Doctor',
      allusers:[],
      users: [],
      select: '',
      pagination: 0,
      maxItemPerPage:5,
      search:'',
    }),
    methods: {
      doChangeType(){
        this.pagination= 0
        this.search=''
        this.searchOnTable()
      },
      searchOnTable() {
        this.users[0] = searchByID(this.allusers[0], this.search)
        this.users[1] = searchByID(this.allusers[1], this.search)
      },
      async getDoctorInfo() {
        for (var i in this.users[0]) {
          await doctorServices.doctorInfo(this.users[0][i].DoctorID).then(Response => {
            this.users[0][i].Fullname = Response.data[0].Firstname + " " + Response.data[0].Lastname
            this.allusers[0][i].Fullname = Response.data[0].Firstname + " " + Response.data[0].Lastname
            this.pagination = 1
            this.pagination = 0
          })
        }
      },
      async getPharmacistInfo() {
        for (var i in this.users[1]) {
          await doctorServices.pharmacistInfo(this.users[1][i].PharmacistID).then(Response => {
            this.users[1][i].Fullname = Response.data[0].Firstname + " " + Response.data[0].Lastname
            this.allusers[1][i].Fullname = Response.data[0].Firstname + " " + Response.data[0].Lastname
            this.pagination = 1
            this.pagination = 0
          })
        }
      }
    },
    async mounted() {
      this.Window_Width = window.innerWidth
      await doctorServices.patientRelation(this.$localStorage.get('userID')).then(Response => {
        this.users = Response.data
        this.allusers = this.users.slice()
      })
      await this.getDoctorInfo()
      await this.getPharmacistInfo()
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
    max-width: calc(100% - 110px);
    overflow: auto;
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

  .md-card {
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

  .md.table {
    width: 750px;
  }

  .dialogdemoThemeInheritance .container {
    text-align: center;
  }

  .inline {
    display: inline-block;
    padding: 5px;
  }

  .paddingCard {
    padding: 10px;
  }

  .cardColor {
    background-color: #f5f5f5;
  }

</style>
