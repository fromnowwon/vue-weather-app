<template>
	<Teleport to="body">
		<div
			v-show="modalActive"
			class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
		>
			<div class="p-4 bg-white self-start mt-32 max-w-screen-md">
				<slot />
				<button
					class="text-white mt-8 bg-weather-primary py-2 px-6 hover:bg-weather-secondary"
					@click="$emit('close-modal')"
				>
					닫기
				</button>
			</div>
		</div>
	</Teleport>
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
