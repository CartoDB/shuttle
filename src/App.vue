<template>
  <div id="app">
    <aside class="header" v-if="!onHome">
      <div class="header-progress">
        <ProgressBar :progress="progress"  />
        <div class="header-progressInner">
          <h1 class="header-progressTitle">Airsephora</h1>
          <p class="header-progresshelp">{{ helpForStep }}</p>
          <Progress :completedSteps="completedSteps" :index="routeIndex" />
        </div>
      </div>
      <ul class="header-actions">
        <li>
          <button class="header-button is-prev" @click="previousStep">
            Previous
          </button>
        </li>
        <li>
          <button class="header-button" @click="completeStep">
            Next
          </button>
        </li>
      </ul>
    </aside>
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

  methods: {
    previousStep: function () {
      const index = steps.indexOf(this.$route.name);

      if (index !== -1 && index > 0) {
        this.$router.push({ name: steps[index - 1]});
      }
    },

    completeStep: function () {
      this.$store.commit('completeStep', this.$route.name);
      const index = steps.indexOf(this.$route.name);
      
      if (index !== -1 && index < steps.length) {
        this.$router.push({ name: steps[index + 1] });
      }
    }
  },

  computed: {
    completedSteps: function () {
      return this.$store.state.completedSteps;
    },

    routeIndex: function () {
      return steps.indexOf(this.$route.name);
    },

    onHome: function () {
      return this.$route.name === 'home';
    },

    progress: function () {
      return Math.floor(((this.routeIndex + 1) / steps.length) * 100);
    },

    helpForStep: function () {
      switch (this.$route.name) {
        case 'colors':
          return 'Press the spacebar to switch colors or create your own color ramp';
        case 'layout':
          return 'Drag and drop the components to create your own Airship layout';
        case 'data':
          return 'Configure what data to show';
        case 'tech':
          return 'You can choose between CARTOjs or CARTO VL';
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
}

.header {
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  position: relative;
}
  .header:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 1px;
    background: rgba(0, 0, 0, 0.1);
  }
  .header-progress {
    flex: 1;
  }
  .header-actions {
    background: #F2DC5D;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-progressInner {
    padding: 40px;
  }
  .header-progressTitle {
    font: 700 60px 'Playfair Display';
    margin-bottom: 20px;
  }
  .header-progresshelp {
    font: 400 16px/1.6 'Karla';
    margin-bottom: 40px;
  }
.main-view {
  flex: 1;
}
  .main-view .inner {
    background: rgba(0, 0, 0, 0.02);
    height: 100vh;
  }
.header-button {
    -webkit-appearance: none;
    appearance: none;
    background: black;
    font: 400 16px/1.6 'Karla';
    color: #fff;
    border: 0;
    padding: 8px 24px;
    text-transform: uppercase;
    cursor: pointer;
    border: 2px solid black;
}
.header-button:hover {
    border: 2px solid black;
    background: transparent;
    color: #000;
    outline: none;
    cursor: pointer;
}
.header-button.is-prev {
  background: none;
  color: #000;
  border: 2px solid transparent;
  padding-left: 0;
}
</style>
