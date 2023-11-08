<script lang="ts" setup>
defineProps<{
	image?: string;
	name: string;
}>()

</script>

<template>
	<div class="flex flex-col overflow-hidden cursor-pointer h-[270px] grow rounded-lg">
		<div class="w-full h-[45%] object-fit">
			<img class="w-full h-full object-cover" :src="image">
		</div>
		<div class="w-full h-[55%] bg-background relative">
			<div class="absolute top-[-20px] left-[15px] w-10 h-10 min-w-[40px] bg-background rounded-xl overflow-hidden p-1">
				<img class="w-8 h-8 object-cover rounded-lg" :src="image">
			</div>
			<div class="h-full w-full py-7 px-6">
				<span class="text-white text-[14px]">{{ name }}</span>
				<p class="text-[13px] leading-4 text-[#949ba4]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit est ab doloribus laboriosam optio tenetur</p>
			</div>
		</div>
	</div>
</template>