<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary" md-elevation="0" style="background-color:#5DBFA8;">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!(Window_Width>600)">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Smart Drug Use</span>
      </md-app-toolbar>

      <!--menu card-->
      <md-app-drawer md-permanent="card" :md-active.sync="menuVisible" class="menu_color">
        <md-toolbar class="md-transparent" md-elevation="0">
          <div class="md-toolbar-section-end">
            <span class="span_center">Menu</span>
            <md-button class="md-icon-button md-dense" @click="toggleMenu" v-if="!(Window_Width>600)">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list class="delete_margin">
          <md-list-item to="/Patient_information" class="unselected">
            <md-icon style="margin-right:10px">account_circle</md-icon>
            <span class="md-list-item-text unselected_text">Patient Information</span>
          </md-list-item>

          <md-list-item to="/Drug_History" class="unselected">
            <md-icon style="margin-right:10px">folder_shared</md-icon>
            <span class="md-list-item-text unselected_text">Drug History</span>
          </md-list-item>

          <md-list-item to="/Drug_Information" class="selected">
            <md-icon style="margin-right:10px">description</md-icon>
            <span class="md-list-item-text selected_text">Drug Information</span>
          </md-list-item>

          <md-list-item to="/Drug_Interaction" class="unselected">
            <md-icon style="margin-right:10px">bubble_chart</md-icon>
            <span class="md-list-item-text unselected_text">Drug Interaction</span>
          </md-list-item>

          <md-list-item to="/login" class="unselected">
            <md-icon style="margin-right:10px">power_settings_new</md-icon>
            <span class="md-list-item-text unselected_text">Logout</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <!--content-->
      <md-app-content class="text_all">
        <div class="col-lg-6" style="width:100%;">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3>Drug Name : {{drugName}}</h3>
              <form v-on:submit.prevent="getData">
                <md-field md-clearable class="md-toolbar-section-end textSearch">
                  <md-input placeholder="Search by Drug name..." v-model="drugName" @input="change"></md-input>
                </md-field>
                <md-button type="submit" class="md-raised buttonSearch">search</md-button>
              </form>
              <br>
            </div>

            <!-- content that search -->
            <div class="viewport">
              <md-toolbar :md-elevation="1">
                <span class="md-title">Generic Drug Name</span>
              </md-toolbar>
              <div class="text_padding">
                <p>Paracetamol</p>
              </div>
            </div>

            <div class="viewport">
              <md-toolbar :md-elevation="1">
                <span class="md-title">RxCui ID</span>
              </md-toolbar>
              <div class="text_padding">
                <p>161</p>
              </div>
            </div>

            <div class="viewport">
              <md-toolbar :md-elevation="1">
                <span class="md-title">Other ID</span>
              </md-toolbar>


              <ul class="nav nav-tabs" style="width:100%">
                <li class="active"><a data-toggle="tab" href="#gp">GP</a></li>
                <li><a data-toggle="tab" href="#gpu">GPU</a></li>
                <li><a data-toggle="tab" href="#tp">TP</a></li>
                <li><a data-toggle="tab" href="#tpu">TPU</a></li>
              </ul>

              <div class="tab-content">
                <div v-if="dataID!=null" id="gp" class="tab-pane fade in active text_padding">
                  <div class="text-center">
                    <ul class="pagination nav" v-if="dataID.GP.length%10 != 0">
                      <li class="active"><a :href="'#gp'+1" data-toggle="tab">1</a></li>
                      <li v-for="i in (parseInt(dataID.GP.length/10))" :key="i"><a :href="'#gp'+(i+1)" data-toggle="tab">{{i+1}}</a></li>
                    </ul>
                    <ul class="pagination nav" v-if="dataID.GP.length%10 == 0">
                      <li class="active"><a :href="'#gp'+1" data-toggle="tab">1</a></li>
                      <li v-for="i in (parseInt(dataID.GP.length/10)-1)" :key="i"><a :href="'#gp'+(i+1)" data-toggle="tab">{{i+1}}</a></li>
                    </ul>
                  </div>

                  <div class="tab-content">
                    <!--%10 != 0-->
                    <div v-if="dataID.GP.length%10 != 0" v-for="(value,page) in 1" :key="page" :id="'gp'+value" class="tab-pane fade in active">
                      <md-card v-if="parseInt(dataID.GP.length/10) == 0" v-for="(value2,index) in dataID.GP.length%10"
                        :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">GP Name : </div>
                            <div>{{dataID.GP[index].FSN_GPID}}</div>
                            <div class="fsn">GP ID : </div>
                            <div>{{dataID.GP[index].GPID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>

                      <md-card v-if="page == 0 && parseInt(dataID.GP.length/10) > 0" v-for="(value2,index) in 10" :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">GP Name : </div>
                            <div>{{dataID.GP[index+(page*10)].FSN_GPID}}</div>
                            <div class="fsn">GP ID : </div>
                            <div>{{dataID.GP[index+(page*10)].GPID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>
                    </div>

                    <div v-if="dataID.GP.length%10 != 0 && parseInt(dataID.GP.length/10) > 0" v-for="(value,page) in parseInt(dataID.GP.length/10)"
                      :key="page+1" :id="'gp'+(value+1)" class="tab-pane fade">

                      <md-card v-if="parseInt(dataID.GP.length/10) != (page+1)" v-for="(value2,index) in 10" :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">GP Name : </div>
                            <div>{{dataID.GP[index+((page+1)*10)].FSN_GPID}}</div>
                            <div class="fsn">GP ID : </div>
                            <div>{{dataID.GP[index+((page+1)*10)].GPID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>

                      <md-card v-if="parseInt(dataID.GP.length/10) == (page+1)" v-for="(value2,index) in dataID.GP.length%10"
                        :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">GP Name : </div>
                            <div>{{dataID.GP[index+((page+1)*10)].FSN_GPID}}</div>
                            <div class="fsn">GP ID : </div>
                            <div>{{dataID.GP[index+((page+1)*10)].GPID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>
                    </div>


                    <!--%10 == 0-->
                    <div v-if="dataID.GP.length%10 == 0" v-for="(value,page) in 1 " :key="page" :id="'gp'+value" class="tab-pane fade in active">
                      <md-card v-for="(value2,index) in 10" :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">GP Name : </div>
                            <div>{{dataID.GP[index+(page*10)].FSN_GPID}}</div>
                            <div class="fsn">GP ID : </div>
                            <div>{{dataID.GP[index+(page*10)].GPID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>
                    </div>

                    <div v-if="dataID.GP.length%10 == 0 && parseInt(dataID.GP.length/10) > 1" v-for="(value,page) in (parseInt(dataID.GP.length/10)-1) "
                      :key="page+1" :id="'gp'+(value+1)" class="tab-pane fade">
                      <md-card v-for="(value2,index) in 10" :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">GP Name : </div>
                            <div>{{dataID.GP[index+(page*10)].FSN_GPID}}</div>
                            <div class="fsn">GP ID : </div>
                            <div>{{dataID.GP[index+(page*10)].GPID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>
                    </div>
                  </div>
                </div>


                <div v-if="dataID!=null" id="gpu" class="tab-pane fade text_padding">
                  <div class="text-center">
                    <ul class="pagination nav" v-if="dataID.GPU.length%10 != 0">
                      <li class="active"><a :href="'#gpu'+1" data-toggle="tab">1</a></li>
                      <li v-for="i in (parseInt(dataID.GPU.length/10))" :key="i"><a :href="'#gpu'+(i+1)" data-toggle="tab">{{i+1}}</a></li>
                    </ul>
                    <ul class="pagination nav" v-if="dataID.GPU.length%10 == 0">
                      <li class="active"><a :href="'#gpu'+1" data-toggle="tab">1</a></li>
                      <li v-for="i in (parseInt(dataID.GPU.length/10)-1)" :key="i"><a :href="'#gpu'+(i+1)" data-toggle="tab">{{i+1}}</a></li>
                    </ul>
                  </div>

                  <div class="tab-content">
                    <!--%10 != 0-->
                    <div v-if="dataID.GPU.length%10 != 0" v-for="(value,page) in 1" :key="page" :id="'gpu'+value" class="tab-pane fade in active">
                      <md-card v-if="parseInt(dataID.GPU.length/10) == 0" v-for="(value2,index) in dataID.GPU.length%10"
                        :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">GPU Name : </div>
                            <div>{{dataID.GPU[index].FSN_GPUID}}</div>
                            <div class="fsn">GPU ID : </div>
                            <div>{{dataID.GPU[index].GPUID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>

                      <md-card v-if="page == 0 && parseInt(dataID.GPU.length/10) > 0" v-for="(value2,index) in 10" :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">GPU Name : </div>
                            <div>{{dataID.GPU[index+(page*10)].FSN_GPUID}}</div>
                            <div class="fsn">GPU ID : </div>
                            <div>{{dataID.GPU[index+(page*10)].GPUID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>
                    </div>

                    <div v-if="dataID.GPU.length%10 != 0 && parseInt(dataID.GP.length/10) > 0" v-for="(value,page) in parseInt(dataID.GPU.length/10)"
                      :key="page+1" :id="'gpu'+(value+1)" class="tab-pane fade">

                      <md-card v-if="parseInt(dataID.GPU.length/10) != (page+1)" v-for="(value2,index) in 10" :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">GPU Name : </div>
                            <div>{{dataID.GPU[index+((page+1)*10)].FSN_GPUID}}</div>
                            <div class="fsn">GPU ID : </div>
                            <div>{{dataID.GPU[index+((page+1)*10)].GPUID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>

                      <md-card v-if="parseInt(dataID.GPU.length/10) == (page+1)" v-for="(value2,index) in dataID.GPU.length%10"
                        :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">GPU Name : </div>
                            <div>{{dataID.GPU[index+((page+1)*10)].FSN_GPUID}}</div>
                            <div class="fsn">GPU ID : </div>
                            <div>{{dataID.GPU[index+((page+1)*10)].GPUID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>
                    </div>


                    <!--%10 == 0-->
                    <div v-if="dataID.GPU.length%10 == 0" v-for="(value,page) in 1 " :key="page" :id="'gpu'+value" class="tab-pane fade in active">
                      <md-card v-for="(value2,index) in 10" :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">GPU Name : </div>
                            <div>{{dataID.GPU[index+(page*10)].FSN_GPUID}}</div>
                            <div class="fsn">GPU ID : </div>
                            <div>{{dataID.GPU[index+(page*10)].GPUID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>
                    </div>

                    <div v-if="dataID.GPU.length%10 == 0 && parseInt(dataID.GPU.length/10) > 1" v-for="(value,page) in (parseInt(dataID.GPU.length/10)-1) "
                      :key="page+1" :id="'gpu'+(value+1)" class="tab-pane fade">
                      <md-card v-for="(value2,index) in 10" :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">GPU Name : </div>
                            <div>{{dataID.GPU[index+(page*10)].FSN_GPUID}}</div>
                            <div class="fsn">GPU ID : </div>
                            <div>{{dataID.GPU[index+(page*10)].GPUID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>
                    </div>
                  </div>
                </div>


                <div v-if="dataID!=null" id="tp" class="tab-pane fade text_padding">
                  <div class="text-center">
                    <ul class="pagination nav" v-if="dataID.TP.length%10 != 0">
                      <li class="active"><a :href="'#tp'+1" data-toggle="tab">1</a></li>
                      <li v-for="i in (parseInt(dataID.TP.length/10))" :key="i"><a :href="'#tp'+(i+1)" data-toggle="tab">{{i+1}}</a></li>
                    </ul>
                    <ul class="pagination nav" v-if="dataID.TP.length%10 == 0">
                      <li class="active"><a :href="'#tp'+1" data-toggle="tab">1</a></li>
                      <li v-for="i in (parseInt(dataID.TP.length/10)-1)" :key="i"><a :href="'#tp'+(i+1)" data-toggle="tab">{{i+1}}</a></li>
                    </ul>
                  </div>

                  <div class="tab-content">
                    <!--%10 != 0-->
                    <div v-if="dataID.TP.length%10 != 0" v-for="(value,page) in 1" :key="page" :id="'tp'+value" class="tab-pane fade in active">
                      <md-card v-if="parseInt(dataID.TP.length/10) == 0" v-for="(value2,index) in dataID.TP.length%10"
                        :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">TP Name : </div>
                            <div>{{dataID.TP[index].FSN_TPID}}</div>
                            <div class="fsn">TP ID : </div>
                            <div>{{dataID.TP[index].TPID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>

                      <md-card v-if="page == 0 && parseInt(dataID.TP.length/10) > 0" v-for="(value2,index) in 10" :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">TP Name : </div>
                            <div>{{dataID.TP[index+(page*10)].FSN_TPID}}</div>
                            <div class="fsn">TP ID : </div>
                            <div>{{dataID.TP[index+(page*10)].TPID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>
                    </div>

                    <div v-if="dataID.TP.length%10 != 0 && parseInt(dataID.GP.length/10) > 0" v-for="(value,page) in parseInt(dataID.TP.length/10)"
                      :key="page+1" :id="'tp'+(value+1)" class="tab-pane fade">

                      <md-card v-if="parseInt(dataID.TP.length/10) != (page+1)" v-for="(value2,index) in 10" :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">TP Name : </div>
                            <div>{{dataID.TP[index+((page+1)*10)].FSN_TPID}}</div>
                            <div class="fsn">TP ID : </div>
                            <div>{{dataID.TP[index+((page+1)*10)].TPID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>

                      <md-card v-if="parseInt(dataID.TP.length/10) == (page+1)" v-for="(value2,index) in dataID.TP.length%10"
                        :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">TP Name : </div>
                            <div>{{dataID.TP[index+((page+1)*10)].FSN_TPID}}</div>
                            <div class="fsn">TP ID : </div>
                            <div>{{dataID.TP[index+((page+1)*10)].TPID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>
                    </div>


                    <!--%10 == 0-->
                    <div v-if="dataID.TP.length%10 == 0" v-for="(value,page) in 1 " :key="page" :id="'tp'+value" class="tab-pane fade in active">
                      <md-card v-for="(value2,index) in 10" :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">TP Name : </div>
                            <div>{{dataID.TP[index+(page*10)].FSN_TPID}}</div>
                            <div class="fsn">TP ID : </div>
                            <div>{{dataID.TP[index+(page*10)].TPID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>
                    </div>

                    <div v-if="dataID.TP.length%10 == 0 && parseInt(dataID.TP.length/10) > 1" v-for="(value,page) in (parseInt(dataID.TP.length/10)-1) "
                      :key="page+1" :id="'tp'+(value+1)" class="tab-pane fade">
                      <md-card v-for="(value2,index) in 10" :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">TP Name : </div>
                            <div>{{dataID.TP[index+(page*10)].FSN_TPID}}</div>
                            <div class="fsn">TP ID : </div>
                            <div>{{dataID.TP[index+(page*10)].TPID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>
                    </div>
                  </div>
                </div>


                <div v-if="dataID!=null" id="tpu" class="tab-pane fade text_padding">
                  <div class="text-center">
                    <ul class="pagination nav" v-if="dataID.TPU.length%10 != 0">
                      <li class="active"><a :href="'#tpu'+1" data-toggle="tab">1</a></li>
                      <li v-for="i in (parseInt(dataID.TPU.length/10))" :key="i"><a :href="'#tpu'+(i+1)" data-toggle="tab">{{i+1}}</a></li>
                    </ul>
                    <ul class="pagination nav" v-if="dataID.TPU.length%10 == 0">
                      <li class="active"><a :href="'#tpu'+1" data-toggle="tab">1</a></li>
                      <li v-for="i in (parseInt(dataID.TPU.length/10)-1)" :key="i"><a :href="'#tpu'+(i+1)" data-toggle="tab">{{i+1}}</a></li>
                    </ul>
                  </div>

                  <div class="tab-content">
                    <!--%10 != 0-->
                    <div v-if="dataID.TPU.length%10 != 0" v-for="(value,page) in 1" :key="page" :id="'tpu'+value" class="tab-pane fade in active">
                      <md-card v-if="parseInt(dataID.TPU.length/10) == 0" v-for="(value2,index) in dataID.TPU.length%10"
                        :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">TPU Name : </div>
                            <div>{{dataID.TPU[index].FSN_TPUID}}</div>
                            <div class="fsn">TPU ID : </div>
                            <div>{{dataID.TPU[index].TPUID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>

                      <md-card v-if="page == 0 && parseInt(dataID.TPU.length/10) > 0" v-for="(value2,index) in 10" :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">TPU Name : </div>
                            <div>{{dataID.TPU[index+(page*10)].FSN_TPUID}}</div>
                            <div class="fsn">TPU ID : </div>
                            <div>{{dataID.TPU[index+(page*10)].TPUID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>
                    </div>

                    <div v-if="dataID.TPU.length%10 != 0 && parseInt(dataID.GP.length/10) > 0" v-for="(value,page) in parseInt(dataID.TPU.length/10)"
                      :key="page+1" :id="'tpu'+(value+1)" class="tab-pane fade">

                      <md-card v-if="parseInt(dataID.TPU.length/10) != (page+1)" v-for="(value2,index) in 10" :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">TPU Name : </div>
                            <div>{{dataID.TPU[index+((page+1)*10)].FSN_TPUID}}</div>
                            <div class="fsn">TPU ID : </div>
                            <div>{{dataID.TPU[index+((page+1)*10)].TPUID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>

                      <md-card v-if="parseInt(dataID.TPU.length/10) == (page+1)" v-for="(value2,index) in dataID.TPU.length%10"
                        :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">TPU Name : </div>
                            <div>{{dataID.TPU[index+((page+1)*10)].FSN_TPUID}}</div>
                            <div class="fsn">TPU ID : </div>
                            <div>{{dataID.TPU[index+((page+1)*10)].TPUID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>
                    </div>


                    <!--%10 == 0-->
                    <div v-if="dataID.TPU.length%10 == 0" v-for="(value,page) in 1 " :key="page" :id="'tpu'+value" class="tab-pane fade in active">
                      <md-card v-for="(value2,index) in 10" :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">TPU Name : </div>
                            <div>{{dataID.TPU[index+(page*10)].FSN_TPUID}}</div>
                            <div class="fsn">TPU ID : </div>
                            <div>{{dataID.TPU[index+(page*10)].TPUID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>
                    </div>

                    <div v-if="dataID.TPU.length%10 == 0 && parseInt(dataID.TPU.length/10) > 1" v-for="(value,page) in (parseInt(dataID.TPU.length/10)-1) "
                      :key="page+1" :id="'tpu'+(value+1)" class="tab-pane fade">
                      <md-card v-for="(value2,index) in 10" :key="index">
                        <md-card-header>
                          <md-card-header-text>
                            <div class="fsn">TPU Name : </div>
                            <div>{{dataID.TPU[index+(page*10)].FSN_TPUID}}</div>
                            <div class="fsn">TPU ID : </div>
                            <div>{{dataID.TPU[index+(page*10)].TPUID}}</div>
                          </md-card-header-text>
                        </md-card-header>
                      </md-card>
                    </div>
                  </div>
                </div>

              </div>

              <md-divider></md-divider>
            </div>

            <div class="viewport">
              <md-toolbar :md-elevation="1">
                <span class="md-title">ATC</span>
              </md-toolbar>
              <div class="text_padding">
                <p>ATC ID : 1234567</p>
                <p>Description : xxx</p>
              </div>
            </div>

            <div class="viewport">
              <md-toolbar :md-elevation="1">
                <span class="md-title">Barcode</span>
              </md-toolbar>
              <md-subheader class="md-primary">Barcode ID</md-subheader>
              <div class="text_padding">
                <p>Barcode ID : 1234567</p>
              </div>
              <md-divider></md-divider>
              <md-subheader class="md-primary">Barcode Picture</md-subheader>
              <div class="text_padding">
                <img src="../assets/logo.png" alt="Barcode" width="50" height="50">
              </div>
            </div>

            <div class="viewport">
              <md-toolbar :md-elevation="1">
                <span class="md-title">More Information</span>
              </md-toolbar>
              <div class="text_padding">
                <p>Website : http.....</p>
              </div>
            </div>

          </div>
        </div>
      </md-app-content>
    </md-app>
  </div>

</template>

<script>
  // eslint-disable-next-line 
  /* eslint-disable */
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
      loading: false, //true when you have to wait for call API
      dataID: null //data GP GPU TP TPU
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
      await axios.get(
          `http://localhost:8082/info/paracetamol`)
        .then(Response => {
          this.dataID = Response.data
        });
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

  .text_padding {
    padding: 20px;
    overflow: auto;
  }

  #md-drawer md-app-drawer menu_color md-theme-default md-left md-permanent md-permanent-card {
    margin-top: 22px;
  }

  .md-card {
    display: inline-block;
    margin: 10px;
    width: 175px;
  }

  .fsn {
    font-weight: bold;
  }

</style>
