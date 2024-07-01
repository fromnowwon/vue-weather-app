<template>
	<main class="container text-white">
		<div>
			<input
				type="text"
				v-model="searchQuery"
				@input="debouncedGetSearchResults"
				placeholder="국가명이나 도시명을 입력하세요."
				class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71] placeholder-gray-100"
			/>
		</div>
	</main>
</template>

<script setup>
import { ref, watch } from "vue";
import { debounce } from "lodash";

const searchQuery = ref("");

const getSearchResults = () => {
	const apiKey = import.meta.env.VITE_GEOCODING_API_KEY;
	const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${searchQuery.value}&access_token=${apiKey}&types=place`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.error("Error: ", error);
		});
};

//  연속적으로 발생하는 이벤트 무시
const debouncedGetSearchResults = debounce(getSearchResults, 300);
watch(searchQuery, () => {
	debouncedGetSearchResults();
});
</script>
