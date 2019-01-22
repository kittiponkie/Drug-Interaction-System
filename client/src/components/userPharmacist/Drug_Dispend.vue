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
          <md-list-item to="/pharmacist_relation" class="unselected">
            <md-icon style="margin-right:10px">arrow_back_ios</md-icon>
            <span class="md-list-item-text selected_text">Back</span>
          </md-list-item>
          <md-list-item to="/pharmacist/patient_information" class="unselected">
            <md-icon style="margin-right:10px">account_circle</md-icon>
            <span class="md-list-item-text unselected_text">Patient Information</span>
          </md-list-item>

          <md-list-item to="/pharmacist/pharmacist_drug_dispend" class="selected">
            <md-icon style="margin-right:10px">grain</md-icon>
            <span class="md-list-item-text selected_text">Drug Dispend</span>
          </md-list-item>

          <md-list-item to="/pharmacist/pharmacist_drug_history" class="unselected">
            <md-icon style="margin-right:10px">folder_shared</md-icon>
            <span class="md-list-item-text selected_text">Drug History</span>
          </md-list-item>

          <md-list-item to="/pharmacist/pharmacist_drug_information" class="unselected">
            <md-icon style="margin-right:10px">description</md-icon>
            <span class="md-list-item-text unselected_text">Drug Information</span>
          </md-list-item>

          <md-list-item to="/pharmacist/pharmacist_drug_interaction" class="unselected">
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

    <div class="container">
      <!-- The Modal -->
      <div class="modal fade" id="basicExampleModal">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Summary</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">// Show Summary data //</div>
            <!-- Modal footer1 -->
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-success"
                data-toggle="modal"
                data-target="#myModal"
                data-dismiss="modal"
              >dispend</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 2nd modal -->
      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Are you confirm to dispending drug?</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-success" data-dismiss="modal">confirm</button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                data-toggle="modal"
                data-target="#basicExampleModal"
              >cancle</button>
            </div>
          </div>
        </div>
      </div>
        <!-- end 2nd modal -->
         <!-- 3rd modal -->
      <div class="modal" id="myModalclose">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Are you confirm to delete?</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-success" data-dismiss="modal">confirm</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal" >cancle</button>
            </div>
          </div>
        </div>
      </div>
        <!-- end 3rd modal -->
      </div>
    </div>
    
   
  </div>
  
</template>


<script>
import axios from "axios";
import contentA from "./Content_Drug_Dispend";
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
  },
  fireDelete(id) {
    axios.delete("/item/" + id).then();
  },

  deleteData(items, id) {
    // this.items = null // These parts may not
    this.fireDelete(id); // match your exact code, but I hope
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
