<script setup>
const { nom, prix, quantité } = defineProps(["nom", "prix", "quantité"]);

const emit = defineEmits([
	"incrementQuantity",
	"decrementQuantity",
	"removeArticle",
]);

function handleIncrementQuantity() {
	emit("incrementQuantity", nom);
}

function handleDecrementQuantity() {
	emit("decrementQuantity", nom);
}

function removeArticle() {
	emit("removeArticle", nom);
}
</script>

<template>
	<div class="article">
		<p class="article__nom">
			<span>
				<button class="button--increment" @click="handleIncrementQuantity">
					<i class="bx bx-plus"></i>
				</button>
				<button class="button--decrement" @click="handleDecrementQuantity">
					<i class="bx bx-minus"></i>
				</button>
			</span>
			{{ quantité + " " + nom }}
		</p>
		<p class="article__prix">
			{{ prix }} €
			<button class="button--remove" @click="removeArticle">
				<i class="bx bx-x"></i>
			</button>
		</p>
	</div>
</template>

<style>
.article {
	display: flex;
	align-items: center;
}
.article__nom {
	text-transform: capitalize;

	& > span {
		margin-left: 0.5rem;
	}
}
.article__prix {
	margin-left: auto;
	line-height: 1.5;
}
</style>
