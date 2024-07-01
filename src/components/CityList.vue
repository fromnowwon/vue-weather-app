<template>
	<div v-for="city in savedCities" :key="city.id">
		<CityCard :city="city" @click="goToDetailView(city)" />
	</div>
	<p v-if="savedCities.length === 0">저장된 장소가 없습니다.</p>
</template>

<script setup>
import { ref } from "vue";
import CityCard from "./CityCard.vue";
import { useRouter } from "vue-router";

const savedCities = ref([]);
const router = useRouter();

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

const goToDetailView = (city) => {
	router.push({
		name: "detail",
		params: { state: city.state, city: city.city },
		query: {
			id: city.id,
			lat: city.coords.lat,
			lng: city.coords.lng,
		},
	});
};
</script>
