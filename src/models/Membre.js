let id = 0;

export default class Membre {
	constructor(nom, nePayePas = [], payeSeul = [], partage = []) {
		this.id = id++;
		this.nom = nom;
		this.nePayePas = nePayePas;
		this.payeSeul = payeSeul;
		this.partage = partage;
	}
}
