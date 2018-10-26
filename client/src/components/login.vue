<template>
<form>
  <div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-heading">
				<h2 class="text-center">Please Login</h2>
			</div>
		<!--	<hr /> -->
			<div class="modal-body">
				<form action="" role="form">
					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">
							<span class="glyphicon glyphicon-user"></span>
							</span>
							<input type="text" class="form-control" placeholder="User Name" />
						</div>
					</div>
					<div class="form-group">
						<div class="input-group">
							<span class="input-group-addon">
							<span class="glyphicon glyphicon-lock"></span>
							</span>
							<input type="password" class="form-control" placeholder="Password" />
						</div>

					</div>

					<div class="form-group text-center">
						<button type="submit" class="btn btn-success btn-lg">Login</button>
						<a href="components/forgotpassword" class="btn btn-link">forget Password?</a>
					</div>

				</form>
			</div>
		</div>
	</div>
</form>
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

<style>
.modal-content{
			background-color: #5DBFA8;
      padding-top: 0px;
		}
		.btn-link{
			color:white;
		}
		.modal-heading h2{
			color:white;
		}
   .form{
     background-color: white;
   }
</style>