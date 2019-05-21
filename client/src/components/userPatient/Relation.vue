<template>
  <div class="page-container">
    <md-app md-mode="fixed">
      <md-app-toolbar class="md-primary" md-elevation="0" style="background-color:#444C5C;">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!(Window_Width>600)">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Smart Drug Use</span>
        <div class="md-toolbar-section-end">
          <md-button @click="logout()" style="background-color: #99a5bf; " v-if="(Window_Width>600)">
            <h6 style="color:black">ออกจากระบบ</h6>
          </md-button>
          <md-button @click="logout()" class="md-icon-button" style="background-color:#99a5bf" v-if="!(Window_Width>600)">
            <md-icon style="color:black;">power_settings_new</md-icon>
          </md-button>
        </div>
      </md-app-toolbar>

      <md-app-drawer md-permanent="card" :md-active.sync="menuVisible" class="menu_color">
        <md-toolbar class="md-transparent" md-elevation="0">
          <div class="md-toolbar-section-end">
            <span class="span_center">เมนู</span>
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
          <md-list-item to="/patient_information" class="unselected">
            <md-icon style="margin-right:10px">account_circle</md-icon>
            <span class="md-list-item-text unselected_text">ข้อมูลผู้ป่วย</span>
          </md-list-item>

          <md-list-item to="/patient_drug_history" class="unselected">
            <md-icon style="margin-right:10px">folder_shared</md-icon>
            <span class="md-list-item-text selected_text">ประวัติการใช้ยา</span>
          </md-list-item>

          <md-list-item to="/patient_relation" class="selected">
            <md-icon style="margin-right:10px;color:white;">person_add</md-icon>
            <span class="md-list-item-text selected_text" style="color:white;">ความสัมพันธ์</span>
          </md-list-item>

          <md-list-item to="/patient_drug_information" class="unselected">
            <md-icon style="margin-right:10px">description</md-icon>
            <span class="md-list-item-text unselected_text">ค้นหาข้อมูลยา</span>
          </md-list-item>

          <md-list-item to="/patient_drug_interaction" class="unselected">
            <md-icon style="margin-right:10px">bubble_chart</md-icon>
            <span class="md-list-item-text unselected_text">ค้นหาปฏิกิริยาระหว่างยา</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <contentA/>
      </md-app-content>
    </md-app>
     <!-- Add friend Modal -->
    <div
      class="modal fade"
      id="addfriendmodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">เพิ่มเพื่อน</h5>
            <br>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!--content add friend -->
           <form>
                    <div class="col-sm-9 form-group">
                      <br>
                      <label>ค้นหาเพื่อนจากID</label>
                      <input type="text" placeholder="Enter ID Here.."  class="form-control">
                    </div>
            </form>
       
          <!-- confirm to dispend drug button -->
          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-dismiss="modal">เพิ่มเพื่อน</button>
          </div>
        </div>
      </div>
    </div>
    <!-- end Add friend Modal-->
    <!-- confirm Modal -->
    <div
      class="modal fade"
      id="confirmmodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">แน่ใจหรือไม่ว่ายืนยัน ?</h5>
            <br>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!--content summary -->
          <div class="modal-body">
            <p>ยอมรับ : ID number XXXXXX</p>
          </div>
          <!-- confirm to dispend drug button -->
          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-dismiss="modal">ยืนยัน</button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal -->

    <!-- cancle Modal -->
    <div
      class="modal fade"
      id="canclemodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">แน่ใจหรือไม่ว่าปฏิเสธ ?</h5>
            <br>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!--content summary -->
          <div class="modal-body">
            <p>ปฏิเสธ : ID number XXXXXX</p>
          </div>
          <!-- confirm to dispend drug button -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">ปฏิเสธ</button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal -->
  </div>  
</template>

<script>
import axios from "axios";
import contentA from "./Content_Relation";
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
    async logout(){
        await this.$localStorage.set("userID",null)
        await this.$router.push('/login')
      }
  },
  async mounted() {
    if(this.$localStorage.get("userID")=='null') this.$router.push('/login')
    this.Window_Width = window.innerWidth;
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
  background-color: #444C5C;
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
