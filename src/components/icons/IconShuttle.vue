<template>
  <el-icon size="108" color="red" class="rocket">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      :class="{ 'launch-animation': launchSignal }"
    >
      <path
        d="M32 432C32 458.51 53.49 480 80 480H96V384H32V432ZM160 160H416C288 128 192 32 128 32V128C145.674 128 160 142.326 160 160ZM32 80V128H96V32H80C53.49 32 32 53.49 32 80ZM128 384V480C192 480 288 384 416 352H160C160 369.672 145.674 384 128 384Z"
        class="fa-secondary"
      />
      <path
        d="M576.834 192.332C533 171.832 474.334 160 416 160H160C160 142.326 145.674 128 128 128H32C14.328 128 0 142.326 0 160V224C0 241.672 0 352 0 352C0 369.672 14.328 384 32 384H128C145.674 384 160 369.672 160 352H416C474.334 352 533 340.166 576.834 319.666C616.334 301.166 640 277.332 640 256C640 234.666 616.334 210.832 576.834 192.332ZM481.969 306.072C476.492 306.072 471.953 301.535 471.953 296.059V215.941C471.953 210.465 476.492 205.926 481.969 205.926C521.871 205.926 522.027 306.072 481.969 306.072Z"
        class="fa-primary"
      />
    </svg>
  </el-icon>

  <el-icon size="64">
    <svg width="300" height="300" viewBox="0 0 300 300">
      <path
        ref="path"
        class="path"
        d="M150 300 V270 H300 V240 H0 V210 H300 V180 H0 V150 H300 V120 H0 V90 H300 V60 H0 V30 H150 V0"
        :class="{ animate: countdownSignal || isShaking }"
      />
    </svg>
  </el-icon>
  <br />
  <el-icon size="32" color="#cccccc">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      class="stopwatch"
      :class="{ shake: isShaking, clicked: isClicked }"
      @click="handleClick"
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
import { ref } from 'vue'

const countdownSignal = ref(false)
const launchSignal = ref(false)

const countdown = ref(5)
const isShaking = ref(false)
const isClicked = ref(false)
let intervalId: number | null = null

const startCountdown = () => {
  countdownSignal.value = true
  countdown.value--
  intervalId = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(intervalId!)
      isShaking.value = true
      setTimeout(() => {
        isShaking.value = false
        countdown.value = 5
      }, 3000)
      launchSignal.value = true
      setTimeout(() => {
        launchSignal.value = false
      }, 3750) // Reset after animation duration
      countdownSignal.value = false
    }
  }, 1000)
}

const handleClick = () => {
  if (!countdownSignal.value) {
    isClicked.value = true
    startCountdown()
    setTimeout(() => {
      isClicked.value = false
    }, 100)
  }
}
</script>

<style scoped>
.fa-primary {
  color: rgb(231, 235, 238);
}
.fa-secondary {
  color: cyan;
}

.rocket {
  rotate: -90deg;
}

.launch-animation {
  animation: launch 4s ease-in-out forwards;
}

@keyframes launch {
  0% {
    transform: translateX(0vh) scale(1);
  }
  100% {
    transform: translateX(120vh) scale(0.6);
  }
}

.path {
  fill: none;
  stroke: cyan;
  stroke-width: 8;
  stroke-linecap: round;
  filter: drop-shadow(0 0 8px cyan);
  stroke-dasharray: 3150;
  stroke-dashoffset: 3150;
}

.path.animate {
  animation: drawPath 5.7s linear forwards;
}

@keyframes drawPath {
  0% {
    stroke-dashoffset: 3150;
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

.stopwatch {
  cursor: pointer;
  transition: transform 0.2s;
  user-select: none;
}
.stopwatch:hover {
  transform: scale(1.2);
}
.stopwatch.clicked {
  transform: scale(0.9);
}

.shake {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}

text {
  font-weight: 800;
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
</style>
