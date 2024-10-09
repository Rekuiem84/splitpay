export default class Membre {
	constructor(nom, nePayePas = [], payeSeul = [], partage = []) {
		this.nom = nom;
		this.nePayePas = nePayePas;
		this.payeSeul = payeSeul;
		this.partage = partage;
	}
}
