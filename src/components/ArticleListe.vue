<script setup>
import Article from "./Article.vue";

import { inject } from "vue";

const articles = inject("articles");
const membres = inject("membres");

const updateArticlesPaye = (articleNom) => {
	const index = articles.value.findIndex(
		(a) => a.nom.toLowerCase() === articleNom.toLowerCase()
	);
	if (index !== -1) {
		articles.value[index].paye = [];
		membres.value.forEach((membre) => {
			if (membre.paye.includes(articleNom)) {
				articles.value[index].paye.push(membre.id);
			}
		});
	}
};
const incrementQuantity = (articleNom) => {
	const index = articles.value.findIndex(
		(a) => a.nom.toLowerCase() === articleNom.toLowerCase()
	);
	if (index !== -1) {
		articles.value[index].quantité++;
	}
};
const decrementQuantity = (articleNom) => {
	const index = articles.value.findIndex(
		(a) => a.nom.toLowerCase() === articleNom.toLowerCase()
	);
	if (index !== -1) {
		if (articles.value[index].quantité > 1) {
			articles.value[index].quantité--;
		} else {
			removeArticle(articleNom);
		}
		console.log(articles.value);
	}
};
const removeArticle = (articleNom) => {
	const index = articles.value.findIndex(
		(a) => a.nom.toLowerCase() === articleNom.toLowerCase()
	);
	if (index !== -1) {
		articles.value.splice(index, 1);
		updateArticlesPaye(articleNom);
	}
};
</script>

<template>
	<ul class="articles-list">
		<Article
			v-for="(article, key) in articles"
			:key="key"
			:nom="article.nom"
			:prix="article.prix"
			:quantité="article.quantité"
			@incrementQuantity="incrementQuantity"
			@decrementQuantity="decrementQuantity"
			@removeArticle="removeArticle" />
	</ul>
</template>
