<template>
	<div class="underline" @click="getData">1111</div>
	<el-button @click="getData">211222</el-button>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import axiosInstance from '../api';
defineOptions({
	name: 'DemoPage' // 必须指定多单词名称
});

var demo = ref('111');

const getData = () => {
	console.log('getData');
	axiosInstance
		.post(
			'/api/hello',
			{
				demo: 1
			},
			{
				isDefaultShowMsg: true,
				headers: {
					// form 表单
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		)
		.then((response) => {
			console.log('response', response);
		})
		.catch((error) => {
			console.error('error', error);
		});
};

onMounted(() => {
	console.log('demo mounted', demo.value);
});
</script>

<style lang="scss">
.demo {
	background-color: red;
}
</style>
