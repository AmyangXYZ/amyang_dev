<template>
  <el-card class="screen" @click="focusInput">
    <div
      class="screen-content"
      :class="{ scrolling: isScrolling }"
      ref="screenContent"
      @scroll="handleScroll"
    >
      <div v-for="(message, index) in messages" :key="index" class="command-line">
        <div class="prompt">
          <span class="user">one</span>
          <span class="at">&nbsp;@&nbsp;</span>
          <span class="machine">amyang-dev</span>
          <span class="in">&nbsp;in&nbsp;</span>
          <span class="directory">~</span>
          <span class="time">[{{ message.timestamp }}]</span>
        </div>
        <div class="command">{{ zhiyin }} {{ message.text }}</div>
        <div class="result">{{ message.result }}</div>
      </div>
      <div class="command-line">
        <div class="prompt">
          <span class="user">one</span>
          <span class="at">&nbsp;@&nbsp;</span>
          <span class="machine">amyang-dev</span>
          <span class="in">&nbsp;in&nbsp;</span>
          <span class="directory">~</span>
          <span class="time">[{{ currentTime }}]</span>
        </div>

        <div class="command">
          {{ zhiyin }}
          <span>{{ userInput.slice(0, cursorPosition) }}</span>
          <span class="cursor-container">
            <span
              class="cursor-char"
              :class="{ 'cursor-active': isInputFocused, 'cursor-inactive': !isInputFocused }"
              >{{ userInput[cursorPosition] || ' ' }}</span
            >
            <span class="cursor"></span>
          </span>
          <span>{{ userInput.slice(cursorPosition + 1) }}</span>
          <input
            ref="inputField"
            autofocus
            :value="userInput"
            @input="handleInput"
            @keydown="handleKeyDown"
            @keyup.enter="submitCommand"
            @focus="isInputFocused = true"
            @blur="isInputFocused = false"
            class="command-input"
          />
        </div>
        <div class="result" v-if="currentResult">{{ currentResult }}</div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import questions_json from '@/assets/questions.json'
const questions = questions_json as any

interface Message {
  text: string
  timestamp: string
  result: string
}

const messages = ref<Message[]>([])

const zhiyin = ref('')
let animationInterval: number | null = null
let counter = 0
let increment = true

const updateZhiyin = () => {
  const hex = counter.toString(16).padStart(2, '0')
  zhiyin.value = String.fromCodePoint(0xe900 + parseInt(hex, 16))

  if (increment) {
    counter++
    if (counter === 17) {
      increment = false
      counter--
    }
  } else {
    counter--
    if (counter === -1) {
      increment = true
      counter++
    }
  }
}

const screenContent = ref<HTMLElement | null>(null)
const isScrolling = ref(false)
let scrollTimer: number | null = null

const handleScroll = () => {
  isScrolling.value = true
  if (scrollTimer !== null) {
    clearTimeout(scrollTimer)
  }
  scrollTimer = setTimeout(() => {
    isScrolling.value = false
  }, 100)
}

const scrollToBottom = () => {
  if (screenContent.value) {
    screenContent.value.scrollTo({
      top: screenContent.value.scrollHeight,
      behavior: 'instant'
    })
  }
}

watch(
  messages,
  () => {
    nextTick(scrollToBottom)
  },
  { deep: true }
)

onMounted(() => {
  animationInterval = setInterval(updateZhiyin, 100)
  nextTick(scrollToBottom)
  setTimeout(simulateTypingCommand, 1000, 'hello')
})

onUnmounted(() => {
  if (animationInterval) {
    clearInterval(animationInterval)
  }
  if (scrollTimer !== null) {
    clearTimeout(scrollTimer)
  }
})

const userInput = ref('')
const inputField = ref<HTMLInputElement | null>(null)
const cursorPosition = ref(0)
const isInputFocused = ref(true)

const currentTime = ref(new Date().toLocaleTimeString('en-US', { hour12: false }))

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const newValue = target.value
  const newCursorPosition = target.selectionStart || 0

  userInput.value = newValue
  cursorPosition.value = newCursorPosition
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    // Prevent default behavior to handle it manually
    event.preventDefault()

    const newPosition =
      event.key === 'ArrowLeft'
        ? Math.max(0, cursorPosition.value - 1)
        : Math.min(userInput.value.length, cursorPosition.value + 1)

    cursorPosition.value = newPosition

    // Manually set the selection range
    if (inputField.value) {
      inputField.value.setSelectionRange(newPosition, newPosition)
    }
  }
}

const focusInput = () => {
  nextTick(() => {
    inputField.value?.focus()
  })
}

const currentResult = ref<string | null>(null)

watch(
  currentResult,
  () => {
    nextTick(scrollToBottom)
  },
  { deep: true }
)

const submitCommand = async () => {
  const command = userInput.value

  if (command === 'clear') {
    messages.value = []
  } else {
    isInputFocused.value = false
    await getResult(command)
    addMessage(command)
    isInputFocused.value = true
  }
  currentResult.value = null
  userInput.value = ''
  cursorPosition.value = 0
}

