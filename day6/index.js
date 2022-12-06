const { readFileSync } = require("fs");
const path = require("path");

const datastream = readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
let res = 0;

// function that receives an array of numbers and returns if all of the numbers are different
function allElementsAreDifferent(arr) {
  const s = new Set(arr);
  return s.size === arr.length;
}

// Part 1
let DIFFERENT_CARACHTERS = 4;
datastream.split("").every((char, idx, arr) => {
  const splitedCarachters = arr.slice(idx, idx + DIFFERENT_CARACHTERS);
  if (allElementsAreDifferent(splitedCarachters)) {
    res = DIFFERENT_CARACHTERS + idx;
    return false;
  }
  return true;
});
console.log(res);

// Part 2
DIFFERENT_CARACHTERS = 14;
datastream.split("").every((char, idx, arr) => {
  const splitedCarachters = arr.slice(idx, idx + DIFFERENT_CARACHTERS);
  if (allElementsAreDifferent(splitedCarachters)) {
    res = DIFFERENT_CARACHTERS + idx;
    return false;
  }
  return true;
});
console.log(res);
