<template>
<div class="progressBg">
  <div class="progressBar" :style="{ 'width': `${progress}%` }"></div>
</div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: 0
    }
  }
}
</script>


<style scoped>
.progressBg {
  background-color: #000;
}

.progressBar {
  height: 8px;
  background-color: #F2DC5D;
  transition: width 0.2s linear;
}
</style>
