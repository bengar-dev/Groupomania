export function randomInt(min, max) { // générer un nombre entier aléatoire
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }