<script setup>
import { inject } from "vue";
const { nom, index, nePayePas, payeSeul } = defineProps([
	"nom",
	"index",
	"nePayePas",
	"payeSeul",
]);

const emit = defineEmits(["removeMembre"]);

function handleRemoveMembre() {
	emit("removeMembre", index);
}

let showModal = inject("showModal");
let modalType = inject("modalType");
let selectedMembre = inject("selectedMembre");

function openModal(type, id) {
	modalType.value = type;
	selectedMembre.value = id;
	showModal.value = true;
}

function removeArticle(type, indexArticle) {
	if (type === "nePayePas") {
		nePayePas.splice(indexArticle, 1);
	} else if (type === "payeSeul") {
		payeSeul.splice(indexArticle, 1);
	}
}
</script>

<template>
	<li class="membre">
		<h2 class="membre__nom">
			{{ nom }}
			<button class="button--remove" @click="handleRemoveMembre">
				<i class="bx bx-x"></i>
			</button>
		</h2>
		<h4>
			Ne paye pas
			<button class="button--increment" @click="openModal('nePayePas', index)">
				<i class="bx bx-plus"></i>
			</button>
		</h4>
		<ul v-if="nePayePas && nePayePas.length > 0">
			<li v-for="(article, indexArticle) in nePayePas">
				{{ article }}
				<button
					class="button--remove"
					@click="removeArticle('nePayePas', indexArticle)">
					<i class="bx bx-x"></i>
				</button>
			</li>
		</ul>
		<h4>
			Paye seul
			<button class="button--increment" @click="openModal('payeSeul', index)">
				<i class="bx bx-plus"></i>
			</button>
		</h4>
		<ul v-if="payeSeul && payeSeul.length > 0">
			<li v-for="(article, indexArticle) in payeSeul">
				{{ article }}
				<button
					class="button--remove"
					@click="removeArticle('payeSeul', indexArticle)">
					<i class="bx bx-x"></i>
				</button>
			</li>
		</ul>
	</li>
</template>
