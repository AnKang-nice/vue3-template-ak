import { createWebHashHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';
import initRoute from './initRoute';
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

export default router;
