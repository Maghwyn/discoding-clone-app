import { http } from '@/api/network/axios';
import { useAuthStore } from '@/stores/auth.store';
import router from '@/router';

router.beforeEach(async (to, from, next) => {
	const authStore = useAuthStore();
	const isAuth = authStore.isAuth;

	try {
		// If the flag is set to true and one of the meta is present
		if (isAuth && (to.meta.requiresAuth || to.meta.forbiddenAfterAuth)) {
			// We check for the validity of the auth token
			await http.post('/auth')

			// We verify if the route require auth.
			if (to.meta.requiresAuth) return next();

			// We verify if the route is forbidden after auth.
			if (to.meta.forbiddenAfterAuth && from.path !== '/') return next(from.path);
			else if (to.meta.forbiddenAfterAuth) return next('/app/channels/me');
		}

		// If the flag is not set to true and the auth is required
		if (!isAuth && to.meta.requiresAuth) {
			return next('/signin');
		}

		// If none of check if valid, then we can assume the route is accessible no matter what.
		return next();
	} catch (_) {
		return next('/signin');
	}
});
