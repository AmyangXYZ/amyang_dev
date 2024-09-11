<template>
  <el-icon size="36" color="#cccccc">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      class="stopwatch"
      :class="{ shake: isShaking }"
      @click="startCountdown"
    >
      <!-- Stopwatch body -->
      <path
        d="M256 512C141.125 512 48 418.875 48 304C48 194.527 132.627 105.008 240 96.809V32H176C167.164 32 160 24.836 160 16S167.164 0 176 0H336C344.836 0 352 7.164 352 16S344.836 32 336 32H272V96.809C321.383 100.578 365.881 121.516 399.607 153.766L436.688 116.688C442.937 110.438 453.062 110.438 459.312 116.688S465.562 133.062 459.312 139.312L420.965 177.66C447.848 212.707 464 256.418 464 304C464 418.875 370.875 512 256 512ZM256 128C158.953 128 80 206.953 80 304S158.953 480 256 480S432 401.047 432 304S353.047 128 256 128Z"
      />
      <!-- Countdown text -->
      <text
        x="256"
        y="300"
        text-anchor="middle"
        dominant-baseline="central"
        font-size="200"
        font-style="normal"
        font-family="Consolas"
        fill="currentColor"
      >
        {{ countdown }}
      </text>
    </svg>
  </el-icon>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { LaunchSignal } from './states'

const countdown = ref(5)
const isShaking = ref(false)
let intervalId: number | null = null

const startCountdown = () => {
  intervalId = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(intervalId!)
      isShaking.value = true
      LaunchSignal.value = true
    }
  }, 1000)
}

watch(isShaking, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      isShaking.value = false
      countdown.value = 5
    }, 3000) // Stop shaking after 1 second
  }
})
</script>

<style scoped>
.stopwatch {
  cursor: pointer;
}
.stopwatch:hover {
  transform: scale(1.2);
}
@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}

.shake {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}

text {
  font-weight: 800;
}
</style>
