<template>
  <div class="container">
    <div class="browser">
      <div class="browser-header">
        <span class="browser-headerPoint browser-headerPoint--red"></span>
        <span class="browser-headerPoint browser-headerPoint--yellow"></span>
        <span class="browser-headerPoint browser-headerPoint--green"></span>
      </div>
      <div class="browser-inner">
        <div class="browser-bar">
          <ul class="browser-barIcons">
            <li class="browser-barIconsItem">
              <svg width="8px" height="8px" viewBox="0 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <path d="M1.26544797,3.62351861 L7.25879652,3.62351861 L7.25879652,4.37648139 L1.26544797,4.37648139 L3.78796516,7.52962788 L3.2,8 L0,4 L3.2,0 L3.78796516,0.470372124 L1.26544797,3.62351861 Z" id="Combined-Shape" fill="#BABCBE" fill-rule="nonzero"></path>
                  </g>
              </svg>
            </li>
             <li class="browser-barIconsItem">
              <svg width="8px" height="8px" viewBox="0 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <path d="M1.26544797,3.62351861 L7.25879652,3.62351861 L7.25879652,4.37648139 L1.26544797,4.37648139 L3.78796516,7.52962788 L3.2,8 L0,4 L3.2,0 L3.78796516,0.470372124 L1.26544797,3.62351861 Z" id="Combined-Shape-Copy" fill="#BABCBE" fill-rule="nonzero" transform="translate(3.629398, 4.000000) rotate(-180.000000) translate(-3.629398, -4.000000) "></path>
                  </g>
              </svg>
            </li>
          </ul>
          <div class="browser-barAddress">http://www.airsephora.es<span></span></div>
        </div>
        <div class="bookmarks-bar" v-if="easterEgg">
          <div class="bookmark">
            <img src="https://avatars.githubusercontent.com/javisantana" />
            <span>BBVA</span>
          </div>
          <div class="bookmark">
            <img src="https://avatars.githubusercontent.com/saleiva" />
            <span>Zara</span>
          </div>
          <div class="bookmark">
            <img src="https://avatars.githubusercontent.com/miguelarias" />
            <span>Telefónica</span>
          </div>
          <div class="bookmark">
            <img :src="`https://avatars.githubusercontent.com/${hamOrButi}`" />
            <span>7R</span>
          </div>
          <div class="bookmark">
            <img src="https://avatars.githubusercontent.com/matallo" />
            <span>Transferwise</span>
          </div>
        </div>
        <div class="browser-content">
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      easterEgg: false,
      hamOrButi: 'xavijam'
    };
  },

  methods: {
    onEasterEgg: function(e) {
      if (e.ctrlKey && e.shiftKey && e.keyCode === 66) {
        this.easterEgg = !this.easterEgg;
        this.hamOrButi = Math.random() > 0.5 ? 'nobuti' : 'xavijam';
      }
    }
  },

  mounted: function () {
    window.addEventListener('keydown', this.onEasterEgg, this);
  },

  destroyed: function () {
    window.removeEventListener('keydown', this.onEasterEgg, this);
  }
}
</script>


<style scoped>
  .container {
    max-width: 1220px;
    width: 100%;
    margin: 0 auto;
  }

  .browser {
    max-width: 880px;
    width: 100%;
  }

  .browser-header {
    background: #E8EAED;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    height: 38px;
    display: flex;
    padding: 14px;
    position: relative;
    z-index: 1;
  }
  .browser-headerPoint {
    border-radius: 50%;
    height: 8px;
    width: 8px;
    margin-right: 8px;
  }
    .browser-headerPoint--red {
      background: #FF6159;
    }
    .browser-headerPoint--yellow {
      background: #FFBD2D;
    }
    .browser-headerPoint--green {
      background: #29C940;
    }

  .browser-bar {
    padding: 5px;
    display: flex;
    align-items: center;
  }
  .browser-barIcons {
    display: flex;
    padding: 0 8px;
  }
  .browser-barIconsItem {
    margin-right: 12px;
  }
  .browser-inner {
    position: relative;
  }
  .browser-inner:after {
    content: '';
    position: absolute;
    top: -2px;
    right: 0;
    bottom: 0;
    left: 0;
    border: 1px solid rgba(0, 0, 0, 0.05);
    pointer-events: none;
  }
  .browser-content {
    position: relative;
    background: #F3F5F5;
    height: 500px;
  }
  .browser-barAddress {
    background: #F1F3F4;
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 10px;
    color: rgba(0, 0, 0, 0.6);
    flex: 1;
  }

    .browser-barAddress span { 
      animation-name: blinker;
      animation-iteration-count: infinite;
      animation-timing-function: cubic-bezier(1,0,0,1);
      animation-duration: .8s;
      display: inline-block;
      width: 1px;
      height: 12px;
      background: rgba(0, 0, 0, .4);
      vertical-align: middle;
      transform: translateY(0px) translateX(-1px);
      margin-left: 4px;
    }

    @keyframes blinker { 
      from { opacity: 1.0; } to { opacity: 0.0; }
    }

  .bookmark {
    padding: 4px;
    font-size: 10px;
    border-radius: 20px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
  }

  .bookmark:hover {
    background-color: #dedede;
  }

  .bookmark img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }

</style>