const getRandomResponse = (responses: string[]): string => {
  return responses[Math.floor(Math.random() * responses.length)]
}

const getResult = async (command: string) => {
  return new Promise((resolve) => {
    const lowerCommand = command.toLowerCase()
    let result = ''
    const greetings = ['greeting', 'hello', 'hi', 'hey', 'greetings', 'hola', 'bonjour', 'sup']
    if (greetings.includes(lowerCommand)) {
      result = getRandomResponse(questions.greetings as string[])
    } else if (lowerCommand === 'about') {
      result = getRandomResponse(questions.about as string[])
    } else if (questions[lowerCommand]) {
      result = questions[lowerCommand] as string
    } else {
      // Check for general questions
      const generalQuestionMatch = Object.keys(questions.general_questions).find(
        (q) => lowerCommand.includes(q) || q.includes(lowerCommand)
      )
      if (generalQuestionMatch) {
        result = questions.general_questions[generalQuestionMatch as any] as string
      } else {
        // If no general question match, check for partial matches in other commands
        const partialMatches = Object.keys(questions).filter(
          (key) => (key !== '' && lowerCommand.includes(key)) || key.includes(lowerCommand)
        )
        result =
          partialMatches.length > 0
            ? (questions[partialMatches[0]] as string)
            : getRandomResponse(questions.unknown as string[])
      }
    }

    // Simulate typing effect
    let displayedResult = ''
    let index = 0
    const interval = setInterval(() => {
      if (index >= result.length) {
        clearInterval(interval)
        resolve(displayedResult)
        return
      }
      displayedResult += result[index]
      currentResult.value = displayedResult
      index++
    }, 10)
  })
}

const addMessage = (text: string) => {
  const now = new Date()
  const timestamp = now.toLocaleTimeString('en-US', { hour12: false })
  const msg = { text, timestamp, result: currentResult.value || '' }
  messages.value.push(msg)
}

const simulateTypingCommand = (text: string) => {
  let index = 0
  const interval = setInterval(() => {
    if (index >= text.length) {
      clearInterval(interval)
      setTimeout(submitCommand, 300)
      return
    }
    userInput.value += text[index]
    cursorPosition.value = userInput.value.length
    index++
  }, 200)
}
</script>

<style scoped>
.screen {
  text-align: left;
  color: #fff;
  width: 60%;
  background-color: #1e1e43;
  border: 12px solid #a8dadc;
  border-radius: 4px;
  margin-top: 40px;
  font-family: 'Zhiyin', monospace;
  padding: 0em;
  display: flex;
  flex-direction: column;
}

.screen-content {
  width: 100%;
  aspect-ratio: 16/9;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: transparent #1d3357;
  transition: scrollbar-color 0.3s ease-in-out;
  padding-right: -4px;
}

/* For Webkit browsers (Chrome, Safari, etc.) */
.screen-content::-webkit-scrollbar {
  width: 8px;
}

.screen-content::-webkit-scrollbar-thumb {
  background-color: transparent;
  transition: background-color 0.3s ease-in-out;
}

.screen-content.scrolling::-webkit-scrollbar-thumb {
  background-color: #a8dadc;
}

/* Hide scrollbar when inactive */
.screen-content::-webkit-scrollbar-thumb {
  background-color: transparent;
  transition: background-color 0.3s ease-in-out;
}

.screen-content:hover::-webkit-scrollbar-thumb {
  background-color: #a8dadc;
}

/* For Firefox */
.screen-content {
  scrollbar-width: thin;
  scrollbar-color: transparent #1d3357;
  transition: scrollbar-color 0.3s ease-in-out;
}

.screen-content:hover {
  scrollbar-color: #a8dadc #1d3357;
}

.command-line {
  margin-bottom: 0.7em;
}

.prompt {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 0em;
}

.user {
  color: #00ff00;
}
.at {
  color: #ffffff;
}
.machine {
  color: #ff00ff;
}
.in {
  color: #ffffff;
}
.directory {
  color: #00ffff;
}
.time {
  color: #ffffff;
  margin-left: auto;
  margin-right: 1em;
}

.command {
  position: relative;
  white-space: pre;
  margin-left: 0em;
  display: flex;
  align-items: center;
}

.result {
  margin-top: 0.2em;
  white-space: pre-wrap;
}

.command-input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: text;
}

.cursor-container {
  position: relative;
  display: inline-block;
  vertical-align: baseline;
}

.cursor-char {
  color: #fff; /* Default text color */
  position: relative;
  z-index: 1;
}

.cursor-char.cursor-active {
  color: #000; /* Black text when cursor is active */
}

.cursor {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  z-index: 0;
}

.cursor-inactive {
  border: 1px solid #fff;
  background-color: transparent;
}

.cursor-active {
  border: 0px solid #fff;
  background-color: rgba(255, 255, 255, 1);
}
</style>
