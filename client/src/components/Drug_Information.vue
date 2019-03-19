<template>
  <div>
        <div class="col-lg-6" style="width:100%;">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3>Drug Information</h3>              
              <h4>Drug Name : {{drugName}}</h4>
              <form v-on:submit.prevent="getData">
                <md-field md-clearable class="md-toolbar-section-end textSearch">
                  <md-input placeholder="Search by Drug name..." v-model="drugName" @input="change"></md-input>
                </md-field>
                <md-button type="submit" class="md-raised buttonSearch">search</md-button>
              </form>
              <br>
            </div>

            <!-- content that search -->
            <div v-if="searchFinish">
              <div class="viewport">
                <md-toolbar :md-elevation="1">
                  <span class="md-title">Generic Drug Name</span>
                </md-toolbar>
                <div class="text_padding">
                  <p>{{drugName}}</p>
                  <p v-if="found">Other Name : {{drugList[0].interactionConcept[0].sourceConceptItem.name}}</p>
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

              <div class="viewport">
                <md-toolbar :md-elevation="1">
                  <span class="md-title">RxCui ID</span>
                </md-toolbar>
                <div class="text_padding" v-if="found">
                  <p>{{rxcui}}</p>
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



              <div class="viewport">
                <md-toolbar :md-elevation="1">
                  <span class="md-title">Other ID</span>
                </md-toolbar>

                <div v-if="found2">
                <ul class="nav nav-tabs" style="width:100%">
                  <li class="active"><a data-toggle="tab" href="#gp">GP</a></li>
                  <li><a data-toggle="tab" href="#gpu">GPU</a></li>
                  <li><a data-toggle="tab" href="#tp">TP</a></li>
                  <li><a data-toggle="tab" href="#tpu">TPU</a></li>
                </ul>

                <div class="tab-content" v-if="dataID!=null">
                  <div v-if="dataID.GP!=null" id="gp" class="tab-pane fade in active text_padding">
                    <div class="text-center">
                      <ul class="pagination nav" v-if="dataID.GP.length%10 != 0">
                        <li><a :href="'#gp'+1"  @click="update(1)" data-toggle="tab">
                          <span aria-hidden="true">&laquo;</span>
                          <span class="sr-only">First</span>
                        </a></li>
                        <li v-if="currentPage>=3" class="disabled"><a>...</a></li>
                        <li v-if="currentPage < 3" ><a :href="'#gp'+1"  @click="update(1)" data-toggle="tab">1</a></li>
                        <li v-if="(currentPage >= i &&  i+2 >= currentPage) " v-for="i in (parseInt(dataID.GP.length/10))" :key="i"><a :href="'#gp'+(i+1)" @click="update(i+1)" data-toggle="tab">{{i+1}}</a></li>
                        <li v-if="currentPage<=parseInt(dataID.GP.length/10)-1" class="disabled"><a>...</a></li>
                        <li><a :href="'#gp'+(parseInt(dataID.GP.length/10)+1)"  @click="update(parseInt(dataID.GP.length/10)+1)" data-toggle="tab">
                          <span aria-hidden="true">&raquo;</span>
                          <span class="sr-only">Last</span>
                        </a></li>    
                      </ul>
                      <ul class="pagination nav" v-if="dataID.GP.length%10 == 0">
                        <li><a :href="'#gp'+1"  @click="update(1)" data-toggle="tab">
                          <span aria-hidden="true">&laquo;</span>
                          <span class="sr-only">First</span>
                        </a></li>
                        <li v-if="currentPage>=3" class="disabled"><a>...</a></li>
                        <li v-if="currentPage < 3" ><a :href="'#gp'+1"  @click="update(1)" data-toggle="tab">1</a></li>
                        <li v-if="(currentPage >= i &&  i+2 >= currentPage) " v-for="i in (parseInt(dataID.GP.length/10)-1)" :key="i"><a :href="'#gp'+(i+1)" @click="update(i+1)" data-toggle="tab">{{i+1}}</a></li>
                        <li v-if="currentPage<=parseInt(dataID.GP.length/10)-2" class="disabled"><a>...</a></li>
                        <li><a :href="'#gp'+(parseInt(dataID.GP.length/10))"  @click="update(parseInt(dataID.GP.length/10))" data-toggle="tab">
                          <span aria-hidden="true">&raquo;</span>
                          <span class="sr-only">Last</span>
                        </a></li> 
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
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.GP[index].FSN_GPID.split(' ')[0]" target="_blank">{{dataID.GP[index].FSN_GPID.split(' ')[0]}}</a>{{dataID.GP[index].FSN_GPID.replace(dataID.GP[index].FSN_GPID.split(' ')[0],'')}}</div>
                              <div class="fsn">GP ID : </div>
                              <div>{{dataID.GP[index].GPID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>

                        <md-card v-if="page == 0 && parseInt(dataID.GP.length/10) > 0" v-for="(value2,index) in 10"
                          :key="index">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="fsn">GP Name : </div>
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.GP[index].FSN_GPID.split(' ')[0]" target="_blank">{{dataID.GP[index].FSN_GPID.split(' ')[0]}}</a>{{dataID.GP[index].FSN_GPID.replace(dataID.GP[index].FSN_GPID.split(' ')[0],'')}}</div>
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
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.GP[index+((page+1)*10)].FSN_GPID.split(' ')[0]" target="_blank">{{dataID.GP[index+((page+1)*10)].FSN_GPID.split(' ')[0]}}</a>{{dataID.GP[index+((page+1)*10)].FSN_GPID.replace(dataID.GP[index+((page+1)*10)].FSN_GPID.split(' ')[0],'')}}</div>
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
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.GP[index+((page+1)*10)].FSN_GPID.split(' ')[0]" target="_blank">{{dataID.GP[index+((page+1)*10)].FSN_GPID.split(' ')[0]}}</a>{{dataID.GP[index+((page+1)*10)].FSN_GPID.replace(dataID.GP[index+((page+1)*10)].FSN_GPID.split(' ')[0],'')}}</div>
                              <div class="fsn">GP ID : </div>
                              <div>{{dataID.GP[index+((page+1)*10)].GPID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>
                      </div>


                      <!--%10 == 0-->
                      <div v-if="dataID.GP.length%10 == 0" v-for="(value,page) in 1 " :key="page" :id="'gp'+value"
                        class="tab-pane fade in active">
                        <md-card v-for="(value2,index) in 10" :key="index">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="fsn">GP Name : </div>
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.GP[index+(page*10)].FSN_GPID.split(' ')[0]" target="_blank">{{dataID.GP[index+(page*10)].FSN_GPID.split(' ')[0]}}</a>{{dataID.GP[index+(page*10)].FSN_GPID.replace(dataID.GP[index+(page*10)].FSN_GPID.split(' ')[0],'')}}</div>
                              <div>{{dataID.GP[index+(page*10)].FSN_GPID}}</div>
                              <div class="fsn">GP ID : </div>
                              <div>{{dataID.GP[index+(page*10)].GPID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>
                      </div>

                      <div v-if="((parseInt(dataID.GP.length/10)-1) > 0) && (dataID.GP.length%10 == 0) && (parseInt(dataID.GP.length/10) > 1)" v-for="(value,page) in (parseInt(dataID.GP.length/10)) "
                        :key="page" :id="'gp'+(value)" class="tab-pane fade">
                        <md-card v-if="page != 0" v-for="(value2,index) in 10" :key="index">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="fsn">GP Name : </div>
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.GP[index+(page*10)].FSN_GPID.split(' ')[0]" target="_blank">{{dataID.GP[index+(page*10)].FSN_GPID.split(' ')[0]}}</a>{{dataID.GP[index+(page*10)].FSN_GPID.replace(dataID.GP[index+(page*10)].FSN_GPID.split(' ')[0],'')}}</div>
                              <div class="fsn">GP ID : </div>
                              <div>{{dataID.GP[index+(page*10)].GPID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>
                      </div>
                    </div>
                  </div>


                  <div v-if="dataID.GPU!=null" id="gpu" class="tab-pane fade text_padding">
                    <div class="text-center">
                      <ul class="pagination nav" v-if="dataID.GPU.length%10 != 0">
                        <li><a :href="'#gpu'+1"  @click="update2(1)" data-toggle="tab">
                          <span aria-hidden="true">&laquo;</span>
                          <span class="sr-only">First</span>
                        </a></li>
                        <li v-if="currentPage2>=3" class="disabled"><a>...</a></li>
                        <li v-if="currentPage2 < 3" ><a :href="'#gpu'+1"  @click="update2(1)" data-toggle="tab">1</a></li>
                        <li v-if="(currentPage2 >= i &&  i+2 >= currentPage2) " v-for="i in (parseInt(dataID.GPU.length/10))" :key="i"><a :href="'#gpu'+(i+1)" @click="update2(i+1)" data-toggle="tab">{{i+1}}</a></li>
                        <li v-if="currentPage2<=parseInt(dataID.GPU.length/10)-1" class="disabled"><a>...</a></li>
                        <li><a :href="'#gpu'+(parseInt(dataID.GPU.length/10)+1)"  @click="update2(parseInt(dataID.GPU.length/10)+1)" data-toggle="tab">
                          <span aria-hidden="true">&raquo;</span>
                          <span class="sr-only">Last</span>
                        </a></li>    
                      </ul>
                      <ul class="pagination nav" v-if="dataID.GPU.length%10 == 0">
                        <li><a :href="'#gpu'+1"  @click="update2(1)" data-toggle="tab">
                          <span aria-hidden="true">&laquo;</span>
                          <span class="sr-only">First</span>
                        </a></li>
                        <li v-if="currentPage2>=3" class="disabled"><a>...</a></li>
                        <li v-if="currentPage2 < 3" ><a :href="'#gpu'+1"  @click="update2(1)" data-toggle="tab">1</a></li>
                        <li v-if="(currentPage2 >= i &&  i+2 >= currentPage2) " v-for="i in (parseInt(dataID.GPU.length/10)-1)" :key="i"><a :href="'#gpu'+(i+1)" @click="update2(i+1)" data-toggle="tab">{{i+1}}</a></li>
                        <li v-if="currentPage2<=parseInt(dataID.GPU.length/10)-2" class="disabled"><a>...</a></li>
                        <li><a :href="'#gpu'+(parseInt(dataID.GPU.length/10))"  @click="update2(parseInt(dataID.GPU.length/10))" data-toggle="tab">
                          <span aria-hidden="true">&raquo;</span>
                          <span class="sr-only">Last</span>
                        </a></li> 
                      </ul>
                    </div>

                    <div class="tab-content">
                      <!--%10 != 0-->
                      <div v-if="dataID.GPU.length%10 != 0" v-for="(value,page) in 1" :key="page" :id="'gpu'+value"
                        class="tab-pane fade in active">
                        <md-card v-if="parseInt(dataID.GPU.length/10) == 0" v-for="(value2,index) in dataID.GPU.length%10"
                          :key="index">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="fsn">GPU Name : </div>
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.GPU[index].FSN_GPUID.split(' ')[0]" target="_blank">{{dataID.GPU[index].FSN_GPUID.split(' ')[0]}}</a>{{dataID.GPU[index].FSN_GPUID.replace(dataID.GPU[index].FSN_GPUID.split(' ')[0],'')}}</div>
                              <div class="fsn">GPU ID : </div>
                              <div>{{dataID.GPU[index].GPUID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>

                        <md-card v-if="page == 0 && parseInt(dataID.GPU.length/10) > 0" v-for="(value2,index) in 10"
                          :key="index">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="fsn">GPU Name : </div>
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.GPU[index+(page*10)].FSN_GPUID.split(' ')[0]" target="_blank">{{dataID.GPU[index+(page*10)].FSN_GPUID.split(' ')[0]}}</a>{{dataID.GPU[index+(page*10)].FSN_GPUID.replace(dataID.GPU[index+(page*10)].FSN_GPUID.split(' ')[0],'')}}</div>
                              <div class="fsn">GPU ID : </div>
                              <div>{{dataID.GPU[index+(page*10)].GPUID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>
                      </div>

                      <div v-if="dataID.GPU.length%10 != 0 && parseInt(dataID.GPU.length/10) > 0" v-for="(value,page) in parseInt(dataID.GPU.length/10)"
                        :key="page+1" :id="'gpu'+(value+1)" class="tab-pane fade">

                        <md-card v-if="parseInt(dataID.GPU.length/10) != (page+1)" v-for="(value2,index) in 10" :key="index">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="fsn">GPU Name : </div>
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.GPU[index+((page+1)*10)].FSN_GPUID.split(' ')[0]" target="_blank">{{dataID.GPU[index+((page+1)*10)].FSN_GPUID.split(' ')[0]}}</a>{{dataID.GPU[index+((page+1)*10)].FSN_GPUID.replace(dataID.GPU[index+((page+1)*10)].FSN_GPUID.split(' ')[0],'')}}</div>
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
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.GPU[index+((page+1)*10)].FSN_GPUID.split(' ')[0]" target="_blank">{{dataID.GPU[index+((page+1)*10)].FSN_GPUID.split(' ')[0]}}</a>{{dataID.GPU[index+((page+1)*10)].FSN_GPUID.replace(dataID.GPU[index+((page+1)*10)].FSN_GPUID.split(' ')[0],'')}}</div>
                              <div class="fsn">GPU ID : </div>
                              <div>{{dataID.GPU[index+((page+1)*10)].GPUID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>
                      </div>


                      <!--%10 == 0-->
                      <div v-if="dataID.GPU.length%10 == 0" v-for="(value,page) in 1 " :key="page" :id="'gpu'+value"
                        class="tab-pane fade in active">
                        <md-card v-for="(value2,index) in 10" :key="index">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="fsn">GPU Name : </div>
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.GPU[index+(page*10)].FSN_GPUID.split(' ')[0]" target="_blank">{{dataID.GPU[index+(page*10)].FSN_GPUID.split(' ')[0]}}</a>{{dataID.GPU[index+(page*10)].FSN_GPUID.replace(dataID.GPU[index+(page*10)].FSN_GPUID.split(' ')[0],'')}}</div>
                              <div class="fsn">GPU ID : </div>
                              <div>{{dataID.GPU[index+(page*10)].GPUID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>
                      </div>

                      <div v-if="((parseInt(dataID.GPU.length/10)-1) > 0) && (dataID.GPU.length%10 == 0) && (parseInt(dataID.GPU.length/10) > 1)" v-for="(value,page) in (parseInt(dataID.GPU.length/10)) "
                        :key="page" :id="'gpu'+(value)" class="tab-pane fade">
                        <md-card v-if="page != 0" v-for="(value2,index) in 10" :key="index">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="fsn">GPU Name : </div>
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.GPU[index+(page*10)].FSN_GPUID.split(' ')[0]" target="_blank">{{dataID.GPU[index+(page*10)].FSN_GPUID.split(' ')[0]}}</a>{{dataID.GPU[index+(page*10)].FSN_GPUID.replace(dataID.GPU[index+(page*10)].FSN_GPUID.split(' ')[0],'')}}</div>
                              <div class="fsn">GPU ID : </div>
                              <div>{{dataID.GPU[index+(page*10)].GPUID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>
                      </div>
                    </div>
                  </div>


                  <div v-if="dataID.TP!=null" id="tp" class="tab-pane fade text_padding">
                    <div class="text-center">
                      <ul class="pagination nav" v-if="dataID.TP.length%10 != 0">
                        <li><a :href="'#tp'+1"  @click="update3(1)" data-toggle="tab">
                          <span aria-hidden="true">&laquo;</span>
                          <span class="sr-only">First</span>
                        </a></li>
                        <li v-if="currentPage3>=3" class="disabled"><a>...</a></li>
                        <li v-if="currentPage3 < 3" ><a :href="'#tp'+1"  @click="update3(1)" data-toggle="tab">1</a></li>
                        <li v-if="(currentPage3 >= i &&  i+2 >= currentPage3) " v-for="i in (parseInt(dataID.TP.length/10))" :key="i"><a :href="'#tp'+(i+1)" @click="update3(i+1)" data-toggle="tab">{{i+1}}</a></li>
                        <li v-if="currentPage3<=parseInt(dataID.TP.length/10)-1" class="disabled"><a>...</a></li>
                        <li><a :href="'#tp'+(parseInt(dataID.TP.length/10)+1)"  @click="update3(parseInt(dataID.TP.length/10)+1)" data-toggle="tab">
                          <span aria-hidden="true">&raquo;</span>
                          <span class="sr-only">Last</span>
                        </a></li>    
                      </ul>
                      <ul class="pagination nav" v-if="dataID.TP.length%10 == 0">
                        <li><a :href="'#tp'+1"  @click="update3(1)" data-toggle="tab">
                          <span aria-hidden="true">&laquo;</span>
                          <span class="sr-only">First</span>
                        </a></li>
                        <li v-if="currentPage3>=3" class="disabled"><a>...</a></li>
                        <li v-if="currentPage3 < 3" ><a :href="'#tp'+1"  @click="update3(1)" data-toggle="tab">1</a></li>
                        <li v-if="(currentPage3 >= i &&  i+2 >= currentPage3) " v-for="i in (parseInt(dataID.TP.length/10)-1)" :key="i"><a :href="'#tp'+(i+1)" @click="update3(i+1)" data-toggle="tab">{{i+1}}</a></li>
                        <li v-if="currentPage3<=parseInt(dataID.TP.length/10)-2" class="disabled"><a>...</a></li>
                        <li><a :href="'#tp'+(parseInt(dataID.TP.length/10))"  @click="update3(parseInt(dataID.TP.length/10))" data-toggle="tab">
                          <span aria-hidden="true">&raquo;</span>
                          <span class="sr-only">Last</span>
                        </a></li> 
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
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.TP[index].FSN_TPID.split(' (')[0]" target="_blank">{{dataID.TP[index].FSN_TPID.split(' (')[0]}}</a>{{dataID.TP[index].FSN_TPID.replace(dataID.TP[index].FSN_TPID.split(' (')[0],'')}}</div>
                              <div class="fsn">TP ID : </div>
                              <div>{{dataID.TP[index].TPID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>

                        <md-card v-if="page == 0 && parseInt(dataID.TP.length/10) > 0" v-for="(value2,index) in 10"
                          :key="index">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="fsn">TP Name : </div>
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.TP[index+(page*10)].FSN_TPID.split(' (')[0]" target="_blank">{{dataID.TP[index+(page*10)].FSN_TPID.split(' (')[0]}}</a>{{dataID.TP[index+(page*10)].FSN_TPID.replace(dataID.TP[index+(page*10)].FSN_TPID.split(' (')[0],'')}}</div>
                              <div class="fsn">TP ID : </div>
                              <div>{{dataID.TP[index+(page*10)].TPID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>
                      </div>

                      <div v-if="dataID.TP.length%10 != 0 && parseInt(dataID.TP.length/10) > 0" v-for="(value,page) in parseInt(dataID.TP.length/10)"
                        :key="page+1" :id="'tp'+(value+1)" class="tab-pane fade">

                        <md-card v-if="parseInt(dataID.TP.length/10) != (page+1)" v-for="(value2,index) in 10" :key="index">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="fsn">TP Name : </div>
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.TP[index+((page+1)*10)].FSN_TPID.split(' (')[0]" target="_blank">{{dataID.TP[index+((page+1)*10)].FSN_TPID.split(' (')[0]}}</a>{{dataID.TP[index+((page+1)*10)].FSN_TPID.replace(dataID.TP[index+((page+1)*10)].FSN_TPID.split(' (')[0],'')}}</div>
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
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.TP[index+((page+1)*10)].FSN_TPID.split(' (')[0]" target="_blank">{{dataID.TP[index+((page+1)*10)].FSN_TPID.split(' (')[0]}}</a>{{dataID.TP[index+((page+1)*10)].FSN_TPID.replace(dataID.TP[index+((page+1)*10)].FSN_TPID.split(' (')[0],'')}}</div>
                              <div class="fsn">TP ID : </div>
                              <div>{{dataID.TP[index+((page+1)*10)].TPID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>
                      </div>


                      <!--%10 == 0-->
                      <div v-if="dataID.TP.length%10 == 0" v-for="(value,page) in 1 " :key="page" :id="'tp'+value"
                        class="tab-pane fade in active">
                        <md-card v-for="(value2,index) in 10" :key="index">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="fsn">TP Name : </div>
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.TP[index+(page*10)].FSN_TPID.split(' (')[0]" target="_blank">{{dataID.TP[index+(page*10)].FSN_TPID.split(' (')[0]}}</a>{{dataID.TP[index+(page*10)].FSN_TPID.replace(dataID.TP[index+(page*10)].FSN_TPID.split(' (')[0],'')}}</div>
                              <div class="fsn">TP ID : </div>
                              <div>{{dataID.TP[index+(page*10)].TPID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>
                      </div>

                      <div v-if="((parseInt(dataID.TP.length/10)-1) > 0) && (dataID.TP.length%10 == 0) && (parseInt(dataID.TP.length/10) > 1)" v-for="(value,page) in (parseInt(dataID.TP.length/10)) "
                        :key="page" :id="'tp'+(value)" class="tab-pane fade">
                        <md-card v-if="page != 0" v-for="(value2,index) in 10" :key="index">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="fsn">TP Name : </div>
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.TP[index+(page*10)].FSN_TPID.split(' (')[0]" target="_blank">{{dataID.TP[index+(page*10)].FSN_TPID.split(' (')[0]}}</a>{{dataID.TP[index+(page*10)].FSN_TPID.replace(dataID.TP[index+(page*10)].FSN_TPID.split(' (')[0],'')}}</div>
                              <div class="fsn">TP ID : </div>
                              <div>{{dataID.TP[index+(page*10)].TPID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>
                      </div>
                    </div>
                  </div>


                  <div v-if="dataID.TPU!=null" id="tpu" class="tab-pane fade text_padding">
                    <div class="text-center">
                      <ul class="pagination nav" v-if="dataID.TPU.length%10 != 0">
                        <li><a :href="'#tpu'+1"  @click="update4(1)" data-toggle="tab">
                          <span aria-hidden="true">&laquo;</span>
                          <span class="sr-only">First</span>
                        </a></li>
                        <li v-if="currentPage4>=3" class="disabled"><a>...</a></li>
                        <li v-if="currentPage4 < 3" ><a :href="'#tpu'+1"  @click="update4(1)" data-toggle="tab">1</a></li>
                        <li v-if="(currentPage4 >= i &&  i+2 >= currentPage4) " v-for="i in (parseInt(dataID.TPU.length/10))" :key="i"><a :href="'#tpu'+(i+1)" @click="update4(i+1)" data-toggle="tab">{{i+1}}</a></li>
                        <li v-if="currentPage4<=parseInt(dataID.TPU.length/10)-1" class="disabled"><a>...</a></li>
                        <li><a :href="'#tpu'+(parseInt(dataID.TPU.length/10)+1)"  @click="update4(parseInt(dataID.TPU.length/10)+1)" data-toggle="tab">
                          <span aria-hidden="true">&raquo;</span>
                          <span class="sr-only">Last</span>
                        </a></li>    
                      </ul>
                      <ul class="pagination nav" v-if="dataID.TPU.length%10 == 0">
                        <li><a :href="'#tpu'+1"  @click="update4(1)" data-toggle="tab">
                          <span aria-hidden="true">&laquo;</span>
                          <span class="sr-only">First</span>
                        </a></li>
                        <li v-if="currentPage4>=3" class="disabled"><a>...</a></li>
                        <li v-if="currentPage4 < 3" ><a :href="'#tpu'+1"  @click="update4(1)" data-toggle="tab">1</a></li>
                        <li v-if="(currentPage4 >= i &&  i+2 >= currentPage4) " v-for="i in (parseInt(dataID.TPU.length/10)-1)" :key="i"><a :href="'#tpu'+(i+1)" @click="update4(i+1)" data-toggle="tab">{{i+1}}</a></li>
                        <li v-if="currentPage4<=parseInt(dataID.TPU.length/10)-2" class="disabled"><a>...</a></li>
                        <li><a :href="'#tpu'+(parseInt(dataID.TPU.length/10))"  @click="update4(parseInt(dataID.TPU.length/10))" data-toggle="tab">
                          <span aria-hidden="true">&raquo;</span>
                          <span class="sr-only">Last</span>
                        </a></li> 
                      </ul>
                    </div>

                    <div class="tab-content">
                      <!--%10 != 0-->
                      <div v-if="dataID.TPU.length%10 != 0" v-for="(value,page) in 1" :key="page" :id="'tpu'+value"
                        class="tab-pane fade in active">
                        <md-card v-if="parseInt(dataID.TPU.length/10) == 0" v-for="(value2,index) in dataID.TPU.length%10"
                          :key="index">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="fsn">TPU Name : </div>
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.TPU[index].FSN_TPUID.split(' (')[0]" target="_blank">{{dataID.TPU[index].FSN_TPUID.split(' (')[0]}}</a>{{dataID.TPU[index].FSN_TPUID.replace(dataID.TPU[index].FSN_TPUID.split(' (')[0],'')}}</div>
                              <div class="fsn">TPU ID : </div>
                              <div>{{dataID.TPU[index].TPUID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>

                        <md-card v-if="page == 0 && parseInt(dataID.TPU.length/10) > 0" v-for="(value2,index) in 10"
                          :key="index">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="fsn">TPU Name : </div>
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.TPU[index+(page*10)].FSN_TPUID.split(' (')[0]" target="_blank">{{dataID.TPU[index+(page*10)].FSN_TPUID.split(' (')[0]}}</a>{{dataID.TPU[index+(page*10)].FSN_TPUID.replace(dataID.TPU[index+(page*10)].FSN_TPUID.split(' (')[0],'')}}</div>
                              <div class="fsn">TPU ID : </div>
                              <div>{{dataID.TPU[index+(page*10)].TPUID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>
                      </div>

                      <div v-if="dataID.TPU.length%10 != 0 && parseInt(dataID.TPU.length/10) > 0" v-for="(value,page) in parseInt(dataID.TPU.length/10)"
                        :key="page+1" :id="'tpu'+(value+1)" class="tab-pane fade">

                        <md-card v-if="parseInt(dataID.TPU.length/10) != (page+1)" v-for="(value2,index) in 10" :key="index">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="fsn">TPU Name : </div>
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.TPU[index+((page+1)*10)].FSN_TPUID.split(' (')[0]" target="_blank">{{dataID.TPU[index+((page+1)*10)].FSN_TPUID.split(' (')[0]}}</a>{{dataID.TPU[index+((page+1)*10)].FSN_TPUID.replace(dataID.TPU[index+((page+1)*10)].FSN_TPUID.split(' (')[0],'')}}</div>
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
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.TPU[index+((page+1)*10)].FSN_TPUID.split(' (')[0]" target="_blank">{{dataID.TPU[index+((page+1)*10)].FSN_TPUID.split(' (')[0]}}</a>{{dataID.TPU[index+((page+1)*10)].FSN_TPUID.replace(dataID.TPU[index+((page+1)*10)].FSN_TPUID.split(' (')[0],'')}}</div>
                              <div class="fsn">TPU ID : </div>
                              <div>{{dataID.TPU[index+((page+1)*10)].TPUID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>
                      </div>


                      <!--%10 == 0-->
                      <div v-if="dataID.TPU.length%10 == 0" v-for="(value,page) in 1 " :key="page" :id="'tpu'+value"
                        class="tab-pane fade in active">
                        <md-card v-for="(value2,index) in 10" :key="index">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="fsn">TPU Name : </div>
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.TPU[index+(page*10)].FSN_TPUID.split(' (')[0]" target="_blank">{{dataID.TPU[index+(page*10)].FSN_TPUID.split(' (')[0]}}</a>{{dataID.TPU[index+(page*10)].FSN_TPUID.replace(dataID.TPU[index+(page*10)].FSN_TPUID.split(' (')[0],'')}}</div>
                              <div class="fsn">TPU ID : </div>
                              <div>{{dataID.TPU[index+(page*10)].TPUID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>
                      </div>

                      <div v-if="((parseInt(dataID.TPU.length/10)-1) > 0) && (dataID.TPU.length%10 == 0) && (parseInt(dataID.TPU.length/10) > 1)" v-for="(value,page) in (parseInt(dataID.TPU.length/10)) "
                        :key="page" :id="'tpu'+(value)" class="tab-pane fade">
                        <md-card v-if="page != 0" v-for="(value2,index) in 10" :key="index">
                          <md-card-header>
                            <md-card-header-text>
                              <div class="fsn">TPU Name : </div>
                              <div><a :href="'http://localhost:8080/Drug_Information/'+dataID.TPU[index+(page*10)].FSN_TPUID.split(' (')[0]" target="_blank">{{dataID.TPU[index+(page*10)].FSN_TPUID.split(' (')[0]}}</a>{{dataID.TPU[index+(page*10)].FSN_TPUID.replace(dataID.TPU[index+(page*10)].FSN_TPUID.split(' (')[0],'')}}</div>
                              <div class="fsn">TPU ID : </div>
                              <div>{{dataID.TPU[index+(page*10)].TPUID}}</div>
                            </md-card-header-text>
                          </md-card-header>
                        </md-card>
                      </div>
                    </div>
                  </div>

                </div>
                </div>
                
<!--empty state-->
                <div class="panel-body " v-else-if="!found2 && checkSearch2">
                  <md-empty-state md-label="Not found" :md-description="`No drug found for this query.  Please Try again.`">
                  </md-empty-state>
                </div>
                <!-- loading-->
                <div class="panel-body " v-else-if="loading2">
                  <md-empty-state md-label="Loading2" :md-description="`Please wait a second`">
                    <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                  </md-empty-state>
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
                  <p v-if="found">Website : <a :href="web" target="_blank">{{web}}</a></p>
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
              
            </div>

          </div>

        </div>
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
      web:null, //website
      found: false, //true when found data , false when don't have data from API
      found2: false, //true when found data , false when don't have data from Database
      rxcuiID: null, //ID of drug from API
      checkSearch: false, //true when you search something
      checkSearch2: false,
      loading: false, //true when you have to wait for call API
      loading2: false, //true when you have to wait for call Database
      searchFinish: false,
      dataID: null, //data GP GPU TP TPU
      currentPage: 1,
      currentPage2: 1,
      currentPage3: 1,
      currentPage4: 1
    }),
    methods: {
      //toggle visible menu
      toggleMenu() {
        this.menuVisible = !this.menuVisible
      },
      update(i){
        this.currentPage=i
        //console.log(this.currentPage)
        return null
      },update2(i){
        this.currentPage2=i
        //console.log(this.currentPage2)
        return null
      },update3(i){
        this.currentPage3=i
        //console.log(this.currentPage3)
        return null
      },update4(i){
        this.currentPage4=i
        //console.log(this.currentPage4)
        return null
      },
      //get data from API
      async getData() {
        this.searchFinish = true
        this.loading = true
        this.loading2 = true
        this.rxcui = null
        var checkfound = false
        axios.get(
          `http://localhost:8082/info/${this.drugName}`)
        .then(Response => {          
          this.checkSearch2 = true
          this.dataID = Response.data
          if(Response.data.GP == '') {
            this.found2 = false
            this.loading2 = false
            console.log("test1"+Response.data.GP+"x")
          }
          else {
            console.log("test2"+Response.data.GP+"x")
            //for(var i=0 ;i<this.dataID.GP.length;i++) {
              //var x = this.dataID.GP[i].FSN_GPID.split(' ')
             // console.log(i+' '+ this.dataID.GP[i].FSN_GPID.replace(this.dataID.GP[i].FSN_GPID.split(' ')[0],''))
             //if(x.length >1){
              //  x[1] = this.dataID.GP[i].FSN_GPID
             // }
           // }
            //this.dataID.TPU[index+(page*10)].FSN_TPUID

            this.found2 =true
            this.loading2 = false
          }
        });

        await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui?name=${this.drugName}`).then(Response => {
          if (Response.data.idGroup.rxnormId == null) {
            console.log('rxcui id is null')
            this.found = false            
            this.loading = false
            this.checkSearch = true
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
              var webSplit = this.drugList[0].interactionConcept[0].sourceConceptItem.url.split('#')
              this.web = webSplit[0]
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
        console.log('Drug that search is '+this.drugName)      
        this.searchFinish = false
        this.loading = false
        this.loading2 = false
        this.found = false
        this.found2 = false
        this.drugList = null
        this.checkSearch = false
      }
    },
    async mounted() {
      this.Window_Width = window.innerWidth
      if(this.$route.params.drugname != null){
        this.drugName = this.$route.params.drugname
        await this.change()
        await this.getData()        
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
