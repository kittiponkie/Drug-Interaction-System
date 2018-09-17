<template>
  <div class="row">
    <div class="col-4 header">
      <h1>Drug Interaction</h1>
    </div>
    <hr>
    <div class="col-3 sidebar">
      <ul>
        <a class="active" href="/drug_info">Drug Information</a><br>
        <a href="#DrugHistory">Drug History</a><br>
        <a href="/interaction">Drug Interaction</a><br>
        <a href="#Logout">Logout</a><br>
      </ul>
    </div>
    <!-- content -->
    <div class="col-9 content">
      <form>
        <p align="left" for="name">Generic Drug Name</p>
        <output type="text">
          <pp>{{Drug_name}}</pp>
        </output>
        <p2 align="left" for="tmt">TMT ID</p2>
        <output type="text">
          <pp>2</pp>
        </output>
        <p align="left" for="rxcui">RXCui ID</p>
        <output type="text">
          <pp>3</pp>
        </output>
        <p align="left" for="atc">ATC ID</p>
        <output type="text">
          <pp>4</pp>
        </output>
        <p align="left" for="Pharmacodymamics">Pharmacodymamics</p>
        <output type="text">
          <pp>5</pp>
        </output>
        <p align="left" for="iframe">iframe</p>
        <iframe :src="'https://www.drugbank.ca/drugs/'+ID" height="200" width="100%"></iframe>
      </form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Drug Interation',
        Drug_name: null,
        ID: null
      }
    },
    async mounted() {
      await this.getData()      
    },
    methods: {
      async getData() {
        //var id = this.$route.params.id;console.log(id);   
        this.Drug_name = this.$route.params.Drug_Name
        this.ID = this.$route.params.id
      },
      getName(){

      }
    }
  }

</script>
<style scoped>
  /*menu*/
  * {
    box-sizing: border-box;
  }

  .row::after {
    content: "";
    clear: both;
    display: table;
  }

  [class*="col-"] {
    float: left;
    padding: 15px;
  }

  .col-1 {
    width: 8.33%;
  }

  .col-2 {
    width: 16.66%;
  }

  .col-3 {
    width: 25%;
  }

  .col-4 {
    width: 33.33%;
  }

  .col-5 {
    width: 41.66%;
  }

  .col-6 {
    width: 50%;
  }

  .col-7 {
    width: 58.33%;
  }

  .col-8 {
    width: 66.66%;
  }

  .col-9 {
    width: 75%;
  }

  .col-10 {
    width: 83.33%;
  }

  .col-11 {
    width: 91.66%;
  }

  .col-12 {
    width: 100%;
  }

  html {
    font-family: "Lucida Sans", sans-serif;
  }

  .header {
    background-color: #5DBFA8;
    color: #ffffff;
    padding: 50px;
    margin-top: 0px;
    width: 100%;
    height: 200px;
  }

  .menu ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: block;
    width: 200px;
    position: fixed;
  }

  .menu li {
    padding: 20px;
    margin-bottom: 12px;
    background-color: #5B5555;
    color: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  .menu li:hover {
    background-color: #5DBFA8;
    color: #5B5555;
  }

  /*input*/
  input[type=text] {
    width: 100%;
    padding: 12px 10px;
    margin: 12px;
    box-sizing: border-box;
    border: 0px solid #555;
    outline: none;
    background-color: #C4C4C4;
  }

  input[type=text]:focus {
    background-color: #C4C4C4;
    border: 3px solid #555;
  }

  label {
    cursor: default;
    margin: 12px 0;
  }

  pp {
    align: left;
    display: block;
    color: white;
    background-color: black;
    text-decoration: none;
    padding: 12px 10px;
    margin: 12px;
    box-sizing: border-box;
  }

  .sidebar {
    margin: 0;
    padding: 0;
    width: 200px;
    background-color: #f1f1f1;
    position: fixed;
    height: 100%;
    overflow-x: hidden;
  }

  /* Sidebar links */
  .sidebar a {
    display: block;
    color: white;
    background-color: #5B5555;
    padding: 16px;
    text-decoration: none;
  }

  /* Active/current link */
  .sidebar a.active {
    background-color: #5DBFA8;
    color: #5B5555;
  }

  /* Links on mouse-over */
  .sidebar a:hover:not(.active) {
    background-color: #555;
    color: white;
  }

  /* Page content. The value of the margin-left property should match the value of the sidebar's width property */
  div.content {
    margin-left: 200px;
    padding: 1px 16px;
    height: 1000px;
  }

  /* On screens that are less than 700px wide, make the sidebar into a topbar */
  @media screen and (max-width: 700px) {
    .sidebar {
      width: 100%;
      height: auto;
      position: relative;
    }

    .sidebar a {
      float: left;
    }

    div.content {
      margin-left: 0;
    }
  }

  /* On screens that are less than 400px, display the bar vertically, instead of horizontally */
  @media screen and (max-width: 400px) {
    .sidebar a {
      text-align: center;
      float: none;
    }
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
/* eslint-disable eol-last */
