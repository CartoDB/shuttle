<template>
  <div class="color-wrapper">
    <div :style="{ 'background-color': primaryColor }" class="colorBar">
      <span class="color-label color-type">Primary</span>
      <input spellcheck="false" class="color-label color-value" v-model="primaryColor" />
    </div>
    <div :style="{ 'background-color': secondaryColor }" class="colorBar">
      <span class="color-label color-type">Secondary</span>
      <input spellcheck="false" class="color-label color-value" v-model="secondaryColor" />
    </div>
    <div :style="{ 'background-color': complementaryColor }" class="colorBar">
      <span class="color-label color-type">Complementary</span>
      <input spellcheck="false" class="color-label color-value" v-model="complementaryColor" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Colors',

  computed: {
    primaryColor: {
      get () {
        return this.$store.state.color.primary;
      },

      set (value) {
        this.$store.commit('setPrimaryColor', value);
      }
    },

    secondaryColor: {
      get () {
        return this.$store.state.color.secondary;
      },

      set (value) {
        this.$store.commit('setSecondaryColor', value);
      }
    },

    complementaryColor: {
      get () {
        return this.$store.state.color.complementary;
      },

      set (value) {
        this.$store.commit('setComplementaryColor', value);
      }
    }
  },

  methods: {
    onKeyUp: function (e) {
      if (e.keyCode === 32) {
        this.$store.dispatch('randomizeColors');
      }
    }
  },

  mounted: function () {
    window.addEventListener('keyup', this.onKeyUp, this);
  },

  destroyed: function () {
    window.removeEventListener('keyup', this.onKeyUp, this);
  }
}
</script>

<style scoped>
.color-wrapper {
  display: flex;
  height: 100%;
  position: relative;
}

.color-label {
  color: white;
  text-shadow: 0 0 4px #2f2f2f;
}

.color-type {
  font-size: 12px;
  margin-bottom: 4px;
}

.color-value {
  font-size: 24px;
  font-weight: bold;
  /* Input style removal */
  background: none;
  border: none;
  text-align: center;
  outline: none;
}

.color-value:active {
  border: none;
}

.colorBar {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 52px;
  transition: background-color 0.2s linear;
}
</style>
