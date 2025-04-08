<template>
	<div class="demo-page" style="width: 100px; font-size: 100px">1111</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
defineOptions({
	name: 'DemoPage' // 必须指定多单词名称
});

var demo = ref('1111');

onMounted(() => {
	console.log('demo mounted', demo.value);
});
</script>

<style lang="scss">
.demo-page {
	width: 100px;
	font-size: 20px;
	color: white;
	background: red;
}
</style>
