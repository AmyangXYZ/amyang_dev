<script setup lang="ts">
import ComputerDesk from './components/ComputerDesk.vue'
import ComputerScreen from './components/ComputerScreen.vue'
</script>

<template>
  <main>
    <el-row justify="center">
      <el-col :span="24" align="center">
        <ComputerScreen />
        <ComputerDesk />
      </el-col>
    </el-row>
  </main>
</template>

<style scoped></style>
