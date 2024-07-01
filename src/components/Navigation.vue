<template>
	<header>
		<nav class="container flex flex-col items-center">
			<div class="flex items-center gap-3">
				<RouterLink :to="{ name: 'home' }">
					<h1>Vue Weather App</h1>
				</RouterLink>
				<div class="flex items-center gap-3">
					<i @click="toggleModal">info</i>
					<i>add</i>
				</div>

				<BaseModal
					:modalActive="modalActive"
					@close-modal="toggleModal"
				></BaseModal>
			</div>
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
