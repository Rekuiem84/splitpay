<script setup>
import MembresLayout from "./layouts/MembresLayout.vue";
import ArticlesLayout from "./layouts/ArticlesLayout.vue";
import { computed, provide, ref, watch, onMounted } from "vue";
import Membre from "./models/Membre";
import Article from "./models/Article";
import Modal from "./components/Modal.vue";

let membres = ref([
	new Membre("Alpha"),
	new Membre("Bravo"),
	new Membre("Charlie"),
	new Membre("Delta"),
]);
let articles = ref([
	new Article("Pain", 1.5, 1),
	new Article("Lait", 1, 2),
	new Article("Beurre", 2, 1),
	new Article("Fromage", 3, 3),
	new Article("Tomates", 2.5, 1),
	new Article("Avocat", 1.5, 2),
]);
onMounted(() => {
	articles.value.forEach((article) => {
		membres.value.forEach((membre) => {
			article.paye.push(membre.id);
		});
	});
});
console.log(articles.value);

provide("membres", membres);
provide("articles", articles);

const totalPrice = computed(() => {
	return articles.value.reduce(
		(acc, article) => acc + article.prix * article.quantité,
		0
	);
});

const prixParMembre = computed(() => {
	return (totalPrice.value / membres.value.length).toFixed(2);
});

const allArticlesNotPayeSeul = computed(() => {
	return articles.value.filter(
		(article) => !membres.value.some((m) => m.payeSeul.includes(article.nom))
	);
});

const allArticlesPayeSeul = computed(() => {
	return articles.value.filter((article) =>
		membres.value.some((m) => m.payeSeul.includes(article.nom))
	);
});

watch(articles, () => {
	// Met à jour allArticlesNotPayeSeul lorsque articles changent
	allArticlesNotPayeSeul.value = articles.value.filter(
		(article) => !membres.value.some((m) => m.payeSeul.includes(article.nom))
	);
	allArticlesPayeSeul.value = articles.value.filter((article) =>
		membres.value.some((m) => m.payeSeul.includes(article.nom))
	);
});

provide("allArticlesNotPayeSeul", allArticlesNotPayeSeul);

const calculerPrixParMembre = (membre) => {
	let total = 0;

	// Ajouter le prix des articles que le membre paye seul
	// membre.payeSeul.forEach((articleNom) => {
	// 	const article = articles.value.find((a) => a.nom === articleNom);
	// 	if (article) {
	// 		total += article.prix * article.quantité;
	// 	}
	// });

	// // Ajouter le prix des articles partagés
	// allArticlesNotPayeSeul.value.forEach((article) => {
	// 	total += (article.prix * article.quantité) / membres.value.length;
	// });

	// // Retirer le prix des articles que le membre ne paye pas
	// membre.nePayePas.forEach((articleNom) => {
	// 	const article = articles.value.find((a) => a.nom === articleNom);
	// 	if (article) {
	// 		total -= (article.prix * article.quantité) / membres.value.length;
	// 	}
	// });

	// return total.toFixed(2);
};

let modalType = ref("");
let showModal = ref(false);
let selectedMembre = ref(null);
provide("modalType", modalType);
provide("showModal", showModal);
provide("selectedMembre", selectedMembre);
</script>

<template>
	<h1>SplitPay - Gérez vos coûts en groupe</h1>
	<div class="wrapper">
		<MembresLayout />
		<ArticlesLayout :totalPrice="totalPrice" :prixEquitable="prixParMembre" />
	</div>
	<div>
		<h2>Prix par membre</h2>
		<ul>
			<li v-for="membre in membres" :key="membre.id">
				{{ membre.nom }} : {{ calculerPrixParMembre(membre) }}€
			</li>
		</ul>
	</div>
	<Modal
		v-if="showModal && selectedMembre !== null"
		:modalType="modalType"
		:membre="membres[selectedMembre]"
		@closeModal="showModal = false" />
</template>
