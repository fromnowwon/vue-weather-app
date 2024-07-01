<template>
	<div class="flex flex-col flex-1 items-center">
		<!-- Preview Banner -->
		<div v-if="route.query.preview">
			<p>이 장소를 추가하려면 상단의 '+' 아이콘을 클릭해주세요.</p>
		</div>

		<!-- Weather Overview -->
		<div>
			<h2 class="text-4xl mb-2">{{ route.params.city }}</h2>
			<p>
				<!-- 현재 날짜 -->
				{{
					new Date(weatherData.current.dt * 1000).toLocaleDateString("ko-KR", {
						weekday: "short",
						day: "2-digit",
						month: "long",
					})
				}}
				<!-- 현재 시간 -->
				{{
					new Date(weatherData.current.dt * 1000).toLocaleTimeString("ko-KR", {
						timeStyle: "short",
					})
				}}
			</p>
			<!-- 현재 온도 -->
			<p>{{ Math.round(weatherData.current.temp) }}&#8451;</p>
			<!-- 날씨 아이콘 -->
			<img
				:src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
				:alt="`${weatherData.current.weather[0].description}`"
			/>
		</div>

		<!-- Hourly Weather -->
		<div>
			<h3 class="mb-4">Hourly Weather</h3>
			<div class="flex gap-10 overflow-x-scroll">
				<div v-for="hourData in weatherData.hourly" :key="hourData.dt">
					<p>
						{{
							new Date(hourData.dt * 1000).toLocaleTimeString("ko-KR", {
								hour: "numeric",
							})
						}}
					</p>
					<img
						:src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
						:alt="`${hourData.weather[0].description}`"
					/>
					<p>{{ Math.round(hourData.temp) }}&#8451;</p>
				</div>
			</div>
		</div>

		<!-- Weekly Weather -->
		<div>
			<h3 class="mb-4">Weekly Forecast</h3>
			<div
				v-for="day in weatherData.daily"
				:key="day.dt"
				class="flex items-center"
			>
				<p>
					<!-- 요일 -->
					{{
						new Date(day.dt * 1000).toLocaleDateString("ko-KR", {
							weekday: "long",
						})
					}}
				</p>
				<img
					class="w-[50px] h-[50px] object-cover"
					:src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
					:alt="`${day.weather[0].description}`"
				/>
				<div class="flex">
					<p>최고: {{ Math.round(day.temp.max) }}</p>
					<p>최저: {{ Math.round(day.temp.min) }}</p>
				</div>
			</div>
		</div>
		<div class="flex items-center" @click="removeCity">
			<p>Remove City</p>
		</div>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const getWeatherData = async () => {
	const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
	const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&appid=${apiKey}&units=metric`;

	try {
		const response = await fetch(url);
		const weatherData = await response.json();
		return weatherData;
	} catch (error) {
		console.error("Error: ", error);
	}
};

// Vue 3에서는 비동기 함수가 실행될 때 데이터가 반응성으로 생성 (변경 추적됨)
const weatherData = await getWeatherData();

const removeCity = () => {
	const cities = JSON.parse(localStorage.getItem("savedCities"));
	const updatedCities = cities.filter((city) => city.id !== route.query.id);
	localStorage.setItem("savedCities", JSON.stringify(updatedCities));
	router.push({
		name: "home",
	});
};
</script>
