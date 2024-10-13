<script setup>
import { inject, ref, defineProps } from "vue";

const allArticles = inject("articles");
// tous les articles qui ne sont pas dans la liste paye seul des membres
let allAvailableArticles = inject("allArticlesNotPayeSeul");
let availableArticles = ref([]);
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
		// ajoute tous les articles disponibles
		availableArticles.value = allAvailableArticles.value.filter(
			(article) => !membre.nePayePas.includes(article.nom)
		);
		// ajoute les articles qui sont déjà dans la liste ne paye pas du membre
		availableArticles.value = availableArticles.value.concat(
			membre.nePayePas.map((article) => ({ nom: article }))
		);
		// retire les articles qui sont déjà dans la liste paye seul du membre
		availableArticles.value = availableArticles.value.filter(
			(article) => !membre.payeSeul.includes(article.nom)
		);
		break;
	case "payeSeul":
		nomModal = "paye seul";
		// ajoute tous les articles disponibles
		availableArticles.value = allAvailableArticles.value.filter(
			(article) => !membre.payeSeul.includes(article.nom)
		);
		// ajoute les articles qui sont déjà dans la liste paye seul du membre
		availableArticles.value = availableArticles.value.concat(
			membre.payeSeul.map((article) => ({ nom: article }))
		);
		// retire les articles qui sont déjà dans la liste ne paye pas du membre
		availableArticles.value = availableArticles.value.filter(
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
	closeModal();
}
</script>
<template>
	<div class="modal">
		<div class="modal-title">
			<h2 v-if="membre">
				{{ membre.nom + " " + nomModal }}
				<button class="button--remove" @click="closeModal">
					<i class="bx bx-x"></i>
				</button>
			</h2>
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
			<button type="submit" class="button--cta">Ajouter</button>
		</form>
	</div>
</template>

<style scoped>
.modal {
	position: fixed;
	top: 50%;
	left: 50%;
	translate: -50% -50%;
	background: var(--color-cream);
	color: var(--color-black);
	padding: 1.5rem;
	border-radius: 1.5rem;
	z-index: 10;
	box-shadow: 0 0 1rem 1rem rgba(0, 0, 0, 0.25);
}
h2 {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 2rem;
}
form {
	display: grid;
}
ul {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
	padding-block: 1rem;
}
li {
	display: flex;
	align-items: center;
}
input[type="checkbox"] {
	accent-color: var(--color-cream);
	background-color: var(--color-red);
	outline: 2px solid var(--color-blue);
	outline-offset: -2px;
	cursor: pointer;
	width: 1.25rem;
	aspect-ratio: 1;
	vertical-align: middle;

	&:focus-visible {
		outline-width: 4px;
	}
}
label {
	display: inline-block;
	flex: 1;
	margin-left: 1rem;

	&:hover {
		text-decoration: underline;
	}
}
button {
	font-size: 1.2rem;
}
</style>
