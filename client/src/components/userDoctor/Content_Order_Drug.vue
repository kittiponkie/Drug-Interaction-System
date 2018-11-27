<template>
  <div>
        <div class="col-lg-6" style="width:100%;">
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
                <!--Drug ID -->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>Drug ID</label>
                    <input type="text" placeholder="drug id show Here.." readonly class="form-control">
                  </div>
                </div>
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
                    <div class="col-sm-6 form-group">
                      <label>Date</label>
                      <input type="text" placeholder="Date show Here.." readonly class="form-control">
                    </div>
                  </div>
                </div>
                <!-- Frequency -->
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
                </div>
                <!-- desc. -->
                <div class="row">
                  <div class="col-sm-6 form-group">
                    <label>Description</label>
                    <input type="text" placeholder="Description Here.." class="form-control">
                  </div>
                </div>
                <!-- confirm button -->
                <br />
                <div class="row">
                  <div class="col-sm-5">
                    <button type="button" class="btn btn-success" style="border-top-width: 0px;">Confirm</button>
                    <button type="button" class="btn btn-danger" style="border-top-width: 0px;">Cancle</button>


                  </div>
                </div>
                <!-- Button trigger modal -->
                <button style="margin-top:20px" type="button" class="btn btn-success" data-toggle="modal" data-target="#basicExampleModal">Confirm</button>
                <button style="margin-top:20px" type="button" class="btn btn-danger" >Cancle</button>

                <!-- Modal -->
                <div class="modal fade" id="basicExampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                  aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Summary</h5><br />
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
                        <button type="button" class="btn btn-primary">Confirm</button>
                        <button type="button" class="btn btn-primary">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end modal -->

              </form>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
  /* popup*/
  export default {
    data() {
      return {
        modalShow: false
      }
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

  /*Autocomplete*/
  @at-root* {
    box-sizing: border-box;
  }

  body {
    font: 16px Arial;
  }

  .autocomplete {
    /*the container must be positioned relative:*/
    position: relative;
    display: inline-block;
  }

  input {
    border: 1px solid transparent;
    background-color: #f1f1f1;
    padding: 10px;
    font-size: 16px;
  }

  input[type=text] {
    background-color: #f1f1f1;
    width: 100%;
  }

  input[type=submit] {
    background-color: DodgerBlue;
    color: #fff;
  }

  .autocomplete-items {
    position: absolute;
    border: 1px solid #d4d4d4;
    border-bottom: none;
    border-top: none;
    z-index: 99;
    /*position the autocomplete items to be the same width as the container:*/
    top: 100%;
    left: 0;
    right: 0;
  }

  .autocomplete-items div {
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #d4d4d4;
  }

  .autocomplete-items div:hover {
    /*when hovering an item:*/
    background-color: #e9e9e9;
  }

  .autocomplete-active {
    /*when navigating through the items using the arrow keys:*/
    background-color: DodgerBlue !important;
    color: #ffffff;
  }

  /*popup*/

</style>
