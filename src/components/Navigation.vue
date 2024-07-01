<template>
	<header class="sticky">
		<nav
			class="container flex flex-col items-center sm:flex-row gap-4 text-white py-6"
		>
			<RouterLink :to="{ name: 'home' }">
				<div class="flex items-center gap-3">
					<h1>Vue Weather App</h1>
				</div>
			</RouterLink>

			<div class="flex gap-3 flex-1 justify-end">
				<i @click="toggleModal">info</i>
				<i @click="addCity" v-if="Object.keys(route.query).length > 0">add</i>
			</div>

			<BaseModal :modalActive="modalActive" @close-modal="toggleModal">
				<h2>About this app</h2>
			</BaseModal>
		</nav>
	</header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";
import { ref } from "vue";
import { uid } from "uid";

const route = useRoute();
const router = useRouter();
const modalActive = ref(false);
const savedCities = ref([]);

const toggleModal = () => {
	modalActive.value = !modalActive.value;
};

console.log("route.query", route.query);

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

	savedCities.value.push(locationObj);
	localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

	let query = Object.assign({}, route.query);
	delete query.preview;
	query.id = locationObj.id;
	router.replace({ query });
};
</script>
