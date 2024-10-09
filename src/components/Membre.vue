<script setup>
const { nom } = defineProps(["nom"]);
</script>

<template>
	<li class="membre">
		<h2 class="membre__nom">
			{{ nom }}
			<button class="button--remove" @click="removeMembre(index)">
				<i class="bx bx-x"></i>
			</button>
		</h2>
		<h4>
			Ne paye pas
			<button
				class="button--increment"
				@click="handleOpenModal('nePayePas', membre.nom)">
				<i class="bx bx-plus"></i>
			</button>
		</h4>
		<!-- <ul v-if="membre.nePayePas && membre.nePayePas.length > 0">
			<li v-for="(article, indexArticle) in membre.nePayePas">
				Patates
				<button 
					class="button--remove"
					@click="removeNePayePasArticle(membre.nom, indexArticle)">
					<i class="bx bx-x"></i>
				</button>
			</li>
		</ul> -->
		<!-- <h4>
			Paye seul
			<button
				class="button--increment"
				@click="handleOpenModal('payeSeul', membre.nom)">
				<i class="bx bx-plus"></i>
			</button>
		</h4>
		<ul v-if="membre.payeSeul && membre.payeSeul.length > 0">
			<li v-for="(article, indexArticle) in membre.payeSeul">
				Rien
				<button
					class="button--remove"
					@click="removePayeSeulArticle(membre.nom, indexArticle)">
					<i class="bx bx-x"></i>
				</button>
			</li>
		</ul> -->
	</li>
</template>
