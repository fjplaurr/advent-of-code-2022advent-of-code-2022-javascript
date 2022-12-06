const { readFileSync } = require("fs");
const path = require("path");

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");

const pairs = data.split("\n");

// Part 1
const firstStrategy = {
  "A Y": 8,
  "A X": 4,
  "A Z": 3,
  "B Y": 5,
  "B X": 1,
  "B Z": 9,
  "C Y": 2,
  "C X": 7,
  "C Z": 6,
};

let totalScore = 0;

pairs.forEach((combination) => {
  totalScore += firstStrategy[combination];
});

console.log(totalScore);

// Part 2
const secondStrategy = {
  "A Y": 4,
  "A X": 3,
  "A Z": 8,
  "B Y": 5,
  "B X": 1,
  "B Z": 9,
  "C Y": 6,
  "C X": 2,
  "C Z": 7,
};

totalScore = 0;

pairs.forEach((combination) => {
  totalScore += secondStrategy[combination];
});

console.log(totalScore);
