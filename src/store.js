import Vue from 'vue'
import Vuex from 'vuex'
import chroma from 'chroma-js';

Vue.use(Vuex)

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function randSign() {
  return Math.random() > 0.5 ? '+' : '-';
}

export default new Vuex.Store({
  state: {
    color: {
      primary: '#FFA630',
      secondary: '#D7E8BA',
      complementary: '#2E5077'
    },
    data: {
      mapType: null,
      username: null,
      dataset: null,
      apiKey: null,
      oauth: null
    }
  },
  mutations: {
    setPrimaryColor: function (state, color) {
      state.color.primary = color;
    },
    setSecondaryColor: function (state, color) {
      state.color.secondary = color;
    },
    setComplementaryColor: function (state, color) {
      state.color.complementary = color;
    },
    setUsername: function (state, username) {
      state.data.username = username;
    },
    setDataset: function (state, dataset) {
      state.data.dataset = dataset;
    },
    setApiKey: function (state, apiKey) {
      state.data.apiKey = apiKey;
    },
    setMapType: function (state, mapType)  {
      state.data.mapType = mapType;
    }
  },
  actions: {
    randomizeColors: function (context) {
      const primary = chroma.random();
      const secondary = primary
        .set('hsl.l', `*${randomIntFromInterval(80, 85) / 100}`)
        .set('hsv.h', `${randSign()}${randomIntFromInterval(0, 5)}`);
      const complementary = primary.set('hsl.h', `${randSign()}135`);
      
      context.commit('setPrimaryColor', primary);
      context.commit('setSecondaryColor', secondary);
      context.commit('setComplementaryColor', complementary);
    }
  }
})
