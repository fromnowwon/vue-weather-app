<template>
	<div>
		<div>
			<h2>{{ city.city }}</h2>
			<h3>{{ city.state }}</h3>
		</div>
		<div class="flex flex-col gap-2">
			<p>{{ Math.round(city.weather.current.temp) }}&deg;</p>
		</div>
	</div>
</template>

<script setup>
defineProps({
	city: {
		type: Object,
		defualt: () => {},
	},
});
</script>
