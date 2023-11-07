import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		/**
		 * This path contains every pages that aren't locked behind the signin.
		 */
		path: '/',
		component: () => import('../views/HomeView.vue'),
		children: [
			{
				path: 'signin',
				component: () => import('../views/Signin.vue'),
			},
			{
				path: 'signup',
				component: () => import('../views/Signup.vue'),
			},
		],
		meta: { 
			forbiddenAfterAuth: true
		},
	},
	{
		/**
		 * This path contains every pages that are locked behind the signin and not accesible by the public.
		 */
		path: '/app',
		component: () => import('../layout/app/AppLayout.vue'),
		children: [
			{
				path: 'server/:id',
				component: () => import('../views/app/Server.vue'),
			},
			{
				path: 'conversation/:id',
				component: () => import('../views/app/Server.vue'),
			},
			{
				path: 'relashionship',
				children: [
					{
						path: 'friends',
						component: () => import('../views/app/Relationship.vue'),
					},
					{
						path: 'blocked',
						component: () => import('../views/app/Relationship.vue'),
					}
				]
			},
		],
		meta: {
			requiresAuth: true,
		},
	},
	//Always leave it as last one.
	{
		path: '/:catchAll(.*)*',
		component: () => import('../views/404.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
