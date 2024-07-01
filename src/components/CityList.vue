<template>
	<div v-for="city in savedCities" :key="city.id">
		<CityCard :city="city" />
	</div>
	<p v-if="savedCities.length === 0">저장된 장소가 없습니다.</p>
</template>

<script setup>
import { ref } from "vue";
import CityCard from "./CityCard.vue";

const savedCities = ref([]);

const getCities = async () => {
	if (localStorage.getItem("savedCities")) {
		savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
	}

	const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
	const requests = savedCities.value.map(async (city) => {
		const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${apiKey}&units=metric`;
		const response = await fetch(url);
		return response.json();
	});

	console.log("savedCities", savedCities.value);

	try {
		const weatherDataList = await Promise.all(requests);
		weatherDataList.forEach((weatherData, index) => {
			savedCities.value[index].weather = weatherData;
		});
	} catch (error) {
		console.error("Error:", error);
	}
};

await getCities();
</script>
