<template>
	<div class="flex h-screen w-full flex-col items-center justify-center">
		<h1 class="text-2xl text-gray-400">
			Not found
		</h1>
		<h2 class="text-lg text-gray-500">
			Whooops! Couldn't find what you looking for
		</h2>
		<router-link
			to="/app/channels/me"
			class="py-4 text-sm text-gray-400 underline hover:text-gray-300"
		>
			Go back home
		</router-link>
	</div>
</template>