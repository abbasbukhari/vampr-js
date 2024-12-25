class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  get numberOfOffspring() {
    return this.offspring.length;
  }

  get numberOfVampiresFromOriginal() {
    let count = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      count++;
      currentVampire = currentVampire.creator;
    }

    return count;
  }

  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  closestCommonAncestor(vampire) {
    const lineage1 = [];
    let currentVampire1 = this;

    while (currentVampire1) {
      lineage1.push(currentVampire1);
      currentVampire1 = currentVampire1.creator;
    }

    let currentVampire2 = vampire;

    while (currentVampire2) {
      if (lineage1.includes(currentVampire2)) {
        return currentVampire2;
      }
      currentVampire2 = currentVampire2.creator;
    }

    return null;
  }
}

module.exports = Vampire;
