export default [
	{
		path: '/404',
		name: '404',
		component: () => import('@/pages/errorPage/404.vue')
	},
	{
		path: '/500',
		name: '500',
		component: () => import('@/pages/errorPage/500.vue')
	},
	{
		// 解决控制台waring，不重定向的路径不会定向至404，定向在路由守卫文件
		path: '/:pathMatch(.*)*',
		component: () => import('@/pages/errorPage/404.vue')
	}
];
