<template>
	<div class="flex flex-col flex-1 items-center">
		<!-- Preview Banner -->
		<div></div>

		<!-- Weather Overview -->
		<div></div>

		<!-- Hourly Weather -->
		<div></div>

		<!-- Weekly Weather -->
		<div></div>
	</div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const getWeatherData = async () => {
	const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
	const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&appid=${apiKey}&units=metric`;
	try {
		const weatherData = await axios.get(url);
		return weatherData.data;
	} catch (error) {
		console.error("Error: ", error);
	}
};

// Vue 3에서는 비동기 함수가 실행될 때 데이터가 반응성으로 생성 (변경 추적됨)
const weatherData = await getWeatherData();
</script>
