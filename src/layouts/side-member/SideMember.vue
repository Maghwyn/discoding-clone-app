<script lang="ts" setup>
import { ref } from 'vue';
import SideMemberItem from '@/layouts/side-member/SideMemberItem.vue';

// TODO: 
const members = ref([
	{
		id: "X1",
		userPicture: "https://picsum.photos/200?random=1",
		username: "Bobyis",
	},
	{
		id: "X2",
		userPicture: "https://picsum.photos/200?random=2",
		username: "Ronald",
	},
	{
		id: "X3",
		userPicture: "https://picsum.photos/200?random=3",
		username: "Hugo",
	},
]);
</script>

<template>
	<div class="flex flex-col w-[240px] min-w-[240px] overflow-hidden">
		<div class="hover-scrollbar py-2 px-2 bg-midground flex grow flex-col w-full justify-start items-center overflow-scroll">
			<ul class="flex flex-col h-full w-full gap-0.5 pb-[1.5rem]">
				<SideMemberItem
					v-for="(member, index) in members"
					:name="member.username"
					:image="member.userPicture"
					:key="`server_member_${member.id}`"
				></SideMemberItem>
			</ul>
		</div>
	</div>
</template>