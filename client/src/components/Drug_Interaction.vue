<template>
  <div>
    <div class="col-lg-6" style="width:100%;">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3>ปฏิกิริยาระหว่างยา</h3>
          <h4>ชื่อยา : {{drugName}}</h4>
          <!-- search -->
          <form v-on:submit.prevent="getData">
            <md-field md-clearable class="md-toolbar-section-end textSearch">
              <md-input placeholder="Search by Drug name..." v-model="drugName" @input="change"></md-input>
            </md-field>
            <md-button type="submit" class="md-raised buttonSearch">ค้นหา</md-button>
          </form>
          <br>
        </div>
        <!--data-->
        <div class="panel-body" v-if="found">
          <table class="table table-condensed" style="border-collapse:collapse;">
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>ชื่อยา</th>
              </tr>
            </thead>
            <tbody v-for="(value,index) in drugList" :key="index">
              <tr data-toggle="collapse" :data-target="'#row'+index" class="accordion-toggle">
                <td><button class="btn btn-default btn-xs"><span class="glyphicon glyphicon-eye-open"></span></button></td>
                <td>{{value.interactionConcept[1].minConceptItem.name}}</td>
              </tr>
              <tr>
                <td colspan="12" class="hiddenRow">
                  <div class="accordian-body collapse" :id="'row'+index">
                    <br>
              <tr>
                RXCUI ID : {{value.interactionConcept[1].minConceptItem.rxcui}}
              </tr>
              <br>
              <tr>
                Generic Drug Name : {{value.interactionConcept[1].minConceptItem.name}}
              </tr>
              <br>
              <tr>
                Interaction Description : {{value.description}}
              </tr>
              <br>
              <tr>
                Severity : {{value.severity}}
              </tr>
              <br>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
      </div>
      <!--empty state-->
      <div class="panel-body " v-else-if="!found && checkSearch">
        <md-empty-state md-label="Not found" :md-description="`No drug found for this query.  Please Try again.`">
        </md-empty-state>
      </div>
      <!-- loading-->
      <div class="panel-body " v-else-if="loading">
        <md-empty-state md-label="Loading" :md-description="`Please wait a second`">
          <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </md-empty-state>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="basicExampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Friend</h5><br />
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <!--content summary -->
        <div class="modal-body">
          <p>Please Search Friend ID</p>
          <div class="row">
            <div class="col-sm-6 form-group">
              <input type="text" placeholder="Enter First Name Here.." class="form-control">
              <!-- ยังไม่ได้ทำ auto complete -->
            </div>
          </div>
        </div>
        <!-- confirm to dispend drug button -->
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Add Friend</button>
          <button type="button" class="btn btn-primary">Cancle</button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal -->
  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Drug_Interaction',
    data: () => ({
      menuVisible: false, //toggle visible menu when responsive
      Window_Width: 0, //width of window
      drugName: null, //drug name that submit already
      drugList: null, //list of drug that interaction with drugName
      found: false, //true when found data , false when don't have data from API
      rxcuiID: null, //ID of drug from API
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
        this.loading = true
        this.rxcui = null
        var checkfound = false
        await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui?name=${this.drugName}`).then(Response => {
          if (Response.data.idGroup.rxnormId == null) {
            console.log('rxcui id is null')
            this.found = false
            this.checkSearch = true
            this.loading = false
          } else {
            this.rxcui = Response.data.idGroup.rxnormId[0]
            checkfound = true
            console.log('rxcui ok')
          }
        });
        if (checkfound == true) {
          await axios.get(
              `https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=${this.rxcui}&sources=DrugBank`)
            .then(Response => {
              this.drugList = Response.data.interactionTypeGroup[0].interactionType[0].interactionPair
              if (Response.data == null) console.log('data is null')
              else {
                console.log(this.drugList)
                this.found = true
                this.loading = false
              }
            });
        }
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

</style>
