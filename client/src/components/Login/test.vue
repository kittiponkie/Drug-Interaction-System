<template>
  <div>
    <!--logo nav-->
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand inline" href="#">
        <h1>
          <img src="../../assets/logo.png" width="50" height="50" class="d-inline-block align-top" alt=""
            style="margin-right:15px;">
          La Mer Cafe
        </h1>
      </a>
      <form class="form-inline navbar-brand my-2 my-lg-0">
        Firstname
        <button class="btn btn-danger my-2 my-sm-0" type="submit" style="margin-left:10px">Logout</button>
      </form>
    </nav>

    <!--menu bar-->
    <nav class="navbar navbar-expand-lg sticky-top navbar-light bg-dark" style="background-color: black;">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <a href="#" class="btn btn-warning btn-lg" role="button" aria-pressed="true"
              style="margin-right:10px">Orders</a>
          </li>
          <li class="nav-item">
            <a href="#" class="btn btn-warning btn-lg" role="button" aria-pressed="true">Stock</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>

    <div class="text-center">
      <br>
      <h1>Stock</h1>
      <br>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-auto text-right">
          <h5 class="custom-control custom-radio custom-control-inline">Select Type </h5>
          <!-- Default inline 1-->
          <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" class="custom-control-input" id="defaultInline1" name="inlineDefaultRadiosExample"
              value="option1" @click="changeSelect('Deserts')">
            <label class="custom-control-label" for="defaultInline1" style="font-size:larger">Deserts</label>
          </div>
          <!-- Default inline 2-->
          <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" class="custom-control-input" id="defaultInline2" name="inlineDefaultRadiosExample"
              value="option1" @click="changeSelect('Toppings')">
            <label class="custom-control-label" for="defaultInline2" style="font-size:larger"> Toppings </label>
          </div>
          <!-- Default inline 3-->
          <div class="custom-control custom-radio custom-control-inline">
            <input type="radio" class="custom-control-input" id="defaultInline3" name="inlineDefaultRadiosExample"
              value="option1" @click="changeSelect('Beverages')">
            <label class="custom-control-label" for="defaultInline3" style="font-size:larger">Beverages</label>
          </div>
        </div>
        <div class="col-5 text-right" v-if="select!=''">
          <button type="button" class="btn btn-outline-success">+ ADD</button>
        </div>
      </div>
    </div>
    <br>
    <!--table deserts-->
    <div id="deserts" v-if="select=='Deserts'" style="margin:20px">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead class="bg-danger">
            <tr>
              <th scope="col" style="text-align:center">NO.
              </th>
              <th scope="col" style="text-align:center">Name
              </th>
              <th scope="col" style="text-align:center">Description
              </th>
              <th scope="col" style="text-align:center">Available
              </th>
              <th scope="col" style="text-align:center">Price(baht)
              </th>
              <th scope="col" style="text-align:center">Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="pagination == parseInt(index/maxItemPerPage)" v-for="(item,index) in deserts" :key="index">
              <th scope="row" style="text-align:center">{{index+1}}</th>
              <td style="text-align:center">name {{item}}</td>
              <td style="text-align:center">description {{item}}</td>
              <td style="text-align:center">available {{item}}</td>
              <td style="text-align:center">{{item*10}}</td>
              <td style="text-align:center">
                <button type="button" class="btn btn-outline-secondary">Edit</button>
                <button type="button" class="btn btn-outline-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example" id="pagination">
        <div class="row">
          <div class="col-sm" style="text-align:left">
            <select class="form-control-inline form-control-sm custom-control-inline" v-model="maxItemPerPage" @change="pagination=0">
              <option value="5">5 items/page</option>
              <option value="10">10 items/page</option>
              <option value="25">25 items/page</option>
            </select>
          </div>
          <div class="col-sm" style="text-align:center">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" @click="pagination=0" href="#pagination">First</a>
              </li>
              <li class="page-item">
                <a class="page-link" @click="pagination!=0? pagination-=1:pagination" href="#pagination">Previous</a>
              </li>
              <li
                v-if="((pagination+3 > index) && (pagination-3 < index)) || (pagination<5 && (index==3 || index==4)) || (pagination<5 && (index==3 || index==4)) || ((deserts.length%maxItemPerPage==0? parseInt((deserts.length)/maxItemPerPage)-pagination+1 <5 && (index==parseInt((deserts.length)/maxItemPerPage)-4 || index==parseInt((deserts.length)/maxItemPerPage)-5):parseInt((deserts.length)/maxItemPerPage)+1-pagination+1 <5 && (index==parseInt((deserts.length)/maxItemPerPage)-4+1 || index==parseInt((deserts.length)/maxItemPerPage)-5+1) ))"
                class="page-item"
                v-for="(item,index) in (deserts.length%maxItemPerPage==0? parseInt((deserts.length)/maxItemPerPage):parseInt((deserts.length)/maxItemPerPage)+1)"
                :key="index"><a class="page-link" @click="pagination = index" href="#pagination">{{index+1}}</a></li>

              <li class="page-item">
                <a class="page-link"
                  @click="deserts.length%maxItemPerPage==0? (pagination+1<parseInt((deserts.length)/maxItemPerPage)? pagination +=1:pagination) : (pagination+1<parseInt((deserts.length)/maxItemPerPage)+1?pagination +=1:pagination)"
                  href="#pagination">Next</a>
              </li>
              <li class="page-item">
                <a class="page-link"
                  @click="deserts.length%maxItemPerPage==0? pagination=parseInt(deserts.length/maxItemPerPage)-1:pagination=parseInt(deserts.length/maxItemPerPage)+1-1"
                  href="#pagination">Last</a>
              </li>
            </ul>
          </div>
          <div class="col-sm" style="text-align:right">
            Page {{pagination+1}}
          </div>
        </div>
      </nav>

    </div>
    <!--table toppings-->
    <div id="toppings" v-if="select=='Toppings'" style="margin:20px">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead class="bg-warning">
            <tr>
              <th scope="col" style="text-align:center">NO.
              </th>
              <th scope="col" style="text-align:center">Name
              </th>
              <th scope="col" style="text-align:center">Available
              </th>
              <th scope="col" style="text-align:center">Price(baht)
              </th>
              <th scope="col" style="text-align:center">Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="pagination == parseInt(index/maxItemPerPage)" v-for="(item,index) in toppings" :key="index">
              <th scope="row" style="text-align:center">{{index+1}}</th>
              <td style="text-align:center">name {{item}}</td>
              <td style="text-align:center">available {{item}}</td>
              <td style="text-align:center">{{item*10}}</td>
              <td style="text-align:center">
                <button type="button" class="btn btn-outline-secondary">Edit</button>
                <button type="button" class="btn btn-outline-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example" id="pagination">
        <div class="row">
          <div class="col-sm" style="text-align:left">
            <select class="form-control-inline form-control-sm custom-control-inline" v-model="maxItemPerPage" @change="pagination=0">
              <option value="5">5 items/page</option>
              <option value="10">10 items/page</option>
              <option value="25">25 items/page</option>
            </select>
          </div>
          <div class="col-sm" style="text-align:center">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" @click="pagination=0" href="#pagination">First</a>
              </li>
              <li class="page-item">
                <a class="page-link" @click="pagination!=0? pagination-=1:pagination" href="#pagination">Previous</a>
              </li>
              <li
                v-if="((pagination+3 > index) && (pagination-3 < index)) || (pagination<5 && (index==3 || index==4)) || (pagination<5 && (index==3 || index==4)) || ((toppings.length%maxItemPerPage==0? parseInt((toppings.length)/maxItemPerPage)-pagination+1 <5 && (index==parseInt((toppings.length)/maxItemPerPage)-4 || index==parseInt((toppings.length)/maxItemPerPage)-5):parseInt((toppings.length)/maxItemPerPage)+1-pagination+1 <5 && (index==parseInt((toppings.length)/maxItemPerPage)-4+1 || index==parseInt((toppings.length)/maxItemPerPage)-5+1) ))"
                class="page-item"
                v-for="(item,index) in (toppings.length%maxItemPerPage==0? parseInt((toppings.length)/maxItemPerPage):parseInt((toppings.length)/maxItemPerPage)+1)"
                :key="index"><a class="page-link" @click="pagination = index" href="#pagination">{{index+1}}</a></li>

              <li class="page-item">
                <a class="page-link"
                  @click="toppings.length%maxItemPerPage==0? (pagination+1<parseInt((toppings.length)/maxItemPerPage)? pagination +=1:pagination) : (pagination+1<parseInt((toppings.length)/maxItemPerPage)+1?pagination +=1:pagination)"
                  href="#pagination">Next</a>
              </li>
              <li class="page-item">
                <a class="page-link"
                  @click="toppings.length%maxItemPerPage==0? pagination=parseInt(toppings.length/maxItemPerPage)-1:pagination=parseInt(toppings.length/maxItemPerPage)+1-1"
                  href="#pagination">Last</a>
              </li>
            </ul>
          </div>
          <div class="col-sm" style="text-align:right">
            Page {{pagination+1}}
          </div>
        </div>
      </nav>
    </div>
    <!--table beverages-->
    <div id="beverages" v-if="select=='Beverages'" style="margin:20px">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead style="background-color:#5DDC35">
            <tr>
              <th scope="col" style="text-align:center">NO.<h5><br></h5>
              </th>
              <th scope="col" style="text-align:center">Name<h5><br></h5>
              </th>
              <th scope="col" style="text-align:center">Description<h5><br></h5>
              </th>
              <th scope="col" style="text-align:center">Available<h5><br></h5>
              </th>
              <th scope="col" style="text-align:center">
                <h6>S</h6>
              </th>
              <th scope="col" style="text-align:center">Price(baht)<h6><br>M</h6>
              </th>
              <th scope="col" style="text-align:center">
                <h6>L</h6>
              </th>
              <th scope="col" style="text-align:center">Actions<h5><br></h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="pagination == parseInt(index/maxItemPerPage)" v-for="(item,index) in beverages" :key="index">
              <th scope="row" style="text-align:center">{{index+1}}</th>
              <td style="text-align:center">name {{item}}</td>
              <td style="text-align:center">description {{item}}</td>
              <td style="text-align:center">available {{item}}</td>
              <td style="text-align:center">{{item*10}}</td>
              <td style="text-align:center">{{item*10}}</td>
              <td style="text-align:center">{{item*10}}</td>
              <td style="text-align:center">
                <button type="button" class="btn btn-outline-secondary">Edit</button>
                <button type="button" class="btn btn-outline-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example" id="pagination">
        <div class="row">
          <div class="col-sm" style="text-align:left">
            <select class="form-control-inline form-control-sm custom-control-inline" v-model="maxItemPerPage" @change="pagination=0">
              <option value="5">5 items/page</option>
              <option value="10">10 items/page</option>
              <option value="25">25 items/page</option>
            </select>
          </div>
          <div class="col-sm" style="text-align:center">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" @click="pagination=0" href="#pagination">First</a>
              </li>
              <li class="page-item">
                <a class="page-link" @click="pagination!=0? pagination-=1:pagination" href="#pagination">Previous</a>
              </li>
              <li
                v-if="((pagination+3 > index) && (pagination-3 < index)) || (pagination<5 && (index==3 || index==4)) || (pagination<5 && (index==3 || index==4)) || ((beverages.length%maxItemPerPage==0? parseInt((beverages.length)/maxItemPerPage)-pagination+1 <5 && (index==parseInt((beverages.length)/maxItemPerPage)-4 || index==parseInt((beverages.length)/maxItemPerPage)-5):parseInt((beverages.length)/maxItemPerPage)+1-pagination+1 <5 && (index==parseInt((beverages.length)/maxItemPerPage)-4+1 || index==parseInt((beverages.length)/maxItemPerPage)-5+1) ))"
                class="page-item"
                v-for="(item,index) in (beverages.length%maxItemPerPage==0? parseInt((beverages.length)/maxItemPerPage):parseInt((beverages.length)/maxItemPerPage)+1)"
                :key="index"><a class="page-link" @click="pagination = index" href="#pagination">{{index+1}}</a></li>

              <li class="page-item">
                <a class="page-link"
                  @click="beverages.length%maxItemPerPage==0? (pagination+1<parseInt((beverages.length)/maxItemPerPage)? pagination +=1:pagination) : (pagination+1<parseInt((beverages.length)/maxItemPerPage)+1?pagination +=1:pagination)"
                  href="#pagination">Next</a>
              </li>
              <li class="page-item">
                <a class="page-link"
                  @click="beverages.length%maxItemPerPage==0? pagination=parseInt(beverages.length/maxItemPerPage)-1:pagination=parseInt(beverages.length/maxItemPerPage)+1-1"
                  href="#pagination">Last</a>
              </li>
            </ul>
          </div>
          <div class="col-sm" style="text-align:right">
            Page {{pagination+1}}
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Stock',
    data() {
      return {
        msg: 'Welcome to Stock Page',
        select: '',
        pagination: 0,
        maxItemPerPage: 5,
        deserts: [2, 3, 4, 5, 6, 1, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6, 1, 1, 2, 3, 4, 5, 6, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6, 1,
          1, 2, 3, 4, 5, 6, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6, 1, 1, 2, 3, 4, 5, 6, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6, 1, 1, 1,
          1, 1, 2, 3, 4, 5, 6, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6, 1, 1, 1, 1, 1, 2, 3, 4, 5,
          6, 1, 1, 1, 1
        ],
        toppings: [2, 3, 4, 5, 6, 1, 1, 1, 1, 1, 1],
        beverages: [2, 3, 4, 5, 6, 1, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6]
      }
    },
    methods: {
      changeSelect(type) {
        this.select = type
        this.pagination = 0
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
