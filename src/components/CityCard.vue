<template>
	<div
		class="flex items-center py-6 px-4 bg-weather-secondary rounded-md shadow-md cursor-pointer"
	>
		<div class="flex flex-col flex-1 gap-3">
			<h2 class="text-3xl">{{ city.city }}</h2>
			<h3>{{ city.state }}</h3>
		</div>
		<div class="flex items-center gap-2">
			<p class="text-3xl">{{ Math.round(city.weather.current.temp) }}&#8451;</p>
			<img
				:src="`http://openweathermap.org/img/wn/${city.weather.current.weather[0].icon}@2x.png`"
				:alt="`${city.weather.current.weather[0].main}`"
			/>
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
