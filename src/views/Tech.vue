<template>
  <div class="inner">
    <div class="stack-container">
      <h2 class="stack-title">CARTO Stack</h2> 
      <p class="stack-description">You can choose between CARTO.js (raster) and CARTO VL (vector)</p>
      <ul class="stack-options">
        <li class="stack-optionsItem" @click="pickRaster" :class="{ 'is-active': isRaster }">
          <div class="stack-optionsItemMedia">
              <img :src="`/assets/stack/js.png`" class="icon-normal" />
              <img :src="`/assets/stack/js_selected.png`" class="icon-active" />
          </div>
          <h2>CARTO.js</h2>
        </li>
        <li class="stack-optionsItem" @click="pickVector" :class="{ 'is-active': isVector }">
          <div class="stack-optionsItemMedia">
              <img :src="`/assets/stack/vector.png`" class="icon-normal" />
              <img :src="`/assets/stack/vector_selected.png`" class="icon-active" />
          </div>
          <h2>CARTO VL</h2>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tech',

  computed: {
    isRaster() {
      return this.$store.state.techType === 'cartojs';
    },

    isVector() {
      return this.$store.state.techType === 'cartovl';
    }
  },

  methods: {
    pickRaster() {
      this.$store.commit('setTech', 'cartojs');
    },
    pickVector() {
      this.$store.commit('setTech', 'cartovl');
    }
  }
}
</script>


<style scoped>
  .stack-title {
    margin-bottom: 20px;
    font: 700 40px 'Playfair Display';
  }
  .stack-container {
    padding: 40px;
    height: 100vh;
    overflow: scroll;
  }
  .stack-description {
    font: 400 20px 'Karla';
    margin-bottom: 80px;
  }
  .stack-options {
    display: flex;
    position: relative;
  }
  .stack-options h2 {
    font: 20px 'Karla';
    color: rgba(0, 0, 0, 0.6);
  }
  .stack-options.is-active h2 {
    font-weight: 700;
    color: rgba(0, 0, 0, 1);
  }
  .stack-optionsItem {
    margin-right: 80px;
  }
  .stack-optionsItemMedia {
    width: 200px;
    height: 200px;
    background: #EEEEEE;
    margin-bottom: 20px;
    position: relative;
  }


  .stack-optionsItemMedia:hover {
    cursor: pointer;
  }
  .stack-optionsItemMedia:hover:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 2px solid #000;
    z-index: 3;
  }
  .stack-optionsItem.is-active .stack-optionsItemMedia:hover:after {
    display: none;
  }
  .stack-optionsItemMedia img {
    position: absolute;
    transition: all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
  }
  .stack-optionsItemMedia .icon-normal {
    z-index: 2;
  }
  .stack-optionsItemMedia .icon-active {
    opacity: 0;
  }
  .stack-optionsItem.is-active .icon-normal {
    opacity: 0;
  }
  .stack-optionsItem.is-active .icon-active {
    opacity: 1;
  }

  .stack-optionsItem.is-active h2 {
    font-weight: 700;
    color: rgba(0, 0, 0, 1);
  }

</style>