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
        if (value.length === 7) {
          this.$store.commit('setPrimaryColorAndRandomize', value);
        }
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
  flex-direction: column;
}

.color-label {
  color: white;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.10  );
}

.color-type {
  font: 400 16px/24px Karla;
  margin-bottom: 8px;
  opacity: .6;
}

.color-value {
  font-weight: 700;
  font-size: 36px;
  text-transform: uppercase;
  /* Input style removal */
  background: none;
  border: none;
  outline: none;
}

.color-value:active {
  border: none;
}

.colorBar {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
  padding-left: 40px;
}
</style>
