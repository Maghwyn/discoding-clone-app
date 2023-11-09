<script lang="ts" setup>
import { ref } from 'vue';
import SideConversation from '@/layouts/side-conversation/SideConversation.vue';
import RelationshipHeader from '@/components/relationship/RelationshipHeader.vue';
import RelationshipItem from '@/components/relationship/RelationshipItem.vue';
import SearchInput from '@/components/ui/SearchInput.vue';

const friends = [
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
]

const blocked = [];
const relationships = ref(friends);

const currentTab = ref('all');
const onTabChange = (tab: string) => {
	currentTab.value = tab;

	if (currentTab.value === 'all') {
		relationships.value = friends;
	} else {
		relationships.value = blocked;
	}
}
</script>

<template>
	<SideConversation/>
	<div class="flex grow flex-col h-full relative">
		<RelationshipHeader
			user-picture="https://picsum.photos/200?random=2"
			channelName="Ronald"
			type="conversation"
			@tabChange="onTabChange"
		/>
		<div class="flex flex-col flex-1 min-h-0 min-w-0 z-0">
			<template v-if="relationships.length > 0">
				<div class="w-full" style="padding: 16px 20px 8px 30px;">
					<SearchInput class="grow"/>
					<h2 class="whitespace-nowrap overflow-ellipsis overflow-hidden uppercase text-xs leading-4 tracking-wide flex-1 flex items-center h-[40px] text-[#949ba4]" style="padding: 18px 0px 4px 0px;">
						<span class="flex-1 overflow-hidden overflow-ellipsis">All friends - {{ relationships.length }}</span>
					</h2>
				</div>
				<ul class="relative flex flex-1 flex-col min-h-0 min-w-0 z-0 overflow-scroll pr-[10px]">
					<RelationshipItem
						v-for="(relation) in relationships"
						:goto="`/app/channels/${relation.id}`"
						:user-picture="relation.userPicture"
						:username="relation.username"
						:key="`relation_${relation.id}`"
					/>
				</ul>
			</template>
			<template v-else>
				<div class="h-full flex flex-col items-center justify-center">
					<p class="text-gray-400">You haven't blocked anyone :)</p>
				</div>
			</template>
		</div>
	</div>
</template>