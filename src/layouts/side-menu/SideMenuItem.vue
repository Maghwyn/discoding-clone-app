<script lang="ts" setup>
import Popper from '@/components/ui/Popper.vue';
import NotificationBadge from '@/components/ui/NotificationBadge.vue';
import IconDiscord from '@/components/icons/IconDiscord.vue';

const props = defineProps<{
	notificationCount: number;
	iconStyling: string;
	updated?: boolean;
	round: boolean;
	goto: string;
	image?: string;
	tooltipContent: string;
	isActive: boolean;
	identifier: string;
}>();

const roundClass = props.round 
	? "rounded-[50%] group-hover:rounded-[15px]"
	: "rounded-[15px]"
</script>

<template>
	<Popper class="mx-auto" :content="tooltipContent" :identifier="identifier">
		<router-link
			class="group relative block h-12 w-12 bg-foreground bg-cover transition-all hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-[1px]"
			:class="roundClass + ' ' + iconStyling"
			:to="goto"
			:id="`rx:${identifier}`"
		>
			<div class="flex h-full absolute -left-4 w-[9px] justify-center items-center">
				<div v-if="isActive" class="rounded-lg bg-white transition-all group-hover:scale-100 h-3/4 w-full"></div>
				<div v-else-if="updated" class="rounded-lg bg-white transition-all group-hover:scale-100 h-2 w-full group-hover:h-6"></div>
				<div v-else class="rounded-lg bg-white transition-all group-hover:scale-100 scale-0 w-full group-hover:h-6"></div>
			</div>
			<NotificationBadge :count="notificationCount"/>
			<img
				v-if="image"
				:src="image"
				alt="xxx"
				width="48"
				height="48"
				class="absolute inset-0 transition-all z-0"
				:class="roundClass"
			/>
			<IconDiscord v-else width="1em" height="1em"/>
		</router-link>
	</Popper>
</template>