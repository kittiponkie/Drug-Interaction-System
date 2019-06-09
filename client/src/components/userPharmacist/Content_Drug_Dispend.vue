<template>
  <div>
    <!--header-->
    <md-card style="padding-left: 0px;">
      <md-card-header>
        <md-card-header-text>
          <h2 style="text-align:center;">จ่ายยา</h2>
          <h4 style="text-align:left;">ผู้ป่วย : {{patient.Firstname}} {{patient.Lastname}}</h4>
          <h4 style="text-align:left;">เภสัชกร : {{doctor.Firstname}} {{doctor.Lastname}}</h4>
          <!--confirm button-->
          <div style="margin-left:5px;margin-right:5px;">
            <md-dialog :md-active.sync="showDialogCheck" style="overflow:auto">
              <md-dialog-title>ยาที่กำลังใช้</md-dialog-title>
              <md-table v-model="users" md-sort="DrugNO" md-sort-order="asc" md-card>
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
                <md-button class="md-primary" @click="restartConfirm()">ปิด</md-button>
              </md-dialog-actions>
            </md-dialog>
            <md-button v-if="searched && searched.length!=0" class="md-primary md-raised" @click="onCheckClick()" style="background-color:#05AB00">ตรวจสอบปฏิกิริยาระหว่างยาที่ใช้</md-button>
            <md-button v-else class="md-primary md-raised" @click="onCheckClick()" disabled>ตรวจสอบปฏิกิริยาระหว่างยาที่ใช้</md-button>
          </div>
        </md-card-header-text>
         
      </md-card-header>
    </md-card>

    <!--Table-->
    <md-table v-model="searched" md-sort="GPName" md-sort-order="asc" md-card style="margin-bottom:10px;">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">ยาที่กำลังใช้</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="ค้นหา..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state md-label="ไม่พบรายการที่ค้นหา" :md-description="`ไม่พบรายการยาที่ค้นหา '${search}' กรุณาลองใหม่อีกครั้ง`"></md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="หมายเลขคำสั่งยา" md-sort-by="OrderID" md-numeric>{{ item.OrderID }}</md-table-cell>
        <md-table-cell md-label="ชื่อยา" md-sort-by="GPName">{{ item.GPName }}</md-table-cell>
        <md-table-cell md-label="แพทย์" md-sort-by="DoctorID">{{ item.DoctorName }}</md-table-cell>
        <md-table-cell md-label="สถานะ" md-sort-by="UsingStatus">{{ item.UsingStatus }}</md-table-cell>
        <md-table-cell md-label="Interaction with">
          <md-progress-spinner v-if="item.statusDetail=='load' || loadingAll" :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
          <h6 v-else v-for="(value,index) in item.detail.interaction" :key="index">{{value}}</h6>
        </md-table-cell>
        <md-table-cell md-label="ปริมาณยาที่ได้รับ" md-sort-by="Dispend2">
          <b-progress :value="parseFloat(item.Dispend2)" striped show-value class="mb-3"></b-progress>
        </md-table-cell>
        <md-table-cell md-label="วันที่เริ่มใช้ยา" md-sort-by="DispendStartDate">{{ item.DispendStartDate }}</md-table-cell>
        <md-table-cell md-label="ข้อมูลเพิ่มเติม">
          <md-button @click="showDetail(item)" class="md-icon-button md-dense">
            <md-icon>assignment</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell md-label="Dispense">
          <md-button v-if="item.Dispend2 != '100.00'" @click="dispensing(item)" class="md-icon-button md-dense">
            <md-icon>ballot</md-icon>
          </md-button>
          <md-button v-else disabled class="md-icon-button md-dense">
            <md-icon>ballot</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <!--Table2-->
    <md-table v-model="searched2" md-sort="UsingStatus" md-sort-order="asc" md-card style="margin-bottom:10px;">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">ยาที่หยุดใช้</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="ค้นหา..." v-model="search2" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state md-label="No Order Found" :md-description="`No order found for this '${search2}' query. Try a different search term.`"></md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="หมายเลขคำสั่งยา" md-sort-by="OrderID" md-numeric>{{ item.OrderID }}</md-table-cell>
        <md-table-cell md-label="ชื่อยา" md-sort-by="GPName">{{ item.GPName }}</md-table-cell>
        <md-table-cell md-label="แพทย์" md-sort-by="DoctorID">{{ item.DoctorName }}</md-table-cell>
        <md-table-cell md-label="สถานะ" md-sort-by="UsingStatus">{{ item.UsingStatus }}</md-table-cell>
        <md-table-cell md-label="ปริมาณยาที่ได้รับ" md-sort-by="Dispend">
          <b-progress :value="parseFloat(item.Dispend2)" striped show-value class="mb-3"></b-progress>
        </md-table-cell>
        <md-table-cell md-label="วันที่เริ่มใช้ยา" md-sort-by="DispendStartDate">{{ item.DispendStartDate }}</md-table-cell>
        <md-table-cell md-label="ปริมาณยาที่ใช้ไป" md-sort-by="Dispend">
          <b-progress :value="parseFloat(item.Using)" striped show-value class="mb-3"></b-progress>
        </md-table-cell>
        <md-table-cell md-label="Detail">
          <md-button @click="showDetail(item)" class="md-icon-button md-dense">
            <md-icon>assignment</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <!--Detail Dialog-->
    <md-dialog :md-active.sync="showDialog">
      <md-card class="md-layout-item">
        <md-card-header style="padding :20px;">
          <div class="md-title">ข้อมูลเพิ่มเติม</div>
        </md-card-header>
        <md-card-content style="padding-bottom:0px;" class="md-scrollbar">

          <md-speed-dial md-effect="scale" class="md-top-right" md-direction="bottom">
            <md-speed-dial-target class="md-primary">
              <md-icon class="md-morph-initial">folder</md-icon>
              <md-icon class="md-morph-final">folder_open</md-icon>
            </md-speed-dial-target>

            <md-speed-dial-content>
              <md-button class="md-icon-button" @click="dialogShift = 'General'">
                <md-avatar>
                  <md-icon>person</md-icon>
                  <md-tooltip md-direction="left">ข้อมูลทั่วไป</md-tooltip>
                </md-avatar>
              </md-button>

              <md-button class="md-icon-button" @click="dialogShift = 'Doctor'">
                <md-avatar>
                  <md-icon>person</md-icon>
                  <md-tooltip md-direction="left">แพทย์</md-tooltip>
                </md-avatar>
              </md-button>

              <md-button class="md-icon-button" @click="dialogShift = 'Pharmacist'">
                <md-avatar>
                  <md-icon>person</md-icon>
                  <md-tooltip md-direction="left">เภสัชกร</md-tooltip>
                </md-avatar>
              </md-button>
            </md-speed-dial-content>
          </md-speed-dial>

          <md-tabs md-dynamic-height v-if="dialogShift == 'General'">
            <md-tab md-label="General">
              <form>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">หมายเลขคำสั่งยา :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.OrderID"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">ชื่อยา (GP) :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.GPName"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">รหัส RXcui :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.RXCUI"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">สถานะ :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.UsingStatus"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">จำนวนโดส :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.Dosage"></div>
                </div>

                <div class="md-layout textInDialog" v-for="(i,index) in itemDialog.Frequency" v-bind:key="index">
                  <div class="md-layout-item"><label style="min-width:180px;" v-if="index == 0">ความถี่ : </label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="i"></div>  
                </div>

                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">ระยะเวลาการใช้ยา :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.Duration"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">ปริมาณ :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.Quantity"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">ปริมาณยาที่ได้รับ(%) :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.Dispend"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">ปริมาณยาที่ใช้ไป(%) :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.Using"></div>
                </div>                
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">วันเริ่มทานยา :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.DispendStartDate"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">วันรับยาครั้งถัดไป :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.nextReceiveMedicine"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">บันทึก :</label></div>
                  <div class="md-layout-item"> <textarea class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly v-model="itemDialog.Description"></textarea></div>
                </div>
                <md-card-actions style="padding:0px;padding-bottom:8px;padding-top:8px;">
                  <md-button class="md-primary" @click="showDialog = false">ปิด</md-button>
                </md-card-actions>
              </form>
            </md-tab>
          </md-tabs>
          <md-tabs md-dynamic-height v-if="dialogShift == 'Doctor'">
            <md-tab md-label="Doctor">
              <form>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">หมายเลขประจำตัวแพทย์ :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.DoctorID"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">แพทย์ :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.DoctorName"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">แผนก :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.DoctorWard"></div>
                </div>
                <md-card-actions style="padding:0px;padding-bottom:8px;padding-top:8px;">
                  <md-button class="md-primary" @click="showDialog = false">ปิด</md-button>
                </md-card-actions>
              </form>
            </md-tab>
          </md-tabs>
          <md-tabs md-dynamic-height v-if="dialogShift == 'Pharmacist'">
            <md-tab md-label="Pharmacist">
              <form>
                <div v-for="index in itemDialog.PharmacistID.length" :key="index">
                <label v-if="itemDialog.PharmacistID.length>1">{{index}}.</label>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">หมายเลขประจำตัวเภสัชกร :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.PharmacistID[index-1].ID"></div>
                </div>
                <div class="md-layout textInDialog">
                  <div class="md-layout-item"><label style="min-width:180px;">เภสัชกร :</label></div>
                  <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                      readonly :value="itemDialog.PharmacistID[index-1].Name"></div>
                </div>
                </div>
                <br>
                <br>
                <md-card-actions style="padding:0px;padding-bottom:8px;padding-top:8px;">
                  <md-button class="md-primary" @click="showDialog = false">ปิด</md-button>
                </md-card-actions>
              </form>
            </md-tab>
          </md-tabs>
        </md-card-content>
      </md-card>
    </md-dialog>

    <!--Dispense Dialog-->
    <md-dialog :md-active.sync="showDispenDialog">
      <md-card class="md-layout-item">
        <md-card-header style="padding :20px;">
          <div class="md-title">จ่ายยา</div>
        </md-card-header>
        <md-card-content style="padding-bottom:0px;" class="md-scrollbar">

          <form>
            <div class="md-layout textInDialog">
              <div class="md-layout-item"><label style="min-width:180px;">ชื่อยา (GP) :</label></div>
              <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                  readonly :value="itemDispenseDialog.GPName"></div>
            </div>
            <div class="md-layout textInDialog">
              <div class="md-layout-item"><label style="min-width:180px;">ปริมาณ({{itemDispenseDialog.Dosage.unit}})
                  :</label></div>
              <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                  readonly :value="itemDispenseDialog.Quantity"></div>
            </div>
            <div class="md-layout textInDialog">
              <div class="md-layout-item"><label style="min-width:180px;">ปริมาณยาที่ได้รับ({{itemDispenseDialog.Dosage.unit}}) :</label></div>
              <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                  readonly :value="itemDispenseDialog.Dispend"></div>
            </div>
            <div class="md-layout textInDialog">
              <div class="md-layout-item"><label style="min-width:180px;">ปริมาณยาที่ยังไม่ได้รับ({{itemDispenseDialog.Dosage.unit}}) :</label></div>
              <div class="md-layout-item"> <input class="form-control" type="text" placeholder="-" style="min-width:260px;"
                  readonly :value="itemDispenseDialog.Remaining"></div>
            </div>
            <div class="md-layout textInDialog">
              <div class="md-layout-item"><label style="min-width:180px;">การจ่ายยา({{itemDispenseDialog.Dosage.unit}}) :</label></div>
              <div class="md-layout-item"> <input class="form-control" type="number" min="0" :max="itemDispenseDialog.Remaining" placeholder="Enter Number" style="min-width:260px;"
                  v-model="itemDispenseDialog.Dispensing"></div>
            </div>
            <div class="md-layout textInDialog">
              <label>เลือกวันที่จ่ายยา</label>    
              <md-datepicker v-model="itemDispenseDialog.DispendStatus" md-immediately>
                <label>เลือกวันที่จ่ายยา</label>
              </md-datepicker>
            </div>            
            <md-card-actions style="padding:0px;padding-bottom:8px;padding-top:8px;">
              <md-button class="md-primary" @click="saveDispensing()">บันทึก</md-button>
              <md-button class="md-primary" @click="showDispenDialog = false">ปิด</md-button>              
            </md-card-actions>
          </form>
        </md-card-content>
      </md-card>
    </md-dialog>

     <md-dialog :md-active.sync="showErrorDialog">
      <md-card class="md-layout-item">
        <md-card-header style="padding :20px;">
          <div class="md-title">ข้อความ</div>
        </md-card-header>
        <md-card-content style="padding-bottom:0px;" class="md-scrollbar">
          {{messageError}}
          <md-card-actions style="padding:0px;padding-bottom:8px;padding-top:8px;">
            <md-button class="md-primary" @click="reloadPage()">ปิด</md-button>              
          </md-card-actions>
        </md-card-content>
      </md-card>
     </md-dialog>
     
  </div>
