<template>
  <el-card class="desk">
    <el-row align="middle" class="top-row" justify="space-around">
      <el-col :span="6" align="center">
        <a
          href="https://scholar.google.com/citations?hl=en&user=SJlfXTwAAAAJ&view_op=list_works&sortby=pubdate"
          target="_blank"
        >
          <el-icon size="80" id="scholar">
            <IconGraduation />
          </el-icon>
        </a>
      </el-col>
      <el-col :span="10" align="right">
        <a href="https://github.com/AmyangXYZ/PaperPi" target="_blank">
          <el-icon size="56" id="paper-pi">
            <IconCat />
          </el-icon>
        </a>
      </el-col>
      <el-col :span="4" align="center">
        <el-icon size="88" color="silver">
          <IconRouter />
        </el-icon>
      </el-col>
    </el-row>

    <el-row align="middle" class="bottom-row">
      <el-col :span="2" align="center" style="margin-top: -60px">
        <IconShuttle /><br />
        <IconStopwatch style="margin-top: 10px" />
      </el-col>
      <el-col :offset="3" :span="3" align="left">
        <el-icon size="64">
          <MilkTea />
        </el-icon>
      </el-col>
      <el-col :span="8" align="center">
        <IconKeyboard />
      </el-col>
      <el-col :span="7" align="right">
        <a href="https://github.com/AmyangXYZ/AniMate" target="_blank">
          <el-icon size="48" id="mmd" color="orange">
            <IconChild />
          </el-icon>
        </a>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import IconKeyboard from '@/components/icons/IconKeyboard.vue'
import IconCat from '@/components/icons/IconCat.vue'
import IconGraduation from '@/components/icons/IconGraduation.vue'
import IconRouter from '@/components/icons/IconRouter.vue'
import IconChild from '@/components/icons/IconChild.vue'
import { MilkTea } from '@element-plus/icons-vue'
import IconStopwatch from './icons/IconStopwatch.vue'
import IconShuttle from './icons/IconShuttle.vue'
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
  margin-top: -80px;
}

#mmd {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  margin-top: 80px;
}

#mmd:hover {
  transform: scale(1.1);
}
</style>
