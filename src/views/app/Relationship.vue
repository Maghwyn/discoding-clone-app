<script lang="ts" setup>
import { ref, computed } from 'vue';
import SideConversation from '@/layouts/side-conversation/SideConversation.vue';
import RelationshipHeader from '@/components/relationship/RelationshipHeader.vue';
import RelationshipItem from '@/components/relationship/RelationshipItem.vue';
import SearchInput from '@/components/ui/SearchInput.vue';
import { useRelationshipStore } from '@/stores/relationship.store';

const currentTab = ref('all');

const relationshipStore = useRelationshipStore();
const showIllustration = computed(() => {
	if (currentTab.value === 'all') {
		return relationshipStore.friends.length === 0;
	}

	if (currentTab.value === 'blocked') {
		return relationshipStore.blocked.length === 0;
	}

	return true;
})

const relationships = computed(() => {
	if (currentTab.value === 'all') {
		return relationshipStore.filteredFriends();
	}

	if (currentTab.value === 'blocked') {
		return relationshipStore.filteredBlocked();
	}

	return [];
})

const placeholder = computed(() =>
	currentTab.value === 'all'
		? 'Search a friend'
		: 'Search a blocked user'
)

const onTabChange = async (tab: string) => {;
	currentTab.value = tab;
}

const searchRelation = (username: string) => {
	if (currentTab.value === 'all') {
		relationshipStore.friendUsernameFilter = username;
	} else if(currentTab.value === 'blocked') {
		relationshipStore.blockedUsernameFilter = username;
	}
}
</script>

<template>
	<SideConversation/>
	<div class="flex grow flex-col h-full relative">
		<RelationshipHeader
			:tab="currentTab"
			@tabChange="onTabChange"
		/>
		<div class="flex flex-col flex-1 min-h-0 min-w-0 z-0">
			<div class="w-full" style="padding: 16px 20px 8px 30px;">
				<SearchInput
					class="grow"
					:placeholder="placeholder"
					@search="searchRelation"
				/>
				<h2 class="whitespace-nowrap overflow-ellipsis overflow-hidden uppercase text-xs leading-4 tracking-wide flex-1 flex items-center h-[40px] text-[#949ba4]" style="padding: 18px 0px 4px 0px;">
					<span class="flex-1 overflow-hidden overflow-ellipsis">All {{ currentTab === 'all' ? 'friends' : 'blocked users' }} - {{ relationships.length }}</span>
				</h2>
			</div>
			<template v-if="relationships.length > 0">
				<ul class="relative flex flex-1 flex-col min-h-0 min-w-0 z-0 overflow-scroll pr-[10px]">
					<RelationshipItem
						v-for="(relation) in relationships"
						:user-id="relation.userId"
						:channel-id="relation.channelId"
						:goto="`/app/channels/${relation.channelId}`"
						:user-picture="relation.userPicture"
						:username="relation.username"
						:key="`relation_${relation.channelId}`"
					/>
				</ul>
			</template>
			<template v-else>
				<div v-if="currentTab === 'all' && showIllustration" class="flex flex-col gap-5 h-full flex flex-col items-center justify-center">
					<img src="/friends.svg" width="300" height="300" class="grayscale">
					<p class="text-gray-400 text-[24px]">Start adding a friend and interact with the community !</p>
				</div>
				<div v-else-if="currentTab === 'blocked' && showIllustration" class="flex flex-col gap-5 h-full flex flex-col items-center justify-center">
					<img src="/no-data.svg" width="300" height="300" class="grayscale">
					<p class="text-gray-400 text-[24px]">You haven't blocked anyone :)</p>
				</div>
				<div v-else-if="!showIllustration" class="flex flex-col gap-5 h-full flex flex-col items-center justify-center">
					<img src="/search.svg" width="300" height="300" class="grayscale">
					<p class="text-gray-400 text-[24px]">Could not find anyone with that name</p>
				</div>
			</template>
		</div>
	</div>
</template>