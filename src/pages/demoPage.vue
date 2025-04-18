<template>
	<div class="demo-page" style="width: 100px; font-size: 100px" @click="getData">1111</div>
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
.demo-page {
	width: 100px;
	font-size: 20px;
	color: white;
	background: red;
}
</style>
