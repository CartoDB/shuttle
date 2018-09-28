<template>

<div>
  <h1>Here's a preview of your map</h1>
  <div>
    <iframe class="iframe" src="https://carto.com"></iframe>
  </div>
  <h1>Export to</h1>
  <button>Zip file</button>
  <button>Codepen</button>
</div>

</template>

<script>
export default {
  name: 'Export',
  methods: {
    exportZip() {
      
    },

    exportCodePen() {

    }
  },
}
</script>


<style>
.iframe {
  width: 1920px;
  height: 1080px;
  transform: scale(0.5) translate(-960px, -540px);
}
</style>
