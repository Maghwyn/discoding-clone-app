<template>
	<div className="flex h-screen w-full flex-col items-center justify-center">
		<h1 className="text-2xl text-gray-400">
			Not found
		</h1>
		<h2 className="text-lg text-gray-500">
			Whooops! Couldn't find what you looking for
		</h2>
		<router-link
			to="/channels/me"
			className="py-4 text-sm text-gray-400 underline hover:text-gray-300"
		>
			Go back home
		</router-link>
	</div>
</template>