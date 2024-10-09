<script setup>
import MembreForm from "../components/MembreForm.vue";
import MembreListe from "../components/MembreListe.vue";
import { ref } from "vue";

let showAddMembre = ref(false);

const toggleForm = () => {
	showAddMembre.value = !showAddMembre.value;
};

const emit = defineEmits(["addMembre"]);

function handleAddMembre(membre) {
	emit("addMembre", membre);
	// toggleForm();
}
</script>

<template>
	<div class="membres-cont">
		<p class="titre__membre">
			Membres
			<button
				class="button--add"
				:class="{ active: showAddMembre }"
				@click="toggleForm">
				<i class="bx bx-plus"></i>
			</button>
		</p>
		<MembreForm v-show="showAddMembre" @addMembre="handleAddMembre" />
		<MembreListe />
	</div>
</template>
