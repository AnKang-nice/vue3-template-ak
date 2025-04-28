import { createWebHashHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';
import initRoute from './initRoute';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // progress bar style
const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: Layout,
		children: [
			{
				path: 'home',
				name: 'home',
				component: () => import('@/pages/home/index.vue')
			}
		]
	},
	...initRoute
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	// 这里可以添加一些路由守卫的逻辑，比如权限验证等
	NProgress.start();
	console.log(to, from);
	next();
});

router.afterEach((to, from) => {
	// 这里可以添加一些路由跳转后的逻辑，比如统计等
	console.log('afterEach', to, from);
	NProgress.done();
});

export default router;
