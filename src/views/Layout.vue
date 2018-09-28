<template>
  <div class="inner">
    <div class="container">
      <select v-model="basemap">
        <option value="voyager" selected>Voyager</option>
        <option value="darkmatter">Dark Matter</option>
      </select>

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
            <div class="browser-barAddress">http://cartodb.github.io/airsephora<span></span></div>
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
            <div class="bookmark">
              <img src="https://avatars.githubusercontent.com/arianaescobar" />
              <span>Heroku</span>
            </div>
            <div class="bookmark">
              <img src="https://avatars.githubusercontent.com/rubenmoya" />
              <span>Acid tango</span>
            </div>
          </div>
          <BrowserDrop :basemap="currentBasemap" :draggingElement="draggingElement" />
        </div>
        </div>


    <ul class="template-inner">
      <li class="template-innerItem" :class="{'is-inactive': hasToolbar}" draggable="true" @mouseover="onDrag" @mouseout="onDragEnd" @drag="onDrag" @dragend="onDragEnd" data-type="lateralToolbar">
        <div class="template-innerItemMedia">
          <svg width="24px" height="74px" viewBox="0 0 24 74" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect id="Rectangle-Copy-2" fill="#2D51E7" x="0" y="0" width="24" height="74" rx="4"></rect>
            <rect id="Rectangle-4" fill="#5675ED" x="8" y="57" width="9" height="9"></rect>
          </svg>
        </div>
        <p>Lateral Toolbar</p>
      </li>
      <li class="template-innerItem" :class="{'is-inactive': hasToolbar}" draggable="true" @mouseover="onDrag" @mouseout="onDragEnd" @drag="onDrag" @dragend="onDragEnd" data-type="topToolbar">
        <div class="template-innerItemMedia">
          <svg width="89px" height="17px" viewBox="0 0 89 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect id="Rectangle-Copy-3" fill="#2D51E7" x="0" y="0" width="89" height="17" rx="4"></rect>
            <rect id="Rectangle-4-Copy" fill="#5675ED" x="6" y="4" width="9" height="9"></rect>
          </svg>
        </div>
        <p>Top Toolbar</p>
      </li>
      <li class="template-innerItem" :class="{'is-inactive': hasAllSidebars}" draggable="true" @mouseover="onDrag" @mouseout="onDragEnd" @drag="onDrag" @dragend="onDragEnd" data-type="sidebar">
        <div class="template-innerItemMedia">
            <svg width="75px" height="76px" viewBox="0 0 75 76" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <rect id="Rectangle" fill="#2D51E7" x="0" y="0" width="75" height="76" rx="4"></rect>
              <rect id="Rectangle-2" fill="#5874ED" x="7" y="10" width="57" height="4"></rect>
              <rect id="Rectangle-2-Copy" fill="#5874ED" x="7" y="19" width="30" height="14"></rect>
              <rect id="Rectangle-2-Copy-2" fill="#5874ED" x="7" y="37" width="30" height="3"></rect>
              <rect id="Rectangle-2-Copy-3" fill="#5874ED" x="7" y="46" width="40" height="3"></rect>
              <rect id="Rectangle-2-Copy-4" fill="#5874ED" x="7" y="55" width="60" height="3"></rect>
              <rect id="Rectangle-2-Copy-5" fill="#5874ED" x="7" y="64" width="40" height="3"></rect>
            </svg>
        </div>
        <p>Sidebar</p>
      </li>
      <li class="template-innerItem" :class="{'is-inactive': hasFooter}" draggable="true" @mouseover="onDrag" @mouseout="onDragEnd" @drag="onDrag" @dragend="onDragEnd" data-type="footer">
        <div class="template-innerItemMedia">
            <svg width="125px" height="54px" viewBox="0 0 125 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <rect id="Rectangle-Copy" fill="#2D51E7" x="0" y="0" width="125" height="54" rx="4"></rect>
              <rect id="Rectangle-2-Copy-6" fill="#5874ED" x="9" y="11" width="44" height="4"></rect>
              <rect id="Rectangle-3" fill="#5675ED" x="10" y="26" width="8" height="18"></rect>
              <rect id="Rectangle-3-Copy-5" fill="#5675ED" x="60" y="26" width="8" height="18"></rect>
              <rect id="Rectangle-3-Copy" fill="#5675ED" x="20" y="34" width="8" height="10"></rect>
              <rect id="Rectangle-3-Copy-6" fill="#5675ED" x="70" y="34" width="8" height="10"></rect>
              <rect id="Rectangle-3-Copy-2" fill="#5675ED" x="30" y="29" width="8" height="15"></rect>
              <rect id="Rectangle-3-Copy-7" fill="#5675ED" x="80" y="29" width="8" height="15"></rect>
              <rect id="Rectangle-3-Copy-3" fill="#5675ED" x="50" y="38" width="8" height="6"></rect>
              <rect id="Rectangle-3-Copy-8" fill="#5675ED" x="100" y="38" width="8" height="6"></rect>
              <rect id="Rectangle-3-Copy-4" fill="#5675ED" x="40" y="24" width="8" height="20"></rect>
              <rect id="Rectangle-3-Copy-9" fill="#5675ED" x="90" y="24" width="8" height="20"></rect>
            </svg>
          </div>
          <p>Footer</p>
      </li>
      <li class="template-innerItem" :class="{'is-inactive': hasAllPanels}" draggable="true" @mouseover="onDrag" @mouseout="onDragEnd" @drag="onDrag" @dragend="onDragEnd" data-type="panel">
        <div class="template-innerItemMedia">
          <svg width="75px" height="54px" viewBox="0 0 75 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <rect id="Rectangle" fill="#2D51E7" x="0" y="0" width="75" height="54" rx="4"></rect>
              <rect id="Rectangle-2" fill="#5874ED" x="7" y="10" width="4" height="4"></rect>
              <rect id="Rectangle-2-Copy-6" fill="#5874ED" x="17" y="10" width="24" height="4"></rect>
              <rect id="Rectangle-2-Copy" fill="#5874ED" x="7" y="20" width="4" height="4"></rect>
              <rect id="Rectangle-2-Copy-7" fill="#5874ED" x="17" y="20" width="44" height="4"></rect>
              <rect id="Rectangle-2-Copy-2" fill="#5874ED" x="7" y="30" width="4" height="4"></rect>
              <rect id="Rectangle-2-Copy-8" fill="#5874ED" x="17" y="30" width="38" height="4"></rect>
              <rect id="Rectangle-2-Copy-3" fill="#5874ED" x="7" y="40" width="4" height="4"></rect>
              <rect id="Rectangle-2-Copy-9" fill="#5874ED" x="17" y="40" width="10" height="4"></rect>
          </svg>
        </div>
        <p>Panels</p>
      </li>
    </ul>
    <img class="preloadbasemaps" v-for="(basemap, index) in allBaseMaps" :key="index" :src="basemap" />
    </div>
  </div>
