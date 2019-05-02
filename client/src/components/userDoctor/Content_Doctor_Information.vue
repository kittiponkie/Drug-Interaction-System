<template>
  <div>
    <div class="col-lg-6" style="width:100%;">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3>หมายเลขประจำตัวแพทย์ : {{doctorID}} </h3>
          <br>
          <!-- patient data -->
          <form>
            <!--prefix-->
            <div class="form-goup row">
              <label for="prefix" class="col-sm-2 col-form-label">คำนำหน้า</label>
              <div class="col-sm-10">
                <input ref="prefix" type="text" readonly class="form-control">
              </div>
            </div>
            <br>
            <!--name-->
            <div class="form-group row">
              <label for="name" class="col-sm-2 col-form-label">ชื่อ</label>
              <div class="col-sm-10">
                <input ref="name" type="text" readonly class="form-control">
              </div>
            </div>
            <!--surname-->
            <div class="form-group row">
              <label for="surname" class="col-sm-2 col-form-label">นามสกุล</label>
              <div class="col-sm-10">
                <input ref="surname" type="text" readonly class="form-control">
              </div>
            </div>
            <!--sex-->
            <div class="form-group row">
              <label for="sex" class="col-sm-2 col-form-label">เพศ</label>
              <div class="col-sm-10">
                <input ref="sex" type="text" readonly class="form-control">
              </div>
            </div>
            <!--id card-->
            <div class="form-group row">
              <label for="idcard" class="col-sm-2 col-form-label">หมายเลขบัตรประจำตัวประชาชน</label>
              <div class="col-sm-10">
                <input ref="idcard" type="text" readonly class="form-control">
              </div>
            </div>
            <!--Department-->
            <div class="form-group row">
              <label for="Department" class="col-sm-2 col-form-label">แผนก</label>
              <div class="col-sm-10">
                <input ref="department" type="text" readonly class="form-control">
              </div>
            </div>
            <!--Address-->
            <div class="form-group row">
              <label for="Address" class="col-sm-2 col-form-label">ที่อยู่</label>
              <div class="col-sm-10">
                <input ref="address" type="text" readonly class="form-control">
              </div>
            </div>
            <!--PhoneNumber-->
            <div class="form-group row">
              <label for="PhoneNumber" class="col-sm-2 col-form-label">เบอร์โทร</label>
              <div class="col-sm-10">
                <input ref="phone" type="text" readonly class="form-control">
              </div>
            </div>
            <!--E-mail-->
            <div class="form-group row">
              <label for="E-mail" class="col-sm-2 col-form-label">อีเมล์</label>
              <div class="col-sm-10">
                <input ref="email" type="text" readonly class="form-control">
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
  import doctorServices from '@/services/doctor'

  export default {
    name: 'Drug_Interaction',
    data: () => ({
      menuVisible: false, //toggle visible menu when responsive
      Window_Width: 0, //width of window
      doctorID: 'not found',
      doctorInfo: null
    }),
    methods: {
      //toggle visible menu
      toggleMenu() {
        this.menuVisible = !this.menuVisible
      },
    },
    async mounted() {
      this.Window_Width = window.innerWidth
      this.doctorID = this.$localStorage.get('userID')
      doctorServices.doctorInfo(this.doctorID).then(Response => {
          /*console.log(Response.data)
          console.log(Response.data[0])
          console.log(Response.data[0].Prefix)*/
          this.doctorInfo = Response.data[0]
          this.$refs.prefix.value = this.doctorInfo.Prefix
          this.$refs.name.value = this.doctorInfo.Firstname
          this.$refs.surname.value = this.doctorInfo.Lastname
          this.$refs.sex.value = this.doctorInfo.Sex
          this.$refs.idcard.value = this.doctorInfo.IDcardNumber
          this.$refs.department.value = this.doctorInfo.Department
          this.$refs.address.value = this.doctorInfo.Address
          this.$refs.phone.value = this.doctorInfo.Phone
          this.$refs.email.value = this.doctorInfo.Email

      })
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
