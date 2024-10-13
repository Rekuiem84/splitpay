<script setup>
import ArticleForm from "../components/ArticleForm.vue";
import ArticleListe from "../components/ArticleListe.vue";
import { ref } from "vue";

let showAddArticle = ref(false);
function openAddArticle() {
	showAddArticle.value = !showAddArticle.value;
}
const emit = defineEmits([
	"addArticle",
	"incrementQuantity",
	"decrementQuantity",
	"removeArticle",
]);

function handleAddArticle(article) {
	emit("addArticle", article);
}
function handleIncrementQuantity(article) {
	emit("incrementQuantity", article);
}
function handleDecrementQuantity(article) {
	emit("decrementQuantity", article);
}
function handleRemoveArticle(article) {
	emit("removeArticle", article);
}

const { totalPrice, prixEquitable } = defineProps([
	"totalPrice",
	"prixEquitable",
]);
</script>

<template>
	<div class="articles-cont">
		<p class="titre__article">
			Articles
			<button
				class="button--add"
				@click="openAddArticle"
				:class="{ active: showAddArticle }">
				<i class="bx bx-plus"></i>
			</button>
		</p>
		<ArticleForm v-show="showAddArticle" @addArticle="handleAddArticle" />
		<ArticleListe
			@incrementQuantity="handleIncrementQuantity"
			@decrementQuantity="handleDecrementQuantity"
			@removeArticle="handleRemoveArticle" />
		<hr />
		<p class="article__total">Total : {{ totalPrice }}€</p>
		<p class="article__total" v-if="prixEquitable != Infinity">
			Total équitable : {{ prixEquitable }}€
		</p>
	</div>
</template>

<style>
.articles-cont {
	padding-block: 1rem;
	padding-inline: 1rem;
	background-color: var(--color-cream);
	color: var(--color-blue);
	position: relative;

	&::before,
	&::after {
		content: "";
		position: absolute;
		left: 0;
		height: 12px;
		width: 100%;
		background-image: url("/wave.svg");
		background-position: left;
		background-size: contain;
		background-repeat: repeat-x;
	}
	&::before {
		translate: 0 -100%;
		top: 0;
	}
	&::after {
		transform: scaleY(-1);
		bottom: 0;
		translate: 0 100%;
	}
}
.titre__article {
	font-size: 2rem;
	font-weight: 700;
	display: flex;
	align-items: center;
	gap: 1rem;
	text-transform: uppercase;
	background: var(--color-cream);
	color: var(--color-blue);
}
hr {
	margin-block: 0.8rem;
	border-top: 2px solid var(--color-blue);
}
.article__total + p {
	margin-top: 0.5em;
}
</style>
