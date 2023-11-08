import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		/**
		 * This path contains every pages that aren't locked behind the signin.
		 */
		path: '/',
		// component: () => import('../views/HomeView.vue'),
		children: [
			{
				path: 'signin',
				component: () => import('../views/auth/Signin.vue'),
			},
			{
				path: 'signup',
				component: () => import('../views/auth/Signup.vue'),
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
		component: () => import('../layouts/AppLayout.vue'),
		children: [
			{
				path: 'servers/:serverId/:channelId',
				component: () => import('../views/app/Server.vue'),
			},
			{
				path: 'servers-discovery',
				component: () => import('../views/app/ServerDiscovery.vue'),
			},
			{
				path: 'channels',
				children: [
					{
						path: 'me',
						component: () => import('../views/app/Relationship.vue'),
					},
					{
						path: ':id',
						component: () => import('../views/app/Conversation.vue'),
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
		component: () => import('../views/NotFound.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
