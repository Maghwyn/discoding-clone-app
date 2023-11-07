import { http } from "@/api/network/axios";
import type { ActionToken, Credentials, PasswordChangePayload, SignupPayload, UserEmail } from "@/api/auth.req.type";

export const isAuthenticated = () => {
	return http.post('/auth');
}

export const activateUser = (payload: ActionToken) => {
	return http.post('/auth/activate', payload);
}

export const signupUser = (payload: SignupPayload) => {
	return http.post('/auth/signup', payload);
}

export const signinUser = (credentials: Credentials) => {
	return http.post('/auth/signin', credentials);
}

export const logoutUser = () => {
	return http.post('/auth/logout');
}

export const renewActivationToken = (payload: UserEmail) => {
	return http.post('/auth/ask-activation-token', payload);
}

export const renewPasswordToken = (payload: UserEmail) => {
	return http.post('/auth/ask-reset-token', payload);
}

export const resetPassword = (payload: PasswordChangePayload) => {
	return http.post('/auth/reset-password', payload);
}
