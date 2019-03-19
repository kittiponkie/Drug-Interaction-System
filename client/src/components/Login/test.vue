<template>
  <div>
    <div style="margin:20px 0 20px 0;">
      <form @submit.prevent="addAllergicList()">
        <input v-model="query" id="input" class="form-control" type="text" placeholder="Type to search...">
        <typeahead v-model="query" target="#input" :data="drugsSearch" :limit="drugsSearch.length" match-start=true />
        <md-button type="submit">ADD</md-button>
      </form>
    </div>
    <md-chip v-for="(chip,index) in AllergicDrugs" :key="index" @md-delete="AllergicDrugs.splice(index,1)" md-deletable style="margin-bottom:5px;">{{
      chip }}</md-chip>
  </div>
</template>

<script>
  import DRUGS from '../../data/VTM.js'
  export default {
    name: 'Editable',
    data: () => ({
      //auto complete
      AllergicDrugs: [],      
      query: '',
      drugsSearch: DRUGS.VTM
    }),
    methods: {
      addAllergicList() {
        this.AllergicDrugs.push(this.query)
      }
    }
  }

</script>
