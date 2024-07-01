<template>
	<header class="sticky top-0 bg-weather-primary shadow-lg">
		<nav
			class="container flex flex-col items-center sm:flex-row gap-4 text-white py-6"
		>
			<RouterLink :to="{ name: 'home' }">
				<div class="flex items-center gap-3">
					<FontAwesomeIcon :icon="faSun" class="text-xl" />
					<h1 class="text-2xl">Vue Weather App</h1>
				</div>
			</RouterLink>

			<div class="flex gap-3 flex-1 justify-end">
				<FontAwesomeIcon
					:icon="faCircleInfo"
					@click="toggleInfoModal"
					class="text-xl hover:text-weather-secondary duration-150 cursor-pointer"
				/>
				<FontAwesomeIcon
					:icon="faPlus"
					@click="addCity"
					v-if="Object.keys(route.query).length > 0"
					class="text-xl hover:text-weather-secondary duration-150 cursor-pointer"
				/>
			</div>

			<!-- Info Modal -->
			<BaseModal :modalActive="infoModalActive" @close-modal="toggleInfoModal">
				<h2>About this app</h2>
			</BaseModal>

			<!-- Add Modal -->
			<BaseModal :modalActive="addModalActive" @close-modal="toggleAddModal">
				<h2>이미 추가되었습니다.</h2>
			</BaseModal>
		</nav>
	</header>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSun, faCircleInfo, faPlus } from "@fortawesome/free-solid-svg-icons";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";
import { ref } from "vue";
import { uid } from "uid";

const route = useRoute();
const router = useRouter();
const infoModalActive = ref(false);
const addModalActive = ref(false);
const savedCities = ref([]);

const toggleInfoModal = () => {
	infoModalActive.value = !infoModalActive.value;
};

const toggleAddModal = () => {
	addModalActive.value = !addModalActive.value;
};

const addCity = () => {
	if (localStorage.getItem("savedCities")) {
		savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
	}

	const locationObj = {
		id: uid(),
		state: route.params.state,
		city: route.params.city,
		coords: {
			lat: route.query.lat,
			lng: route.query.lng,
		},
	};

	const isDuplicate =
		savedCities.value.length > 0 &&
		savedCities.value.find((city) => {
			return city.city === locationObj.city && city.state === locationObj.state;
		});

	if (!isDuplicate) {
		savedCities.value.push(locationObj);
		localStorage.setItem("savedCities", JSON.stringify(savedCities.value));
	} else {
		toggleAddModal();
	}

	let query = Object.assign({}, route.query);
	delete query.preview;
	query.id = locationObj.id;
	router.replace({ query });
};
</script>
