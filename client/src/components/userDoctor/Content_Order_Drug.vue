<template>
  <div>
    <!--header-->    
    <md-card>
      <md-card-header>
        <md-card-header-text>
          <h2 style="text-align:center;">สั่งยา</h2>
          <h4 style="text-align:left;">ผู้ป่วย : {{patient.Firstname}} {{patient.Lastname}}</h4>
          <h4 style="text-align:left;">แพทย์ : {{doctor.Firstname}} {{doctor.Lastname}}</h4>
          <h3> ยาที่ผู้ป่วยแพ้ : {{allergicOfPatient.length>0? "":'-'}} <md-chip v-for="index in allergicOfPatient" :key="index">{{index}}</md-chip></h3> 
        </md-card-header-text>
      </md-card-header>
    </md-card>
    <!--end header-->

    <!--list drug order-->
    <div style="margin-bottom:20px;">
      <md-table v-model="searched" md-sort="GPName" md-sort-order="asc" md-card md-fixed-header>

        <!--header of list-->
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">หมายเลขใบสั่งยา {{orderID}}</h1>
          </div>
          <md-field md-clearable class="md-toolbar-section-end" style="margin-left:5px;margin-right:5px;">
            <md-input placeholder="กรุณาค้นหาจากชื่อยา..." v-model="search" @input="searchOnTable" />
          </md-field>

          <!--add drug to list button-->
          <div style="margin-left:5px;margin-right:5px;">
            <md-dialog :md-active.sync="active">
              <md-card class="md-layout-item">
                <md-card-header>
                  <div class="md-title">สั่งยา</div>
                </md-card-header>
                <md-card-content style="padding-bottom:0px;">

                  <form novalidate @submit.prevent="addDrugToList">
                    <label>ชื่อยา(GP)</label>   
                     <div style="margin:20px 0 20px 0;">                 
                    <input v-model="query2" id="input" class="form-control" type="text" placeholder="Type to search...">
                    <typeahead v-model="query" @input="calculateQuantity()" target="#input" :data="drugsSearch" :limit="drugsSearch.length" :match-start="true" :force-select="true" />    
                     </div>                
                    <div class="md-layout">
                      <div class="md-layout-item" style="margin-right:5px">
                        <label>จำนวนโดส</label>
                        <md-field md-clearable>
                          <md-input v-model="newDrugs.Dosage.dose" type="number" min="0" placeholder="Enter Number" @input="calculateQuantity"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item" style="margin-left:5px">
                        <label>หน่วย</label>
                        <md-field>

                          <md-select v-model="newDrugs.Dosage.unit" placeholder="Select Unit" @input="calculateQuantity">
                            <md-option v-if="newDrugs.Dosage.unit2=='tablet' || newDrugs.Dosage.unit2=='lozenge'" value="tab">
                              Tablet(เม็ด)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='oral suspension' || newDrugs.Dosage.unit2=='syrup' || newDrugs.Dosage.unit2=='eye drops' || newDrugs.Dosage.unit2=='injection' || newDrugs.Dosage.unit2=='spray'" value="mL">
                              mL(มิลลิลิตร)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='capsule'" value="capsule">
                              Capsule(แคปซูน)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='injection' || newDrugs.Dosage.unit2=='eye drops'" value="mcL">
                              mcL(ไมโครลิตร)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='ointment' || newDrugs.Dosage.unit2=='cream'" value="g">
                              g(กรัม)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='ointment' || newDrugs.Dosage.unit2=='cream'" value="mg">
                              mg(มิลลิกรัม)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='injection' || newDrugs.Dosage.unit2=='cream'" value="amp">
                              Amp(หลอด)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='capsule'" value="cc">
                              CC(ซีซี)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='ointment'" value="tube">
                              Tube(หลอด)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='implant'" value="implant">
                              Implant</md-option>                            
                            <md-option value="unit">
                              Unit(หน่วย)</md-option>
                          </md-select>
                        </md-field>
                      </div>
                    </div>

                    <label>ระยะเวลาที่บริโภคยา</label>
                    <div class="md-layout">
                      <div class="md-layout-item" style="margin-right:5px">
                        <md-field md-clearable>
                          <label>ปี</label>
                          <md-input v-model="newDrugs.Duration.year" type="number" min="0" @input="calculateQuantity"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item" style="margin-right:5px">
                        <md-field md-clearable>
                          <label>เดือน</label>
                          <md-input v-model="newDrugs.Duration.month" type="number" min="0" @input="calculateQuantity"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item" style="margin-right:5px">
                        <md-field md-clearable>
                          <label>วัน</label>
                          <md-input v-model="newDrugs.Duration.day" type="number" min="0" @input="calculateQuantity"></md-input>
                        </md-field>
                      </div>
                    </div>
                    <!--md-field>
                      <label>Date</label>
                      <md-input v-model="newDrugs.Dosage"></md-input>
                    </md-field-->
                    <label>ความถี่</label>
                    <div class="md-layout">
                      <md-checkbox v-if="newDrugs.Frequency.symptoms == 'true'" v-model="newDrugs.Frequency.mor" value="true"
                        @change="calculateQuantity" disabled>เช้า</md-checkbox>
                      <md-checkbox v-else v-model="newDrugs.Frequency.mor" value="true" @change="calculateQuantity">เช้า</md-checkbox>
                      <md-checkbox v-if="newDrugs.Frequency.symptoms == 'true'" v-model="newDrugs.Frequency.aft" value="true"
                        @change="calculateQuantity" disabled>กลางวัน</md-checkbox>
                      <md-checkbox v-else v-model="newDrugs.Frequency.aft" value="true" @change="calculateQuantity">กลางวัน</md-checkbox>
                      <md-checkbox v-if="newDrugs.Frequency.symptoms == 'true'" v-model="newDrugs.Frequency.eve" value="true"
                        @change="calculateQuantity" disabled>เย็น</md-checkbox>
                      <md-checkbox v-else v-model="newDrugs.Frequency.eve" value="true" @change="calculateQuantity">เย็น</md-checkbox>
                      <md-checkbox v-if="newDrugs.Frequency.symptoms == 'true'" v-model="newDrugs.Frequency.bed" value="true"
                        @change="calculateQuantity" disabled>ก่อนนอน</md-checkbox>
                      <md-checkbox v-else v-model="newDrugs.Frequency.bed" value="true" @change="calculateQuantity">ก่อนนอน</md-checkbox>
                      <md-checkbox v-if="newDrugs.Frequency.mor == 'true' || newDrugs.Frequency.aft == 'true' || newDrugs.Frequency.eve == 'true' || newDrugs.Frequency.bed == 'true'"
                        v-model="newDrugs.Frequency.symptoms" value="true" @change="calculateQuantity" disabled>ทานตามอาการ</md-checkbox>
                      <md-checkbox v-else v-model="newDrugs.Frequency.symptoms" value="true" @change="calculateQuantity">ทานตามอาการ</md-checkbox>
                    </div>
                    <div class="md-layout">
                      <md-checkbox v-if="newDrugs.Frequency.after == 'true'" v-model="newDrugs.Frequency.before" value="true"
                        @change="calculateQuantity" disabled>ก่อนอาหาร</md-checkbox>
                      <md-checkbox v-else v-model="newDrugs.Frequency.before" value="true" @change="calculateQuantity">ก่อนอาหาร</md-checkbox>
                      <md-checkbox v-if="newDrugs.Frequency.before == 'true'" v-model="newDrugs.Frequency.after" value="true"
                        @change="calculateQuantity" disabled>หลังอาหาร</md-checkbox>
                      <md-checkbox v-else v-model="newDrugs.Frequency.after" value="true" @change="calculateQuantity">หลังอาหาร</md-checkbox>
                    </div>

                    <label>ปริมาณยาทั้งหมด</label>                    
                    <div class="md-layout" v-if="newDrugs.Frequency.symptoms != 'true'">
                      <div class="md-layout-item" style="margin-right:5px">

                        <md-field>
                      <label>ปริมาณคำนวณอัตโนมัติ</label>
                      <md-input readonly v-model="newDrugs.Quantity" placeholder="Calculate Automatic"></md-input>
                    </md-field>
                      </div>

                      <div class="md-layout-item" style="margin-left:5px">
                        <md-field>
                          <label>Unit</label>
                          <md-select v-model="newDrugs.Dosage.unit" placeholder="Select Unit" @input="calculateQuantity">
                            <md-option v-if="newDrugs.Dosage.unit2=='tablet' || newDrugs.Dosage.unit2=='lozenge'" value="tab">
                              Tablet(เม็ด)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='oral suspension' || newDrugs.Dosage.unit2=='syrup' || newDrugs.Dosage.unit2=='eye drops' || newDrugs.Dosage.unit2=='injection' || newDrugs.Dosage.unit2=='spray'" value="mL">
                              mL(มิลลิลิตร)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='capsule'" value="capsule">
                              Capsule(แคปซูน)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='injection' || newDrugs.Dosage.unit2=='eye drops'" value="mcL">
                              mcL(ไมโครลิตร)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='ointment' || newDrugs.Dosage.unit2=='cream'" value="g">
                              g(กรัม)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='ointment' || newDrugs.Dosage.unit2=='cream'" value="mg">
                              mg(มิลลิกรัม)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='injection' || newDrugs.Dosage.unit2=='cream'" value="amp">
                              Amp(หลอด)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='capsule'" value="cc">
                              CC(ซีซี)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='ointment'" value="tube">
                              Tube(หลอด)</md-option>
                            <md-option v-if="newDrugs.Dosage.unit2=='implant'" value="implant">
                              Implant</md-option>                            
                            <md-option value="unit">
                              Unit(หน่วย)</md-option>
                          </md-select>
                        </md-field>
                      </div>
                    </div>

                    <div class="md-layout" v-else>
                      <div class="md-layout-item" style="margin-right:5px">

                        <md-field md-clearable>
                          <label>ปริมาณคำนวณอัตโนมัติ</label>
                          <md-input v-model="newDrugs.Quantity" type="number" min="0" placeholder="Enter Number" @input="calculateQuantity"></md-input>
                        </md-field>
                      </div>

                      <div class="md-layout-item" style="margin-left:5px">
                        <md-field>
                          <label>หน่วย</label>
                          <md-select v-model="newDrugs.Dosage.unit" placeholder="Select Unit" @input="calculateQuantity">
                            <md-option value="amp">Amp(หลอด)</md-option>
                            <md-option value="cc">CC(ซีซี)</md-option>
                            <md-option value="drop">Drop(หยด)</md-option>
                            <md-option value="ml">ML(มิลลิลิตร)</md-option>
                            <md-option value="tab">Tab(เม็ด)</md-option>
                            <md-option value="other">Other(อื่นๆ)</md-option>
                          </md-select>
                        </md-field>
                      </div>
                    </div>

                    <label>กรุณาเลือกวันจ่ายยา</label>    
                    <md-datepicker v-model="newDrugs.DispendStartDate" md-immediately>
                      <label>กรุณาเลือกวันจ่ายยา</label>
                    </md-datepicker>

                    <label>บันทึกเพิ่มเติม</label>
                    <md-field md-clearable>
                      <md-textarea v-model="newDrugs.Description" placeholder="Enter Text"></md-textarea>
                    </md-field>

                    <md-card-actions style="padding:0px;padding-bottom:8px;">
                      <!--md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button-->
                      <md-button class="md-primary" @click="active = false">ปิด</md-button>
                      <md-button type="submit" class="md-primary">บันทึก</md-button>
                    </md-card-actions>
                  </form>
                </md-card-content>
              </md-card>
            </md-dialog>
            <md-button class="md-primary md-raised" @click="addDrugToListBtn" style="background-color:#FB6A07">
              <!--i class="material-icons">&#xE147;</i-->
              เพิ่มยาเข้าสู่รายการ
            </md-button>
          </div>
          <!--confirm button-->
          <div style="margin-left:5px;margin-right:5px;">
            <md-dialog :md-active.sync="showDialog" style="overflow:auto">
              <md-dialog-title>ยาทั้งหมดในรายการ</md-dialog-title>
              <md-table v-model="drugs" md-sort="DrugNO" md-sort-order="asc" md-card>
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="Drug No.">{{ item.DrugNo }}</md-table-cell>
                  <md-table-cell md-label="Drug Name">{{ item.GPName }}</md-table-cell>
                  <md-table-cell md-label="Status">    
                    <md-progress-spinner v-if="item.statusDetail=='load' || loadingAll" :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
                    <md-button v-else-if="item.statusDetail!='' && !loadingAll" class="md-icon-button" @click="true">
                      <md-icon style="color:red;">error</md-icon>
                    </md-button>
                    <md-button v-else class="md-icon-button" @click="true">
                      <md-icon style="color:green;">check_circle</md-icon>
                    </md-button>
                  </md-table-cell>
                  <md-table-cell md-label="Allergic with"><h6 v-for="(value,index) in item.detail.allergic" :key="index">{{value}}</h6></md-table-cell>
                  <md-table-cell md-label="Interaction with"><h6 v-for="(value,index) in item.detail.interaction" :key="index">{{value}}</h6></md-table-cell>
                  <md-table-cell md-label="Time conflict with"><h6 v-for="(value,index) in item.detail.timeConflict" :key="index">{{value}}</h6></md-table-cell>
                </md-table-row>
              </md-table>
              <md-dialog-actions>
                <md-button class="md-primary" @click="restartConfirm()">ยกเลิก</md-button>
                <md-button v-if="loadingAll == false" class="md-primary" @click="confirmOrder">ยืนยัน</md-button>
                <md-button v-else class="md-primary" @click="confirmOrder" disabled>ยืนยัน</md-button>
              </md-dialog-actions>
            </md-dialog>
            <!--md-button class="md-accent md-raised" @click="showDialog = true">Confirm</md-button-->
            <md-button v-if="drugs.length!=0" class="md-primary md-raised" @click="onConfirmClick()" style="background-color:#05AB00">บันทึก</md-button>
            <md-button v-else class="md-primary md-raised" @click="onConfirmClick()" disabled>Save</md-button>
          </div>
          <!--show drug history button-->
          <div style="margin-left:5px;margin-right:5px;">    
            <md-dialog :md-active.sync="first" style="overflow:auto">
              <contentA/>
              <md-dialog-actions>
                <md-button class="md-primary" @click="first = false">ปิด</md-button>
              </md-dialog-actions>
            </md-dialog>
            <md-button class="md-primary md-raised" @click="first = true" style="background-color:#643895">ประวัติการใช้ยา</md-button>
          </div>
          <!-- dialog message-->
          <md-dialog-alert :md-active.sync="showMessage" :md-content="message" md-confirm-text="Close" /> 
        </md-table-toolbar>

        <!--show when search not found-->
        <md-table-empty-state md-label="No drugs found" :md-description="`No Drug found for this '${search}' query. Try a different search term or create a new drug.`">
        </md-table-empty-state>

        <!--list-->
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="หมายเลขคำสั่งยา" md-sort-by="DrugNo" md-numeric>{{ item.DrugNo }}</md-table-cell>
          <md-table-cell md-label="ชื่อยา" md-sort-by="GPName" md-numeric>{{ item.GPName }}</md-table-cell>
          <md-table-cell md-label="ระยะเวลา(วัน)" md-sort-by="Duration" md-numeric>{{ item.Duration.year }} ปี {{
            item.Duration.month }} เดือน {{ item.Duration.day }} วัน</md-table-cell>
          <md-table-cell md-label="แพทย์" md-sort-by="doctorName" md-numeric>{{ item.doctorName }}</md-table-cell>
          <md-table-cell md-label="แผนก" md-sort-by="ward" md-numeric>{{ item.ward }}</md-table-cell>
          <md-table-cell md-label=" " md-numeric>
            <md-button class="md-icon-button" @click="editDrug(item)">
              <md-icon style="color:#ffc107;">&#xE254;</md-icon>
            </md-button>
            <md-button class="md-icon-button" @click="deleteOnTable(item)">
              <md-icon style="color:#f44336;">&#xE872;</md-icon>
            </md-button>
          </md-table-cell>
        </md-table-row> 
      </md-table>      
    </div>
  </div>