</template>

<script>
  const toLower = text => {
    return text.toString().toLowerCase();
  };
  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => {        
        if (item.OrderID && toLower(item.OrderID).includes(toLower(term))) return item
        else if (item.GPName && toLower(item.GPName).includes(toLower(term))) return item
        else if (item.DoctorName && toLower(item.DoctorName).includes(toLower(term))) return item
        else if (item.UsingStatus && toLower(item.UsingStatus).includes(toLower(term))) return item
        else if (item.Dispend2 && toLower(item.Dispend2).includes(toLower(term))) return item  
        else if (item.Using && toLower(item.Using).includes(toLower(term))) return item              
      })  
    }
    return items;
  };
  import pharmacistServices from '@/services/pharmacist'
  import axios from "axios";
  export default {
    name: "Drug_Interaction",
    data: () => ({
      //header
      patient: [],
      doctor: [],
      //table using ,waiting dispense
      search: null,
      searched: [],
      users: [],
      //table stop using ,incomplete
      search2: null,
      searched2: [],
      users2: [],
      //detail dialog
      showDialog: false,
      itemDialog: {
        Dosage: {
          unit: null
        }
      },
      dialogShift: "General",
      //dispense dialog
      showDispenDialog: false,
      itemDispenseDialog: {
        Dosage: {
          unit: null
        }
      },
      showErrorDialog: false,
      messageError: "" ,
      //check interaction
      showDialogCheck: false,
      allergicOfPatient: [],
      loadingAll: false,
      //check interaction in table
      checkInteractionTable: true
    }),
    methods: {
      //detail dialog
      showDetail(item) {
        this.dialogShift = "General"
        this.showDialog = true
        this.itemDialog = JSON.parse(JSON.stringify(item));

        //do dosage
        this.itemDialog.Dosage = this.itemDialog.Dosage.dose + " " + this.itemDialog.Dosage.unit

        //do frequency        
        this.itemDialog.Frequency = []
        if (item.Frequency.mor == "true") this.itemDialog.Frequency.push("Morning(เช้า)")
        if (item.Frequency.aft == "true") this.itemDialog.Frequency.push("Afternoon(กลางวัน)")
        if (item.Frequency.eve == "true") this.itemDialog.Frequency.push("Evening(เย็น)")
        if (item.Frequency.bed == "true") this.itemDialog.Frequency.push("Before Bed(ก่อนนอน)")
        if (item.Frequency.before == "true") this.itemDialog.Frequency.push("Before Meal(ก่อนอาหาร)")
        if (item.Frequency.after == "true") this.itemDialog.Frequency.push("After Meal(หลังอาหาร)")
        if (item.Frequency.symptoms == "true") this.itemDialog.Frequency.push("Symptoms(ตามอาการ)")

        //do duration
        this.itemDialog.Duration = ""
        if (item.Duration.year != "0") this.itemDialog.Duration += item.Duration.year + " year "
        if (item.Duration.month != "0") this.itemDialog.Duration += item.Duration.month + " month "
        if (item.Duration.day != "0") this.itemDialog.Duration += item.Duration.day + " day"
        if (item.Duration.year == "0" && item.Duration.month == "0" && item.Duration.day == "0") this.itemDialog.Duration =
          "0"
      },
      //dispense dialog
      dispensing(item) {
        this.showDispenDialog = true
        this.itemDispenseDialog = JSON.parse(JSON.stringify(item));
        this.itemDispenseDialog.Remaining = (parseInt(item.Quantity) - parseInt(item.Dispend)).toString()
        this.itemDispenseDialog.Dispensing = ""
      },
      async saveDispensing(){
        console.log(this.itemDispenseDialog)
        if(this.itemDispenseDialog.Dispensing == ""){
          this.showErrorDialog = true
          this.messageError = "กรุณากรอกจำนวนยาด้วยครับ"
        }
        else if(this.itemDispenseDialog.Dispensing ==0){
          this.showErrorDialog = true
          this.messageError = "กรุณากรอกจำนวนยาด้วยครับ"
        }
        else if(parseInt(this.itemDispenseDialog.Dispensing) <0){
          this.showErrorDialog = true
          this.messageError = "จ่ายยาด้วยจำนวนเต็มบวกด้วยครับ"
        }
        else {
          var dispense = parseInt(this.itemDispenseDialog.Dispend) + parseInt(this.itemDispenseDialog.Dispensing)
          var quantity = parseInt(this.itemDispenseDialog.Quantity)
          if(quantity < dispense){
            this.showErrorDialog = true
            this.messageError = "จ่ายยาเกินแพทย์สั่งครับ"
          } else {
            this.showErrorDialog = true
            this.messageError = "จ่ายยาเรียบร้อยครับ"  
            this.itemDispenseDialog.Dispend = dispense.toString() 
            if(quantity == dispense)  this.itemDispenseDialog.DispendStatus = 'done'
            
            var pharid = ''
            if(this.itemDispenseDialog.PharmacistID != [])
            {
              var findPhar = await this.itemDispenseDialog.PharmacistID.find(item=>{
                if(pharid!='') pharid += ','
                pharid += item.ID
                return item.ID == this.doctor.PharmacistID 
              })
              if(findPhar) console.log("found")
              else {
                pharid += this.doctor.PharmacistID 
              }
            } else {
              pharid += this.doctor.PharmacistID 
            }            
            this.itemDispenseDialog.PharmacistID = pharid
            console.log(pharid)
            await pharmacistServices.dispense(this.itemDispenseDialog.OrderID,this.itemDispenseDialog.DrugNo,this.itemDispenseDialog).then(Response => {
              console.log(Response.data)
            })    
          }
        }
      },
      reloadPage(){
        var dispense = parseInt(this.itemDispenseDialog.Dispend) 
        var quantity = parseInt(this.itemDispenseDialog.Quantity)
        if(quantity < dispense || this.itemDispenseDialog.Dispensing == "" || this.itemDispenseDialog.Dispensing == 0 || parseInt(this.itemDispenseDialog.Dispensing) <0){
          this.showErrorDialog = false
          console.log("test",dispense,quantity)
        } else { 
          window.location.reload();        
        }       
      },
      //table
      searchOnTable() {
        this.searched = searchByName(this.users, this.search);
        this.searched2 = searchByName(this.users2, this.search2);
      },
      //check interaction
      //confirm click
      async onCheckClick(){
        if(!this.checkInteractionTable) {
          this.showDialogCheck = true          
          this.loadingAll = true
        }
        else this.checkInteractionTable = false
        console.log("load")
        //set load
        await this.users.forEach(item=>{
          item.statusDetail = 'load'
          item.detail.interaction = []
          item.detail.allergic = []
          item.detail.timeConflict = []
        })

        //check Duplicate Drugs 
        await this.users.forEach(item=>{
          var drugName = item.GPName.split(' ') 
          this.checkDuplicateDrugs(drugName,item)        
        }) 

        //check allergic
        await this.allergicOfPatient.forEach(element => {
          ;//console.log("allergic ",element)
          var temp = []
          axios.get(`http://localhost:8082/Allergic/`+element).then(Response => {          
            ;//console.log('gpid ',Response.data.GP)
            temp = Response.data.GP
          }).then(()=>{            
            this.users.forEach(item=>{
              axios.get(`http://localhost:8082/Allergic/GP/`+item.GPName).then(Response2 => {
                //;//console.log('gpid of gpname',Response2.data.GP[0].GPID)
                var temp2 = []
                temp2 = Response2.data.GP[0].GPID
                temp.forEach(gpidItem=>{
                  if(gpidItem.GPID==temp2) {
                    ;//console.log("ALLERGIC NOW!!!! ",element)
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
        await this.users.forEach(this.checkInteraction) 
      },
      async checkInteraction(item){
        var drugName = item.GPName.split(' ')
        var rxcui = ''
        await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=`+drugName[0]).then(Response => {  
          if(Response.data.idGroup.rxnormId) {
            rxcui = Response.data.idGroup.rxnormId[0].toString()
            item.RXCUI = Response.data.idGroup.rxnormId[0].toString()
          }
          else ;
        })  
        await this.users.forEach(itemDrugs=>{
          pharmacistServices.checkInteraction(rxcui,itemDrugs.RXCUI).then(result => {
            if(result.data.success) {                        
              var startTime = new Date(itemDrugs.DispendStartDate)
              var finalTime = new Date(itemDrugs.DispendStartDate)
              finalTime.setFullYear(finalTime.getFullYear() + parseInt(itemDrugs.Duration.year),
                                    finalTime.getMonth() + parseInt(itemDrugs.Duration.month),
                                    finalTime.getDate() + parseInt(itemDrugs.Duration.day)) 
              var start = new Date(item.DispendStartDate)
              var final = new Date(item.DispendStartDate)
              final.setFullYear(final.getFullYear() + parseInt(item.Duration.year),
                                    final.getMonth() + parseInt(item.Duration.month),
                                    final.getDate() + parseInt(item.Duration.day)) 
              if(startTime - start < 0){    
                if(start - finalTime<=0) this.detailInteraction(item,itemDrugs)                
              } else if(startTime - start == 0) {
                this.detailInteraction(item,itemDrugs) 
              } else {
                if(startTime - final <=0) this.detailInteraction(item,itemDrugs)  
              }            
            }
          }) 
        })      
        if(this.users[this.users.length-1] == item) {
          this.users.forEach(item=>{
            if(item.statusDetail == 'load') item.statusDetail = ""
          })
          this.loadingAll = false
        }  
      },
      detailInteraction(item,element){
        item.detail.interaction.push(element.OrderID+" "+element.GPName.split(' ')[0])
        if(item.statusDetail == 'load') item.statusDetail = "Interaction"
        else if(item.statusDetail == 'Interaction') ;
        else item.statusDetail = "Both"
        this.searchOnTable()
      },
      async checkDuplicateDrugs(drugName,item){ 
        await this.users.forEach(itemDrugs=>{
          if(itemDrugs != item){
            var a = new Date(item.DispendStartDate)
            var b = new Date(itemDrugs.DispendStartDate)
            if(b-a<=0){
              var finalTime = new Date(itemDrugs.DispendStartDate)
              finalTime.setFullYear(finalTime.getFullYear() + parseInt(itemDrugs.Duration.year),
                                    finalTime.getMonth() + parseInt(itemDrugs.Duration.month),
                                    finalTime.getDate() + parseInt(itemDrugs.Duration.day))      
              if(itemDrugs.GPName.split(' ')[0] == drugName[0]) {
                if(item.DispendStartDate - finalTime <= 0){
                  var suggestTime = finalTime
                  suggestTime.setFullYear(suggestTime.getFullYear(),
                                        suggestTime.getMonth(),
                                        suggestTime.getDate() + 1)   
                  item.detail.timeConflict.push(itemDrugs.OrderID+" "+ itemDrugs.GPName+" แนะนำให้เริ่มสั่งได้วัน "+suggestTime.toDateString())  
                  item.statusDetail = "Time Conflict"          
                }
              }
            }
          }
        })
      },
      async restartConfirm(){
        this.showDialogCheck = false
        await this.users.forEach(item=>{
          /*item.statusDetail = ""
          item.detail = {
            allergic: [],
            interaction: [],
            timeConflict: []
          }*/
        })
      },
    },
    async mounted() {
      //console.log(this.$localStorage.get('doctor_patient'))
      await pharmacistServices.patientInfo(this.$localStorage.get('pharmacist_patient')).then(Response => {
        console.log(Response.data[0])
        this.patient = Response.data[0]
      })

      await pharmacistServices.pharmacistInfo(this.$localStorage.get('userID')).then(Response => {
        console.log(Response.data[0])
        this.doctor = Response.data[0]
      })

      await pharmacistServices.getOrderId(this.$localStorage.get('pharmacist_patient'), this.$localStorage.get('userID')).then(Response => {
        console.log(Response.data)    
        Response.data.forEach((item,i) =>{
          //set check interaction                     
          item.detail = {
            allergic: [],
            interaction: [],
            timeConflict: []
          }
          item.statusDetail = ""

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
          item.Dispend2 = parseFloat(dispense*100/quantity).toFixed(2).toString()            

          //do using medicine            
          var usingMed = currentTime-dispenseTime
          var allMed = finalTime-dispenseTime
          item.Using = parseFloat(usingMed*100/allMed).toFixed(2).toString()
          if(item.Using > item.Dispend2) item.Using = item.Dispend2
          else if(item.Using <0) item.Using = 0
          
          //next receive medicine
          if(item.DispendStatus == 'done') item.nextReceiveMedicine = "Received All Medicine"
          else {
            item.nextReceiveMedicine = new Date(item.DispendStatus).toDateString()
          }
          //DispendStartDate
          item.DispendStartDate = new Date(item.DispendStartDate).toDateString()

          //get doctor info
          item.DoctorName = 'Loading'
          pharmacistServices.doctorInfo(item.DoctorID).then(result => {    
            item.DoctorName = result.data[0].Firstname + ' ' + result.data[0].Lastname
            item.DoctorWard = result.data[0].Department
          })

          //get pharmacist info
          if(item.PharmacistID != [])
          {
            item.PharmacistID.forEach(phar =>{
              pharmacistServices.pharmacistInfo(phar.ID).then(result => {
                if(result.data[0])  {       
                  phar.Name = result.data[0].Firstname + ' ' + result.data[0].Lastname
                } else {
                  phar.Name = "-"
                }
              })
            }) 
          }
      
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
            this.searched = this.users
            this.searched2 = this.users2
          }     
        })          
      })

      //get allergic of patient
      await pharmacistServices.allergicOfPatient(this.$localStorage.get('pharmacist_patient')).then(Response => {
        ;//console.log("Allergic drug of patient is ",Response.data)
        for(var i in Response.data){
          this.allergicOfPatient.push(Response.data[i].VTMName)
        }        
      })
      
      await this.onCheckClick()
    }
  };

</script>

<style>
  .textInDialog {
    margin-bottom: 8px;
  }

  .md-app {
    height: calc(100vh);
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

  .md-content md-app-content md-flex md-theme-default {
    padding-top: 23px;
  }

  .md-drawer md-app-drawer menu_color md-theme-default md-left md-permanent md-permanent-card {
    padding-top: 20px;
  }

  #tallModal .modal-body p {
    margin-bottom: 900px
  }

</style>
