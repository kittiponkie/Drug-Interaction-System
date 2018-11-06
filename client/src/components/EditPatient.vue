<template>
  <div class="posts">
    <h1>Edit Patient</h1>
      <div class="form">
        <div>
          <input type="text" name="PatientID" placeholder="PatientID" v-model="title">
        </div>
        <div>
          <input type="text" name="Prefix" placeholder="Prefix" v-model="Prefix">
        </div>
        <div>
          <input type="text" name="Firstname" placeholder="Firstname" v-model="Firstname">
        </div>
        <div>
          <input type="text" name="Lastname" placeholder="Lastname" v-model="Lastname">
        </div>
        <div>
          <input type="text" name="Sex" placeholder="Sex" v-model="Sex">
        </div>
        <div>
          <input type="date" name="Birthdate" placeholder="Birthdate" v-model="DOB">
        </div>
        <div>
          <input type="number" name="Age" placeholder="Age" v-model="Age">
        </div>
        <div>
          <input type="text" name="Email" placeholder="Email" v-model="Age">
        </div>
        <div>
          <input type="number" name="Weight" placeholder="Weight" v-model="Weight">
        </div>
        <div>
          <input type="number" name="Height" placeholder="Height" v-model="Height">
        </div>
        <div>
          <input type="text" name="IDcardNumber" placeholder="IDcardNumber / PassportID" v-model="IDcardNumber">
        </div>
        <div>
          <input type="text" name="Status" placeholder="Status" v-model="Status">
        </div>
        <div>
          <input type="text" name="Race" placeholder="Race" v-model="Race">
        </div>
        <div>
          <input type="text" name="Nation" placeholder="Nation" v-model="Nation">
        </div>
        <div>
          <input type="text" name="Religion" placeholder="Religion" v-model="Religion">
        </div>
        <div>
          <input type="text" name="Bloodgroup" placeholder="Bloodgroup" v-model="Bloodgroup">
        </div>
        <div>
          <textarea rows="3" cols="15" placeholder="Address" v-model="Address"></textarea>
        </div>
        <div>
          <input type="text" name="Phone" placeholder="Phone Number" v-model="Phone">
        </div>   
        <div>
          <button class="app_post_btn" @click="addPatient">Add</button>
        </div>
      </div>
  </div>
</template>

<script>
import PostsService from "@/services/PostsService";
export default {
  name: "EditPost",
  data() {
    return {
      PatientID: "",
      Prefix: "",
      Firstname: "",
      Lastname: "",
      Sex: "",
      DOB: "",
      Age: "",
      Email: "",
      Weight: "",
      Height: "",
      IDcardNumber: "",
      Status: "",
      Race: "",
      Nation: "",
      Religion: "",
      Bloodgroup: "",
      Address: "",
      Phone: ""
    };
  },
  mounted() {
    this.getPatient();
  },
  methods: {
    async getPatient() {
      const response = await PostsService.getPatient({
        id: this.$route.params.id
      });
      this.PatientID = response.data.PatientID;
      this.Prefix = response.data.Prefix;
      this.Firstname = response.data.Firstname;
      this.Lastname = response.data.Lastname;
      this.Sex = response.data.Sex;
      this.DOB = response.data.DOB;
      this.Age = response.data.Age;
      this.Email = response.data.Email;
      this.Weight = response.data.Weight;
      this.Height = response.data.Height;
      this.IDcardNumber = response.data.IDcardNumber;
      this.Status = response.data.Status;
      this.Race = response.data.Race;
      this.Nation = response.data.Nation;
      this.Religion = response.data.Religion;
      this.Bloodgroup = response.data.Bloodgroup;
      this.Address = response.data.Address;
      this.Phone = response.data.Phone;
    },
    async updatePatient() {
      await PostsService.updatePatient({
        id: this.$route.params.id,
        PatientID: this.PatientID,
        Prefix: this.Prefix,
        Firstname: this.Firstname,
        Lastname: this.Lastname,
        Sex: this.Sex,
        DOB: this.DOB,
        Age: this.Age,
        Email: this.Email,
        Weight: this.Weight,
        Height: this.Height,
        IDcardNumber: this.IDcardNumber,
        Status: this.Status,
        Race: this.Race,
        Nation: this.Nation,
        Religion: this.Religion,
        Bloodgroup: this.Bloodgroup,
        Address: this.Address,
        Phone: this.Phone
      });
      this.$router.push({ name: "Posts" });
    }
  }
};
</script>
<style type="text/css">
.form input,
.form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>