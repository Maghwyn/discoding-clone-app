import { inject, onBeforeUnmount, provide } from 'vue';

import { manager } from '@/api/network/socket.io';
import type { Socket } from 'socket.io-client';

const messagesSocketSymbol = Symbol('messagesSocket');

export const useMessagesSocket = () => {
	const existingSocket = inject(messagesSocketSymbol) as Socket;
	if (existingSocket) return existingSocket;
	
	const socket = manager.socket('/messages');
	socket.connect();

	provide(messagesSocketSymbol, socket);

	onBeforeUnmount(() => {
		socket.disconnect();
	});

	return socket;
}
