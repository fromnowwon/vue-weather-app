<template>
	<main class="container text-white">
		<SearchForm />
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
