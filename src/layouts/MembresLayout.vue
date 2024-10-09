<script setup>
import MembreForm from "../components/MembreForm.vue";
import MembreListe from "../components/MembreListe.vue";
</script>

<template>
	<div class="membres-cont">
		<p class="titre__membre">
			Membres
			<button class="button--add" @click="">
				<i class="bx bx-plus"></i>
			</button>
		</p>
		<MembreForm />
		<MembreListe />
	</div>
</template>
