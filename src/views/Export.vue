<template>

<div>
    <div class="export-iframe">
      <iframe ref="iframe" ></iframe>
    </div>
    <div class="export">
      <h1>Here's a preview of your map</h1>
      <ul class="export-list">
        <li><h2>Export to</h2></li>
        <li><button @click="exportZip" class="export-button">Zip file</button></li>
        <li><button @click="exportCodePen" class="export-button export-button--secondary">Codepen</button></li>
        <li><button @click="reload" class="export-button export-button--secondary">Reload iframe</button></li>
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

  mounted() {
    this.generateData();
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
    width: 100%;
    height: 100%;
  }

/*  iframe {
    width: 1920px;
    height: 1080px;
    transform: scale(0.5);
    transform-origin: 0 0;
  }*/
  .export {
    padding: 40px;
  }
  .export h1 {
    font: 700 20px 'Karla';
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
    font: 400 16px 'Karla';
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

</style>
