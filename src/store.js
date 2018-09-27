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
    layout: {
      toolbar: {},
      sidebars: [],
      panels: [],
      footer: null
    },
    visualization: {
      basemap: 'voyager'
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
    setPrimaryColorAndRandomize: function (state, color) {
      const primary = chroma(color);
      const secondary = primary
        .set('hsl.l', `*${randomIntFromInterval(80, 85) / 100}`)
        .set('hsv.h', `${randSign()}${randomIntFromInterval(0, 5)}`);
      const complementary = primary.set('hsl.h', `${randSign()}135`);

      state.color.primary = primary;
      state.color.secondary = secondary;
      state.color.complementary = complementary;
    },
    setBasemap: function (state, basemap) {
      state.visualization.basemap = basemap;
    }
  },
  actions: {
    randomizeColors: function (context) {
      context.commit('setPrimaryColorAndRandomize', chroma.random().hex());
    }
  }
})
