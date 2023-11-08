import '@/styles/scss/packet.scss';
import '@/styles/tailwindcss.css';

import { createApp } from 'vue';

import App from '@/App.vue';
import pinia from '@/stores';
import router from '@/router';
import * as ConfirmDialog from 'vuejs-confirm-dialog'


import { withErrorHandler } from '@/utils/withErrorHandler';

withErrorHandler(async function () {
	return bootVueApp();
})();

function bootVueApp() {
	const app = createApp(App);

	app.use(router);
	app.use(pinia);
	app.use(ConfirmDialog);
	app.mount('#app');
}