<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary" md-elevation="0" style="background-color:#5DBFA8;">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!(Window_Width>600)">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Smart Drug Use</span>
      </md-app-toolbar>

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
          <md-list-item to="/Patient_information" class="selected">
            <md-icon style="margin-right:10px">account_circle</md-icon>
            <span class="md-list-item-text unselected_text">Patient Information</span>
          </md-list-item>

          <md-list-item to="/Drug_History" class="unselected">
            <md-icon style="margin-right:10px">folder_shared</md-icon>
            <span class="md-list-item-text unselected_text">Drug History</span>
          </md-list-item>

           <md-list-item to="/Drug_History" class="unselected">
            <md-icon style="margin-right:10px">person_add</md-icon>
            <span class="md-list-item-text selected_text">Friend</span>
          </md-list-item>

          <md-list-item to="/Drug_Information" class="unselected">
            <md-icon style="margin-right:10px">description</md-icon>
            <span class="md-list-item-text unselected_text">Drug Information</span>
          </md-list-item>

          <md-list-item to="/Drug_Interaction" class="unselected">
            <md-icon style="margin-right:10px">bubble_chart</md-icon>
            <span class="md-list-item-text selected_text">Drug Interaction</span>
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
              <h3>Ordering Drug {{Patientid}}</h3>
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
								<input type="text" placeholder="Enter dose Here.."  class="form-control">
</div>
</div>
<!-- Quantity -->
<div class="row">
  <div class="col-sm-6 form-group">
								<label>Quantity</label>
								<input type="text" placeholder="Quantity Here.."  class="form-control">
  </div>
</div>			
<!-- Date duration -->
<div class="row">
  <div class="col-sm-6 form-group">
								<label>duration</label>
								<input type="text" placeholder="duration Here.."  class="form-control">
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
								<input type="text" placeholder="Frequency Here..(times/day)"  class="form-control">
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
								<input type="text" placeholder="Description Here.."  class="form-control">
  </div>
</div>			
<!-- confirm button -->
<br/>
<div class="row">
  <div class="col-sm-5">
<button type="button" class="btn btn-success" style="border-top-width: 0px;">Confirm</button>
<button type="button" class="btn btn-danger"  style="border-top-width: 0px;">Cancle</button>


</div></div>
<!--popup-->
 <div>
    <b-button @click="modalShow = !modalShow">
      Open Modal
    </b-button>
    <b-modal v-model="modalShow">
      Hello From Modal!
    </b-modal>
  </div>
<!--end popup-->
</form>
    </div>
  </div>
</div>
  </md-app-content>
  </md-app>
  </div>
</template>

<script>
 /* popup*/
  export default {
  data () {
    return {
      modalShow: false
    }
  }
}
/*Autocomplete*/
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
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
  .md-content md-app-content md-flex text_all md-theme-default{
    padding-top: 23px;
  }

/*Autocomplete*/@at-root* { box-sizing: border-box; }
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
