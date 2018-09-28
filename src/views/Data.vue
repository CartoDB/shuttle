<template>
  <div class="inner">
    <div class="data-container">
      <h2 class="data-title">Account info</h2> 
      <label class="data-item">
        <input type="text" placeholder="cartojs-test" v-model="username" />
        <p>Introduce your username, if you don't we'd use a default username</p>
      </label>
      <label class="data-item">
        <input type="text" placeholder="Put the name of your public dataset" v-model="dataset" />
      </label>

      <div v-if="geomType !== null && columns !== null">
        <h2 class="data-title">Configure your map</h2> 
        <label class="data-item">
          <ul class="data-itemList">
            <li v-for="type in mapTypesForGeom" :key="type" class="data-itemListItem" @click="setMapType(type)">
              <h2>{{ type }}</h2>
              <span>imagen</span>
            </li>
          </ul>
          <p>The map variant will determine what type of column you can use to style</p>
        </label>
        <div v-if="mapType !== null && columnsForMapType.length > 0">
          <label class="data-item">
            <ul class="data-itemList" style="height: 100%;">
              <li class="data-itemListItem" v-for="column in columnsForMapType" :key="column.name" @click="setColumn(column.name)">
                <span class="data-tag" :data-value="column.type">{{ column.type }}</span>
                <h2>{{ column.name }}</h2> 
              </li>
            </ul>
            <p>Maybe you don't see all the columns you were expecting to see. If this happens it's because the type of map you chose in the previous step doesn't allow the interactaction with this map</p>
          </label>
        </div>
        <label class="data-item">
          <ul class="data-itemList">
            <li class="data-itemListItem" v-for="ramp in colorRamps" :key="ramp.name" @click="setRamp(ramp.name)">
              <h2>{{ ramp.name }}</h2>
              <div class="ramp-color">
                <i v-for="(color, index) in ramp.ramp" :key="index" :style="{ 'background-color': color }"/>
              </div>
            </li>
          </ul>
          <p>The color scheme you pick will be used on certain map types.</p>
        </label>
      </div>

    </div>
  </div>

</template>

<script>
import { requestQuery } from '@/sql';
import ramps from '@/cartocolor.js';

let timeoutId = null;

