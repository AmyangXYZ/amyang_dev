<script setup lang="ts">
import ComputerDesk from './components/ComputerDesk.vue'
import ComputerScreen from './components/ComputerScreen.vue'
import IconGithub from './components/icons/IconGithub.vue'
import IconNetwork from './components/icons/IconNetwork.vue'
import IconSatellite from './components/icons/IconSatellite.vue'
</script>

<template>
  <main>
    <a href="https://github.com/AmyangXYZ/amyang_dev">
      <el-icon size="28" color="white" style="position: absolute; top: 2%">
        <IconGithub />
      </el-icon>
    </a>
    <a href="https://vernet.amyang.dev">
      <el-icon
        size="256"
        color="#6b6d71"
        style="position: absolute; right: 3%; top: 15%; z-index: 1000"
      >
        <IconNetwork />
      </el-icon>
    </a>

    <el-row justify="center">
      <el-col :span="24" align="center">
        <ComputerScreen />
        <ComputerDesk />
      </el-col>
    </el-row>
    <IconSatellite />
  </main>
</template>

<style scoped></style>
