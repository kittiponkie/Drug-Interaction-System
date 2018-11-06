<template>
  <div class="posts">
    <h1>PatientInfo</h1>
    <div v-if="PatientInfo.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewPatient' }" class="">Add Patient</router-link>
      </div>
      <table>
        <tr>
          <td>PatientID</td>
          <td width="550">Prefix</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="post in PatientInfo">
          <td>{{ post.PatientID}}</td>
          <td>{{ post.Prefix }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'EditPatient', params: { id: post._id } }">Edit</router-link> |
            <a href="#" @click="deletePatient(post._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no posts.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'NewPatient' }" class="add_post_link">Add Patient</router-link>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line 
/* eslint-disable */

import PostsService from '@/services/PostsService'
export default {
  name: 'PatientInfo',
  data () {
    return {
      PatientInfo: []
    }
  },
  mounted () {
    this.getPatient()
  },
  methods: {
    async getPatient() {
      const response = await PostsService.fetchPatient()
      this.PatientInfo = response.data.PatientInfo
    },
    async deletePatient(id) {
      await PostsService.deletePatient(id)
      this.$router.push({ name: 'PatientInfo' })
    }
  }
}
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>