export default {
  name: 'Data',

  watch: {
    username: function (username) {
      if (username.length === 0) {
        this.$store.dispatch('clearVisualization');
      }
      timeoutId = setTimeout(function () {
        if (username.length > 0 && (this.dataset && this.dataset.length > 0)) {
          this.$store.dispatch('clearVisualization');
          this.fetchGeom();
          this.fetchRows();
          this.fetchExtent();
        }
      }.bind(this), 300);
    },

    dataset: function (datasetValue) {
      if (datasetValue.length === 0) {
        this.$store.dispatch('clearVisualization');
      }
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        if (datasetValue.length > 0 && (this.username && this.username.length > 0)) {
          this.$store.dispatch('clearVisualization');
          this.fetchGeom();
          this.fetchRows();
          this.fetchExtent();
        }
      }.bind(this), 300);
    }
  },

  computed: {
    colorRamps() {
      const rampNames = Object.keys(ramps);

      return rampNames.map(rampName => ({
        name: rampName,
        ramp: ramps[rampName]['7'],
        type: ramps[rampName].tags[0]
      }));
    },
    geomType() {
      return this.$store.state.visualization.data.geomType;
    },
    mapTypesForGeom () {
      switch (this.geomType) {
        case 'ST_Point':
          return ['default', 'bubbles', 'category', 'gradient', 'animated'];
        case 'ST_LineString':
          return ['default', 'flow', 'category', 'gradient', 'animated'];
        case 'ST_MultiPolygon':
          return ['default', 'category', 'choropleth', 'animated'];
      }

      return [];
    },
    columnsForMapType() {
      if (this.columns === null) {
        return [];
      }

      const types = [];

      switch (this.mapType) {
        case 'category':
          types.push('string');
          break;
        case 'choropleth':
        case 'category':
        case 'bubbles':
        case 'gradient':
        case 'flow':
          types.push('number');
          break;
        case 'animated':
          types.push('number');
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

    mapType() {
      return this.$store.state.visualization.data.mapType;
    },

    username: {
      get () {
        return this.$store.state.visualization.data.username;
      },

      set (value) {
        this.$store.commit('setUsername', value);
      }
    },

    dataset: {
      get () {
        return this.$store.state.visualization.data.dataset;
      },

      set (value) {
        this.$store.commit('setDataset', value);
      }
    },

    columns: {
      get () {
        return this.$store.state.visualization.data.columns;
      },

      set (value) {
        this.$store.commit('setColumns', value);
      }
    }
  },

  methods: {
    setMapType(value) {
      this.$store.commit('setMapType', value);
    },
    
    setColumn(column) {
      this.$store.commit('setColumn', column);
    },
    
    setRamp(ramp) {
      this.$store.commit('setRamp', ramp);
    },

    fetchGeom: async function () {
      const data = await requestQuery(`SELECT ST_GeometryType(the_geom) as geom from ${this.dataset} LIMIT 1`, this.username);
      if (data.error) {
        return;
      }
      this.$store.commit('setGeomType', data.rows[0].geom);
    },

    fetchRows: async function () {
      this.columns = null;
      const data = await requestQuery(`SELECT * from ${this.dataset} LIMIT 0`, this.username);

      if (data.error) {
        return;
      }

      const values = Object.values(data.fields);
      const keys = Object.keys(data.fields);

      this.columns = values.map((value, index) => ({
        ...value,
        name: keys[index]
      }));
    },

    fetchExtent: async function () {
      this.extent = null;
      const data = await requestQuery(`SELECT ST_Extent(the_geom) as extent FROM ${this.dataset}`, this.username);

      if (data.error) {
        return;
      }

      const bounds = data.rows[0].extent;
      this.$store.commit('setExtent', /BOX\((.+) (.+),(.+) (.+)\)/.exec(bounds)
        .splice(1, 4)
        .map(e => parseFloat(e))
      );
    }
  }
}
</script>

<style scoped>
  .data-title {
    margin-bottom: 40px;
    font: 700 40px 'Playfair Display';
  }
  .data-container {
    padding: 40px;
    height: 100vh;
    overflow: scroll;
  }
  .data-item {
    margin-bottom: 40px;
    display: block;
  }
  .data-item p {
    font: 14px 'Karla';
    color: rgba(0, 0, 0, 0.4);
  }
  .data-item input[type="text"] {
    display: block;
    border: 0;
    border-bottom: 2px solid #000;
    width: 100%;
    padding: 16px 4px;
    background: none;
    font: 16px 'Karla';
    margin-bottom: 8px;
    transition: all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
  }
  .data-item input[type="text"]:focus {
    outline: none;
    background: #F2DC5D;
    color: #000;
    border-bottom: 2px solid #F2DC5D;
  }
  .data-itemList {
    border: 2px solid #000;
    height: 38px;
    overflow: hidden;
    margin-bottom: 8px;
    transition: height 0.2 linear;
  }
  .data-itemList:hover {
    border: 2px solid #F2DC5D;
    height: 250px;
    overflow: auto;
  }
  .data-itemListItem {
    padding: 8px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #000;
    cursor: pointer;
  }
  .data-itemListItem:hover {
    background-color: #F2DC5D;
  }
  .data-itemListItem:last-child {
    border: 0;
  }

  .data-itemListItem h2 {
    font: 16px 'Karla';
    text-transform: capitalize;
    margin-right: 8px;
  }
  .data-tag {
    font: 12px 'Karla';
    padding: 2px 4px;
    margin-right: 8px;
    min-width: 50px;
    text-align: center;
  }
  .data-tag[data-value="string"] {
    background: #8CD2CD;
  }
  .data-tag[data-value="date"] {
    background: #6AA038;
  }
  .data-tag[data-value="number"] {
    background: #ff5500;
  }
  .data-tag[data-value="boolean"] {
    background: #F8C21C;
  }

  .ramp-color {
    width: 100%;
    display: flex;
  }

  .ramp-color i {
    flex: 1;
    height: 18px;
  }
</style>
