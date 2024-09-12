<template>
  <!-- <el-icon class="icon"> -->
  <svg
    class="keyboard"
    :viewBox="`0 0 ${viewBoxWidth} ${viewBoxHeight}`"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g v-for="(row, rowIndex) in keys" :key="rowIndex">
      <g v-for="(key, keyIndex) in row" :key="`${rowIndex}-${keyIndex}`">
        <rect
          class="key"
          :width="getKeyWidth(key)"
          :height="keyHeight"
          :x="getKeyX(rowIndex, keyIndex)"
          :y="getKeyY(rowIndex)"
          rx="5"
          ry="5"
          :class="{ pressed: pressedKeys.has(key.toLowerCase()) }"
          @mousedown="onKeyPress(key)"
          @mouseup="onKeyRelease(key)"
          @mouseout="onKeyRelease(key)"
        />
        <text
          class="key-text"
          :x="getKeyX(rowIndex, keyIndex) + getKeyWidth(key) / 2"
          :y="getKeyY(rowIndex) + keyHeight / 2"
          text-anchor="middle"
          dominant-baseline="central"
        >
          {{ key }}
        </text>
      </g>
    </g>
  </svg>
  <!-- </el-icon> -->
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const keys = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '←'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Win', 'Fn', 'Ctrl']
]

const keyWidths: { [key: string]: number } = {
  '←': 1.85,
  Tab: 1.5,
  '\\': 1.34,
  Caps: 1.75,
  Enter: 2.18,
  Shift: 2.5,
  Ctrl: 1.3,
  Win: 1.3,
  Alt: 1.3,
  Space: 6.25,
  Fn: 1.3
}

const baseKeyWidth = 60
const keyHeight = 50
const keySpacing = 5
const viewBoxWidth = 1000
const viewBoxHeight = 300
const pressedKeys = ref<Set<string>>(new Set())

const getKeyWidth = (key: string) => (keyWidths[key] || 1) * baseKeyWidth

const getKeyX = (rowIndex: number, keyIndex: number) => {
  let x = 10
  for (let i = 0; i < keyIndex; i++) {
    x += getKeyWidth(keys[rowIndex][i]) + keySpacing
  }
  return x
}

const getKeyY = (rowIndex: number) => 10 + rowIndex * (keyHeight + keySpacing)

const onKeyPress = (key: string) => {
  pressedKeys.value.add(key.toLowerCase())
}

const onKeyRelease = (key: string) => {
  pressedKeys.value.delete(key.toLowerCase())
}

const keyMap: { [key: string]: string } = {
  backspace: '←',
  ' ': 'space',
  control: 'ctrl',
  meta: 'win',
  escape: 'esc'
}

const onKeyDown = (event: KeyboardEvent) => {
  let key = event.key.toLowerCase()
  key = keyMap[key] || key
  pressedKeys.value.add(key)
}

const onKeyUp = (event: KeyboardEvent) => {
  let key = event.key.toLowerCase()
  key = keyMap[key] || key
  pressedKeys.value.delete(key)
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
})
</script>

<style scoped>
.keyboard {
  width: 100%;
}
.key {
  fill: rgb(236, 228, 228);
  stroke: #000000;
  stroke-width: 2;
  transition: fill 0.1s;
  transform-origin: center;
  transform-box: fill-box;
}

.key.pressed {
  fill: #ffcc00;
  animation: keyPress 0.1s ease-in-out;
}
@keyframes keyPress {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
.key-text {
  font-family: Arial, sans-serif;
  font-size: 22px;
  font-weight: bold;
  user-select: none;
  pointer-events: none;
}
</style>
