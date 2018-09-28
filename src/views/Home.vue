<template>
  <div class="home">
    <div class="container">
      <img src="/assets/cobete.png" width="130"/>
      <h1 class="home-title">Shuttle</h1>
      <p class="home-description">Configure your application, choose your colors, layout, and the CARTO stack</p>
      <button class="home-button" @click='gotoConfig'>Configure</button>

    </div>
  </div>
</template>


<script>
import { steps } from '@/router';

export default {
  methods: {
    gotoConfig: function() {
      this.$router.push({
        name: steps[0]
      })
    }
  }
}
</script>


<style scoped>
  .home {
    background: #F2DC5D;
    height: 100vh;
    display: flex;
    align-items: center;
  }
  .container {
    max-width: 980px;
    width: 100%;
    margin: 0 auto;
  }
  .home-title {
    font: 700 80px 'Playfair Display';
    margin-bottom: 20px;
  }
  .home-description {
    font: 400 24px/1.6 'Karla';
    margin-bottom: 40px;
  }
  .home-button {
    -webkit-appearance: none;
    appearance: none;
    background: black;
    font: 400 16px/1.6 'Karla';
    color: #fff;
    border: 0;
    padding: 16px 36px;
    text-transform: uppercase;
    cursor: pointer;
    border: 2px solid black;
  }
  .home-button:hover {
    border: 2px solid black;
    background: transparent;
    color: #000;
    outline: none;
  }


</style>
