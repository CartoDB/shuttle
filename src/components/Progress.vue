<template>
<div class="step-wrapper">
  <div class="step" v-for="(step, i) in steps" :key="i" @click="goTo(step)">
    <div class="step-number" :class="{ 'step-number--active' : (i <=index ) }" >
      {{ i + 1 }}
    </div>
    <div class="step-name">
      {{ step }}
    </div>
  </div>
</div>
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
  data: function () {
    return {
      steps
    };
  },
  methods: {
    goTo: function (step) {
      this.$router.push({ name: step });
    }
  }
}
</script>

<style scoped>
.step-wrapper {
  display: flex;
  justify-content: space-around;
  padding: 24px 0;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.step-name {
  text-transform: capitalize;
  font-weight: bold;
  margin-top: 12px;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:#dadff8;
  color: white;
  border: 1px solid #dadada;
}

.step-number--active {
  background-color: #3254e0;
}
</style>
