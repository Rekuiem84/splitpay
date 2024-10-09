<script setup>
import Membre from "./Membre.vue";
</script>

<template>
	<ul class="membres-list">
		<Membre name="{membre}" />
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
