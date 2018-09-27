<template>
  <div class="inner">
    <div class="data-container">
      <h2 class="data-title">Account info</h2> 
      <label class="data-item">
        <input type="text" placeholder="cartojs-test" />
        <p>Introduce your username, if you don't we'd use a default username</p>
      </label>
      <label class="data-item">
        <input type="text" placeholder="default_public" />
        <p>Introduce your apikey, if you don't we'd use the default public api key</p>
      </label>
      <label class="data-item">
        <input type="text" placeholder="Put the name of your public dataset" />
      </label>
      <label class="data-item">
        <select>
          <option value="" disabled selected>Select one of your dataset</option>
          <option>Saab</option>
          <option>Mercedes</option>
          <option>Audi</option>
        </select>
      </label>

      <h2 class="data-title">Configure your map</h2> 


      <label class="data-item">
        <ul class="data-itemList">
          <li class="data-itemListItem">
              <h2>Default</h2>
              <span>imagen</span>
          </li>
          <li class="data-itemListItem">
              <h2>Category</h2>
              <span>imagen</span>
          </li>
          <li class="data-itemListItem">
              <h2>Bubble Map</h2>
              <span>imagen</span>
          </li>
          <li class="data-itemListItem">
              <h2>Gradient color</h2>
              <span>imagen</span>
          </li>
          <li class="data-itemListItem">
              <h2>Animated</h2>
              <span>imagen</span>
          </li>
        </ul>

        <p>Help text</p>
      </label>
      <label class="data-item">
        <ul class="data-itemList" style="height: 100%;">
          <li class="data-itemListItem">
              <span class="data-tag" data-value="string">string</span> <h2>Name column</h2> 
          </li>
          <li class="data-itemListItem">
              <span class="data-tag" data-value="date">date</span> <h2>Name column</h2> 
          </li>
          <li class="data-itemListItem">
              <span class="data-tag" data-value="number">number</span> <h2>Name column</h2> 
          </li>
          <li class="data-itemListItem">
              <span class="data-tag" data-value="boolean">boolean</span> <h2>Name column</h2> 
          </li>
        </ul>
        <p>Maybe you don't see all the columns you were expecting to see. If this happens it's because the type of map you chose in the previous step doesn't allow the interactaction with this map</p>
      </label>
      <label class="data-item">
        <ul class="data-itemList">
          <li class="data-itemListItem">
              <h2>Burg</h2>
              <div class="ramp-color">
                <span style="background: #ffc6c4"></span>
                <span style="background: #672044"></span>
              </div>
          </li>
          <li class="data-itemListItem">
              <h2>Burg</h2>
              <div class="ramp-color">
                <span style="background: #ffc6c4"></span>
                <span style="background: #cc607d"></span>
                <span style="background: #672044"></span>
              </div>
          </li>
        </ul>
        <p>Maybe you don't see all the columns you were expecting to see. If this happens it's because the type of map you chose in the previous step doesn't allow the interactaction with this map</p>
      </label>

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
  }
  .data-itemList:hover {
    background: #F2DC5D;
    border: 2px solid #F2DC5D;
  }
  .data-itemListItem {
    padding: 8px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #000;
  }
  .data-itemListItem:last-child {
    border: 0;
  }

  .data-itemListItem h2 {
    font: 16px 'Karla';
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
</style>
