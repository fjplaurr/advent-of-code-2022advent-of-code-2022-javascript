const { readFileSync } = require("fs");
const path = require("path");

const data = readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
const pairs = data.split("\n");

const pairs2 = pairs.map((el) => el.split(","));

// Part 1
const containedAssignments = pairs2.reduce((acc, el) => {
  const [left, right] = el;
  const numLeft = left.split("-").map((el) => parseInt(el));
  const numRight = right.split("-").map((el) => parseInt(el));

  if (numLeft[0] >= numRight[0] && numLeft[1] <= numRight[1]) {
    return acc + 1;
  }

  if (numLeft[0] <= numRight[0] && numLeft[1] >= numRight[1]) {
    return acc + 1;
  }

  return acc;
}, 0);

console.log(containedAssignments);

// Part 2
const overlapingAssignments = pairs2.reduce((acc, el, index) => {
  const [left, right] = el;
  const numLeft = left.split("-").map((el) => parseInt(el));
  const numRight = right.split("-").map((el) => parseInt(el));

  if (numLeft[1] >= numRight[0] && numLeft[0] <= numRight[1]) {
    return acc + 1;
  }

  if (numRight[1] >= numLeft[0] && numRight[0] <= numLeft[1]) {
    return acc + 1;
  }

  if (numLeft[0] >= numRight[0] && numLeft[1] <= numRight[1]) {
    return acc + 1;
  }

  if (numLeft[0] <= numRight[0] && numLeft[1] >= numRight[1]) {
    return acc + 1;
  }

  return acc;
}, 0);

console.log(overlapingAssignments);
