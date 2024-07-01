<template>
	<main class="container text-white">
		<div class="pt-4 mb-8 relative">
			<SearchForm />
		</div>
		<div class="flex flex-col gap-4">
			<Suspense>
				<CityList />
			</Suspense>
		</div>
	</main>
</template>

<script setup>
import { Suspense } from "vue";
import SearchForm from "../components/SearchForm.vue";
import CityList from "@/components/CityList.vue";
</script>
