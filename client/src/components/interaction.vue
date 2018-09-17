<template>
  <div class="row">
    <div class="header">
      <h1>Drug Interaction</h1>
    </div>
    <hr>
    <div class="col-3 sidebar">
      <ul>
        <a href="/">Drug Information</a><br>
        <a href="#DrugHistory">Drug History</a><br>
        <a class="active" href="/interaction">Drug Interation</a><br>
        <a href="#Logout">Logout</a><br>
      </ul>
    </div>
    <!-- searching box -->
    <h1 style="color:black;text-align:center;">{{Drug_name}}</h1>
    <div class="col-11 topnav">
      <div class="search-container">
        <form action="/action_page.php">
          <input type="text" placeholder="Search.." name="search">
        </form>
      </div>
    </div>
    <!-- summit -->
    <div class="col-12.05 topnav">
      <div class="search-container">
        <form action="/action_page.php">
          <button type="submit">search</button>
        </form>
      </div>
    </div>
    <div class="col-11">
      <div style="overflow-x:auto;">
        <table v-if="data!=null">
          <tr>
            <th>Generic Drug Name</th>
            <th>Description</th>
          </tr>
          <tr v-for="i in data.interactionTypeGroup[0].interactionType[0].interactionPair.length">
            <td><a href="/">{{data.interactionTypeGroup[0].interactionType[0].interactionPair[i-1].interactionConcept[1].minConceptItem.name}}</a></td>
            <td>{{data.interactionTypeGroup[0].interactionType[0].interactionPair[i-1].description}}</td>
          </tr>
        </table>
        <table v-else>
          <tr>
            <th>Generic Drug Name</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>Loading...</td>
            <td>Please Wait...</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="col-10.5 dropdown">
      <span>click</span>
      <div class="dropdown-content">
        <p>data!</p>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'interaction',
    data() {
      return {
        msg: 'Drug Interation',
        Drug_name: 'AccuNeb',
        rxcui:'352394',
        name_rxnormId: [],
        data: null
      }
    },
    async mounted() {
      await this.getData()
      
    },
    methods: {
      async getData() {
        await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui?name=${this.Drug_name}`).then(Response => {
          this.name_rxnormId = Response.data
          this.rxcui = this.name_rxnormId.idGroup.rxnormId[0]
        });
        axios.get(`https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=${this.rxcui}&sources=DrugBank`).then(Response => {
          this.data = Response.data
        });
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
    height: 200px
  }

  .menu ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: block;
    width: 200px;
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

  p {
    align: left;
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
      position: fixed;
    }

    .sidebar a {
      float: left;
    }

    div.content {
      margin-left: 0;
    }
  }

  @media screen and (max-width: 400px) {
    .sidebar a {
      text-align: center;
      float: none;
    }
  }

  .topnav {
    overflow: hidden;
    background-color: white;
  }

  .topnav a:hover {
    background-color: #ddd;
    color: black;
  }

  .topnav a.active {
    background-color: #2196F3;
    color: white;
  }

  .topnav .search-container {
    float: right;
  }

  .topnav input[type=text] {
    padding: 6px;
    margin-top: 8px;
    font-size: 17px;
    border: none;
  }

  .topnav .search-container button {
    float: right;
    padding: 6px;
    margin-top: 8px;
    margin-left: 0px;
    font-size: 17px;
    border: none;
    cursor: pointer;
    align: right;
  }

  .topnav .search-container button:hover {
    background: #ccc;
  }

  @media screen and (max-width: 1024px) {
    .topnav .search-container {
      float: none;
    }

    .topnav a,
    .topnav input[type=text],
    .topnav .search-container button {
      float: none;
      display: block;
      text-align: right;
      width: 100%;
      margin: 0;
      padding: 14px;
    }

    .topnav input[type=text] {
      border: 3px solid #ccc;
    }
  }

  table {
    border-collapse: collapse;
    width: 75%;
    margin-left: 20%;
  }

  th {
    padding: 8px;
    text-align: center;

  }

  td {
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2
  }

  th {
    background-color: #555;
    color: white;
  }

  .dropbtn {
    background-color: #3498DB;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }

  .dropbtn:hover,
  .dropbtn:focus {
    background-color: #2980B9;
  }

  .dropdown {
    position: relative;
    display: inline-block;
    margin: 8px;
    padding: 8px;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 8px;
    z-index: 1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

</style>
