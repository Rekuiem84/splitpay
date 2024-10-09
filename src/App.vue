<script setup>
import MembresLayout from "./layouts/MembresLayout.vue";
import ArticlesLayout from "./layouts/ArticlesLayout.vue";
import { computed, provide, ref } from "vue";

let membres = ref(["Alpha", "Bravo", "Charlie", "Delta", "Echo"]);
let articles = ref([
	{ nom: "Pizza", prix: 10, quantité: 2 },
	{ nom: "Coca", prix: 2, quantité: 3 },
	{ nom: "Frites", prix: 5, quantité: 1 },
	{ nom: "Salade", prix: 3, quantité: 1 },
	{ nom: "Glace", prix: 4, quantité: 1 },
]);

provide("membres", membres);
provide("articles", articles);

const totalPrice = computed(() => {
	return articles.value.reduce(
		(acc, article) => acc + article.prix * article.quantité,
		0
	);
});

const totalQuantity = computed(() => {
	return articles.value.reduce((acc, article) => acc + article.quantité, 0);
});

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
		articles.value.push(article);
	}
};

const removeArticle = (articleNom) => {
	const index = articles.value.findIndex(
		(a) => a.nom.toLowerCase() === articleNom.toLowerCase()
	);
	if (index !== -1) {
		articles.value.splice(index, 1);
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
	}
};

const addMember = (member) => {
	membres.value.push(member);
};

const removeMember = (index) => {
	membres.value.splice(index, 1);
};
</script>

<template>
	<h1>SplitPay - Gérez vos coûts en groupe</h1>
	<div class="wrapper">
		<MembresLayout />
		<ArticlesLayout
			@addArticle="addArticle"
			@incrementQuantity="incrementQuantity"
			@decrementQuantity="decrementQuantity"
			@removeArticle="removeArticle"
			:totalPrice="totalPrice" />
	</div>
</template>
