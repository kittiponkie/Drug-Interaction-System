<template>
<div class="container">
    <h1 class="well">Registration Form</h1>
	<div class="col-lg-12 well">
	<div class="row">
				<form>
			<div class="form-group">
<!-- prefix -->
		 <div class="col-sm-6">
					<label>Prefix</label>
				<select id="inputState" class="form-control">
		      <option selected="">MR.</option>
		      <option>MRS.</option>
		      <option>Miss</option>
		      <option>Other</option>
					 <option>Master.</option>
		      <option>Buddhist Monk</option>
		      <option>Rev.</option>
					<option>Mom Luang (M.L.)</option>
					<option>Mom Rajawong (M.R.)</option>
					<option>Mom Chao (M.C.)</option>
					<option>Emeritus Professor</option>
					<option>Professor</option>
					<option>Assistant Professor</option>
					<option>Associate Professor</option>
		  </select>
			</div>
			<div class="col-sm-6 form-group">
					<label>Sex</label>
					<select id="inputState" class="form-control">
		      <option selected="">Male</option>
		      <option>Female</option>
		      <option>Other</option>
					</select>
			</div>
			</div>	
<!-- Name & Surname -->
					<div class="col-sm-12">
						<div class="row">
							<div class="col-sm-6 form-group">
								<label>First Name</label>
								<input type="text" placeholder="Enter First Name Here.." class="form-control">
							</div>
							<div class="col-sm-6 form-group">
								<label>Last Name</label>
								<input type="text" placeholder="Enter Last Name Here.." class="form-control">
							</div>
</div>
<!-- Birthday & Age(autocalculation) -->
						<div class="row">
							<div class="col-sm-6 form-group">
								<label>Birthday</label>
						 <div class='input-group date' id='datetimepicker1'>
                    <input type='text' class="form-control" />
                    <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
								</div>
							<div class="col-sm-6 form-group">
								<label>Age</label>
								<input type="text" readonly class="form-control" value="21">
							</div>
						</div>
<!-- id card -->
						<div class="form-group">
						<div class="row">
							<div class="col-sm-6 form-group">
								<label>ID Card</label>
								<input type="text" placeholder="Enter Designation Here.." class="form-control">
							</div>		
							<div class="col-sm-6 form-group">
							<div class="col-sm-6">
							<label>Status</label>
								<select id="inputState" class="form-control">
									<option selected="">Single </option>
									<option>Married </option>
									<option>Divorced </option>
									<option>Separate</option>
							</select>
							</div>
						</div>	
					</div>
<!-- Nationality -->
					<div class="row">
								<div class="col-sm-6">
							<label>Ethnicity</label>
								<select id="inputState" class="form-control">
									<option selected="">Thailand</option>
							</select>
							</div>	
							<div class="col-sm-6 form-group">
							<div class="col-sm-6">
							<label>Nationality</label>
								<select id="inputState" class="form-control">
									<option selected="">Thai</option>
							</select>
							</div>
						</div>	
					</div>
<!-- Phone Number 			
					<div class="form-group">
						<label>Phone Number</label>
						<input type="text" placeholder="Enter Phone Number Here.." class="form-control">
					</div>		
					<div class="form-group">
						<label>Email Address</label>
						<input type="text" placeholder="Enter Email Address Here.." class="form-control">
					</div>	
					<div class="form-group">
						<label>Website</label>
						<input type="text" placeholder="Enter Website Name Here.." class="form-control">
					</div>
						<label>Address</label>
							<textarea placeholder="Enter Address Here.." rows="3" class="form-control"></textarea>-->		
<!-- blood -->
<div class="row">
	<div class="col-sm-6 form-group">
							<label>Blood</label>
								<select id="inputState" class="form-control">
									<option selected="">A </option>
									<option>B</option>
									<option>AB</option>
									<option>O</option>
									<option>Rh-positive</option>
									<option>Rh-negative</option>
									<option>Unknown</option>
							</select>
						</div>	
					</div>
						</div>
						<div class="form-group">
						<label>Drug allergy</label>
						<input type="text" placeholder="Enter Drug allergy Here.." class="form-control">
					</div>	
					<div class="form-group">
						<label>Food allergy</label>
						<input type="text" placeholder="Enter Food allergy Here.." class="form-control">
					</div>	
						
						
						<div class="form-group">
						<label> Address</label>
						<input type="text" placeholder="Enter  Address Here.." class="form-control">
					</div>	
				</div>	
					<button type="button" class="btn btn-lg btn-info">Submit</button>					
				</form> 
				</div>
	</div>
	</div>
</template>

<script>
type="text/javascript"
            $(function () {
                $('#datetimepicker1').datetimepicker();
            });
</script>
<style>
/* Space out content a bit */
body {
  padding-top: 20px;
  padding-bottom: 20px;
}

/* Everything but the jumbotron gets side spacing for mobile first views */
.header,
.marketing,
.footer {
  padding-right: 15px;
  padding-left: 15px;
}

/* Custom page header */
.header {
  border-bottom: 1px solid #e5e5e5;
}
/* Make the masthead heading the same height as the navigation */
.header h3 {
  padding-bottom: 19px;
  margin-top: 0;
  margin-bottom: 0;
  line-height: 40px;
}

/* Custom page footer */
.footer {
  padding-top: 19px;
  color: #777;
  border-top: 1px solid #e5e5e5;
}

/* Customize container */
@media (min-width: 768px) {
  .container {
    max-width: 730px;
  }
}
.container-narrow > hr {
  margin: 30px 0;
}

/* Main marketing message and sign up button */
.jumbotron {
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
}
.jumbotron .btn {
  padding: 14px 24px;
  font-size: 21px;
}

/* Supporting marketing content */
.marketing {
  margin: 40px 0;
}
.marketing p + h4 {
  margin-top: 28px;
}

/* Responsive: Portrait tablets and up */
@media screen and (min-width: 768px) {
  /* Remove the padding we set earlier */
  .header,
  .marketing,
  .footer {
    padding-right: 0;
    padding-left: 0;
  }
	.btn btn-lg btn-info{
		margin-left: 20px;
	}
  /* Space out the masthead */
  .header {
    margin-bottom: 30px;
  }
  /* Remove the bottom border on the jumbotron for visual effect */
  .jumbotron {
    border-bottom: 0;
  }
}
#col-sm-6 form-group{
	padding-left: 0px;
	margin-left: 0%;
}
</style>