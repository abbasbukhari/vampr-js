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

  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }

    for (const offspring of this.offspring) {
      const result = offspring.vampireWithName(name);
      if (result) {
        return result;
      }
    }

    return null;
  }

  get totalDescendents() {
    let count = 0;

    for (const offspring of this.offspring) {
      count += 1 + offspring.totalDescendents;
    }

    return count;
  }

  get allMillennialVampires() {
    let millennials = [];

    if (this.yearConverted > 1980) {
      millennials.push(this);
    }

    for (const offspring of this.offspring) {
      millennials = millennials.concat(offspring.allMillennialVampires);
    }

    return millennials;
  }
}

module.exports = Vampire;
