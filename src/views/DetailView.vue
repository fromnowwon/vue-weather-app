<template>
	<div>
		<Suspense>
			<AsyncDetailView />
		</Suspense>
	</div>
</template>

<script setup>
import { Suspense } from "vue";
import AsyncDetailView from "../components/AsyncDetailView.vue";
</script>
