import '@/styles/scss/packet.scss';
import '@/styles/tailwindcss.css';
import 'vue-final-modal/style.css'

import { createApp } from 'vue';

import App from '@/App.vue';
import pinia from '@/stores';
import router from '@/router';
import { createVfm } from 'vue-final-modal'

import { withErrorHandler } from '@/utils/withErrorHandler';

withErrorHandler(async function () {
	return bootVueApp();
})();

function bootVueApp() {
	const app = createApp(App);

	app.use(router);
	app.use(pinia);
	app.use(createVfm);
	app.mount('#app');
}