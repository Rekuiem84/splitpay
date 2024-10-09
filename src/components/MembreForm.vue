<script setup>
import { ref } from "vue";

const membre = ref("");

const emit = defineEmits(["addMembre"]);

function handleSubmit() {
	emit("addMembre", membre);
	membre.value = "";
}
</script>

<template>
	<form class="membres__form" @submit.prevent="handleSubmit">
		<label for="membreNom">Nom</label>
		<input
			id="membreNom"
			name="membreNom"
			required
			type="text"
			v-model="membre"
			placeholder="Nom" />
		<button type="submit" class="button--cta">Ajouter membre</button>
	</form>
</template>

<style>
.membres__form {
	max-width: 600px;
	margin-block: 1rem;
	padding: 0.5rem;
	border-radius: 0.75rem;
	display: grid;
	grid-template-columns: auto 1fr auto;
	align-items: center;
	gap: 0.75rem 1rem;
	background: var(--color-white);
	color: #121212;
}
</style>
