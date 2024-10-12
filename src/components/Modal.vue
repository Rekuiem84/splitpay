<script setup>
import { inject, ref, defineProps } from "vue";

let availableArticles = ref([]);
const allArticles = inject("articles");
const { modalType, membre } = defineProps(["modalType", "membre"]);

let checkedArticles = ref([]);

if (membre !== null) {
	if (modalType === "nePayePas") {
		checkedArticles.value = membre.nePayePas;
	} else if (modalType === "payeSeul") {
		checkedArticles.value = membre.payeSeul;
	}
}

let nomModal = "";
switch (modalType) {
	case "nePayePas":
		nomModal = "ne paye pas";
		availableArticles.value = allArticles.value.filter(
			(article) => !membre.payeSeul.includes(article.nom)
		);
		break;
	case "payeSeul":
		nomModal = "paye seul";
		availableArticles.value = allArticles.value.filter(
			(article) => !membre.nePayePas.includes(article.nom)
		);
		break;
	default:
		nomModal = "modal";
		break;
}

const emit = defineEmits(["changeMembreListe", "closeModal"]);

function closeModal() {
	emit("closeModal");
}

function updateListe() {
	membre[modalType] = checkedArticles;
	console.log(membre);
	closeModal();
}
</script>
<template>
	<div class="modal">
		<div class="modal-title">
			<h2 v-if="membre">{{ membre.nom + " " + nomModal }}</h2>
			<button class="button--close" @click="closeModal">
				<i class="bx bx-x"></i>
			</button>
		</div>
		<form @submit.prevent="updateListe">
			<ul>
				<li v-for="(article, index) in availableArticles" :key="index">
					<input
						type="checkbox"
						:id="article.nom"
						:value="article.nom"
						v-model="checkedArticles" />
					<label :for="article.nom">{{ article.nom }}</label>
				</li>
			</ul>
			<button type="submit">Ajouter</button>
		</form>
	</div>
</template>
