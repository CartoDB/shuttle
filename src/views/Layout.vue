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
          <svg width="92px" height="61px" viewBox="0 0 92 61" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Group-6" fill-rule="nonzero">
                      <rect id="Rectangle-2-Copy-14" fill="#EEEEEE" x="0" y="0" width="92" height="61"></rect>
                      <rect id="Rectangle" fill="#D5D5D5" x="38" y="7" width="13" height="47"></rect>
                      <rect id="Rectangle-4" fill-opacity="0.4" fill="#FFFFFF" x="41" y="44" width="7" height="7"></rect>
                  </g>
              </g>
          </svg>
        </div>
        <p>Lateral Toolbar</p>
      </li>
      <li class="template-innerItem" :class="{'is-inactive': hasToolbar}" draggable="true" @mouseover="onDrag" @mouseout="onDragEnd" @drag="onDrag" @dragend="onDragEnd" data-type="topToolbar">
        <div class="template-innerItemMedia">
          <svg width="92px" height="61px" viewBox="0 0 92 61" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Group-7" fill-rule="nonzero">
                      <rect id="Rectangle-2-Copy-15" fill="#EEEEEE" x="0" y="0" width="92" height="61"></rect>
                      <rect id="Rectangle-Copy" fill="#D5D5D5" x="7" y="7" width="77" height="13"></rect>
                      <rect id="Rectangle-4-Copy" fill-opacity="0.4" fill="#FFFFFF" x="10" y="10" width="7" height="7"></rect>
                  </g>
              </g>
          </svg>
        </div>
        <p>Top Toolbar</p>
      </li>
      <li class="template-innerItem" :class="{'is-inactive': hasAllSidebars}" draggable="true" @mouseover="onDrag" @mouseout="onDragEnd" @drag="onDrag" @dragend="onDragEnd" data-type="sidebar">
        <div class="template-innerItemMedia">
          <svg width="92px" height="61px" viewBox="0 0 92 61" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Group-8" fill-rule="nonzero">
                      <rect id="Rectangle-2-Copy-16" fill="#EEEEEE" x="0" y="0" width="92" height="61"></rect>
                      <g id="Group-5" transform="translate(18.000000, 9.000000)">
                          <rect id="Rectangle-Copy-2" fill="#D5D5D5" x="0" y="0" width="57" height="43"></rect>
                          <rect id="Rectangle-4-Copy-2" fill-opacity="0.4" fill="#FFFFFF" x="5" y="4" width="39" height="6"></rect>
                          <rect id="Rectangle-4-Copy-3" fill-opacity="0.4" fill="#FFFFFF" x="5" y="14" width="19" height="16"></rect>
                      </g>
                      <rect id="Rectangle-4-Copy-4" fill-opacity="0.4" fill="#FFFFFF" x="23" y="44" width="29" height="3"></rect>
                  </g>
              </g>
          </svg>
        </div>
        <p>Sidebar</p>
      </li>
      <li class="template-innerItem" :class="{'is-inactive': hasFooter}" draggable="true" @mouseover="onDrag" @mouseout="onDragEnd" @drag="onDrag" @dragend="onDragEnd" data-type="footer">
        <div class="template-innerItemMedia">
          <svg width="92px" height="61px" viewBox="0 0 92 61" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch -->
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Group-9" fill-rule="nonzero">
                      <rect id="Rectangle-2-Copy-17" fill="#EEEEEE" x="0" y="0" width="92" height="61"></rect>
                      <g id="Group-5-Copy" transform="translate(8.000000, 27.000000)">
                          <rect id="Rectangle-Copy-2" fill="#D5D5D5" x="0" y="0" width="77" height="28"></rect>
                          <rect id="Rectangle-4-Copy-3" fill-opacity="0.4" fill="#FFFFFF" x="5" y="4" width="29" height="2"></rect>
                      </g>
                      <rect id="Rectangle-4-Copy-5" fill-opacity="0.4" fill="#FFFFFF" x="14" y="44" width="4" height="6"></rect>
                      <rect id="Rectangle-4-Copy-6" fill-opacity="0.4" fill="#FFFFFF" x="20" y="41" width="4" height="9"></rect>
                      <rect id="Rectangle-4-Copy-7" fill-opacity="0.4" fill="#FFFFFF" x="26" y="39" width="4" height="11"></rect>
                      <rect id="Rectangle-4-Copy-8" fill-opacity="0.4" fill="#FFFFFF" x="32" y="43" width="4" height="7"></rect>
                      <rect id="Rectangle-4-Copy-9" fill-opacity="0.4" fill="#FFFFFF" x="38" y="40" width="4" height="10"></rect>
                      <rect id="Rectangle-4-Copy-10" fill-opacity="0.4" fill="#FFFFFF" x="44" y="38" width="4" height="12"></rect>
                      <rect id="Rectangle-4-Copy-11" fill-opacity="0.4" fill="#FFFFFF" x="50" y="42" width="4" height="8"></rect>
                      <rect id="Rectangle-4-Copy-12" fill-opacity="0.4" fill="#FFFFFF" x="56" y="39" width="4" height="11"></rect>
                      <rect id="Rectangle-4-Copy-13" fill-opacity="0.4" fill="#FFFFFF" x="62" y="41" width="4" height="9"></rect>
                  </g>
              </g>
          </svg>
          </div>
          <p>Footer</p>
      </li>
      <li class="template-innerItem" :class="{'is-inactive': hasAllPanels}" draggable="true" @mouseover="onDrag" @mouseout="onDragEnd" @drag="onDrag" @dragend="onDragEnd" data-type="panel">
        <div class="template-innerItemMedia">
          <svg width="92px" height="61px" viewBox="0 0 92 61" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch -->
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Group-10" fill-rule="nonzero">
                      <rect id="Rectangle-2-Copy-18" fill="#EEEEEE" x="0" y="0" width="92" height="61"></rect>
                      <g id="Group-5-Copy-2" transform="translate(8.000000, 9.000000)">
                          <rect id="Rectangle-Copy-2" fill="#D5D5D5" x="0" y="0" width="77" height="45"></rect>
                          <rect id="Rectangle-4-Copy-3" fill-opacity="0.4" fill="#FFFFFF" x="5" y="5" width="4" height="4"></rect>
                          <rect id="Rectangle-4-Copy-23" fill-opacity="0.4" fill="#FFFFFF" x="15" y="5" width="44" height="4"></rect>
                          <rect id="Rectangle-4-Copy-14" fill-opacity="0.4" fill="#FFFFFF" x="5" y="15" width="4" height="4"></rect>
                          <rect id="Rectangle-4-Copy-24" fill-opacity="0.4" fill="#FFFFFF" x="15" y="15" width="36" height="4"></rect>
                          <rect id="Rectangle-4-Copy-15" fill-opacity="0.4" fill="#FFFFFF" x="5" y="25" width="4" height="4"></rect>
                          <rect id="Rectangle-4-Copy-25" fill-opacity="0.4" fill="#FFFFFF" x="15" y="25" width="49" height="4"></rect>
                          <rect id="Rectangle-4-Copy-16" fill-opacity="0.4" fill="#FFFFFF" x="5" y="35" width="4" height="4"></rect>
                          <rect id="Rectangle-4-Copy-26" fill-opacity="0.4" fill="#FFFFFF" x="15" y="35" width="19" height="4"></rect>
                      </g>
                  </g>
              </g>
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
    padding: 40px;
  }
  .template-innerItem {
    margin-right: 40px;
  }
  .template-innerItem:last-child{
    margin-right: 0;
  }

  .template-innerItemMedia {
    position: relative;
    width: 92px;
    height: 61px;
    margin-bottom: 8px;
  }
  .template-innerItemMedia:hover {
    cursor: pointer;
  }
  .template-innerItemMedia:hover:after,
  .template-innerItemMedia.is-dragging:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 2px solid #000;
    z-index: 3;
  }

  .template-innerItem:hover {
    cursor: pointer;
  }
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
  .template-innerItem.is-dragging .template-innerItemMedia {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.50);
  }
  .template-innerItem:hover .template-innerItemMedia:after  {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    border: 2px solid #000;
  }
  .template-innerItem.is-dragging .template-innerItemMedia:after  {
    border: 2px dashed #000;
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
    font: 16px 'Karla';
    color: rgba(0, 0, 0, 0.6);
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
