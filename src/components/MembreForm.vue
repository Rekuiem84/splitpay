<script setup>
let newMembre = "";

function handleSubmit() {
	addMembre(newMembre);
	newMembre = "";
}
function clog() {
	console.log("Membre ajouté");
}
</script>

<template>
	<form class="membres__form" @submit.prevent="clog()">
		<label for="membreNom">Nom</label>
		<input
			id="membreNom"
			name="membreNom"
			required
			type="text"
			v-model="newMembre"
			placeholder="Nom" />
		<button type="submit" class="button--cta">Ajouter membre</button>
	</form>
</template>

<style>
.membres__form {
	max-width: 600px;
	margin-block: 1rem;
	padding: 0.5rem;
	border-radius: 8px;
	display: grid;
	grid-template-columns: auto 1fr auto;
	align-items: center;
	gap: 0.75rem 1rem;
	background: var(--color-white);
	color: #121212;
}
</style>
