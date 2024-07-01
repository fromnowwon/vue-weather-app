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
				<i>add</i>
			</div>

			<BaseModal :modalActive="modalActive" @close-modal="toggleModal">
				<h2>About this app</h2>
			</BaseModal>
		</nav>
	</header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import BaseModal from "./BaseModal.vue";
import { ref } from "vue";

const modalActive = ref(false);

const toggleModal = () => {
	modalActive.value = !modalActive.value;
};
</script>
