<template>

<div>
  <h1>Here's a preview of your map</h1>
  <h1>Export to</h1>
  <button @click="exportZip">Zip file</button>
  <button @click="exportCodePen">Codepen</button>
  <button @click="reload">Reload iframe</button>
  <div>
    <iframe ref="iframe" class="iframe"></iframe>
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
      debugger;
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
.iframe {
  width: 1920px;
  height: 1080px;
  transform: scale(0.5);
  transform-origin: 0 0;
}
</style>
