<template>
<ul class="step-wrapper">
  <li class="step" :class="{ 'step-number--active' : (i <= index ), 'step-number--completed': (completedSteps.indexOf(step) !== -1) }" v-for="(step, i) in steps" :key="i" @click="goTo(step)">
    <div class="step-number"  >
      {{ i + 1 }}
    </div>
    <div class="step-name">
      {{ step }}
    </div>
  </li>
</ul>
</template>

<script>
import { steps } from '@/router';

export default {
  name: 'Progress',
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    completedSteps() {
      return this.$store.state.completedSteps;
    }
  },
  data: function () {
    return {
      steps
    };
  },
  methods: {
    goTo: function (step) {
      const stepIndex = steps.indexOf(step);
      if (stepIndex <= this.$store.state.completedIndex + 1) {
        this.$router.push({ name: step });
      }
    }
  },

}
</script>

<style scoped>
.step-wrapper {
}

.step {
  display: flex;
  cursor: pointer;
  margin-bottom: 20px;
  background:rgba(0, 0, 0, 0.02);
  padding: 10px;
  align-items: center;
  border: 2px solid transparent;
}
.step:last-child {
  margin-bottom: 0;
}
.step-name {
  font: 20px 'Karla';
}

.step-number {
  font:  40px 'Playfair Display';
  margin-right: 8px;
}

.step-number--active {
  border: 2px solid #F2DC5D;
}
.step-number--completed {
  background-color: #fabada;
}
.step-number--fill {
  border: 2px solid #7CB4B8;
}
</style>
