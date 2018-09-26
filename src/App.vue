<template>
  <div id="app">
    <ProgressBar :progress="progress" />
    <div class="help">{{ helpForStep }}</div>
    <Progress :index="routeIndex" />
    <div class="main-view">
      <router-view />
    </div>
  </div>
</template>

<script>
import { steps } from '@/router';
import ProgressBar from '@/components/ProgressBar.vue';
import Progress from '@/components/Progress.vue';

export default {
  components: {
    ProgressBar,
    Progress
  },

  computed: {
    routeIndex: function () {
      return steps.indexOf(this.$route.name);
    },

    progress: function () {
      return Math.floor(((this.routeIndex + 1) / steps.length) * 100);
    },

    helpForStep: function () {
      switch (this.$route.name) {
        case 'colors':
          return 'Press the spacebar to switch colors';
        case 'layout':
          return 'Pick a layout';
        case 'data':
          return 'Configure what data to show';
        case 'tech':
          return 'Vector? Raster?';
        default:
          return null;
      }
    }
  }
}
</script>


<style scoped>
.help {
  margin-top: 18px;
  font-weight: bold;
  color: #727272;
  font-size: 14px;
  text-align: center;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-view {
  flex: 1;
}
</style>
