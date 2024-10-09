<script setup>
import Article from "./Article.vue";

import { ref, inject } from "vue";

const articles = inject("articles");

const emit = defineEmits([
	"incrementQuantity",
	"decrementQuantity",
	"removeArticle",
]);
function handleIncrementQuantity(article) {
	emit("incrementQuantity", article);
}
function handleDecrementQuantity(article) {
	emit("decrementQuantity", article);
}
function handleRemoveArticle(article) {
	emit("removeArticle", article);
}
</script>

<template>
	<ul class="articles-list">
		<Article
			v-for="(article, key) in articles"
			:key="key"
			:nom="article.nom"
			:prix="article.prix"
			:quantité="article.quantité"
			@incrementQuantity="handleIncrementQuantity"
			@decrementQuantity="handleDecrementQuantity"
			@removeArticle="handleRemoveArticle" />
	</ul>
</template>
