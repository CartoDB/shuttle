<template>
  <div class="home">
    <div class="container">

      <svg width="102px" height="136px" viewBox="0 0 102 136" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch -->
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="space-shuttle" fill-rule="nonzero">
                  <path d="M33,116 L69,116 L69,26.7692554 C69,16.9132076 60.9409451,0 51,0 C41.0590549,0 33,16.9128871 33,26.7692554 L33,116 Z" id="Shape" fill="#FFFFFF"></path>
                  <g id="Group" transform="translate(30.000000, 127.000000)" fill="#000000">
                      <rect id="Rectangle-path" x="0.114559701" y="0.287689655" width="17.8665" height="8.63937931"></rect>
                      <rect id="Rectangle-path" x="25.0189403" y="0.287689655" width="17.8665" height="8.63937931"></rect>
                  </g>
                  <path d="M33,80 L0.62756343,112.368447 C-0.712975738,113.708821 0.236330339,116 2.1320325,116 L33,116" id="Shape" fill="#000000"></path>
                  <path d="M69,80 L101.372437,112.368447 C102.712976,113.708821 101.76367,116 99.8679675,116 L69,116" id="Shape" fill="#000000"></path>
                  <path d="M23.0003233,126 L50,126 L50,59.333493 C50,51.969706 43.955745,46 36.5,46 C29.044255,46 23,51.969706 23,59.333493 L23,126 L23.0003233,126 Z" id="Shape" fill="#000000"></path>
                  <path d="M51.0003233,126 L78,126 L78,59.333493 C78,51.969706 71.955745,46 64.5,46 C57.044255,46 51,51.969706 51,59.333493 L51,126 L51.0003233,126 Z" id="Shape" fill="#000000"></path>
                  <path d="M51,9 C54.9802189,9 58.5516932,7.82739421 61,5.96874775 C58.14839,2.42054027 54.706869,0 51,0 C47.293131,0 43.85161,2.42118687 41,5.96842446 C43.4483068,7.82707091 47.0197811,9 51,9 Z" id="Shape" fill="#000000"></path>
                  <path d="M44.6362281,27 L57.3637719,27 C58.8202604,27 60,25.8195502 60,24.3636298 L60,20.6363702 C60,19.1798031 58.8196138,18 57.3637719,18 L44.6362281,18 C43.1797396,18 42,19.1804498 42,20.6363702 L42,24.3636298 C42,25.8192269 43.1807095,27 44.6362281,27 Z" id="Shape" fill="#000000"></path>
              </g>
          </g>
      </svg>
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
