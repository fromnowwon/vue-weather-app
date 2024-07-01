<template>
	<div>
		<input
			type="text"
			v-model="searchQuery"
			@input="debouncedGetSearchResults"
			placeholder="국가명이나 도시명을 입력하세요."
			class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71] placeholder-gray-100"
		/>
		<div>
			<ul>
				<li
					v-for="result of weatherSearchData"
					:key="result.id"
					@click="setDetail(result)"
					class="py-2 cursor-pointer"
				>
					{{ result.properties.name_preferred }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { debounce } from "lodash";
import router from "@/router";

const searchQuery = ref("");
const weatherSearchData = ref(null);

const getSearchResults = () => {
	const apiKey = import.meta.env.VITE_GEOCODING_API_KEY;
	const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${searchQuery.value}&access_token=${apiKey}&types=place`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			weatherSearchData.value = data.features;
			console.log(weatherSearchData.value);
		})
		.catch((error) => {
			console.error("Error: ", error);
		});
};

const setDetail = (result) => {
	const [city, state] = result.properties.full_address.split(",");
	router.push({
		name: "detail",
		params: { state: state.replace(/\s+/g, ""), city: city },
		query: {
			lat: result.geometry.coordinates[1],
			lng: result.geometry.coordinates[0],
			preview: true,
		},
	});
};

//  연속적으로 발생하는 이벤트 무시
const debouncedGetSearchResults = debounce(getSearchResults, 300);
watch(searchQuery, () => {
	debouncedGetSearchResults();
});
</script>
