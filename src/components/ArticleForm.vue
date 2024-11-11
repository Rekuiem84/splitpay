<script setup>
import { ref, inject } from "vue";
import Article from "../models/Article";
const articles = inject("articles");

let articleNom = ref("");
let articlePrix = ref("");
let articleQuantite = ref("");
let showErrorMess = ref(false);
let errorMess = ref("");

function handleSubmit() {
	if (!checkValues()) return;

	addArticle({
		nom: articleNom.value,
		prix: parseFloat(articlePrix.value),
		quantité: parseInt(articleQuantite.value) || 1,
	});
	articleNom.value = "";
	articlePrix.value = "";
	articleQuantite.value = "";
}
function checkValues() {
	if (articleNom.value === "" || articlePrix.value === "") {
		showErrorMess.value = true;
		errorMess.value = "Veuillez remplir tous les champs.";
		return false;
	}
	if (
		articlePrix.value < 0 ||
		isNaN(articlePrix.value) ||
		articleQuantite.value < 1 ||
		isNaN(articleQuantite.value) ||
		!Number.isInteger(parseFloat(articleQuantite.value))
	) {
		showErrorMess.value = true;
		errorMess.value = "Veuillez entrer des valeurs valides.";
		return false;
	}
	showErrorMess.value = false;
	return true;
}
const addArticle = (article) => {
	if (
		articles.value.some(
			(a) => a.nom.toLowerCase() === article.nom.toLowerCase()
		)
	) {
		const index = articles.value.findIndex(
			(a) => a.nom.toLowerCase() === article.nom.toLowerCase()
		);
		articles.value[index].quantité += article.quantité;
	} else {
		articles.value.push(
			new Article(article.nom, article.prix, article.quantité)
		);
	}
};
</script>

<template>
	<form class="articles__form" @submit.prevent="handleSubmit">
		<div class="error-mess" v-show="showErrorMess">
			{{ errorMess }}
		</div>
		<label for="articleNom">Article</label>
		<input
			id="articleNom"
			name="articleNom"
			type="text"
			v-model="articleNom"
			placeholder="Article" />
		<label for="articlePrix">Prix</label>
		<input
			id="articlePrix"
			name="articlePrix"
			type="number"
			step="0.01"
			min="0"
			inputmode="decimal"
			v-model="articlePrix"
			placeholder="4.99" />
		<label for="articleQuantite">Quantité</label>
		<input
			id="articleQuantite"
			name="articleQuantite"
			type="number"
			min="1"
			inputmode="numeric"
			v-model="articleQuantite"
			placeholder="Quantité" />
		<button type="submit" class="button--cta">Ajouter article</button>
	</form>
</template>

<style>
.articles__form {
	display: grid;
	gap: 0.75rem 1rem;
	grid-template-columns: auto 1fr;
	align-items: center;
	margin-block: 1rem;
}
.articles__form button {
	grid-column: 1 / -1;
}
.error-mess {
	grid-column: 1 / 3;
	background: var(--color-red);
	color: var(--color-white);
	text-align: center;
	padding: 0.25em;
	border-radius: 0.5rem;
	font-weight: bold;
}
</style>
