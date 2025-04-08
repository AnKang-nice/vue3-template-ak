<template>
  <div class="demo-page">1111</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
defineOptions({
  name: "DemoPage", // 必须指定多单词名称
});

var demo = ref("1111");



onMounted(() => {
  console.log("demo mounted", demo.value);
});
</script>

<style lang="scss">
.demo-page {
  background: red;
  color: white;
  font-size: 20px;
}
</style>
