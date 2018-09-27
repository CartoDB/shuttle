<template>
<div>
  <div class="mapType step">
    <h2>What type of map do you want?</h2>
    <div class="formRow">
      <input type="radio" value="simple" id="simple" v-model="mapType" />
      <label for="simple">
        Simple
      </label>
    </div>
    <div class="formRow">
      <input type="radio" value="choropleth" id="choropleth" v-model="mapType" />
      <label for="choropleth">
        Choropleth
      </label>
    </div>
    <div class="formRow">
      <input type="radio" value="bubble" id="bubble" v-model="mapType" />
      <label for="bubble">
        Bubble
      </label>
    </div>
    <div class="formRow">
      <input type="radio" value="animated" id="animated" v-model="mapType" />
      <label for="animated">
        Animated (vector only)
      </label>
    </div>
  </div>
  <div class="apiForm step" v-if="mapType !== null">
    <h2>Enter a username & dataset, if it's not public, enter an authorized api key</h2>
    <label>Username
      <input type="text" placeholder="CARTO username" v-model="username" />
    </label>
    <label>
      Dataset
      <input type="text" placeholder="Carto Dataset" v-model="dataset" />
    </label>
    <label>
      Private?
      <input type="checkbox" v-model="privateDataset" />
    </label>
    <label v-if="privateDataset">
      API Key
      <input type="text" placeholder="api key" v-model="apiKey" />
    </label>
    <button @click="fetchRows">Fetch data</button>
  </div>
  <div class="step" v-if="showColumns">
    <h2 v-if="columnsError">Failed to fetch. Is this api key authorized?</h2>
    <h2 v-else>Select the column you want to style by</h2>
    <div v-for="column in columnsForMapType" :key="column.name">
      {{ column.name }} -- {{ column.type }}
    </div>
    <span v-if="columnsForMapType.length === 0">
      No available columns, try changing the map type
    </span>
  </div>
</div>
</template>

<script>
import { requestQuery } from '@/sql';

export default {
  name: 'Data',
  data: function () {
    return {
      privateDataset: false,
      columns: null,
      columnsError: false,
      oauth: null,
    };
  },

  computed: {
    columnsForMapType() {
      const types = ['number'];

      switch (this.mapType) {
        case 'choropleth':
          // Choropleth by date?
          types.push('string');
          break;
        case 'animated':
          types.push('string');
          types.push('date');
          break;
        default:
          break;
      }

      return this.columns.filter(column => types.indexOf(column.type) !== -1);
    },

    showColumns() {
      return this.columns !== null && this.$store.state.data.mapType !== 'simple';
    },

    mapType: {
      get () {
        return this.$store.state.data.mapType;
      },

      set (value) {
        this.$store.commit('setMapType', value);
      }
    },

    username: {
      get () {
        return this.$store.state.data.username;
      },

      set (value) {
        this.$store.commit('setUsername', value);
      }
    },

    dataset: {
      get () {
        return this.$store.state.data.dataset;
      },

      set (value) {
        this.$store.commit('setDataset', value);
      }
    },

    apiKey: {
      get () {
        return this.$store.state.data.apiKey;
      },

      set (value) {
        this.$store.commit('setApiKey', value);
      }
    }
  },

  methods: {
    fetchRows: async function () {
      const data = await requestQuery(`SELECT * from ${this.dataset} LIMIT 0`, this.username, this.apiKey);
      console.log(data);

      const values = Object.values(data.fields);
      const keys = Object.keys(data.fields);

      this.columns = values.map((value, index) => ({
        ...value,
        name: keys[index]
      }));
    },

    login: function () {
      window.open(`${location.origin}/oauth.html`, '_blank', 'width=200,height=300');
    }
  },

  mounted: function () {
    window.gotOAuthInfo = function (oauth) {
      this.oauth = oauth;
    }.bind(this);
  }

  // computed: {
  //   privateDataset () {
  //     return this.$ste
  //   }
  // }
}
</script>

<style scoped>
.step:not(:last-of-type) {
  margin-bottom: 16px;
}

.apiForm label {
  display: block;
}

.formRow {
  display: flex;
  align-items: center;
}

.formRow label {
  margin-left: 4px;
}
</style>