</template>

<script>
  const toLower = text => {
    return text.toString().toLowerCase()
  }
  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.GPName).includes(toLower(term)))
    }
    return items
  }
  import DRUGS from '../../data/drugs.js'
  import doctorServices from '@/services/doctor'
  import contentA from "./Content_Drug_History";
  import axios from "axios";
  export default {
    name: "Drug_Interaction",
    components: {
      contentA
    },
    data: () => ({
      //message dialog
      message: '',
      showMessage: false,
      //header
      patient: [],
      doctor: [],
      orderID: '',
      //search in table
      search: null,
      searched: [],
      drugs: [],
      //edit in table
      checkEdit: false,
      itemEdit: null,
      //add drug to list 
      active: false,
      newDrugs: {
        //in db        
        OrderID: "-",
        PatientID: "-",
        DoctorID: "-",
        PharmacistID: "-",
        OrderStartDate: "-",
        DispendStartDate: "",
        DrugNo: "-",
        Duration: {
          year: "0",
          month: "0",
          day: "0"
        },
        UsingStatus: "Waiting Dispense",
        DispendStatus: "",
        GPName: "-",
        RXCUI: "-",
        Dosage: {
          dose: "0",
          unit: "Unit"
        },
        Frequency: {
          mor: "false",
          aft: "false",
          eve: "false",
          bed: "false",
          before: "false",
          after: "false",
          symptoms: "false"
        },
        Times: "0",
        Quantity: "0",
        Dispend: "0",
        Description: "-",
        // not in db
        doctorName: "-",
        ward: "-",
        //allergic and interac
        detail: {
          allergic: [],
          interaction: [],
          timeConflict: []
        },
        statusDetail: ""
      },
      //confirm
      showDialog: false,
      //drug history
      first: false,

      //auto complete
      query: '',
      query2: '',
      drugsSearch: DRUGS.GP,

      //allergic drug checking
      allergicOfPatient: [],
      temp1: [],
      temp2: [],
      loadingAll: true,

      //interaction
      drugHistory: [],      
      users: [],
      users2: [],
    }),
    methods: {
      //add drug to list
      addDrugToListBtn() {
        this.active = true
        //OrderID: null,
        //PatientID: null,
        //DoctorID: null,
        //PharmacistID: "not dispense",
        //OrderStartDate: null,
        this.newDrugs.DispendStartDate = "",
        this.newDrugs.DrugNo = "-"
        this.newDrugs.Duration.year = "0"
        this.newDrugs.Duration.month = "0"
        this.newDrugs.Duration.day = "0"
        //UsingStatus: null,
        this.newDrugs.DispendStatus = "",
        this.newDrugs.GPName = "-"
        this.newDrugs.RXCUI = "-"
        this.newDrugs.Dosage.dose = "0"
        this.newDrugs.Dosage.unit = "Unit"
        this.newDrugs.Dosage.unit2 = "Unit"
        this.newDrugs.Frequency.mor = "false"
        this.newDrugs.Frequency.aft = "false"
        this.newDrugs.Frequency.eve = "false"
        this.newDrugs.Frequency.bed = "false"
        this.newDrugs.Frequency.before = "false"
        this.newDrugs.Frequency.after = "false"
        this.newDrugs.Frequency.symptoms = "false"
        //Times: null,
        this.newDrugs.Quantity = "0"
        //Dispend: "not dispense",
        this.newDrugs.Description = "-"
        //doctorName: "not found",
        //ward: "not found"
        this.newDrugs.detail = {
          allergic: [],
          interaction: [],
          timeConflict: []
        }
        this.newDrugs.statusDetail = ""
        this.query = ""
        this.query2 = ""
        this.checkEdit = false        
      },
      calculateQuantity() {
        //this.query2 = this.query
        console.log(this.query)
        if(this.query!='' && this.query!=undefined) {
          this.query2 = this.query
          var unit_tablet = this.query.search('tablet')
          var unit_oral = this.query.search('oral suspension')
          var unit_capsule = this.query.search('capsule')
          var unit_syrup = this.query.search('syrup')
          var unit_eye = this.query.search('eye drops')
          var unit_cream = this.query.search('cream')
          var unit_implant = this.query.search('implant')
          var unit_injection = this.query.search('injection')
          var unit_ointment = this.query.search('ointment')
          var unit_spray = this.query.search('spray')
          var unit_lozenge = this.query.search('lozenge')

          if(unit_tablet!=-1){
            this.newDrugs.Dosage.unit2 = 'tablet'  
            this.newDrugs.Dosage.unit = 'tab'   
          } else if(unit_oral!=-1){
            this.newDrugs.Dosage.unit2 = 'oral'
            this.newDrugs.Dosage.unit = 'mL'  
          } else if(unit_capsule!=-1){
            this.newDrugs.Dosage.unit2 = 'capsule'
            this.newDrugs.Dosage.unit = 'capsule'  
          } else if(unit_syrup!=-1){
            this.newDrugs.Dosage.unit2 = 'syrup'
            this.newDrugs.Dosage.unit = 'mL'  
          } else if(unit_eye!=-1){
            this.newDrugs.Dosage.unit2 = 'eye drops'
            this.newDrugs.Dosage.unit = 'mL'  
          } else if(unit_cream!=-1){
            this.newDrugs.Dosage.unit2 = 'cream'
            this.newDrugs.Dosage.unit = 'g'  
          } else if(unit_implant!=-1){
            this.newDrugs.Dosage.unit2 = 'implant'
            this.newDrugs.Dosage.unit = 'implant'  
          } else if(unit_injection!=-1){
            this.newDrugs.Dosage.unit2 = 'injection'
            this.newDrugs.Dosage.unit = 'mL'  
          } else if(unit_ointment!=-1){
            this.newDrugs.Dosage.unit2 = 'ointment'
            this.newDrugs.Dosage.unit = 'g'  
          } else if(unit_spray!=-1){
            this.newDrugs.Dosage.unit2 = 'spray'
            this.newDrugs.Dosage.unit = 'mL'  
          } else if(unit_lozenge!=-1){
            this.newDrugs.Dosage.unit2 = 'lozenge'
            this.newDrugs.Dosage.unit = 'tab'  
          } else {
            this.newDrugs.Dosage.unit = 'unit' 
          }
        }

        if(this.newDrugs.Dosage.dose < 0) this.newDrugs.Dosage.dose = 0
        if(this.newDrugs.Duration.year < 0) this.newDrugs.Duration.year = 0
        if(this.newDrugs.Duration.month < 0) this.newDrugs.Duration.month = 0
        if(this.newDrugs.Duration.day < 0) this.newDrugs.Duration.day = 0
        if(this.newDrugs.Quantity < 0) this.newDrugs.Quantity = 0

        console.log("Calculate function")
        if(this.newDrugs.Frequency.symptoms != "true"){
        this.newDrugs.Times = 0;
        var key = 0;
        for (key in this.newDrugs.Frequency) {
          if (this.newDrugs.Frequency.hasOwnProperty(key)) {
            //console.log(key)
            //console.log(this.newDrugs.Frequency[key])
            if (this.newDrugs.Frequency[key] == "true" && key != "before" && key != "after") {
              this.newDrugs.Times++
            }
          }
        }
        //console.log(Object.keys(this.newDrugs.Frequency).length)  
        //console.log(this.newDrugs.Duration)
        var year = parseInt(this.newDrugs.Duration.year) * 12 * 30
        var month = parseInt(this.newDrugs.Duration.month) * 30
        var day = parseInt(this.newDrugs.Duration.day)
        if (this.newDrugs.Duration.year == "") year = 0
        if (this.newDrugs.Duration.month == "") month = 0
        if (this.newDrugs.Duration.day == "") day = 0

        var duration = (year + month + day)

        this.newDrugs.Quantity = parseInt(this.newDrugs.Dosage.dose) * this.newDrugs.Times * duration        
        this.newDrugs.Quantity = this.newDrugs.Quantity.toString()
        //console.log(this.newDrugs.Quantity)
        this.newDrugs.Times = this.newDrugs.Times.toString()
        //console.log("Times = ", this.newDrugs.Times)
        }
      },
      async addDrugToList() {
        var year = parseInt(this.newDrugs.Duration.year) * 12 * 30
        var month = parseInt(this.newDrugs.Duration.month) * 30
        var day = parseInt(this.newDrugs.Duration.day)
        if (this.newDrugs.Duration.year == "") year = 0
        if (this.newDrugs.Duration.month == "") month = 0
        if (this.newDrugs.Duration.day == "") day = 0

        var duration = (year + month + day)
        if (duration >= 360) {
          this.newDrugs.Duration.year = (duration / 360).toString()
          duration = duration % 360
        } else {
          this.newDrugs.Duration.year = "0"
        }
        if (duration >= 30) {
          this.newDrugs.Duration.month = (duration / 30).toString()
          duration = duration % 30
        } else {
          this.newDrugs.Duration.month = "0"
        }

        if (duration > 0) this.newDrugs.Duration.day = duration.toString()
        else this.newDrugs.Duration.day = "0"

        if (this.newDrugs.Dosage.dose == "") this.newDrugs.Dosage.dose = "0"
        else this.newDrugs.Dosage.dose = parseInt(this.newDrugs.Dosage.dose).toString()

        if (this.newDrugs.Quantity == "") this.newDrugs.Quantity = "0"
        else this.newDrugs.Quantity = parseInt(this.newDrugs.Quantity).toString()
        var x = {
          OrderID: this.newDrugs.OrderID, //
          PatientID: this.patient.PatientID,
          DoctorID: this.doctor.DoctorID,
          PharmacistID: this.newDrugs.PharmacistID,
          OrderStartDate: this.newDrugs.OrderStartDate,
          DispendStartDate: this.newDrugs.DispendStartDate,
          DrugNo: this.newDrugs.DrugNo,
          Duration: {
            year: parseInt(this.newDrugs.Duration.year).toString(),
            month: parseInt(this.newDrugs.Duration.month).toString(),
            day: parseInt(this.newDrugs.Duration.day).toString()
          },
          UsingStatus: this.newDrugs.UsingStatus,
          DispendStatus: this.newDrugs.DispendStartDate,
          GPName: this.query,
          RXCUI: this.newDrugs.RXCUI,
          Dosage: {
            dose: this.newDrugs.Dosage.dose,
            unit: this.newDrugs.Dosage.unit
          },
          Frequency: {
            mor: this.newDrugs.Frequency.mor,
            aft: this.newDrugs.Frequency.aft,
            eve: this.newDrugs.Frequency.eve,
            bed: this.newDrugs.Frequency.bed,
            before: this.newDrugs.Frequency.before,
            after: this.newDrugs.Frequency.after,
            symptoms: this.newDrugs.Frequency.symptoms
          },
          Times: this.newDrugs.Times,
          Quantity: this.newDrugs.Quantity,
          Dispend: this.newDrugs.Dispend,
          Description: this.newDrugs.Description,
          doctorName: this.doctor.Firstname + " " + this.doctor.Lastname,
          ward: this.doctor.Department,
          detail: this.newDrugs.detail,
          statusDetail: this.newDrugs.statusDetail
        }

        var finding = await this.drugsSearch.find(item =>{
          return item == x.GPName           
        })
        this.message = ''
        if(!finding) {
          this.message += "Drug name is not correct <br>"
        }
        if(x.Dosage.dose == 0){
          this.message += "Dosage can't be 0 <br>"
        }
        if(x.Duration.year == 0 && x.Duration.month == 0 && x.Duration.day == 0){
          this.message += "Duration can't be 0 at all <br>"
        }
        if(x.Frequency.mor=='false' && x.Frequency.aft=='false' && x.Frequency.eve=='false' && x.Frequency.bed=='false' && x.Frequency.symptoms=='false'){
          this.message += "Choose เช้า ,กลางวัน ,เย็น ,ก่อนนอน ,ทานตามอาการ<br>"
        }
        if(x.Frequency.before=='false' && x.Frequency.after=='false'){
          this.message += "Choose ก่อนอาหาร ,หลังอาหาร<br>"  
        }
        if(x.Quantity == 0 && x.Frequency.symptoms == "true"){
          this.message += "Quantity can't be 0 <br>"
        }
        if(x.DispendStartDate == ''){
          this.message += "Dipense Date can't be empty <br>"
        }

        if(this.message != '') this.showMessage = true   

        if(x.GPName!='' && finding && !this.showMessage) {
          this.active = false
          if (this.checkEdit) {
            console.log("edit success")
            this.drugs[this.itemEdit.DrugNo - 1] = x
            this.checkEdit = false
          } else {
            console.log("add drug success")
            x.DrugNo = (this.drugs.length + 1).toString()
            this.drugs.push(x)
          }    
        }       
      },
      //table
      searchOnTable() {
        this.searched = searchByName(this.drugs, this.search)
      },
      deleteOnTable(item) {
        console.log(item.DrugNo)
        if (item.DrugNo < this.drugs.length) {
          console.log("less than")
          for (var i = item.DrugNo; i < this.drugs.length; i++) {
            console.log(i)
            this.drugs[i].DrugNo = i
          }
          console.log(this.drugs)
        }
        this.drugs.splice(item.DrugNo - 1, 1)
      },
      //table edit
      editDrug(item) {
        var x = {
          OrderID: item.OrderID,
          PatientID: item.PatientID,
          DoctorID: item.DoctorID,
          PharmacistID: item.PharmacistID,
          OrderStartDate: item.OrderStartDate,
          DispendStartDate: item.DispendStartDate,
          DrugNo: item.DrugNo,
          Duration: {
            year: item.Duration.year,
            month: item.Duration.month,
            day: item.Duration.day
          },
          UsingStatus: item.UsingStatus,
          DispendStatus: item.DispendStartDate,
          GPName: item.GPName,
          RXCUI: item.RXCUI,
          Dosage: {
            dose: item.Dosage.dose,
            unit: item.Dosage.unit
          },
          Frequency: {
            mor: item.Frequency.mor,
            aft: item.Frequency.aft,
            eve: item.Frequency.eve,
            bed: item.Frequency.bed,
            before: item.Frequency.before,
            after: item.Frequency.after,
            symptoms: item.Frequency.symptoms
          },
          Times: item.Times,
          Quantity: item.Quantity,
          Dispend: item.Dispend,
          Description: item.Description,
          doctorName: item.doctorName,
          ward: item.ward,
          detail: item.detail,
          statusDetail: item.statusDetail
        }
        this.newDrugs = x
        this.active = true
        this.checkEdit = true
        this.itemEdit = item
      },
      //confirm click
      async onConfirmClick(){
        this.showDialog = true
        console.log(this.drugs)
        //set load
        await this.drugs.forEach(item=>{
          item.statusDetail = 'load'
        })

        //check Duplicate Drugs 
        await this.drugs.forEach(item=>{
          var drugName = item.GPName.split(' ') 
          this.checkDuplicateDrugs(drugName,item)        
        }) 

        //check allergic
        await this.allergicOfPatient.forEach(element => {
          console.log("allergic ",element)
          var temp = []
          axios.get(`http://localhost:8082/Allergic/`+element).then(Response => {          
            console.log('gpid ',Response.data.GP)
            temp = Response.data.GP
          }).then(()=>{            
            this.drugs.forEach(item=>{
              axios.get(`http://localhost:8082/Allergic/GP/`+item.GPName).then(Response2 => {
                //console.log('gpid of gpname',Response2.data.GP[0].GPID)
                var temp2 = []
                temp2 = Response2.data.GP[0].GPID
                temp.forEach(gpidItem=>{
                  if(gpidItem.GPID==temp2) {
                    console.log("ALLERGIC NOW!!!! ",element)
                    item.detail.allergic.push(element)
                    if(item.statusDetail == 'load') item.statusDetail = "Allergic"
                    else if(item.statusDetail == 'Allergic') ;
                    else item.statusDetail = "Both"
                    this.searchOnTable()
                  }      
                })              
              }) 
            })
          })           
        })
        //check interaction    
        await this.drugs.forEach(item=>{
          var drugName = item.GPName.split(' ')
          this.checkInteraction(drugName,item)         
        }) 
      },
      async checkInteraction(drugName,item){
        var rxcui = ''
        await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=`+drugName[0]).then(Response => {  
          console.log(drugName[0])        
          console.log('rxcui ',Response.data.idGroup.rxnormId)
          if(Response.data.idGroup.rxnormId) {
            rxcui = Response.data.idGroup.rxnormId[0].toString()
            item.RXCUI = Response.data.idGroup.rxnormId[0].toString()
          }
          else console.log("not found rxcui")
        })  
        await this.users.forEach(itemHis=>{
          console.log(itemHis.RXCUI,rxcui) 
          doctorServices.checkInteraction(rxcui,itemHis.RXCUI).then(result => {
            console.log(result.data.message)
            if(result.data.success) {
              this.detailInteraction(item,itemHis)
            }
          })        
        })  
        await this.drugs.forEach(itemDrugs=>{
          doctorServices.checkInteraction(rxcui,itemDrugs.RXCUI).then(result => {
            console.log(result.data.message)
            if(result.data.success) {
              this.detailInteraction(item,itemDrugs)
            }
          }) 
        })      
        if(this.drugs[this.drugs.length-1] == item) {
          this.drugs.forEach(item=>{
            if(item.statusDetail == 'load') item.statusDetail = ""
          })
          this.loadingAll = false
        }  
        /*await doctorServices.getOrderId(rxcui,rxcui).then(result => {  
          console.log(rxcui)  
          console.log(result.data)  
          if(rxcui != ''){                        
            if(result.data.interactionTypeGroup){
              console.log('interaction ',result.data.interactionTypeGroup[0].interactionType[0].interactionPair)
              result.data.interactionTypeGroup[0].interactionType[0].interactionPair.forEach(itemResult=>{
                //console.log(itemResult.interactionConcept[1].minConceptItem.rxcui)
                this.users.forEach(itemHis=>{
                  console.log(itemHis.RXCUI)
                  if(itemResult.interactionConcept[1].minConceptItem.rxcui == itemHis.RXCUI) {
                    console.log("Interaction1 !!! "+itemHis.RXCUI+','+rxcui)
                    console.log("Interaction1 !!! "+itemHis.GPName+','+drugName[0])
                    this.detailInteraction(item,itemHis)
                  }
                  //console.log(itemHis.RXCUI + " itemHis")              
                })   
                this.drugs.forEach(itemDrugs=>{
                  if(itemResult.interactionConcept[1].minConceptItem.rxcui == itemDrugs.RXCUI) {
                    console.log("Interaction2 !!! "+itemDrugs.RXCUI+','+rxcui)
                    console.log("Interaction2 !!! "+itemDrugs.GPName+','+drugName[0])
                    this.detailInteraction(item,itemDrugs)
                  }
                  //console.log(itemDrugs.RXCUI + " itemDrugs")
                }) 
              })
              
            }             
          }
          if(this.drugs[this.drugs.length-1] == item) {
            this.drugs.forEach(item=>{
              if(item.statusDetail == 'load') item.statusDetail = ""
            })
            this.loadingAll = false
          }
        })*/
      },
      detailInteraction(item,element){
        item.detail.interaction.push(element.OrderID+" "+element.GPName.split(' ')[0])
        if(item.statusDetail == 'load') item.statusDetail = "Interaction"
        else if(item.statusDetail == 'Interaction') ;
        else item.statusDetail = "Both"
        this.searchOnTable()
      },
      async checkDuplicateDrugs(drugName,item){
        await this.users.forEach((drugHis,index)=>{
          var finalTime = new Date(drugHis.DispendStartDate)
          finalTime.setFullYear(finalTime.getFullYear() + parseInt(drugHis.Duration.year),
                                finalTime.getMonth() + parseInt(drugHis.Duration.month),
                                finalTime.getDate() + parseInt(drugHis.Duration.day))      
          if(drugHis.GPName.split(' ')[0] == drugName[0]) {
            if(item.DispendStartDate - finalTime <= 0){
              item.detail.timeConflict.push(drugHis.OrderID+" "+ drugHis.GPName)  
              item.statusDetail = "Time Conflict"          
            }
          }
        })
        await this.drugs.forEach(itemDrugs=>{
          if(itemDrugs != item){
            var finalTime = new Date(itemDrugs.DispendStartDate)
            finalTime.setFullYear(finalTime.getFullYear() + parseInt(itemDrugs.Duration.year),
                                  finalTime.getMonth() + parseInt(itemDrugs.Duration.month),
                                  finalTime.getDate() + parseInt(itemDrugs.Duration.day))      
            if(itemDrugs.GPName.split(' ')[0] == drugName[0]) {
              if(item.DispendStartDate - finalTime <= 0){
                item.detail.timeConflict.push(itemDrugs.OrderID+" "+ itemDrugs.GPName)  
                item.statusDetail = "Time Conflict"          
              }
            }
          }
        })
      },
      async restartConfirm(){
        this.showDialog = false
        this.loadingAll = true
        await this.drugs.forEach(item=>{
          item.statusDetail = ""
          item.detail = {
          allergic: [],
          interaction: [],
          timeConflict: []
        }
        })
      },
      //last confirm (save to DB)
      async confirmOrder() {
        this.showDialog = false
        console.log("Save to Database")
        console.log(this.drugs)        
        for (var i in this.drugs) {
          console.log(i)
          doctorServices.postOrder(this.drugs[i]).then(Response => {
            console.log("ok1" + this.drugs[i].DrugNo)
          })
        }
        window.location.reload()
      }
    },
    //table add drug
    created() {
      this.searched = this.drugs
    },
    async mounted() {   
      //get patient info   
      await doctorServices.patientInfo(this.$localStorage.get('doctor_patient')).then(Response => {
        console.log(Response.data[0])
        this.patient = Response.data[0]
      })       
      
      //get doctor info
      await doctorServices.doctorInfo(this.$localStorage.get('userID')).then(Response => {
        console.log(Response.data[0])
        this.doctor = Response.data[0]
      })

      //set orderID
      await doctorServices.getOrderId(this.patient.PatientID, this.doctor.DoctorID).then(Response => {
        console.log(Response.data)
        if (Response.data == "") {
          console.log("nullll")
          this.newDrugs.OrderID = "O00001"          
        } else {
          this.drugHistory = Response.data
          console.log("drug history => ",this.drugHistory)          
          console.log(Response.data[Response.data.length - 1].OrderID)
          var orderId = Response.data[Response.data.length - 1].OrderID
          var x = orderId.split('O')
          orderId = parseInt(x[1]) + 1
          orderId = orderId.toString()
          if (orderId.length == 1) orderId = "O0000" + orderId
          else if (orderId.length == 2) orderId = "O000" + orderId
          else if (orderId.length == 3) orderId = "O00" + orderId
          else if (orderId.length == 4) orderId = "O0" + orderId
          else orderId = "O" + orderId
          console.log(orderId)
          this.newDrugs.OrderID = orderId
          this.orderID = orderId
        }
      })
      
      //get allergic of patient
      await doctorServices.allergicOfPatient(this.$localStorage.get('doctor_patient')).then(Response => {
        console.log("Allergic drug of patient is ",Response.data)
        for(var i in Response.data){
          this.allergicOfPatient.push(Response.data[i].VTMName)
        }        
      })    

      //get order of patient
      await doctorServices.getOrderId(this.$localStorage.get('doctor_patient')).then(Response => {
          console.log(Response.data)  
          Response.data.forEach((item,i) =>{
            //set pharmacist
            if(item.PharmacistID[0] == 'P' && item.PharmacistID[1] == 'H') {
              var tempPharmacistInfo = item.PharmacistID.split(',')
              item.PharmacistID = []
              tempPharmacistInfo.forEach(itemPhar=>{
                var tempPhar = {
                  ID: itemPhar,
                  Name: ''
                }
                item.PharmacistID.push(tempPhar)
              })
              console.log(item.PharmacistID)
            } else {
              item.PharmacistID = ''
            }

            //set Time
            var dispenseTime = new Date(item.DispendStartDate)
            var dispenseNextTime = new Date(item.DispendStatus) 
            dispenseNextTime.setHours(0,0,0,0) 
            var currentTime = new Date()
            currentTime.setHours(0,0,0,0) 
            var finalTime = new Date(item.DispendStartDate)
            finalTime.setFullYear(finalTime.getFullYear() + parseInt(item.Duration.year),
                                  finalTime.getMonth() + parseInt(item.Duration.month),
                                  finalTime.getDate() + parseInt(item.Duration.day))

            //do receive medicine
            var quantity = parseFloat(item.Quantity.split(" ")[0])
            var dispense = parseFloat(item.Dispend)
            item.Dispend = parseFloat(dispense*100/quantity).toFixed(2).toString()  

            //do using medicine            
            var usingMed = currentTime-dispenseTime
            var allMed = finalTime-dispenseTime
            item.Using = parseFloat(usingMed*100/allMed).toFixed(2).toString()
            if(item.Using > item.Dispend) item.Using = item.Dispend
            else if(item.Using <0) item.Using = 0
            
            //next receive medicine
            if(item.DispendStatus == 'done') item.nextReceiveMedicine = "Received All Medicine"
            else {
              item.nextReceiveMedicine = new Date(item.DispendStatus).toDateString()
            }

            //get doctor info
            item.DoctorName = 'Loading'
            doctorServices.doctorInfo(item.DoctorID).then(result => {    
              item.DoctorName = result.data[0].Firstname + ' ' + result.data[0].Lastname
              item.DoctorWard = result.data[0].Department
            })

            //get pharmacist info
            item.PharmacistID.forEach(phar =>{
              doctorServices.pharmacistInfo(phar.ID).then(result => {
                if(result.data[0])  {       
                  phar.Name = result.data[0].Firstname + ' ' + result.data[0].Lastname
                } else {
                  phar.Name = "-"
                }
              })
            }) 

            //separate table
            if(item.DispendStatus == 'done'){ 
              //separate using and stop using
              if(item.Using != 100){
                item.UsingStatus = "Using"  
                this.users.push(item) 
              } else {
                item.UsingStatus = "Stop Using"  
                this.users2.push(item) 
              } 
            }
            else{
              //separate Incomplete ,waiting dispense and Using  
              if(dispenseNextTime-currentTime >= 0){
                //separate waiting dispense and using 
                if(item.Dispend == 0) {
                  item.UsingStatus = "Waiting Dispense"
                } else {
                  item.UsingStatus = "Using"
                }
                this.users.push(item) 
              } else {
                item.UsingStatus = "Incomplete"  
                this.users2.push(item) 
              }                             
            }
            
            //update response data to Table 
            if(i == Response.data.length-1) {
              console.log("Last item")
              console.log(this.users)
            }     
          })          
      })  
    }

  }

</script>

<style lang="css" scoped>
</style>
