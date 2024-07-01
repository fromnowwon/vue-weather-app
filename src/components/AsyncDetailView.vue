<template>
	<div class="flex flex-col flex-1 items-center">
		<!-- Preview Banner -->
		<div
			v-if="route.query.preview"
			class="text-white p-4 bg-weather-secondary w-full text-center"
		>
			<p>이 장소를 추가하려면 상단의 '+' 아이콘을 클릭해주세요.</p>
		</div>

		<!-- Weather Overview -->
		<div class="flex flex-col items-center text-white py-12">
			<h2 class="text-4xl mb-2">{{ route.params.city }}</h2>
			<p class="text-sm mt-3 mb-12">
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
			<p class="text-8xl mb-8">
				{{ Math.round(weatherData.current.temp) }}&#8451;
			</p>
			<!-- 체감 온도 -->
			<p>
				체감 온도: 
				{{ Math.round(weatherData.current.feels_like) }}&#8451
			</p>
			<p class="capitalize">
        {{ weatherData.current.weather[0].description }}
      </p>
			<!-- 날씨 아이콘 -->
			<img
				class="w-[150px] h-auto"
				:src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
				:alt="`${weatherData.current.weather[0].description}`"
			/>
		</div>

		<hr class="border-white border-opacity-10 border w-full" />

		<!-- Hourly Weather -->
		<div class="max-w-screen-md w-full py-12">
			<div class="mx-8 text-white">
				<h3 class="mb-4">Hourly Weather</h3>
				<div class="flex gap-10 overflow-x-scroll">
					<div v-for="hourData in weatherData.hourly" :key="hourData.dt" class="flex flex-col gap-4 items-center">
						<p class="whitespace-nowrap text-md">
							{{
								new Date(hourData.dt * 1000).toLocaleTimeString("ko-KR", {
									hour: "numeric",
								})
							}}
						</p>
						<img
							class="w-auto h-[50px] object-cover"
							:src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
							:alt="`${hourData.weather[0].description}`"
						/>
						<p class="text-xl">{{ Math.round(hourData.temp) }}&#8451;</p>
					</div>
				</div>
			</div>
		</div>

		<hr class="border-white border-opacity-10 border w-full" />

		<!-- Weekly Weather -->
		<div class="max-w-screen-md w-full py-12">
			<div class="mx-8 text-white">
				<h3 class="mb-4">Weekly Forecast</h3>
				<div
					v-for="day in weatherData.daily"
					:key="day.dt"
					class="flex items-center"
				>
					<p class="flex-1">
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
					<div class="flex gap-2 flex-1 justify-end">
						<p>최고: {{ Math.round(day.temp.max) }}</p>
						<p>최저: {{ Math.round(day.temp.min) }}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="lex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500" @click="removeCity">
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
