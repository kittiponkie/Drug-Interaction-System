<template>
  <div>
    <h1>{{test}}</h1>
  </div>

</template>

<script>
  import PostsService from '@/services/PostsService'
  import axios from 'axios'
  export default {
    name: 'Drug_Interaction',
    data: () => ({
      test: null
    }),
    methods: {
        
    },
    async mounted() {
      //fetch
      await PostsService.fetchPatient().then(Response=>{
        this.test = Response.data
      })

      //update
      await PostsService.updatePatient({
        id: this.test[3]._id,
        PatientID: '0',
        Prefix: 'Prefix',
        Firstname: 'Firstname',
        Lastname: 'Lastname',
        Sex: 'Sex',
        DOB: 'DOB',
        Age: 2,
        Email: 'Email',
        Weight: 2,
        Height: 2,
        IDcardNumber: 'IDcardNumber',
        Status: 'Status',
        Race: 'Race',
        Nation: 'Nation',
        Religion: 'Religion',
        Bloodgroup: 'Bloodgroup',
        Address: 'Address',
        Phone: 'Phone'
      })

      //add
      PostsService.addPatient({
        PatientID: '0',
        Prefix: 'Prefix',
        Firstname: 'Firstname',
        Lastname: 'Lastname',
        Sex: 'Sex',
        DOB: 'DOB',
        Age: 1,
        Email: 'Email',
        Weight: 1,
        Height: 1,
        IDcardNumber: 'IDcardNumber',
        Status: 'Status',
        Race: 'Race',
        Nation: 'Nation',
        Religion: 'Religion',
        Bloodgroup: 'Bloodgroup',
        Address: 'Address',
        Phone: 'Phone'
      })
    }
  }

</script>

<style lang="scss" scoped>
</style>
