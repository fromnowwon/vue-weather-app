<template>
	<div v-show="modalActive">
		<div>
			<slot />
			<button @click="$emit('close-modal')">Close</button>
		</div>
	</div>
</template>

<script setup>
defineEmits(["close-modal"]);

defineProps({
	modalActive: {
		type: Boolean,
		defualt: false,
	},
});
</script>
