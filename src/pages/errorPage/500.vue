<template>
	<div class="page-500">
		<img width="40%" src="@/assets/images/error/500.svg" alt="" />
		<div class="page-error-text">页面加载失败......</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.page-500 {
	position: absolute;
	inset: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: #fff;

	.page-error-text {
		font-size: 20px;
		font-weight: 500;
	}
}
</style>
