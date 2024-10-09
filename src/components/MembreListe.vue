<script setup>
import Membre from "./Membre.vue";
import { inject, onMounted } from "vue";

const membres = inject("membres");
</script>

<template>
	<ul class="membres-list">
		<Membre v-for="(membre, index) in membres" :key="index" :nom="membre.nom" />
	</ul>
</template>

<style>
.membres-list {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));
	align-items: flex-start;
	gap: 1rem;
}
</style>
