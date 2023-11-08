import '@/styles/scss/packet.scss';
import '@/styles/tailwindcss.css';
import 'vue3-toastify/dist/index.css';

import { createApp } from 'vue';

import App from '@/App.vue';
import pinia from '@/stores';
import router from '@/router';
import '@/router/guard';

import { withErrorHandler } from '@/utils/withErrorHandler';
import { isAuthenticated } from '@/api/auth.req';
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore(pinia);

withErrorHandler(async function () {
	const isAuth = await isAuthenticated()
		.then(() => true)
		.catch(() => false);

	authStore.isAuth = isAuth;
	return bootVueApp();
})();

function bootVueApp() {
	const app = createApp(App);

	app.use(router);
	app.use(pinia);
	app.mount('#app');
}