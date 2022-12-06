const { readFileSync } = require("fs");
const path = require("path");

const movements = readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .trimEnd() // remove ending whitespace
  .split("\n"); // create array from line break

/**
 * Input data:
 * [N]             [R]             [C]
 * [T] [J]         [S] [J]         [N]
 * [B] [Z]     [H] [M] [Z]         [D]
 * [S] [P]     [G] [L] [H] [Z]     [T]
 * [Q] [D]     [F] [D] [V] [L] [S] [M]
 * [H] [F] [V] [J] [C] [W] [P] [W] [L]
 * [G] [S] [H] [Z] [Z] [T] [F] [V] [H]
 * [R] [H] [Z] [M] [T] [M] [T] [Q] [W]
 */

const stacks = [
  ["R", "G", "H", "Q", "S", "B", "T", "N"],
  ["H", "S", "F", "D", "P", "Z", "J"],
  ["Z", "H", "V"],
  ["M", "Z", "J", "F", "G", "H"],
  ["T", "Z", "C", "D", "L", "M", "S", "R"],
  ["M", "T", "W", "V", "H", "Z", "J"],
  ["T", "F", "P", "L", "Z"],
  ["Q", "V", "W", "S"],
  ["W", "H", "L", "M", "T", "D", "N", "C"],
];

// Part 1
// movements.forEach((movement) => {
//   const mov = movement.split(" ");
//   const cratesQuantity = parseInt(mov[1]);
//   const fromStackIndex = parseInt(mov[3]);
//   const toStackIndex = parseInt(mov[5]);

//   for (let i = 0; i < cratesQuantity; i++) {
//     const stackFrom = stacks[fromStackIndex - 1];
//     const stackTo = stacks[toStackIndex - 1];

//     const lastElement = stackFrom.pop();
//     stackTo.push(lastElement);
//   }
// });

// const messagePart1 = stacks.map((stack) => stack.at(-1)).join("");

// console.log(messagePart1);

// Part 2
movements.forEach((movement) => {
  const mov = movement.split(" ");
  const cratesQuantity = parseInt(mov[1]);
  const fromStackIndex = parseInt(mov[3]);
  const toStackIndex = parseInt(mov[5]);

  stackFrom = stacks[fromStackIndex - 1];

  stackTo = stacks[toStackIndex - 1];

  const cratesToMove = stackFrom.slice(stackFrom.length - cratesQuantity);
  cratesToMove;

  stackFrom = stackFrom.slice(0, -cratesQuantity);
  stackFrom;
  stackTo = [...stackTo, ...cratesToMove];
  stackTo;
  stacks[fromStackIndex - 1] = stackFrom;
  stacks[toStackIndex - 1] = stackTo;
});

console.log(stacks);
const messagePart2 = stacks.map((stack) => stack.at(-1)).join("");

console.log(messagePart2);
