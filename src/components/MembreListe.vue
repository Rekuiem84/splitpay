<script setup>
import Membre from "./Membre.vue";
import { inject } from "vue";

const membres = inject("membres");

const emit = defineEmits(["openModal"]);

function removeMembre(index) {
	membres.value.splice(index, 1);
}
</script>

<template>
	<ul class="membres-list">
		<Membre
			v-for="(membre, index) in membres"
			:key="index"
			:nom="membre.nom"
			:index="index"
			:nePayePas="membre.nePayePas"
			:payeSeul="membre.payeSeul"
			@removeMembre="removeMembre" />
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
