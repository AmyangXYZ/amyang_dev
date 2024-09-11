<template>
  <el-card class="desk">
    <el-row align="middle" class="top-row" justify="space-around">
      <el-col :span="4" align="center">
        <el-icon size="80" id="scholar" @click="openScholar">
          <IconGraduation />
        </el-icon>
      </el-col>
      <el-col :span="12" align="left">
        <el-icon size="56" id="paper-pi" @click="openPaperPi">
          <IconCat />
        </el-icon>
      </el-col>
      <el-col :span="4" align="center">
        <el-icon size="88" color="silver">
          <IconRouter />
        </el-icon>
      </el-col>
    </el-row>

    <el-row align="middle" class="bottom-row">
      <el-col :span="9" align="center">
        <el-icon size="64">
          <MilkTea />
        </el-icon>
      </el-col>
      <el-col :span="6" align="center">
        <el-icon size="128">
          <IconKeyboard />
        </el-icon>
      </el-col>
      <el-col :span="2" align="left">
        <el-icon size="48">
          <Mouse />
        </el-icon>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import IconKeyboard from '@/components/icons/IconKeyboard.vue'
import IconCat from '@/components/icons/IconCat.vue'
import IconGraduation from '@/components/icons/IconGraduation.vue'
import IconRouter from '@/components/icons/IconRouter.vue'

const openScholar = () => {
  window.open(
    'https://scholar.google.com/citations?hl=en&user=SJlfXTwAAAAJ&view_op=list_works&sortby=pubdate',
    '_blank'
  )
}

const openPaperPi = () => {
  window.open('https://github.com/AmyangXYZ/PaperPi', '_blank')
}
</script>

<style scoped>
.desk {
  margin-top: 60px;
  text-align: left;
  color: #fff;
  width: 80%;
  aspect-ratio: 20/1;
  background-color: #4a4a4a;
  border: 0px solid #4a4a4a;
  border-radius: 4px;
  overflow: visible;
}

.top-row {
  top: -50px;
  z-index: 1000;
}

#scholar {
  cursor: pointer;
  color: #3295bc;
  transition: transform 0.2s ease-in-out;
}

#scholar:hover {
  transform: scale(1.1);
}

#paper-pi {
  cursor: pointer;
  padding: 4px;
  width: 88px;
  height: 64px;
  border: 3px solid #fff;
  color: rgb(67, 18, 18);
  background-color: #aaa;
  transition: transform 0.2s ease-in-out;
}

#paper-pi:hover {
  transform: scale(1.1);
}

.bottom-row {
  margin-top: -90px;
}
.el-card__body {
  padding: 0px;
}
</style>
