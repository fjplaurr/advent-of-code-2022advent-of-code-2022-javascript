const { readFileSync } = require("fs");
const data = readFileSync("input.txt", "utf-8");

const calories = data.split("\n").map(num => parseInt(num));

let currentSum = 0;

const caloriesByElf = calories.reduce((accumulator, current) => {
  if (!isNaN(current)) {
    currentSum += current;
    return accumulator;
  } else {
    let updatedCalories = [...accumulator, currentSum];
    currentSum = 0;
    return updatedCalories;
  }
}, []);

const orderedCaloriesByElf = [...caloriesByElf].sort((a, b) => b - a);

// Part 1
console.log(orderedCaloriesByElf[0])

// Part 2
console.log(orderedCaloriesByElf[0] + orderedCaloriesByElf[1] + orderedCaloriesByElf[2])