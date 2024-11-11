let id = 0;

export default class Article {
	constructor(nom, prix, quantité = 1, paye = []) {
		this.id = id++;
		this.nom = nom;
		this.prix = prix;
		this.quantité = quantité;
		this.paye = paye;
		this.isPayeSeul = false;
	}
}
