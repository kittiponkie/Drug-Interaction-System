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

          <md-list-item to="/doctor/doctor_order_drug" class="unselected">
            <md-icon style="margin-right:10px">dns</md-icon>
            <span class="md-list-item-text selected_text">Drug Order</span>
          </md-list-item>

          <md-list-item to="/doctor/doctor_drug_history" class="selected">
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
    <div
      class="modal fade"
      id="modalforshowdata"
      style="width=1000px;"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Order id : OD0001</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <!-- <form>
            
            <p> *****ยังแก้อยู่จ้า จะใส่textbox</p> 
            <p> <br><b>Doctor Name-surname: </b> </p>
            <p> <br><b>Ward: </b>  </p>
            <p> <br><b>Pharmacist id: </b></p>
            <p> <br><b>Pharmacist Name-surname: </b>*ถ้าไม่มีการกดจ่ายยาจะไม่แสดง </p>
        *    <p> <br><b>Duration:  </b></p>
        *    <p> <br><b>Dispend Status:</b>  </p>
        *    <p> <br><b>GP Name: </b></p>
        *    <p> <br><b>RXcui:  </b></p>
         *   <p> <br><b>Dosage:</b>  </p>
            <p> <br><b>Frequency: </b></p>
            <p> <br><b>Quantity:  </b></p>
            <p> <br><b>Dispend (recieve madicine):</b>  </p>
            <p> <br><b>Note: </b></p>-->

            <!-- tab show data -->
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >Detail</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >Doctor</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="contact-tab"
                  data-toggle="tab"
                  href="#contact"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                >Pharmacist</a>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
               <form>
                <br>
                   <div class="form-group row">
                    <label  class="col-sm-3 col-form-label">Drug Name (GP) :</label>
                      <div class="col-sm-9">
                        <input class="form-control" type="text" placeholder="Readonly GP Name here…" readonly>
                    </div>
                  </div>
                   <div class="form-group row">
                    <label  class="col-sm-3 col-form-label">Dispend Status :</label>
                      <div class="col-sm-9">
                        <input class="form-control" type="text" placeholder="Readonly Dispend Status here…" readonly>
                    </div>
                  </div>
                   <div class="form-group row">
                    <label  class="col-sm-3 col-form-label">Duration :</label>
                      <div class="col-sm-9">
                        <input class="form-control" type="text" placeholder="Readonly Duration here…" readonly>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label  class="col-sm-3 col-form-label">RXcui :</label>
                      <div class="col-sm-9">
                        <input class="form-control" type="text" placeholder="Readonly RXcui here…" readonly>
                    </div>
                  </div>
                   <div class="form-group row">
                    <label  class="col-sm-3 col-form-label">Dosage :</label>
                      <div class="col-sm-9">
                        <input class="form-control" type="text" placeholder="Readonly Dosage here…" readonly>
                    </div>
                  </div>
                   <div class="form-group row">
                    <label  class="col-sm-3 col-form-label">Frequency :</label>
                      <div class="col-sm-9">
                        <input class="form-control" type="text" placeholder="Readonly Frequency here…" readonly>
                    </div>
                     </div>
                    <div class="form-group row">
                    <label  class="col-sm-3 col-form-label">Quantity :</label>
                      <div class="col-sm-9">
                        <input class="form-control" type="text" placeholder="Readonly Quantity here…" readonly>
                      </div>
                    </div>
                    <div class="form-group row">
                    <label  class="col-sm-3 col-form-label">Recieve madicine(%) :</label>
                      <div class="col-sm-9">
                        <input class="form-control" type="text" placeholder="Readonly % Recieve madicine here…" readonly>
                      </div>
                    </div>
                     <div class="form-group row">
                    <label  class="col-sm-3 col-form-label"> Note :</label>
                      <div class="col-sm-9">
                        <textarea class="form-control" type="text" placeholder="Readonly Note here…" readonly></textarea>
                      </div>
                    </div>     
              </form>
              </div>
              <div
                class="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
              <form>
                <br>
                  <div class="form-group row">
                    <label  class="col-sm-3 col-form-label">Doctor id :</label>
                      <div class="col-sm-9">
                        <input class="form-control" type="text" placeholder="Readonly  here…" readonly>
                    </div>
                  </div>
                   <div class="form-group row">
                    <label  class="col-sm-3 col-form-label">Doctor Name :</label>
                      <div class="col-sm-9">
                        <input class="form-control" type="text" placeholder="Readonly  here…" readonly>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label  class="col-sm-3 col-form-label">Ward :</label>
                      <div class="col-sm-9">
                        <input class="form-control" type="text" placeholder="Readonly  here…" readonly>
                    </div>
                  </div>
              </form>
              </div>
              <div
                class="tab-pane fade"
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              > 
              <form>
                <br>
                  <div class="form-group row">
                    <label  class="col-sm-3 col-form-label">Pharmacist id :</label>
                      <div class="col-sm-9">
                        <input class="form-control" type="text" placeholder="Readonly  here…" readonly>
                    </div>
                  </div>
                   <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Pharmacist Name :</label>
                      <div class="col-sm-9">
                        <input class="form-control" type="text" placeholder="Readonly  here…" readonly>
                    </div>
                  </div>
              </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import contentA from "./Content_Drug_History";
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
$(".modal-wide").on("show.bs.modal", function() {
  var height = $(window).height() - 200;
  $(this)
    .find(".modal-body")
    .css("max-height", height);
});
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
.modal.modal-wide .modal-dialog {
  width: 90%;
}
</style>
