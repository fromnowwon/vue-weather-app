<template>
	<div>
		<input
			type="text"
			v-model="searchQuery"
			@input="debouncedGetSearchResults"
			placeholder="장소를 입력하세요"
			class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71] placeholder-gray-100"
		/>
		<div>
			<div
				v-if="weatherSearchData !== null && searchQuery !== ''"
				class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-2 top-[66px]"
			>
				<p class="py-2" v-if="searchError">에러가 발생했습니다!</p>
				<p class="py-2" v-if="!searchError && weatherSearchData.length === 0">
					결과가 없습니다.
				</p>
				<template v-else>
					<div
						v-for="result in weatherSearchData"
						:key="result.id"
						@click="setDetail(result)"
						class="py-2 cursor-pointer"
					>
						{{ result.properties.name_preferred }}
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { debounce } from "lodash";
import router from "@/router";

const searchQuery = ref("");
const weatherSearchData = ref(null);
const searchError = ref(false);

const getSearchResults = () => {
	const apiKey = import.meta.env.VITE_GEOCODING_API_KEY;
	const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${searchQuery.value}&access_token=${apiKey}&types=place`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			weatherSearchData.value = data.features;
		})
		.catch(() => {
			searchError.value = true;
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
