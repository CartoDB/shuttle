<template>

<div>
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
                        <g data-v-31a768e4="" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <path data-v-31a768e4="" d="M1.26544797,3.62351861 L7.25879652,3.62351861 L7.25879652,4.37648139 L1.26544797,4.37648139 L3.78796516,7.52962788 L3.2,8 L0,4 L3.2,0 L3.78796516,0.470372124 L1.26544797,3.62351861 Z" id="Combined-Shape" fill="#BABCBE" fill-rule="nonzero"></path>
                        </g>
                    </svg>
                </li>
                <li class="browser-barIconsItem">
                    <svg width="8px" height="8px" viewBox="0 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g data-v-31a768e4="" id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <path data-v-31a768e4="" d="M1.26544797,3.62351861 L7.25879652,3.62351861 L7.25879652,4.37648139 L1.26544797,4.37648139 L3.78796516,7.52962788 L3.2,8 L0,4 L3.2,0 L3.78796516,0.470372124 L1.26544797,3.62351861 Z" id="Combined-Shape-Copy" fill="#BABCBE" fill-rule="nonzero" transform="translate(3.629398, 4.000000) rotate(-180.000000) translate(-3.629398, -4.000000) "></path>
                        </g>
                    </svg>
                </li>
            </ul>
            <div class="browser-barAddress">http://cartodb.github.io/airsephora
            <span></span>
            </div>
        </div>
        <!---->
        <div class="browser-content"></div>
    </div>
</div>
  <div class="export-iframe">
    <iframe ref="iframe" ></iframe>
  </div>
  <div class="export">
    <h1>Here's a preview of your map</h1>
    <ul class="export-list">
      <li><h2>Export to</h2></li>
      <li><button @click="exportZip" class="export-button">Zip file</button></li>
      <li><form action="https://codepen.io/pen/define" method="POST" target="_blank">
  <input type="hidden" name="data" :value="codepen">
  <input class="export-button export-button--secondary" type="submit" value="Edit on Codepen">
</form></li>
    </ul>
  </div>
</div>

</template>

<script>
import { generateBundle } from '@/generate-bundle/bundle';
import generate from '@/generate-bundle';

function parseGeomType(geomType) {
  switch (geomType) {
    case 'ST_Point':
      return 'point';
    case 'ST_LineString':
      return 'line';
    case 'ST_MultiPolygon':
      return 'polygon';
  }
}

export default {
  name: 'Export',
  data: function() {
    return {
      files: {},
      inject: ''
    };
  },
  watch: {
    inject: function(value) {
      var doc = this.$refs.iframe.contentWindow.document;
      doc.open();
      doc.write(value);
      doc.close();
    }
  },
  methods: {
    exportZip() {
      generateBundle(this.files);
    },

    exportCodePen() {
      this.$store.dispatch('generateCodePen', this.files);
    },

    reload() {
      this.generateData();
    },
    
    generateData() {
      const data = {
        ui: {
          colors: this.$store.state.color
        },
        layout: this.$store.state.layout,
        visualization: {
          library: this.$store.state.techType,
          data: {
            apiKey: 'default_public',
            username: this.$store.state.visualization.data.username,
            map: {
              type: this.$store.state.visualization.data.mapType,
              geometry: parseGeomType(this.$store.state.visualization.data.geomType),
              basemap: this.$store.state.visualization.basemap,
              extent: this.$store.state.visualization.data.extent,
              dataset: this.$store.state.visualization.data.dataset,
              column: this.$store.state.visualization.data.columnName,
              columnType: this.$store.state.visualization.data.columnType,
              colorRamp: this.$store.state.visualization.data.ramp
            }
          }
        }
      };
      console.log(data);
      const { files, inject } = generate(data);

      this.files = files;
      this.inject = inject;

      var doc = this.$refs.iframe.contentWindow.document;
      doc.open();
      doc.write(inject);
      doc.close();
    }
  },

  computed: {
    codepen() {
      return JSON.stringify({
        html: this.files['index.html'],
        js: this.files['src/app.js']
      });
    }
  },

  mounted() {
    if (this.$store.state.techType === null) {
      this.$router.replace({ name: 'home' });
    } else {
      this.generateData();
    }

  }
}
</script>


<style>

  .export-iframe {
    position: relative;
    padding-bottom: 56.25%; /*16:9*/
    padding-top: 30px; 
    height: 0; 
    overflow: hidden;
  }
   
  .export-iframe iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% + 20%);
    height: 100%;
    transform: scale(.8);
    transform-origin: 0 0;
  }

/*  iframe {
    width: 1920px;
    height: 1080px;
    transform: scale(0.5);
    transform-origin: 0 0;
  }*/
  .export {
    padding: 40px;
    margin-top: -100px;
  }
  .export h1 {
    font: 400 16px 'Karla';
    margin-bottom: 20px;
  }
  .export-list {
    display: flex;
    align-items: center;
  }
  .export-list li {
    margin-right: 24px;
  }
  .export-list li h2 {
    font: 700 20px 'Karla';
  }
  .export-button {
    border: 2px solid transparent;
    background: transparent;
    color: #fff;
    outline: none;
    cursor: pointer;
    padding: 8px 16px;
    background: #000;
  }
  .export-button--secondary {
    border: 2px solid black;
    background: transparent;
    color: #000;
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


</style>
