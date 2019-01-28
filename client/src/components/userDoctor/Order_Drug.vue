<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary" md-elevation="0" style="background-color:#5DBFA8;">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!(Window_Width>600)">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Smart Drug Use</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="card" :md-active.sync="menuVisible" class="menu_color">
        <md-toolbar class="md-transparent" md-elevation="0">
          <div class="md-toolbar-section-end">
            <span class="span_center">Menu</span>
            <md-button
              class="md-icon-button md-dense"
              @click="toggleMenu"
              v-if="!(Window_Width>600)"
            >
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list class="delete_margin">
          <md-list-item to="/doctor_relation" class="unselected">
            <md-icon style="margin-right:10px">arrow_back_ios</md-icon>
            <span class="md-list-item-text selected_text">Back</span>
          </md-list-item>
          <md-list-item to="/doctor/patient_information" class="unselected">
            <md-icon style="margin-right:10px">account_circle</md-icon>
            <span class="md-list-item-text unselected_text">Patient Information</span>
          </md-list-item>

          <md-list-item to="/doctor/doctor_order_drug" class="selected">
            <md-icon style="margin-right:10px">dns</md-icon>
            <span class="md-list-item-text selected_text">Drug Order</span>
          </md-list-item>

          <md-list-item to="/doctor/doctor_drug_history" class="unselected">
            <md-icon style="margin-right:10px">folder_shared</md-icon>
            <span class="md-list-item-text selected_text">Drug History</span>
          </md-list-item>

          <md-list-item to="/doctor/doctor_drug_information" class="unselected">
            <md-icon style="margin-right:10px">description</md-icon>
            <span class="md-list-item-text unselected_text">Drug Information</span>
          </md-list-item>

          <md-list-item to="/doctor/doctor_drug_interaction" class="unselected">
            <md-icon style="margin-right:10px">bubble_chart</md-icon>
            <span class="md-list-item-text unselected_text">Drug Interaction</span>
          </md-list-item>

          <md-list-item @click="logout" class="unselected">
            <md-icon style="margin-right:10px">power_settings_new</md-icon>
            <span class="md-list-item-text unselected_text">Logout</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <contentA/>
      </md-app-content>
    </md-app>
    <!-- order modal -->
    <div class="modal fade" id="ordermodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="col-lg-12" style="width: 100%;padding-left: 0px;padding-right: 0px;padding-bottom: 0px;">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3>Ordering Drug</h3>
              <br>
              <!-- Ordering Drug data -->
              <form>
                <!--Drug Name-->

                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>Drug Name</label>
                    <input type="text" placeholder="Enter Drug Name Here.." class="form-control">
                  </div>
                </div>
                <!--Drug ID  คอมเม้นท์ไว้ก่อน ไม่แน่ใจเรื่องนำมาโชว์
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>Drug ID</label>
                    <input type="text" placeholder="drug id show Here.." readonly class="form-control">
                  </div>
                </div>-->
                <!--dose/times-->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>Dose</label>
                    <input type="text" placeholder="Enter dose Here.." class="form-control">
                  </div>
                </div>
                <!-- Quantity -->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>Quantity</label>
                    <input type="text" placeholder="Quantity Here.." class="form-control">
                  </div>
                </div>
                <!-- Date duration -->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>duration</label>
                    <input type="text" placeholder="duration Here.." class="form-control">
                  </div>
                  <div class="row">
                    <div class="col-sm-12 form-group">
                      <label>Date</label>
                      <input type="text" placeholder="Date show Here.." readonly class="form-control">
                    </div>
                  </div>
                </div>
                <!-- Frequency 
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>Frequency</label>
                    <input type="text" placeholder="Frequency Here..(times/day)" class="form-control">
                  </div>
                  <div class="col-sm-6">
                    <label>Times</label>
                    <select id="inputState" class="form-control">
                      <option selected="">ก่อนอาหาร-ตอนเช้า</option>
                      <option>ก่อนอาหาร-ตอนกลางวัน</option>
                      <option>ก่อนอาหาร-ตอนเย็น</option>
                      <option>หลังอาหาร-ตอนเช้า</option>
                      <option>หลังอาหาร-ตอนกลางวัน</option>
                      <option>หลังอาหาร-ตอนเย็น</option>
                      <option>หลังอาหาร-ตอนเย็น</option>
                      <option>เมื่อมีอาการ</option>
                    </select>
                  </div>
                </div>-->
                    <div id='checkbox'>
                      <label>Frequency</label>
                      <input type="checkbox" id="bfeat" value="bfeat" v-model="checkedNames">
                      <label for="jack">ก่อนอาหาร</label>
                      <input type="checkbox" id="afeat" value="afeat" v-model="checkedNames">
                      <label for="john">หลังอาหาร</label>
                      <br>
                      <input type="checkbox" id="morning" value="morning" v-model="checkedNames">
                      <label for="mike">เช้า</label>
                      <input type="checkbox" id="morning" value="morning" v-model="checkedNames">
                      <label for="mike">กลางวัน</label>
                      <input type="checkbox" id="morning" value="morning" v-model="checkedNames">
                      <label for="mike">เย็น</label>
                      <input type="checkbox" id="morning" value="morning" v-model="checkedNames">
                      <label for="mike">ก่อนนอน</label>
                    </div>
                <!-- descroption. -->
                <div class="row">
                  <div class="col-sm-12 form-group">
                    <label>Description</label>
                    <input type="text" placeholder="Description Here.." class="form-control">
                  </div>
                </div>
                <!-- confirm button -->
                <br/>
                <div class="row">
                  <div class="col-sm-5">
                    <!-- click Add Drug -> show data in table -->
                    <button type="button" class="btn btn-success" data-dismiss="modal" style="border-top-width: 0px;">Add Drug</button> 
                    <button type="button" class="btn btn-danger" data-dismiss="modal" style="border-top-width: 0px;">Cancle</button>
                  </div>
                </div>
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- end order modal -->
  <!-- Modal -->
    <div
      class="modal fade"
      id="basicExampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Summary</h5>
            <br>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!--content summary -->
          <div class="modal-body">
            <p>list of drug</p>
          </div>
          <!-- confirm to dispend drug button -->
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Confirm</button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal -->
  </div>
</template>

<script>
import axios from "axios";
import contentA from "./Content_Order_Drug";
export default {
  name: "Drug_Interaction",
  components: {
    contentA
  },
  data: () => ({
    menuVisible: false, //toggle visible menu when responsive
    Window_Width: 0 //width of window
  }),
  methods: {
    //toggle visible menu
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    logout() {
      this.$router.push("/login");
    }
  },
  async mounted() {
    this.Window_Width = window.innerWidth;
    this.test = this.$route.params.id;
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
</style>
