<template>

  <div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-heading">
				<h2 class="text-center">Login</h2>
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
							<input type="password" class="form-control" placeholder="Fill your Password" />
						</div>

					</div>	
				</form>
				<div class="form-group text-center">
						<button type="submit" class="btn btn-success btn-lg">Login</button>
						<a href="http://localhost:8080/register" target="_parent"><button class="btn btn-success btn-lg">Register</button></a>
						<a href="http://localhost:8080/forgotpassword" target="_blank" class="btn btn-link">forget Password?</a>
				</div>
				
			</div>
		</div>
	</div>

</template>

<script>
import axios from 'axios'
import registerService from '@/services/registerService'

  export default {
    name: 'Drug_Interaction',
    data: () => ({
      testFetch: 0
    }),
    methods: {
      
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