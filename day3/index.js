const { readFileSync } = require("fs");
const path = require("path");

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
const rucksacks = data.split("\n");

const alphabet = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

const orderAlphabetically = (a, b) => {
  return alphabet[a] - alphabet[b];
};

// Part 1
const orderedRucksacks = rucksacks.map((rucksack) => {
  // divide the rucksack into two parts with same number of carachters
  const half = rucksack.length / 2;
  const firstHalf = rucksack.slice(0, half);
  const secondHalf = rucksack.slice(half);

  const commonCarachter = firstHalf
    .split("")
    .filter((carachter) => secondHalf.includes(carachter))[0];

  return commonCarachter;
});

const totalResult = orderedRucksacks.reduce(
  (acc, curr) => (curr ? acc + alphabet[curr] : acc),
  0
);

console.log(totalResult);

// Part 2
const commonCarachters = [];
for (let i = 0; i < rucksacks.length - 1; i += 3) {
  // find the common carachters between the first, the second and the third rucksack
  const commonCarachter = rucksacks[i]
    .split("")
    .filter((carachter) => rucksacks[i + 1].includes(carachter))
    .filter((carachter) => rucksacks[i + 2].includes(carachter))[0];

  commonCarachters.push(commonCarachter);
}

const totalResult2 = commonCarachters.reduce(
  (acc, curr) => (curr ? acc + alphabet[curr] : acc),
  0
);

console.log(totalResult2);
