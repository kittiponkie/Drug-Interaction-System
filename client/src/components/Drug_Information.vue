<template>
  <div id="app">
     <h1><img style="display: inline;" src="src/assets/info.png" alt="logo" />Smart Drug Use</h1>
    <div class="page-container">
    <md-app>
       <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          Menu
        </md-toolbar>
          <md-list>
          <md-list-item>
            <md-icon style="margin-right:10px">person</md-icon>
            <span class="md-list-item-text">Patient Information</span>
          </md-list-item>

          <md-list-item>
            <md-icon style="margin-right:10px">folder_shared</md-icon>
            <span class="md-list-item-text">Drug History</span>
          </md-list-item>

          <md-list-item>
            <md-icon style="margin-right:10px">description</md-icon>
            <span class="md-list-item-text">Drug Information</span>
          </md-list-item>

          <md-list-item>
            <md-icon style="margin-right:10px">bubble_chart</md-icon>
            <span class="md-list-item-text">Drug Interaction</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
  
      <md-app-content>
        <div>
        <div class = "ais-index">
          <form role="search" action="" class="ais-search-box__form">
          <input type="search" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false" class="ais-input" placeholder="Search..."> 
          </form>
        </div>

        <form>
          <p align = "left" for="name"><b>Generic Drug Name</b></p> <output type="text"><p>Show Generic Drug Name</p></output> 
          <p align = "left" for="name"><b>RxCui ID</b></p> <output type="text"><p>Show RxCui</p></output>
          <p align = "left" for="name"><b>GP ID</b></p> <output type="text"><p>Show Gp id</p></output>
          <p align = "left" for="name"><b>TP ID</b></p> <output type="text"><p>show Tp id</p></output>
         <!-- <p align = "left" for="name"><b>ATC ID</b></p> <output type="text"><p>4</p></output>-->
          <p align = "left" for="name"><b>mechanism of drug action</b></p> <output type="text"><p>show mechanism of drug action</p></output>
          <p align = "left" for="name"><b>iframe</b></p> <iframe src="https://www.drugbank.ca/" height="200" width="100%"></iframe>
        </form>
         </div>
      </md-app-content>
    </md-app>
  </div>
   </div>
</template>

<script>
export default {
  name: 'normal',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  } 
}
</script>
<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: white;
  margin-top: 0px;
}
.iframe-container {
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;
}

.iframe-container iframe {
   border: 0;
   height: 100%;
   left: 0;
   position: absolute;
   top: 0;
   width: 100%;
}

h1 {
    font-weight: bold;
    background-color: #5DBFA8;
    color: #ffffff;
    padding: 50px;
    margin-top: 0px;
    width: 100%;
    height: 200px;  
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
P{
  align: left;
  text-align: left;
  display: flex;
  color: black;
  text-decoration: none;
  padding: 2px;
  margin: 12px;
  box-sizing: border-box;
}
output{
  text-align: left;
  align: center;
  display: block;
  color: white;
  background-color: #C4C4C4;
  text-decoration: none;
  padding: 2px;
  margin: 12px;
  box-sizing: border-box;
}
.md-app {
    max-height: 500px;
    border: 0px solid rgba(#000, .12);
    background: black;
  }
#md-primary{
    width: 100%;
    height: 50px;
    background: #C4C4C4;
}
  .md-drawer {
    width: 230px;
    height: 750px;
    max-width: calc(100vw - 125px);
  }
  #headerh2{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    margin-left: 20px;
  }
  .md-content {
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: start;
    margin-top: 10px;
    padding-left: 1em;
  }
  .md-button{
    background: #DADADA;
    margin-left: 0em;

  }
form {
    display: block;
    margin-top: 0em;
}
input {
    -webkit-appearance: textfield;
    background-color: white;
    -webkit-rtl-ordering: logical;
    cursor: text;
    padding: 12px;
    border-width: 2px;
    height: 20px;
    border-style: inset;
    border-color: initial;
    border-image: initial;
    margin-left: 1000px;
}
.output[type=text] {
    display: block;
    width: 100%;
    padding: 12px 10px;
    margin: 12px;
    box-sizing: border-box;
    border: 5px solid #555;
    outline: none;
    background-color: #C4C4C4;
}
.output[type=text]:active {
    background-color: #C4C4C4;
    border: 3px solid #555;
}
</style>