</template>

<script>
import BrowserDrop from '../components/BrowserDrop'
import darkmatter from '@/assets/images/basemaps/darkmatter.png'
import voyager from '@/assets/images/basemaps/voyager.png'

const BASEMAPS = {
  darkmatter,
  voyager
};

export default {
  name: 'Layout',
  components: {
    BrowserDrop
  },
  data: function () {
    return {
      easterEgg: false,
      hamOrButi: 'xavijam',
      basemap: 'voyager',
      draggingElement: null
    };
  },
  computed: {
    allBaseMaps() {
      return BASEMAPS;
    },
    currentBasemap() {
      return BASEMAPS[this.basemap];
    },
    hasToolbar() {
      return this.$store.state.layout.toolbar.position !== undefined;
    },
    hasAllSidebars() {
      return this.$store.state.layout.sidebars.length === 2;
    },
    hasAllPanels() {
      return this.$store.state.layout.panels.length === 4;
    },
    hasFooter() {
      return this.$store.state.layout.footer !== null;
    }
  },
  methods: {
    onDrag: function (e) {
      this.draggingElement = e.srcElement.dataset.type;
    },
    onDragEnd: function () {
      this.draggingElement = null;
    },
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
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }

  .browser {
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    pointer-events: none;
  }

  .browser-barAddress {
    background: #F1F3F4;
    padding: 8px 16px;
    border-radius: 50px;
    font: 12px 'Karla';
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

  .bookmarks-bar {
    padding: 5px 8px;
  }
  .bookmark {
    padding: 6px 8px;
    font: 10px 'Karla';
    border-radius: 12px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
  }

  .bookmark:hover {
    background-color: #EDEDEE;
  }

  .bookmark img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  .template-inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 40px;
  }

  .template-innerItem {
    background: #F7F9FA;
    border-radius: 8px;
    margin-bottom: 56px;
    height: 143px;
    background: #F7F9FA;
    text-align: center;
    position: relative;
    width: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .template-innerItem:hover {
    cursor: pointer;
  }
  .template-innerItem:hover:after,
  .template-innerItem.is-dragging:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    border: 2px dotted #2D51E8;
    border-radius: 8px;
  }
  .template-innerItem.is-dragging {
    background: #F7F9FA;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.14);
  }
  .template-innerItem.is-inactive {
    pointer-events: none;
  }
  .template-innerItem.is-inactive svg {
    opacity: .2;
    filter: grayscale(1);
  }
  .template-innerItem.is-inactive p {
    opacity: .4
  }
  .template-innerItem.is-inactive:hover:after {
    display: none;
  }



  .template-innerItem p {
    font-size: 14px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
  }
  .template-innerItem:last-child {
    margin-bottom: 0;
  }
  .template-innerItemMedia {
    pointer-events: none;
  }

  .preloadbasemaps {
    position: absolute;
    left: -1000px;
    top: -1000px;
    opacity: 0;
  }
</style>
