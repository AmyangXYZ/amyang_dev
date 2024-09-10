<template>
  <el-card class="desk">
    <el-row align="middle">
      <el-col :span="4" align="center">
        <el-icon size="64">
          <Headset />
        </el-icon>
      </el-col>
      <el-col :span="6" align="left">
        <el-icon size="48">
          <MilkTea />
        </el-icon>
      </el-col>
      <el-col :span="4" align="center">
        <el-icon size="96">
          <IconKeyboard />
        </el-icon>
      </el-col>
      <el-col :span="4" align="center">
        <el-icon size="48">
          <Mouse />
        </el-icon>
      </el-col>
      <el-col :span="4" align="right">
        <el-icon size="48">
          <Iphone />
        </el-icon>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import IconKeyboard from '@/components/icons/IconKeyboard.vue'
</script>

<style scoped>
.desk {
  margin-top: 60px;
  text-align: left;
  color: #fff;
  width: 80%;
  aspect-ratio: 7/1;
  background-color: #4a4a4a;
  border: 0px solid #4a4a4a;
  border-radius: 4px;
}
</style>
