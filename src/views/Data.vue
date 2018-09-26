<template>
  <div class="form">
    <h2>Enter a username & dataset, if it's not public, enter an authorized api key</h2>
    <label>Username
      <input type="text" placeholder="CARTO username" v-model="username" debounce="500" />
    </label>
    <label>
      Dataset
      <input type="text" placeholder="Carto Dataset" v-model="dataset" debounce="500" />
    </label>
    <label>
      Private?
      <input type="checkbox" v-model="privateDataset" />
    </label>
    <label v-if="privateDataset">
      API Key
      <input type="text" placeholder="api key" v-model="apiKey" debounce="500" />
    </label>
    <button @click="fetchRows">Fetch rows</button>
    <div v-for="(value, key) in columns" :key="key">
      {{ key }} -- {{ value.type }}
    </div>
  </div>
</template>

<script>
import { requestQuery } from '@/sql';

export default {
  name: 'Data',
  data: function () {
    return {
      privateDataset: true,
      username: 'roman-carto',
      dataset: 'ne_10m_populated_places_simple',
      apiKey: 'eysPm1xq7_MPXAW5GtfJmA',
      columns: null
    };
  },

  methods: {
    fetchRows: async function () {
      const data = await requestQuery(`SELECT * from ${this.dataset} LIMIT 0`, this.username, this.apiKey);
      console.log(data);
      this.columns = data.fields;
    }
  }

  // computed: {
  //   privateDataset () {
  //     return this.$ste
  //   }
  // }
}
</script>

<style scoped>
.form label {
  display: block;
}
</style>
