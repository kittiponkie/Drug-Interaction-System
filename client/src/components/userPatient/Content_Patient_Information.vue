<template>
  <div>
    <div class="col-lg-6" style="width:100%;">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3>หมายเลขประจำตัวผู้ป่วย : xxxxxxx </h3>
          <br>
          <!-- patient data -->
          <form>
            <!--prefix-->
            <div class="form-goup row">
              <label for="prefix" class="col-sm-2 col-form-label">คำนำหน้า</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="prefix" value="MR.">
              </div>
            </div>
            <br>
            <!--name-->
            <div class="form-group row">
              <label for="name" class="col-sm-2 col-form-label">ชื่อ</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="namesurname" value="Naphatsorn">
              </div>
            </div>
            <!--surname-->
            <div class="form-group row">
              <label for="surname" class="col-sm-2 col-form-label">นามสกุล</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="surname" value="Buarattanakarn">
              </div>
            </div>
            <!--sex-->
            <div class="form-group row">
              <label for="sex" class="col-sm-2 col-form-label">เพศ</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="sex" value="Female">
              </div>
            </div>
            <!--birthday-->
            <div class="form-group row">
              <label for="bod" class="col-sm-2 col-form-label">วันเกิด</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="birthday" value="09/06/2540">
                <input type="text" readonly class="form-control" id="age" value="21 y 5 m 21 d">
              </div>
            </div>
            <!--id card-->
            <div class="form-group row">
              <label for="idcard" class="col-sm-2 col-form-label">หมายเลขบัตรประชาชน</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="card" value="1849900281533">
              </div>
            </div>
            <!--status-->
            <div class="form-group row">
              <label for="idcard" class="col-sm-2 col-form-label">สถานะ</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="card" value="1849900281533">
              </div>
            </div>
            <!--ethnicity -->
            <div class="form-group row">
              <label for="ethnicity " class="col-sm-2 col-form-label">เชื้อชาติ</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="ethnicity " value="Thai">
              </div>
            </div>
            <!--nationality-->
            <div class="form-group row">
              <label for="nationality" class="col-sm-2 col-form-label">สัญญาติ</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="nationality" value="Thai">
              </div>
            </div>
            <!--Religion-->
            <div class="form-group row">
              <label for="Religion" class="col-sm-2 col-form-label">ศาสนา</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="Religion" value="Thai">
              </div>
            </div>
            <!--Blood-->
            <div class="form-group row">
              <label for="Blood" class="col-sm-2 col-form-label">หมู่เลือด</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="Blood" value="A">
              </div>
            </div>
            <!--Address-->
            <div class="form-group row">
              <label for="Address" class="col-sm-2 col-form-label">ที่อยู่</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="Address" value="RC mansion room206 Phutthamonthon Sai 4 Road Salaya, Phutthamonthon Nakhonpathom, 73170 Thailand">
              </div>
            </div>
            <!--PhoneNumber-->
            <div class="form-group row">
              <label for="PhoneNumber" class="col-sm-2 col-form-label">เบอร์โทร</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="PhoneNumber" value="0865076630">
              </div>
            </div>
            <!--Drugallergy-->
            <div class="form-group row">
              <label for="Drugallergy" class="col-sm-2 col-form-label">การแพ้ยา</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="Drugallergy" value="Tramadol,Paracetamol">
              </div>
            </div>
            <!--Foodallergy-->
            <div class="form-group row">
              <label for="Foodallergy" class="col-sm-2 col-form-label">การแพ้อาหาร</label>
              <div class="col-sm-10">
                <input type="text" readonly class="form-control" id="Foodallergy" value="fish">
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Drug_Interaction',
    data: () => ({
      menuVisible: false, //toggle visible menu when responsive
      Window_Width: 0, //width of window
      found: false, //true when found data , false when don't have data from API
      checkSearch: false, //true when you search something
      loading: false //true when you have to wait for call API
    }),
    methods: {
      //toggle visible menu
      toggleMenu() {
        this.menuVisible = !this.menuVisible
      },

      //get data from API
      async getData() {

      },
      change() {
        console.log(this.drugName)
        this.loading = false
        this.found = false
        this.drugList = null
        this.checkSearch = false
      }
    },
    async mounted() {
      this.Window_Width = window.innerWidth
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

  .md-content md-app-content md-flex text_all md-theme-default {
    padding-top: 23px;
  }

</style>
